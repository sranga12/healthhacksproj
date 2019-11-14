import config from "./config";

const http = require("http");
const express = require("express");

const firebase = require("firebase");
firebase.initializeApp(config);

const twiliocl = require('twilio')(config.accountSid, config.authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

import analysis from "./analysis"
var dbRef = firebase.database().ref('/');
var db = {};

const exPatient = {
	mainphone: "7654644408",
	name: "Billy"
}

dbRef.on('value', function (s) {
	db = s.val();

	if (db !== null && db.doctors !== undefined && db.doctors[0].patients === undefined) {
		const doctors = db.doctors
		doctors[0].patients = {
			0: exPatient
		}
		dbRef.set({
			doctors: doctors
		})
	}

	if (db === null || db.doctors === undefined) {
		dbRef.set({
			doctors: {
				0: {
					email: "john@doe.com",
					name: "John Doe",
					patients: {
						0: exPatient
					}
				}
			}
		})
	}
});

var currentDoctor = 0
var currentPatient = 0

app.get("/", (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(db));
});

app.post('/sms', (req, res) => {
	const twiml = new MessagingResponse();

	twiml.message(analysis.analyze(db.doctors[0].patients[0], req.body.Body));

	const nextNote = db.doctors[currentDoctor].patients[currentPatient].notes ? db.doctors[currentDoctor].patients[currentPatient].notes.length : 0;
	firebase.database().ref(`doctors/${currentDoctor}/patients/${currentPatient}/notes/${nextNote}`).set({
		creator: {
			name: "Billy Doel",
			phone: req.body.From,
			role: "Other"
		},
		body: req.body.Body,
		date: new Date(Date.now()).toISOString(),
		objectID: nextNote	
})
	db.doctors[currentDoctor].patients[currentPatient].notes[nextNote] = {
        creator: {
            name: "Billy Doel",
            phone: req.body.From,
            role: "Other"
        },
        body: req.body.Body,
        date: new Date(Date.now()).toISOString()
    }

		res.writeHead(200, { "Content-Type": "text/xml"});
	res.end(twiml.toString());
})

http.createServer(app).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

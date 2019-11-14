import config from "./config";

const http = require("http");

const firebase = require("firebase");
firebase.initializeApp(config);

const twiliocl = require('twilio')(config.accountSid, config.authToken);

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'application/json'});
	firebase.database().ref('/').once('value').then(function (snapshot) {
		res.end(JSON.stringify(snapshot.val()));
	});
}).listen(1337, '127.0.0.1');

twiliocl.messages.create({
	body: "Testing!",
	from: "+13522928309",
	to: "XXX"
}).then(message => console.log(message.sid)).done();

console.log('Server running at http://127.0.0.1:1337/');

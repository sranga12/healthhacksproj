var moment = require("moment")

var analysis = {
	fever: function (patient) {
		var last = patient.notes.sort(function (a, b) {
			return new Date(b.date) - new Date(a.date)
		}).find(function (e) {
			return e.body.includes("fever")
		})

		if (last !== undefined)
			return `Thank you! Last fever was on ${moment(last.date).fromNow()} with notes: ${last.body}`
		else
			return "Thank you! No information about last fever."
	},
	medhist: function (patient, medication) {
		var started = patient.notes.sort(function (a, b) {
			return new Date(b.date) - new Date(a.date)
		}).find(function (e) {
			return e.body.includes(`started taking ${medication}`)
		})

		if (started !== undefined)
			return `Thank you! Your child started taking ${medication} ${moment(started.date).fromNow()} with notes: ${started.body}`
		else
			return `Thank you! No previous information about ${medication}.`
	},
	moodhist: function (patient) {
		var recent = patient.notes.filter(function checkRecent(note) {
			return new Date(Date.now()) - new Date(note.date) <= 12096e5
		})
		var happy = recent.filter(function checkHappy(note) {
			return RegExp(/happy|cheerful|excited|joy/).test(note.body)
		})
		var sad = recent.filter(function checkSad(note) {
			return RegExp(/sad|down|depress|gloomy/).test(note.body)
		})
		return `Thank you. In the last two weeks, you've noted that your child was happy in ${happy.length} entries and sad in ${sad.length} entries, out of ${recent.length} total entries.`
	},
	analyze: function (patient, text) {
		if (text.includes("fever")) {
			return this.fever(patient);
		} if (text.includes("Adderall")) {
			return this.medhist(patient, "Adderall")
		} if (text.includes("Focalin")) {
			return this.medhist(patient, "Focalin")
		} if (RegExp(/happy|cheerful|excited|joy|sad|down|depress|gloomy/).test(text)) {
			return this.moodhist(patient)
		} else {
			return "Thank you! I cannot provide any guidance right now, but I will record your report for future analysis.";
		}
	}
}

export default analysis

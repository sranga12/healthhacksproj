import React, { Component } from 'react';
import './App.css';

import tools from "./config"

import CardStack from "./CardStack"

class App extends Component {
    constructor() {
        super();

        this.state = {notes: [], value: ''};
    }
    handleChange = (event) => {
		if (event.target.value === "")
			this.setState({ notes: [] })
		else {
			var that = this;
tools.index.clearIndex()
tools.firebase.database().ref('doctors/0/patients/0/notes').once('value').then(function (s) {
    s.val() && tools.index.addObjects(s.val())
            tools.index.search({ query: that.state.value, distinct: true }, function (error, content) {
                if (error) { alert(error.message); }
                that.setState({ notes: content.hits});
            });
})
        }
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="KidCards" style={{ backgroundColor: "#D2B38C" }}>
                <h1 align="center">{this.state.doctors && this.state.doctors[0].patients[0].name}</h1>

                <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Keywords (fever, fidget, sad...)" onChange={this.handleChange}></input>
                </div>
            <CardStack cards={(this.state.notes.length > 0 ? this.state.notes : (this.state.doctors && this.state.doctors[0].patients[0].notes))} />
            </div>
        );
    }

	componentDidMount () {
		tools.base.bindToState("/doctors", {
			context: this,
			asArray: true,
			state: "doctors"
		})
	}
}

export default App;

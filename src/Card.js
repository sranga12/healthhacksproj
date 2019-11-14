import React, { Component } from "react"
import Moment from 'react-moment'
import 'moment-timezone'

class Card extends Component {
    constructor(props) {
        super(props);
    }

    color() {
        switch (this.props.creator.role) {
            case ('Parent' | 'Mom' | 'Dad'):
                return 'border-dark';
            case ('Daycare'):
                return 'border-success';
            case ('Teacher' | 'Professor'):
                return 'border-warning';
            default:
                return 'border-dark';
        }
    }

    render() {
        
        return (
			<div className="card {this.color()} mb-3">
			<div className="card-body">
			<p className="card-text">{this.props.body}</p>
                    <p className="card-text"><small className="text-muted">{this.props.creator.name} ({this.props.creator.role}) <Moment fromNow>{this.props.date}</Moment> </small></p>
			</div>
			</div>
        );
    }
}

export default Card;

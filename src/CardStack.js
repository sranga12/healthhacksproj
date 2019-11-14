import React, { Component } from "react"

import Card from "./Card"

class CardStack extends Component {
    render() {
        return (
			<div id="cardstack" className="card-columns CardStack">
            {this.props.cards && this.props.cards.map((m, i) => <Card body={m.body} key={i} date={m.date} creator={m.creator} />)}
			</div>
			);
    }
}

export default CardStack;

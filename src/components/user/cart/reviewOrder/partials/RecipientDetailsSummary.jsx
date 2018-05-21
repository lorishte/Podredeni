import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { CART } from '../../../../../data/constants/componentConstants';

class RecipientDetailsSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let recipient = this.props.recipient;

		return (
			<div>
				<h4>{CART.recipient}</h4>
				<p><strong>{recipient.firstName + ' ' + recipient.lastName}</strong></p>
				<p>{recipient.phone}</p>
				<p>{recipient.email}</p>
			</div>
		);
	}
}

export default RecipientDetailsSummary;

import React from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';

class RecipientDetailsSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let recipient = this.props.recipient;

		return (
			<Row>
				<Col xs={12}><h4> Delivery for:</h4></Col>
				<Col xs={4}>Recipient:</Col>
				<Col xs={8}>{recipient.firstName + ' ' + recipient.lastName} </Col>
				<Col xs={4}> Telephone:</Col>
				<Col xs={8}>{recipient.phone}</Col>
				<Col xs={4}> Email:</Col>
				<Col xs={8}>{recipient.email}</Col>
			</Row>
		);
	}
}

export default RecipientDetailsSummary;

import React from 'react';

import { Row, Col } from 'react-bootstrap';

class RecipientDetailsSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let recipient = this.props.recipient;

		return (
			<Row>
				<Col xs={12}><h4>Получател:</h4></Col>
				<Col xs={12}><strong>{recipient.firstName + ' ' + recipient.lastName}</strong></Col>
				<Col xs={12}>{recipient.phone}</Col>
				<Col xs={12}>{recipient.email}</Col>
			</Row>
		);
	}
}

export default RecipientDetailsSummary;

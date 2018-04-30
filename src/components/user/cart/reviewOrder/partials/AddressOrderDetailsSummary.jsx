import React from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';

class AddressOrderDetailsSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let orderDetails = this.props.deliveryDetails;

		return (
			<Row>
				<Col xs={12}><h4> Delivery to address:</h4></Col>
				<Col xs={12}>{orderDetails.country}</Col>
				<Col xs={12}>{orderDetails.postalCode}, {orderDetails.city}</Col>
				<Col xs={12}>кв. {orderDetails.district}</Col>
				<Col xs={12}>ул. {' "'}{orderDetails.street}{'" '} {orderDetails.streetNo}</Col>
				<Col xs={12}>бл. {orderDetails.block}, вх. {orderDetails.entrance}, ет. {orderDetails.floor},
					ап. {orderDetails.apartment} </Col>
			</Row>

		);
	}
}

export default AddressOrderDetailsSummary;

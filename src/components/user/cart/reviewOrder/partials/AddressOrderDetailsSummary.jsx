import React from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';

class AddressOrderDetailsSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		console.log(this.props);
	}

	render () {
		let orderDetails = this.props.deliveryDetails;

		return (

			<Row>
				<Col xs={12}><h4> Delivery to address:</h4></Col>
				<Col xs={4}>Address:</Col>
				<Col xs={8}>{orderDetails.country}</Col>
				<Col xs={8} xsOffset={4}>п.к. {orderDetails.postalCode}</Col>
				<Col xs={8} xsOffset={4}>гр./с. {orderDetails.city}</Col>
				<Col xs={8} xsOffset={4}>кв. {orderDetails.district}</Col>
				<Col xs={8} xsOffset={4}>ул. {' "'}{orderDetails.street}{'" '} {orderDetails.streetNo}</Col>
				<Col xs={8} xsOffset={4}>бл. {orderDetails.block}, вх. {orderDetails.entrance}, ет. {orderDetails.floor},
					ап. {orderDetails.apartment} </Col>
			</Row>

		);
	}
}

export default AddressOrderDetailsSummary;

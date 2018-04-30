import React from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';

class EkontOrderDetailsSummary extends React.Component {
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
				<Col xs={12}><h4> Delivery to Ekont Office:</h4></Col>
				<Col xs={4}>Office No:</Col>
				<Col xs={8}>{orderDetails.officeCode}</Col>
				<Col xs={4}> Office name:</Col>
				<Col xs={8}>{orderDetails.officeName}</Col>
				<Col xs={4}>Office address:</Col>
				<Col xs={8}>{orderDetails.country}</Col>
				<Col xs={8} xsOffset={4}>{orderDetails.address}</Col>
			</Row>
		);
	}
}

export default EkontOrderDetailsSummary;

import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { CART } from '../../../../../data/constants/componentConstants';


class EkontOrderDetailsSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let orderDetails = this.props.deliveryDetails;

		return (
			<Row>
				<Col xs={12}><h4>{CART.toEkontOffice}</h4></Col>
				<Col xs={12}><strong>&#8470;&nbsp;{orderDetails.officeCode}</strong> - {orderDetails.officeName}</Col>

				<Col xs={12}>{orderDetails.country}</Col>
				<Col xs={12}>{orderDetails.address}</Col>
			</Row>
		);
	}
}

export default EkontOrderDetailsSummary;

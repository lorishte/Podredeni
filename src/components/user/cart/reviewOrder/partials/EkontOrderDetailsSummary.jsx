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
			<div>
				<h4>{CART.toEkontOffice}</h4>
				<p><strong>&#8470;&nbsp;{orderDetails.officeCode}</strong> - {orderDetails.officeName}</p>

				<p>{orderDetails.country}</p>
				<p>{orderDetails.address}</p>
			</div>
		);
	}
}

export default EkontOrderDetailsSummary;

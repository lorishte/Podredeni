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
				<Col xs={12}><h4>Доставка до адрес:</h4></Col>
				<Col xs={12}>{orderDetails.country}</Col>
				<Col xs={12}>{orderDetails.postalCode},&nbsp;{orderDetails.city}</Col>
				{orderDetails.district &&
				<Col xs={12}>кв.&nbsp;{orderDetails.district}</Col>
				}
				{orderDetails.street &&
				<Col xs={12}>ул.&nbsp;{'"'}{orderDetails.street}{'"'}&nbsp;{orderDetails.streetNo}</Col>
				}
				<Col xs={12}>
					{orderDetails.block &&
					<span>бл. {orderDetails.block},&nbsp;</span>
					}
					{orderDetails.entrance &&
					<span>вх. {orderDetails.entrance},&nbsp;</span>
					}
					{orderDetails.floor &&
					<span>ет. {orderDetails.floor},&nbsp;</span>
					}
					{orderDetails.apartment &&
					<span>ап. {orderDetails.apartment}</span>
					}
				</Col>
			</Row>

		);
	}
}

export default AddressOrderDetailsSummary;

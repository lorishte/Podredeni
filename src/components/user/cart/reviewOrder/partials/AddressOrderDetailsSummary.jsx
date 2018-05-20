import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { CART, LABELS_BG} from '../../../../../data/constants/componentConstants';

class AddressOrderDetailsSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let orderDetails = this.props.deliveryDetails;

		return (
			<Row>
				<Col xs={12}><h4>{CART.toAddress}</h4></Col>
				<Col xs={12}>{orderDetails.country}</Col>
				<Col xs={12}>{orderDetails.postalCode},&nbsp;{orderDetails.city}</Col>
				{orderDetails.district &&
				<Col xs={12}>кв.&nbsp;{orderDetails.district}</Col>
				}
				{orderDetails.street &&
				<Col xs={12}>{LABELS_BG.streetShort}&nbsp;{'"'}{orderDetails.street}{'"'}&nbsp;{orderDetails.streetNo}</Col>
				}
				<Col xs={12}>
					{orderDetails.block &&
					<span>{LABELS_BG.blockShort} {orderDetails.block},&nbsp;</span>
					}
					{orderDetails.entrance &&
					<span>{LABELS_BG.entranceShort} {orderDetails.entrance},&nbsp;</span>
					}
					{orderDetails.floor &&
					<span>{LABELS_BG.floorShort} {orderDetails.floor},&nbsp;</span>
					}
					{orderDetails.apartment &&
					<span>{LABELS_BG.apartmentShort} {orderDetails.apartment}</span>
					}
				</Col>
			</Row>

		);
	}
}

export default AddressOrderDetailsSummary;

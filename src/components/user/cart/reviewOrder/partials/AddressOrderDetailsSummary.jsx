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
			<Col sm={5}>
				<h4>{CART.toAddress}</h4>
				<p>{orderDetails.country}</p>
				<p>{orderDetails.postalCode},&nbsp;{orderDetails.city}</p>
				{orderDetails.district &&
				<p>кв.&nbsp;{orderDetails.district}</p>
				}
				{orderDetails.street &&
				<p>{LABELS_BG.streetShort}&nbsp;{'"'}{orderDetails.street}{'"'}&nbsp;{orderDetails.streetNo}</p>
				}
				<p>
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
				</p>
			</Col>

		);
	}
}

export default AddressOrderDetailsSummary;

import React from 'react';
import { Link } from 'react-router-dom';

import ordersService from '../../../../../services/orders/ordersService';

import { ORDER_STATUS_BG, ORDER_STATUS_EN } from '../../../../../data/constants/componentConstants';
import utils from '../../../../../utils/utils';

class OrderTableRow extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
		};
	}


	componentDidMount () {

		ordersService
			.loadDeliveryData(this.props.data.deliveryDataId)
			.then(res => {
                this.setState(res.deliveryData);
			})
			.catch(err => {
				console.log(err.responseText);
			});
	}

	render () {

		let d = this.state; //deliveryData
		let o = this.props.data; //order

		let totalSum = 0; //order total sum

		o.products
			.forEach(p => {
				let price = utils.calculatePriceAfterDiscount(p.price, p.discount);
				totalSum += price * p.quantity
			});

		return (
			<tr className="order">
				<td className="text-center">
					{o.number}
				</td>
				<td className="visible-md visible-lg" >
					{ORDER_STATUS_BG[o.status]}
				</td>
				<td>
					{utils.formatDate(o.lastModificationDate)}
				</td>
				<td className="visible-md visible-lg">
					{d.customerName + ' ' + d.customerLastName}
				</td>
				<td className="visible-md visible-lg">
					{d.phoneNumber}
				</td>
				<td className="text-right visible-md visible-lg">
					{totalSum.toFixed(2)}
				</td>
				<td className="text-center">
					<Link to={'/order/log/' + o.id} className="btn btn-success btn-xs">
						<i className="fa fa-history" aria-hidden="true"/>
					</Link>

					{o.status === 0 &&
					<Link to={'/order/edit/' + o.id} className="btn btn-danger btn-xs">
						<i className="fa fa-pencil" aria-hidden="true"/>
					</Link>
					}

					<button className="btn btn-info btn-xs"
					        onClick={() => this.props.showDetails(o, d)}>
						Детайли
					</button>
				</td>
			</tr>
		);
	}
}

export default OrderTableRow;

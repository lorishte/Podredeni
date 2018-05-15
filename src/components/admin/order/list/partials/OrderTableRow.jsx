import React from 'react';
import { Link } from 'react-router-dom';

import ordersService from '../../../../../services/orders/ordersService';

import { ORDER_STATUS } from '../../../../../data/constants/componentConstants';
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
		this.props.data.products
			.forEach(p => totalSum += p.price * p.quantity);

		return (
			<tr className="order">

				<td className="text-center">
					{o.number}
				</td>
				<td>
					{ORDER_STATUS[o.status]}
				</td>
				<td className="visible-md visible-lg" >
					{utils.formatDate(o.lastModificationDate)}
				</td>
				<td className="visible-md visible-lg">
					{d.customerName}
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
					<Link to={'/order/edit/' + o.id} className="btn btn-danger btn-xs">
						<i className="fa fa-pencil" aria-hidden="true"/>
					</Link>
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

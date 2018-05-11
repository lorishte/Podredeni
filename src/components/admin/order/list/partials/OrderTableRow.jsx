import React from 'react';
import { Link } from 'react-router-dom';

import ordersService from '../../../../../services/orders/ordersService';

import constants from '../../../../../data/constants/componentConstants';
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

				<td>
					{o.number}
				</td>
				<td>
					{constants.ORDER_STATUS[o.status]}
				</td>
				<td>
					{utils.formatDate(o.lastModificationDate)}
				</td>
				<td>
					{d.customerName}
				</td>
				<td>
					{d.phoneNumber}
				</td>
				<td>
					{totalSum.toFixed(2)}
				</td>
				<td>
					<Link to={'/order/log/' + o.id} className="btn btn-success btn-xs">История</Link>
				</td>
				<td>
					<Link to={'/order/edit/' + o.id} className="btn btn-danger btn-xs">Редакция</Link>
				</td>
				<td>
					<button className="btn btn-info btn-xs"
							onClick={() => this.props.showDetails(o, d)}>Детайли</button>
				</td>

			</tr>
		);
	}
}

export default OrderTableRow;

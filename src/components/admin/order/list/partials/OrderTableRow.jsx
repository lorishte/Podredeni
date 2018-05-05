import React from 'react';
import {Link} from 'react-router-dom';

import { Button } from 'react-bootstrap';

class OrderTableRow extends React.Component {
	constructor (props) {
		super(props);
	}


	selectDate = () => {

	};

	render () {

		let o = this.props.data;

		return (
			<tr>
				<td>
					{o.number}
				</td>
				<td>
					{o.status}
				</td>
				<td>
					{o.date}
				</td>
				<td>
					{o.recepient}
				</td>
				<td>
					{o.phone}
				</td>
				<td>
					{o.totalAmount}
				</td>
				<td>
					<Button onClick></Button>
				</td>
				<td>
					<Link to={'/order/edit/' + o.id}>Edit</Link>
				</td>
			</tr>

		);
	}
}

export default OrderTableRow;

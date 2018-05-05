import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import OrderTableRow from './partials/OrderTableRow';

import ordersService from '../../../../services/orders/ordersService';

class OrdersList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			orders: '',
			size: 16,
			page: 1,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'status',
			filterValue: 'ordered'
		};
	}

	componentDidMount () {
		ordersService
			.loadOrders(this.state)
			.then(res => {
				this.setState({orders: res.orders})
			})
			.catch(err => {
				console.log(err.responseText)
			});
	}

	render () {
		let ordersList;

		if (this.state.products !== '') {
			ordersList = this.state.orders.map(e => {
				return <OrderTableRow key={e.id} data={e}/>;
			});
		}

		return (
			<Grid>
				<Row>
					<Col sm={12}>
						<Table striped bordered condensed hover>
							<thead>
							<tr>
								<th>#</th>
								<th>Статус</th>
								<th>Последна редакция</th>
								<th>Получател</th>
								<th>Телефон</th>
								<th>Сума</th>
								<th colSpan={2}>Редакция</th>
							</tr>
							</thead>
							<tbody>
							{ordersList}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default OrdersList;

import React from 'react';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import OrderTableRow from './partials/OrderTableRow';
import OrderDetails from './partials/OrderDetails';

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
			filterValue: 'ordered',
			showDetails: false,
			orderToShowInfo: '',
			deliveryInfo: ''
		};
	}

	componentDidMount () {
		ordersService
			.loadOrders(this.state)
			.then(res => {
				this.setState({orders: res.orders});
			})
			.catch(err => {
				console.log(err.responseText);
			});
	}

	showDetails = (o, d) => {
		this.setState({
			showDetails: true,
			orderToShowInfo: o,
			deliveryInfo: d
		});
	};

	hideDetails = () => {
		this.setState({
			showDetails: false,
			orderToShowInfo: ''
		});
	};

	render () {
		let ordersList;

		if (this.state.orders !== '') {
			ordersList = this.state.orders.map(e => {
				return <OrderTableRow key={e.id} data={e} showDetails={this.showDetails} />;
			});
		}

		return (
			<Grid id="orders">
				<Row>
					<Col sm={12}>

						<OrderDetails
							visible={this.state.showDetails}
							order={this.state.orderToShowInfo}
							delivery={this.state.deliveryInfo}
							hideDetails={this.hideDetails}
						/>

						<Table striped bordered condensed hover>
							<thead>
							<tr>
								<th>#</th>
								<th>Статус</th>
								<th>Последна редакция</th>
								<th>Получател</th>
								<th>Телефон</th>
								<th>Сума</th>
								<th colSpan={3}>Редакция</th>
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

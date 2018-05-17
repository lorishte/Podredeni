import React from 'react';
import { Table } from 'react-bootstrap';
import OrderListTableHead from './OrderListTableHead';

class OrdersTable extends React.Component {
	constructor (props) {
		super(props);
	}


	render () {
		return (
			<Table striped bordered condensed hover id="admin-orders-table">
				<OrderListTableHead
					changeClass={this.props.changeClass}
					sort={this.props.sort}/>
				<tbody>
				{this.props.ordersList}
				</tbody>
			</Table>
		);
	}
}

export default OrdersTable;

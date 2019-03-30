import React from 'react';
import { Table } from 'react-bootstrap';
import OrderListTableHead from './OrderListTableHead';

class OrdersTable extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		if (this.props.loading) {return <div className="admin-loader"/>; }

		if (this.props.ordersList.length === 0) {return <h4>Няма {this.props.tabName} поръчки</h4>}

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

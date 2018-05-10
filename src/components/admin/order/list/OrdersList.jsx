import React from 'react';

import { Grid, Row, Col, Table, FormGroup } from 'react-bootstrap';

import OrderTableRow from './partials/OrderTableRow';
import OrderDetails from './partials/OrderDetails';
import FormRadioButton from '../../../common/formComponents/FormRadioButton';

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

	onCheckboxChange = (e) => {

        this.setState({filterProperty: 'status', filterValue: e.target.value}, () => {

            ordersService.loadOrders(this.state)
                .then(res => {

                    this.setState({orders: res.orders});

                }).catch(err => console.log(err));

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

						<FormGroup style={{'display': 'flex'}}>
								<FormRadioButton checked={this.state.filterValue==='ordered'} label="Not confirmed" value="ordered" onChange={this.onCheckboxChange}/>
								<FormRadioButton checked={this.state.filterValue==='confirmed'} label="Confirmed" value="confirmed" onChange={this.onCheckboxChange}/>
								<FormRadioButton checked={this.state.filterValue==='dispatched'} label="Dispatched" value="dispatched" onChange={this.onCheckboxChange}/>
								<FormRadioButton checked={this.state.filterValue==='cancelled'} label="Cancelled" value="cancelled" onChange={this.onCheckboxChange}/>
						</FormGroup>

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

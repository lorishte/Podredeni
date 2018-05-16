import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, Table, FormGroup } from 'react-bootstrap';

import { ORDER_STATUS_EN, ORDER_STATUS_BG, ELEMENTS_ON_PAGE } from '../../../../data/constants/componentConstants';

import OrderTableRow from './partials/OrderTableRow';
import OrderDetails from './partials/OrderDetails';
import FormRadioButton from '../../../common/formComponents/FormRadioButton';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import OrderListTableHead from './partials/OrderListTableHead';
import Paging from '../../../common/pagination/Paging';

import ordersService from '../../../../services/orders/ordersService';

class OrdersList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			orders: '',
			size: 10,
			page: 1,
			sortProperty: 'number',
			descending: true,
			filterProperty: 'status',
			filterValue: 'ordered',
			showDetails: false,
			orderToShowInfo: '',
			deliveryInfo: '',
			ordersCount: '',
			pagesCount: ''
		};
	}

	componentDidMount () {
		this.loadOrders();
	}

	loadOrders = () => {
		ordersService
			.loadOrders(this.state)
			.then(res => {
				let ordersCount = Number(res.ordersCount);
				let size = Number(this.state.size);

				this.setState({
					orders: res.orders,
					ordersCount: ordersCount,
					pagesCount: Math.ceil(ordersCount / size)
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, '', {
					closeButton: false,
				});
			});
	};

	sort = (sortProperty, descending) => {
		this.setState({
			sortProperty: sortProperty,
			descending: descending
		}, () => this.loadOrders());
	};

	changeClass = (sortProp, descending) => {
		if (this.state.sortProperty === sortProp &&
			this.state.descending === descending) {
			return 'btn btn-sort active';
		}

		return 'btn btn-sort';
	};

	goToPage = (page) => {
		this.setState({page: page}, () => this.loadOrders());
	};

	handleSizeChange = (e) => {
		if (e.target.value === '') return;
		this.setState({size: e.target.value}, () => this.goToPage(1));
	};

	showDetails = (o, d) => {
		this.setState({
			showDetails: true,
			orderToShowInfo: o,
			deliveryInfo: d
		});
	};

	hideDetails = () => {
		this.setState({showDetails: false, orderToShowInfo: ''});
	};

	onCheckboxChange = (e) => {
		this.setState({
			filterProperty: 'status',
			filterValue: e.target.value
		}, () => {
			this.loadOrders();
			this.goToPage(1);
		});
	};

	changeStatus = (orderId, status) => {
		console.log(orderId, status);

		ordersService
			.changeStatus(orderId, status)
			.then( () => {
				this.toastContainer.success('Успешно потвърждение.', '', {
					closeButton: false,
				});
				setTimeout(() => this.hideDetails(), 2000);
				this.loadOrders();
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, 'Грешка', {
					closeButton: false,
				});
			});
	};

	render () {
		let ordersList;

		if (this.state.orders !== '') {
			ordersList = this.state.orders.map(e => {
				return <OrderTableRow key={e.id} data={e} showDetails={this.showDetails}/>;
			});
		}

		let radioButtons = [];

		for (let i = 0; i < 4; i++) {
			radioButtons.push(
				<Col xs={6} sm={3} key={i}>
					<FormRadioButton
						value={ORDER_STATUS_EN[i]}
						checked={this.state.filterValue === ORDER_STATUS_EN[i]}
						label={ORDER_STATUS_BG[i]}
						onChange={this.onCheckboxChange}/>
				</Col>);
		}

		return (
			<Grid id="orders">
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Row>
					<Col xs={12}>
						<Row>

							<OrderDetails
								visible={this.state.showDetails}
								order={this.state.orderToShowInfo}
								delivery={this.state.deliveryInfo}
								hideDetails={this.hideDetails}
								changeStatus={this.changeStatus}/>

							<Col xs={12}>
								<FormGroup className="filters-container">
									{radioButtons}
								</FormGroup>
							</Col>

							<Col xs={4} sm={3} md={2}>
								<FormSelectField
									name="size"
									value={this.state.size}
									optionsList={ELEMENTS_ON_PAGE}
									required={false}
									onChange={this.handleSizeChange}/>
							</Col>
						</Row>

						<Table striped bordered condensed hover>
							<OrderListTableHead
								changeClass={this.changeClass}
								sort={this.sort}/>
							<tbody>
							{ordersList}
							</tbody>
						</Table>
					</Col>

				</Row>

				{this.state.size !== '0' && this.state.ordersCount !== 0 &&
				<Paging
					active={Number(this.state.page)}
					pagesCount={Number(this.state.pagesCount)}
					goToPage={this.goToPage}/>}
			</Grid>
		);
	}
}

export default OrdersList;

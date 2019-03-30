import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, Table, FormGroup, Tab, Tabs } from 'react-bootstrap';

import OrdersTable from './partials/OrdersTable';
import OrderTableRow from './partials/OrderTableRow';
import OrderDetails from './partials/OrderDetails';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import Paging from '../../../common/pagination/Paging';

import ordersService from '../../../../services/orders/ordersService';

import {
	ORDER_STATUS_EN,
	ORDER_STATUS_BG,
	ELEMENTS_ON_PAGE,
	TOASTR_MESSAGES
} from '../../../../data/constants/componentConstants';

class OrdersList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			orders: [],
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
			pagesCount: '',

			loading: true
		};
	}

	componentDidMount () {
		this.loadOrders();
	}

	loadOrders = () => {

		this.setState({orders: []}, () => {
			ordersService
				.loadOrders(this.state)
				.then(res => {

					let ordersCount = Number(res.ordersCount);
					let size = Number(this.state.size);

					this.setState({
						orders: res.orders,
						ordersCount: ordersCount,
						pagesCount: Math.ceil(ordersCount / size),
						loading: false
					});
				})
				.catch(err => {
					this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
						closeButton: false,
					});
				});
		});
	};

	sort = (sortProperty, descending) => {
		this.setState({
			sortProperty: sortProperty,
			descending: descending,
			loading: true
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
		this.setState({page: page, loading: true}, () => this.loadOrders());
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

	handleSelect = (key) => {

		this.setState({orders: []});

		this.setState({
			filterProperty: 'status',
			filterValue: ORDER_STATUS_EN[key],
			loading: true
		}, () => {
			this.loadOrders();
			this.goToPage(1);
		});
	};

	changeStatus = (orderId, status) => {
		ordersService
			.changeStatus(orderId, status)
			.then(() => {
				this.toastContainer.success('Поръчката е обработена.', '', {
					closeButton: false,
				});
				setTimeout(() => this.hideDetails(), 2000);

				// Filter orders, not reload, to save some time
				let correctedOrdersList = this.state.orders.filter(e => e.id !== orderId);
				this.setState({orders: correctedOrdersList});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, 'Грешка', {
					closeButton: false,
				});
			});
	};

	render () {

		let ordersList = [];

		if (this.state.orders.length > 0) {
			ordersList = this.state.orders.map(e => {
				return <OrderTableRow key={e.id}
				                      data={e}
				                      showDetails={this.showDetails}/>;
			});
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
						</Row>

						<Row>

							<Tabs defaultActiveKey={0}
							      id="order-list-tabs"
							      onSelect={this.handleSelect}>

								<Row>
									<Col xs={4} sm={3} md={2}>
										<FormSelectField
											name="size"
											value={this.state.size}
											optionsList={ELEMENTS_ON_PAGE}
											required={false}
											onChange={this.handleSizeChange}/>
									</Col>
								</Row>

								<Tab eventKey={0}
								     title={<span>
									     <i className="fa fa-arrow-down text-info" aria-hidden="true"/>
									     <span className="text-hidden-xs">Получени</span>
									     </span>}
								     disabled={this.state.loading}>

									<OrdersTable
										changeClass={this.changeClass}
										sort={this.sort}
										ordersList={ordersList}
										tabName="получени"
										loading={this.state.loading}/>
								</Tab>

								<Tab eventKey={1} title={<span>
									     <i className="fa fa-check text-success" aria-hidden="true"/>
									     <span className="text-hidden-xs">Потвърдени</span>
									     </span>}
								     disabled={this.state.loading}>

									<OrdersTable
										changeClass={this.changeClass}
										sort={this.sort}
										ordersList={ordersList}
										loading={this.state.loading}
										tabName="потвърдени"/>
								</Tab>

								<Tab eventKey={2} title={<span>
									     <i className="fa fa-arrow-up  text-warning" aria-hidden="true"/>
									     <span className="text-hidden-xs">Изпратени</span>
									     </span>}
								     disabled={this.state.loading}>

									<OrdersTable
										changeClass={this.changeClass}
										sort={this.sort}
										ordersList={ordersList}
										loading={this.state.loading}
										tabName="изпратени"/>
								</Tab>

								<Tab eventKey={3} title={<span>
									     <i className="fa fa-close text-danger" aria-hidden="true"/>
									     <span className="text-hidden-xs">Отказани</span>
									     </span>}
								     disabled={this.state.loading}>

									<OrdersTable
										changeClass={this.changeClass}
										sort={this.sort}
										ordersList={ordersList}
										loading={this.state.loading}
										tabName="отказани"/>
								</Tab>

								{this.state.size !== '0' && this.state.ordersCount !== 0 &&
								<Paging
									active={Number(this.state.page)}
									pagesCount={Number(this.state.pagesCount)}
									goToPage={this.goToPage}/>}
							</Tabs>
						</Row>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default OrdersList;

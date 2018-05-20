import React from 'react';

import { Grid, Row, Col, Label } from 'react-bootstrap';

// Helpers
import { confirmAlert } from 'react-confirm-alert';

// Partials
import CartProductsTable from './products/CartProductsTable';
import OrderDetailsForm from './orderDetails/OrderDetailsForm';
import ReviewOrder from './reviewOrder/ReviewOrder';

import orderService from '../../../services/orders/ordersService';

import { BUTTONS_BG, CONFIRM_DIALOGS } from '../../../data/constants/componentConstants';


class Cart extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			orderDetails: {},
			productsView: true,
			orderDetailsView: false,
			reviewView: false
		};
	}

	componentDidMount () {
		let storedOrderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

		if (storedOrderDetails === null) {
			storedOrderDetails = {
				recipientInfo: {
					firstName: '',
					lastName: '',
					email: '',
					phone: ''
				},
				ekontDetails: {
					country: '',
					city: '',
					officeCode: 0,
					officeName: '',
					address: ''
				},
				addressDetails: {
					country: '',
					city: '',
					postalCode: '',
					street: '',
					streetNo: '',
					district: '',
					block: '',
					entrance: '',
					floor: '',
					apartment: ''
				},
				comment: '',
				toAddress: true
			};
		}

		this.setState({orderDetails: storedOrderDetails});
		this.loadProducts();
	}

	loadProducts = () => {
		let addedProducts = JSON.parse(sessionStorage.getItem('products'));
		if (addedProducts === null) return;
		this.setState({products: addedProducts});
	};

	updateInfo = (stateProp, data) => {
		this.setState({[stateProp]: data}, () => {
			sessionStorage.setItem([stateProp], JSON.stringify(this.state[stateProp]));

			if (stateProp === 'products') {
				this.props.history.push('/cart'); // to refresh products count in header
				this.props.history.go(-1); // step back to fix history logic
			}
		});
	};

	cancelOrder = () => {
		sessionStorage.removeItem('products');
		sessionStorage.removeItem('orderDetails');
		this.props.history.push('/home')
	};

	confirmCancel = () => {
		confirmAlert({
			title: '',
			message: CONFIRM_DIALOGS.deleteOrder,
			buttons: [{
				label: BUTTONS_BG.yes,
				onClick: () => this.cancelOrder()
			},
				{ label: BUTTONS_BG.no }]
		});
	};

	showProducts = () => {
		this.setState({
			productsView: true,
			orderDetailsView: false,
			reviewView: false
		});
	};

	showDeliveryDetailsForm = () => {
		this.setState({
			productsView: false,
			orderDetailsView: true,
			reviewView: false
		});
	};

	showReview = () => {
		this.setState({
			productsView: false,
			orderDetailsView: false,
			reviewView: true
		});
	};

	submitOrder = () => {
		orderService
			.addDeliveryData(this.state.orderDetails)
			.then(res => {
				let deliveryId = res.deliveryDataId;
				let products = generateOrderData(this.state.products);

				orderService
					.addOrder(deliveryId, products)
					.then(res => {
						sessionStorage.removeItem('products');
						this.props.history.push('/order/confirmation');
					});
			})
			.catch(err => {
				this.props.history.push('/error');
			});

	};

	render () {
		return (
			<Grid id="cart">

				<Row>
					<Col xs={12}>
						<p>
							<span className={this.state.productsView ? '' : 'text-grey'}>Преглед и редакция</span>
							<span className="text-grey">&nbsp; &#10231; &nbsp;</span>
							<span className={this.state.orderDetailsView ? '' : 'text-grey'}>Данни за доставка</span>
							<span className="text-grey">&nbsp; &#10231; &nbsp;</span>
							<span className={this.state.reviewView ? '' : 'text-grey'}>Потвърждение</span>
						</p>
					</Col>
				</Row>
				<Row>
					{this.state.products.length > 0 && this.state.productsView &&
						<Col xs={12}>
							<h2 className="cart-view-name">
								<Label>Стъпка 1</Label> Преглед и редакция
							</h2>
							<CartProductsTable
								products={this.state.products}
								onChange={this.updateInfo}
								continue={this.showDeliveryDetailsForm}
								cancel={this.confirmCancel}
							/>
						</Col>
					}

					{this.state.products.length === 0 && this.state.productsView &&
						<Col xs={12}>
							<h3>Нямате добавени продукти</h3>
						</Col>
					}

					{this.state.orderDetailsView &&
						<Col xs={12}>
							<h2 className="cart-view-name">
								<Label>Стъпка 2</Label> Данни за доставка
							</h2>
							<OrderDetailsForm
								data={this.state.orderDetails}
								onChange={this.updateInfo}
								goBack={this.showProducts}
								continue={this.showReview}
								cancel={this.confirmCancel}/>
						</Col>
					}

					{this.state.reviewView &&
					<Col xs={12}>
						<h2 className="cart-view-name">
							<Label>Стъпка 3</Label>Потвърждение
						</h2>
						<ReviewOrder
							products={this.state.products}
							orderDetails={this.state.orderDetails}
							goBack={this.showDeliveryDetailsForm}
							continue={this.submitOrder}
							cancel={this.confirmCancel}
						/>
					</Col>
					}
				</Row>
			</Grid>
		);
	}
}

export default Cart;

function generateOrderData (products) {
	return products.map(e => {
			return {
				ProductId: e.id,
				Quantity: e.quantity,
				Price: e.price
			};
		}
	);
}
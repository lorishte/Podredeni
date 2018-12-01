import React from 'react';

import { Grid, Row, Col, Label, Panel } from 'react-bootstrap';

// Helpers
import { confirmAlert } from 'react-confirm-alert';
import utils from '../../../utils/utils';

// Partials
import CartProductsTable from './products/CartProductsTable';
import OrderDetailsForm from './orderDetails/OrderDetailsForm';
import ReviewOrder from './reviewOrder/ReviewOrder';

// Services
import orderService from '../../../services/orders/ordersService';
import productService from '../../../services/products/productsService';

// Constants
import { BUTTONS_BG, CONFIRM_DIALOGS, CART } from '../../../data/constants/componentConstants';

class Cart extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			productsCount: JSON.parse(sessionStorage.getItem('products')).length,
			orderDetails: {},
			productsView: true,
			orderDetailsView: false,
			reviewView: false
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);

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

		if (this.props.location.goToOrderDetailsView) {

			this.showDeliveryDetailsForm();
		}
	}

	loadProducts = () => {
		let addedProducts = JSON.parse(sessionStorage.getItem('products'));

		console.log(222)

		if (addedProducts === null) return;

		for (let i = 0; i < addedProducts.length; i++) {
			productService
				.getProduct(addedProducts[i].id)
				.then(res => {
					let product = res.product;
					product.quantity = addedProducts[i].quantity;
					product.image = product.images.reverse()[0];

					this.setState({products: [...this.state.products, product]});

				})
				.catch(err => {
					console.log(err);
				})
		}
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
		this.props.history.push('/home');
	};

	confirmCancel = () => {
		confirmAlert({
			title: '',
			message: CONFIRM_DIALOGS.deleteOrder,
			buttons: [{
				label: BUTTONS_BG.yes,
				onClick: () => this.cancelOrder()
			},
				{label: BUTTONS_BG.no}]
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

		let isAdmin = sessionStorage.getItem('role') === 'admin';

		return (
			<Grid id="cart">
				{this.state.products.length > 0 &&
				<Col className="text-right">
					<button className={isAdmin ? 'btn btn-default sm' : 'btn-custom primary sm'}
					        onClick={this.confirmCancel}>{BUTTONS_BG.cancel}</button>
				</Col>
				}

				<Panel>

					<div className="tabs">
						<span className={this.state.productsView ? 'tab active' : 'tab'}>{CART.edit}</span>
						<span className={this.state.orderDetailsView ? 'tab active' : 'tab'}>{CART.deliveryData}</span>
						<span className={this.state.reviewView ? 'tab active' : 'tab'}>{CART.confirm}</span>
					</div>

					<Panel.Body>
						{this.state.products.length === this.state.productsCount && this.state.productsView &&
						<Col xs={12}>
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
							<h3>{CART.noProductAdded}</h3>
						</Col>
						}

						{this.state.orderDetailsView &&
						<Col xs={12}>
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
							<ReviewOrder
								products={this.state.products}
								orderDetails={this.state.orderDetails}
								goBack={this.showDeliveryDetailsForm}
								continue={this.submitOrder}
								cancel={this.confirmCancel}
							/>
						</Col>
						}
					</Panel.Body>


					{this.state.products.length > 0 &&
					<small className="info-text">
						ВАЖНО!<br/>
						Доставката се осъществява до 2 дни след направена заявка по куриерска фирма Еконт.
						Разходите са за сметка на получателя, като при заявка над 60 лв, разходите са за
						наша
						сметка. Заплащането се извършва с наложен платеж.
					</small>
					}

				</Panel>
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
				Price: utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2)
			};
		}
	);
}
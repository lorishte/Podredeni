import React from 'react';

import { Grid, Row, Col, Label, Panel } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';
import { confirmAlert } from 'react-confirm-alert';

// Helpers
import utils from '../../../utils/utils';

// Partials
import CartProductsTable from './products/CartProductsTable';
import ValidPromo from './products/ValidPromo';
import OrderDetailsForm from './orderDetails/OrderDetailsForm';
import ReviewOrder from './reviewOrder/ReviewOrder';

// Services
import orderService from '../../../services/orders/ordersService';
import productService from '../../../services/products/productsService';
import productPromoService from '../../../services/promos/productPromosService';

// Constants
import { BUTTONS_BG, CONFIRM_DIALOGS, CART, TOASTR_MESSAGES } from '../../../data/constants/componentConstants';

class Cart extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			promotionProducts: [],
			productsCount: null,
			orderDetails: {},
			productsView: true,
			validPromoView: false,
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

		if (addedProducts === null) {
			this.updateProductsCount([]);
			return;
		}

		this.updateProductsCount(addedProducts);

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
				});
		}
	};

	updateInfo = (stateProp, data) => {

		this.setState({[stateProp]: data}, () => {

			sessionStorage.setItem([stateProp], JSON.stringify(this.state[stateProp]));

			if (stateProp === 'products') {
				this.updateProductsCount(data);
				this.props.history.push('/cart'); // to refresh products count in header
				this.props.history.go(-1); // step back to fix history logic
			}
		});
	};

	checkPromotion = (promoCode) => {

		let stateCopy = Object.assign({}, this.state);

		productPromoService
			.checkPromotion(promoCode, stateCopy)
			.then(res => {
				console.log(res);
				let promoProducts = res;

				promoProducts.cart.forEach(e => {
					e.image = e.imageUrl;
				});

				this.setState({promotionProducts: promoProducts}, () => this.showView('validPromoView'));

				this.toastContainer.success(TOASTR_MESSAGES.validPromoCode, '', {
					closeButton: true,
				});
			})
			.catch(err => {
				console.log(err);
				this.toastContainer.error(TOASTR_MESSAGES[err.responseJSON], '', {
					closeButton: true,
				});
			});
	};

	updateProductsCount = (productsArr) => {
		this.setState({productsCount: productsArr.length});
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

	showView = (view) => {
		this.setState({
			productsView: false,
			validPromoView: false,
			orderDetailsView: false,
			reviewView: false
		}, () => this.setState({[view]: true}));
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

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				{/*// No products added*/}
				{this.state.productsCount === 0 && this.state.productsView &&
				<Col xs={12} className="text-center">
					<h3>{CART.noProductAdded}</h3>
				</Col>
				}

				{this.state.productsCount !== 0 &&

				// Cancel Button
				<Col className="text-right">
					<button className={isAdmin ? 'btn btn-default sm' : 'btn-custom primary sm'}
					        onClick={this.confirmCancel}>{BUTTONS_BG.cancel}
					</button>
				</Col>
				}

				{this.state.productsCount !== 0 &&

				<Panel>

					{/*// Tabs*/}
					<div className="tabs">
						<span className={this.state.productsView || this.state.validPromoView ? 'tab active' : 'tab'}>{CART.edit}</span>
						<span className={this.state.orderDetailsView ? 'tab active' : 'tab'}>{CART.deliveryData}</span>
						<span className={this.state.reviewView ? 'tab active' : 'tab'}>{CART.confirm}</span>
					</div>


					<Panel.Body>

						{/*// Loader*/}
						{this.state.products.length !== this.state.productsCount
						&& this.state.productsView
						&&
						<div className="loader"/>
						}

						{/*// Products table*/}
						{this.state.products.length === this.state.productsCount
						&& this.state.productsView
						&&

						<Col xs={12}>
							<CartProductsTable
								products={this.state.products}
								onChange={this.updateInfo}
								checkPromotion={this.checkPromotion}
								continue={() => this.showView('orderDetailsView')}/>
						</Col>
						}

						{/*// Validated Promo*/}
						{this.state.validPromoView &&
						<Col xs={12}>
							<ValidPromo
								products={this.state.promotionProducts}
								goBack={() => this.showView('productsView')}
								continue={() => this.showView('orderDetailsView')}/>
						</Col>
						}


						{/*// Order details*/}
						{this.state.orderDetailsView &&
						<Col xs={12}>
							<OrderDetailsForm
								data={this.state.orderDetails}
								onChange={this.updateInfo}
								goBack={() => this.showView('productsView')}
								continue={() => this.showView('reviewView')}/>
						</Col>
						}


						{/*// Order review*/}
						{this.state.reviewView &&
						<Col xs={12}>
							<ReviewOrder
								products={this.state.products}
								orderDetails={this.state.orderDetails}
								goBack={() => this.showView('orderDetailsView')}
								continue={this.submitOrder}/>
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
				}

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
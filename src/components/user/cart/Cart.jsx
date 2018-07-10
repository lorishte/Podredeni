import React from 'react';

import { Grid, Row, Col, Label, Panel } from 'react-bootstrap';

// Helpers
import { confirmAlert } from 'react-confirm-alert';

// Partials
import CartProductsTable from './products/CartProductsTable';
import OrderDetailsForm from './orderDetails/OrderDetailsForm';
import ReviewOrder from './reviewOrder/ReviewOrder';

import orderService from '../../../services/orders/ordersService';

import { BUTTONS_BG, CONFIRM_DIALOGS, CART } from '../../../data/constants/componentConstants';

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

        if(this.props.location.goToOrderDetailsView) {

            this.showDeliveryDetailsForm();
        }
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
		return (
			<Grid id="cart">

				<Row>
					<Col xs={12}>
						<p>
							<span className={this.state.productsView ? '' : 'text-grey'}>{CART.edit}</span>
							<span className="text-grey">&nbsp; &#10231; &nbsp;</span>
							<span className={this.state.orderDetailsView ? '' : 'text-grey'}>{CART.deliveryData}</span>
							<span className="text-grey">&nbsp; &#10231; &nbsp;</span>
							<span className={this.state.reviewView ? '' : 'text-grey'}>{CART.confirm}</span>
						</p>
					</Col>
				</Row>


				<Row>
					<Col xs={12}>
					<Panel>
						{this.state.products.length > 0 && this.state.productsView &&
						<Col xs={12}>
							<h2 className="cart-view-name">
								<Label>{CART.step1}</Label> {CART.edit}
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
							<h3>{CART.noProductAdded}</h3>
						</Col>
						}

						{this.state.orderDetailsView &&
						<Col xs={12}>
							<h2 className="cart-view-name">
								<Label>{CART.step2}</Label> {CART.deliveryData}
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
								<Label>{CART.step3}</Label>{CART.confirm}
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



						<Panel.Body>
							{this.state.products.length > 0 &&
							<small className="info-text">
								ВАЖНО!<br/>
								Доставката се осъществява до 2 дни след направена заявка по куриерска фирма Еконт.
								Разходите са за сметка на получателя, като при заявка над 60 лв, разходите са за наша
								сметка. Заплащането се извършва с наложен платеж.
							</small>
							}
						</Panel.Body>

					</Panel>
					</Col>

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
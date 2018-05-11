import React from 'react';
import { Link } from 'react-router-dom';

// Helpers
import { Grid, Row, Col } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

// Partials
import CartProductsTable from './products/CartProductsTable';
import OrderDetailsForm from './orderDetails/OrderDetailsForm';
import ReviewOrder from './reviewOrder/ReviewOrder';

import orderService from '../../../services/orders/ordersService';

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
					firstName: 'Лора',
					lastName: 'Милчева',
					email: 'lori@abv.bg',
					phone: '0887 718 788'
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
					city: 'София',
					postalCode: '1632',
					street: 'Тодор Александров',
					streetNo: '40',
					district: 'Младост',
					block: '520',
					entrance: 'Б',
					floor: '8',
					apartment: '132'
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
		});
	};

	cancelOrder = () => {
		sessionStorage.removeItem('products');
		sessionStorage.removeItem('orderDetails');
		this.props.history.push('/products')
	};

	confirmCancel = () => {
		confirmAlert({
			title: '',
			message: 'Сигурни ли сте, че искате да откажете поръчката?',
			buttons: [{
				label: 'ДА',
				onClick: () => this.cancelOrder()
			},
				{ label: 'НЕ' }]
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
						console.log(res);
						sessionStorage.removeItem('products');
						this.props.history.push('/order/confirmation');
					});
			})
			.catch(err => console.log(err));

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
							<span className="text-grey">Стъпка 1.</span> Преглед и редакция
						</h2>
						<CartProductsTable
							products={this.state.products}
							onChange={this.updateInfo}
							continue={this.showDeliveryDetailsForm}
							cancelOrder={this.confirmCancel}
						/>
					</Col>
					}

					{this.state.products.length === 0 && this.state.productsView &&
					<Col xs={12}>
						<h2 className="cart-view-name">
							<span className="text-grey">Стъпка 1.</span> Преглед и редакция
						</h2>
						<h3>Нямате добавени продукти</h3>
					</Col>
					}

					{this.state.orderDetailsView &&
					<Col xs={12}>
						<h2 className="cart-view-name">
							<span className="text-grey">Стъпка 2.</span> Данни за доставка
						</h2>
						<OrderDetailsForm
							data={this.state.orderDetails}
							onChange={this.updateInfo}
							goBack={this.showProducts}
							continue={this.showReview}
							cancelOrder={this.confirmCancel}/>
					</Col>
					}

					{this.state.reviewView &&
					<Col xs={12}>
						<h2 className="cart-view-name">
							<span className="text-grey">Стъпка 3.</span> Потвърждение
						</h2>
						<ReviewOrder
							products={this.state.products}
							orderDetails={this.state.orderDetails}
							goBack={this.showDeliveryDetailsForm}
							continue={this.submitOrder}
							cancelOrder={this.confirmCancel}
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
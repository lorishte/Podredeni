import React from 'react';
import {Link} from 'react-router-dom';

// Helpers
import { Grid, Row, Col, Breadcrumb } from 'react-bootstrap';

// Partials
import CartProductsTable from './products/CartProductsTable';
import OrderDetailsForm from './orderDetails/OrderDetailsForm';
import ReviewOrder from './reviewOrder/ReviewOrder';

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
					email: '',
					firstName: '',
					lastName: '',
					phone: ''
				},
				ekontDetails: {
					address: '',
					city: '',
					country: '',
					officeCode: '',
					officeName: ''
				},
				addressDetails: {
					apartment: '',
					block: '',
					city: '',
					country: '',
					district: '',
					entrance: '',
					floor: '',
					postalCode: '',
					street: '',
					streetNo: ''
				},
				comment: '',
				toAddress: true
			}
		}

		this.setState({ orderDetails: storedOrderDetails });
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
		console.log('from submit');
		console.log(this.state.products);
	};

	render () {
		return (
			<Grid id="cart">
				<Breadcrumb>
					<Link to="/" className="breadcrumb-item">Начало</Link>
					<Link to="/cart" className="breadcrumb-item">Кошница</Link>
				</Breadcrumb>
				<Row>
					{this.state.products.length > 0 && this.state.productsView &&
					<Col xs={12}>
						<h2 className="cart-view-name">
							<span className="text-grey">Стъпка 1.</span> Преглед на кошницата
						</h2>
						<CartProductsTable
							products={this.state.products}
							onChange={this.updateInfo}
							continue={this.showDeliveryDetailsForm}
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
							<span className="text-grey">Стъпка 2.</span> Въвеждане на данни за доставка
						</h2>
						<OrderDetailsForm
							data={this.state.orderDetails}
							onChange={this.updateInfo}
							goBack={this.showProducts}
							continue={this.showReview}/>
					</Col>
					}

					{this.state.reviewView &&
					<Col xs={12}>
						<h2 className="cart-view-name">
							<span className="text-grey">Стъпка 3.</span> Преглед и потвърждение
						</h2>
						<ReviewOrder
							products={this.state.products}
							orderDetails={this.state.orderDetails}
							goBack={this.showDeliveryDetailsForm}
							continue={this.submitOrder}
						/>
					</Col>
					}
				</Row>
			</Grid>
		);
	}
}

export default Cart;

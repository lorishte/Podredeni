import React from 'react';

// Helpers
import { Grid, PageHeader, Table, Tabs, Tab, Row, Button, Label, Col } from 'react-bootstrap';

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
		console.log(storedOrderDetails);

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
		console.log(storedOrderDetails);

		this.setState({ orderDetails: storedOrderDetails });
		this.loadProducts();
	}


	loadProducts = () => {
		let addedProducts = JSON.parse(sessionStorage.getItem('products'));
		if (addedProducts === null) return;
		this.setState({products: addedProducts});
	};

	updateInfo = (stateProp, data) => {
		console.log(stateProp);
		this.setState({[stateProp]: data}, () => {
			console.log(this.state[stateProp]);
			sessionStorage.setItem('orderDetails', JSON.stringify(this.state.orderDetails));
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
		console.log('submitting')
	};

	render () {
		return (
			<Grid id="cart">

				<PageHeader>
					My Cart
				</PageHeader>

				<Row>
					{this.state.products.length > 0 && this.state.productsView &&
					<Col xs={12}>
						<h2><span className="text-grey">Step 1.</span> Check cart</h2>
						<CartProductsTable
							products={this.state.products}
							onChange={this.updateInfo}
							continue={this.showDeliveryDetailsForm}
						/>

					</Col>
					}

					{this.state.products.length === 0 && this.state.productsView &&
					<Col xs={12}>
						<h3>Your cart is empty.</h3>
					</Col>
					}

					{this.state.orderDetailsView &&
					<Col xs={12}>
						<h2><span className="text-grey">Step 2.</span> Order details</h2>
						<OrderDetailsForm
							data={this.state.orderDetails}
							onChange={this.updateInfo}
							goBack={this.showProducts}
							continue={this.showReview}/>
					</Col>
					}

					{this.state.reviewView &&
					<Col xs={12}>
						<h2><span className="text-grey">Step 3.</span> Review and confirm</h2>
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

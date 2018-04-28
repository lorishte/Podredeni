import React from 'react';

import { Grid, PageHeader, Table, Tabs, Tab, Row, Button, Label } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import CartProductsTable from './products/CartProductsTable';
import OrderDetails from './orderDetails/OrderDetails';

class Cart extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			orderDetails: {},
			key: 2
		};
	}

	componentDidMount () {
		this.loadProducts();
	}

	loadProducts = () => {
		let addedProducts = JSON.parse(sessionStorage.getItem('products'));
		if (addedProducts === null) return;
		this.setState({products: addedProducts});
	};

	deleteItem = (id) => {
		confirmAlert({
			title: 'Please confirm!',
			message: 'Are you sure you want to delete this item?',
			buttons: [
				{
					label: 'Delete',
					onClick: () => {
						this.setState({
							products: this.state.products.filter((e) => e.product.id !== id)
						});

						this.removeFromSession(id);
					}
				},
				{
					label: 'Cancel'
				}
			]
		});
	};

	removeFromSession = (id) => {
		let productsInStorage = JSON.parse(sessionStorage.getItem('products'));
		let filteredProducts = productsInStorage.filter((e) => e.product.id !== id);
		sessionStorage.products = JSON.stringify(filteredProducts);
	};

	editItem = (id, newQuantity) => {
		console.log(222);
		let addedProducts = this.state.products;
		addedProducts.map((e) => {
			if (e.product.id === id) {
				e.quantity = newQuantity;
			}
		});

		sessionStorage.products = JSON.stringify(addedProducts);
		this.setState({products: addedProducts});
	};

	handleSelect = (tab) => {
		this.setState({key: Number(tab)});
	};

	render () {
		return (
			<Grid id="cart">
				<PageHeader>
					My Cart
				</PageHeader>
				<Row>
					<Tabs activeKey={this.state.key}
					      onSelect={this.handleSelect}
					      id="cart-tabs">

						<Tab eventKey={1} title="Cart">
							<h3><span className="text-grey">Step 1.</span> Check cart</h3>
							{this.state.products.length > 0 &&
								<div>
									<CartProductsTable
										products={this.state.products}
										totalSum={this.state.sum}
										deleteItem={this.deleteItem}
										editItem={this.editItem}
									/>
									<Button onClick={() => this.handleSelect(2)}>Continue</Button>
								</div>
							}
							{this.state.products.length === 0 &&
							<h3>Your cart is empty.</h3>}
						</Tab>

						<Tab eventKey={2} title="Order details">
							<h3><span className="text-grey">Step 2.</span> Order details</h3>
							<OrderDetails/>
						</Tab>

						<Tab eventKey={3} title="Confirm">
							<h3><span className="text-grey">Step 3.</span> Review and confirm</h3>
						</Tab>
					</Tabs>
				</Row>

			</Grid>
		);
	}
}

export default Cart;

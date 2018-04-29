import React from 'react';

// Helpers
import { Grid, PageHeader, Table, Tabs, Tab, Row, Button, Label } from 'react-bootstrap';

// Partials
import CartProductsTable from './products/CartProductsTable';
import OrderDetails from './orderDetails/OrderDetails';


class Cart extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			orderDetails: {},
			activeTabKey: 2
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

	updateProducts = (products) => {
		this.setState({products: products});
	};

	handleSelectTab = (tab) => {
		this.setState({activeTabKey: Number(tab)});
	};

	render () {
		return (
			<Grid id="cart">
				<PageHeader>
					My Cart
				</PageHeader>
				<Row>
					<Tabs activeKey={this.state.activeTabKey}
					      onSelect={this.handleSelectTab}
					      id="cart-tabs">

						<Tab eventKey={1} title="Cart">
							<h3><span className="text-grey">Step 1.</span> Check cart</h3>
							{this.state.products.length > 0 &&
							<div>
								<CartProductsTable
									products={this.state.products}
									onProductsUpdate={this.updateProducts}
								/>
								<Button onClick={() => this.handleSelectTab(2)}>Continue</Button>
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

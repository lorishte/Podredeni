import React from 'react';

// Helpers
import { Grid, PageHeader, Table, Tabs, Tab, Row, Button, Label } from 'react-bootstrap';

// Partials
import CartProductsTable from './products/CartProductsTable';
import OrderDetailsForm from './orderDetails/OrderDetailsForm';


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

	updateInfo = (stateProp, data) => {
		console.log(stateProp);
		this.setState({[stateProp]: data}, () => {
			console.log(this.state[stateProp]);
		});
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
							<h2><span className="text-grey">Step 1.</span> Check cart</h2>
							{this.state.products.length > 0 &&
								<div>
									<CartProductsTable
										products={this.state.products}
										onChange={this.updateInfo}
									/>
									<Button onClick={() => this.handleSelectTab(2)}>Continue</Button>
								</div>
							}
							{this.state.products.length === 0 &&
								<h3>Your cart is empty.</h3>
							}
						</Tab>

						<Tab eventKey={2} title="Order details">
							<h2><span className="text-grey">Step 2.</span> Order details</h2>
							<OrderDetailsForm onChange={this.updateInfo}/>
						</Tab>

						<Tab eventKey={3} title="Confirm">
							<h2><span className="text-grey">Step 3.</span> Review and confirm</h2>
						</Tab>
					</Tabs>
				</Row>

			</Grid>
		);
	}
}

export default Cart;

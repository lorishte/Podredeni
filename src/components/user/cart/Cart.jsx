import React from 'react';

import { Grid, PageHeader, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import CartProductRow from './partials/cartProductRow';

class Cart extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			sum: 0
		};
	}

	componentDidMount () {
		this.loadProducts();
	}

	componentWillReceiveProps (props) {
		console.log(this.props)
	}

	loadProducts = () => {
		let addedProducts = JSON.parse(sessionStorage.getItem('products'));
		if (addedProducts === null) return;
		this.setState({products: addedProducts});
	};

	calculateTotalSum = () => {
		let sum = 0;

		this.state.products.map(e => {
			sum += e.product.price * e.quantity;
		});

		return sum.toFixed(2);
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

	render () {
		return (
			<Grid id="cart">
				<PageHeader>
					My Cart
				</PageHeader>
				<Table responsive>
					<thead>
					<tr>
						<th>Product No</th>
						<th>Product name</th>
						<th>Quantity</th>
						<th>Product price</th>
						<th>Sum</th>
						<th>Edit</th>
					</tr>
					</thead>

					<tbody>
					{this.state.products.length > 0 &&
					this.state.products.map((e, i) => {
						return <CartProductRow
							key={e.product.id}
							index={i + 1}
							data={e.product}
							quantity={e.quantity}
							delete={this.deleteItem}
							edit={this.editItem}/>;
					})
					}
					</tbody>

					<tfoot>
					{this.state.products.length > 0 &&
					<tr className="bg-info">
						<th colSpan={4}>Total sum</th>
						<th colSpan={2}>{this.calculateTotalSum()}</th>
					</tr>}
					</tfoot>

				</Table>
			</Grid>
		);
	}
}

export default Cart;

import React from 'react';

// Helpers
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

// Partials
import TableHead from './TableHead';
import CartProductRow from './cartProductRow';


class CartProductsTable extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: this.props.products,
			totalSum: 0
		};
	}

	componentDidMount () {
		this.calculateTotalSum();
	}

	deleteItem = (id) => {
		confirmAlert({
			title: 'Please confirm!',
			message: 'Are you sure you want to delete this item?',
			buttons: [
				{label: 'Delete',
					onClick: () => {
						this.setState({
							products: this.state.products.filter((e) => e.product.id !== id)
						}, () => {
							this.calculateTotalSum();
							this.removeFromSession(id);
							this.props.onProductsUpdate(this.state.products);
						});
					}
				},
				{label: 'Cancel'}
			]
		});
	};

	removeFromSession = (id) => {
		let productsInStorage = JSON.parse(sessionStorage.getItem('products'));
		let filteredProducts = productsInStorage.filter((e) => e.product.id !== id);
		sessionStorage.products = JSON.stringify(filteredProducts);
	};

	editItem = (id, newQuantity) => {
		let productsList = this.state.products;
		productsList.map((e) => {
			if (e.product.id === id) {
				e.quantity = newQuantity;
			}
		});

		sessionStorage.products = JSON.stringify(productsList);
		this.setState({products: productsList}, () => {
			this.props.onProductsUpdate(this.state.products);
			this.calculateTotalSum();
		});
	};

	calculateTotalSum = () => {
		let sum = 0;

		this.state.products.map(e => {
			sum += e.product.price * e.quantity;
		});

		this.setState({totalSum: sum.toFixed(2)});
	};

	render () {

		if (this.state.products.length > 0){
			return (
				<Table responsive>

					<TableHead/>

					<tbody>

					{this.state.products.map((e, i) => {
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
						<tr className="lead">
							<th colSpan={6} className="text-right">Total sum</th>
							<th className="text-right">{this.state.totalSum}</th>
						</tr>
					</tfoot>

				</Table>
			)
		}
		return null
	}
}

export default CartProductsTable;

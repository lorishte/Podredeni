import React from 'react';

// Helpers
import { Table, Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

// Partials
import TableHead from './partials/TableHead';
import CartProductRow from './partials/CartProductRow';

class CartProductsTable extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			totalSum: 0
		};
	}

	componentDidMount () {
		this.calculateTotalSum();
	}

	confirmDeletion = (id) => {
		confirmAlert({
			title: '',
			message: 'Are you sure you want to delete this item?',
			buttons: [{
				label: 'Delete',
				onClick: () => this.deleteItem(id)
			},
				{label: 'Cancel'}]
		});
	};

	deleteItem = (id) => {
		let correctedProducts = this.props.products.filter(e => e.id !== id);
		this.updateParent(correctedProducts);
	};

	editItem = (id, newQuantity) => {
		let correctedProducts = this.props.products;
		correctedProducts.forEach(e => {
			if (e.id === id) {
				e.quantity = newQuantity;
			}
		});

		this.updateParent(correctedProducts);
	};

	updateParent = (correctedProducts) => {
		this.props.onChange('products', correctedProducts);
		this.calculateTotalSum();
	};

	calculateTotalSum = () => {
		let sum = 0;

		this.props.products.map(e => {
			sum += e.price * e.quantity;
		});

		this.setState({totalSum: sum.toFixed(2)});
	};

	render () {

		if (this.props.products.length > 0) {
			return (
				<div>
					<Table responsive>

						<TableHead editable={true}/>

						<tbody>

						{this.props.products.map((p, i) => {
							return <CartProductRow
								key={p.id}
								index={i + 1}
								editable={true}
								data={p}
								delete={this.confirmDeletion}
								edit={this.editItem}/>;
						})
						}
						</tbody>

						<tfoot>
						<tr className="lead">
							<th colSpan={6} className="text-right">Общо:</th>
							<th className="text-right">{this.state.totalSum}</th>
						</tr>
						</tfoot>

					</Table>

					<Button bsStyle='primary' onClick={this.props.continue}>Продължи</Button>
				</div>
			);
		}

		return null;
	}
}

export default CartProductsTable;

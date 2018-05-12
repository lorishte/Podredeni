import React from 'react';
import { Link } from 'react-router-dom';

// Helpers
import { Table, Button, Row, Col } from 'react-bootstrap';
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
			message: 'Сигурни ли сте, че искате да изтриете този продукт?',
			buttons: [{
				label: 'Изтрий',
				onClick: () => this.deleteItem(id)
			},
				{label: 'Отказ'}]
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

		this.props.products.forEach(e => {
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

					<Row className="buttons-container">
						<Col xs={3}>
							<Button bsStyle='default' onClick={this.props.cancelOrder}>Отказ</Button>
						</Col>
						<Col xs={9} className="text-right">
							<Button bsStyle='primary' onClick={this.props.continue}>Напред</Button>
						</Col>
					</Row>

				</div>
			);
		}

		return null;
	}
}

export default CartProductsTable;

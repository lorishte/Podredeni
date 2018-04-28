import React from 'react';

import { Table } from 'react-bootstrap';
import TableHead from './TableHead';
import CartProductRow from './cartProductRow';

class CartProductsTable extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: this.props.products,
			sum: 0
		};
	}

	componentDidMount () {
		this.calculateTotalSum();
	}

	componentWillReceiveProps (nextProps) {
		this.setState({products: nextProps.products}, () => {
			this.calculateTotalSum();
		});

	}

	calculateTotalSum = () => {
		let sum = 0;

		this.state.products.map(e => {
			sum += e.product.price * e.quantity;
		});

		this.setState({sum: sum.toFixed(2)});
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
						delete={this.props.deleteItem}
						edit={this.props.editItem}/>;
						})
					}
					</tbody>

					<tfoot>
						<tr className="lead">
							<th colSpan={6} className="text-right">Total sum</th>
							<th className="text-right">{this.state.sum}</th>
						</tr>
					</tfoot>

				</Table>
			)
		}
		return null
	}
}

export default CartProductsTable;

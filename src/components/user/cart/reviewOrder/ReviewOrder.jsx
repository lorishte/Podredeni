import React from 'react';

import { Button, Table } from 'react-bootstrap';

import CartProductsTable from '../products/CartProductsTable';
import TableHead from '../products/TableHead';
import CartProductRow from '../products/cartProductRow';


class ReviewOrder extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		console.log(this.props)
	}

	calculateTotalSum = () => {
		let sum = 0;

		this.props.products.map(e => {
			sum += e.product.price * e.quantity;
		});

		return sum.toFixed(2);
	};


	render () {

		let products = this.props.products.map(e => console.log(e));

		return (
			<div>
				<h2>Review order</h2>
				<Table responsive>

					<TableHead editable={false}/>

					<tbody>

					{this.props.products.map((e, i) => {
						return <CartProductRow
							key={e.product.id}
							index={i + 1}
							editable={false}
							data={e.product}
							quantity={e.quantity} />;
						})
					}
					</tbody>

					<tfoot>
					<tr className="lead">
						<th colSpan={5} className="text-right">Total sum</th>
						<th className="text-right">{this.calculateTotalSum()}</th>
					</tr>
					</tfoot>

				</Table>
				<Button onClick={this.props.goBack}>Back</Button>
				<Button onClick={this.props.continue}>Submit Order</Button>
			</div>
		);
	}
}

export default ReviewOrder;

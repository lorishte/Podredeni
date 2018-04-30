import React from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';

import CartProductsTable from '../products/CartProductsTable';
import TableHead from '../products/TableHead';
import CartProductRow from '../products/cartProductRow';
import EkontOrderDetailsSummary from './partials/EkontOrderDetailsSummary';
import AddressOrderDetailsSummary from './partials/AddressOrderDetailsSummary';
import RecipientDetailsSummary from './partials/RecipientDetailsSummary';

class ReviewOrder extends React.Component {
	constructor (props) {
		super(props);
	}

	componentDidMount () {
		console.log(this.props);
	}

	calculateTotalSum = () => {
		let sum = 0;

		this.props.products.map(e => {
			sum += e.product.price * e.quantity;
		});

		return sum.toFixed(2);
	};

	render () {

		let recipient = this.props.orderDetails.recipientInfo;

		let deliveryDetails = this.props.orderDetails.ekontDetails;
		if (this.props.orderDetails.toAddress) {
			deliveryDetails = this.props.orderDetails.addressDetails;
		}

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
								quantity={e.quantity}/>;
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

				<Row>
					<Col xs={12}>
						<h2>Review delivery details</h2>
						<Row>
							<Col sm={6}>
								<RecipientDetailsSummary recipient={recipient}/>
							</Col>
							<Col sm={6}>
								{this.props.orderDetails.toAddress ?
									<AddressOrderDetailsSummary deliveryDetails={deliveryDetails}/> :
									<EkontOrderDetailsSummary deliveryDetails={deliveryDetails} />
								}
							</Col>
						</Row>

					</Col>
				</Row>

				<Button onClick={this.props.goBack}>Back</Button>
				<Button onClick={this.props.continue}>Submit Order</Button>
			</div>
		);
	}
}

export default ReviewOrder;

import React from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';

import CartProductsTable from '../products/CartProductsTable';
import TableHead from '../products/partials/TableHead';
import CartProductRow from '../products/partials/cartProductRow';
import EkontOrderDetailsSummary from './partials/EkontOrderDetailsSummary';
import AddressOrderDetailsSummary from './partials/AddressOrderDetailsSummary';
import RecipientDetailsSummary from './partials/RecipientDetailsSummary';

class ReviewOrder extends React.Component {
	constructor (props) {
		super(props);
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
				<Row>
					<Col xs={12}>
						<h3>Данни за доставка</h3>
						<Row>
							<Col sm={3}>
								<RecipientDetailsSummary recipient={recipient}/>
							</Col>
							<Col sm={5}>
								{this.props.orderDetails.toAddress ?
									<AddressOrderDetailsSummary deliveryDetails={deliveryDetails}/> :
									<EkontOrderDetailsSummary deliveryDetails={deliveryDetails}/>
								}
							</Col>
							<Col sm={4}>
								<Row>
									{this.props.orderDetails.comment ?
									<Col xs={12}><h4>Забележка:</h4>
										<p>{this.props.orderDetails.comment}</p>
										</Col> :
									<Col xs={12}><h4>Няма добавени забележки.</h4></Col>
									}
								</Row>
							</Col>
						</Row>

					</Col>
				</Row>

				<h3>Добавени продукти</h3>
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
						<th colSpan={5} className="text-right">Общо:</th>
						<th className="text-right">{this.calculateTotalSum()}</th>
					</tr>
					</tfoot>
				</Table>



				<Button bsStyle="default" onClick={this.props.goBack}>Назад</Button>
				<Button bsStyle="primary" onClick={this.props.continue}>Потвърди</Button>
			</div>
		);
	}
}

export default ReviewOrder;

import React from 'react';

import { Button, Table, Row, Col } from 'react-bootstrap';

import TableHead from '../products/partials/TableHead';
import CartProductRow from '../products/partials/CartProductRow';
import EkontOrderDetailsSummary from './partials/EkontOrderDetailsSummary';
import AddressOrderDetailsSummary from './partials/AddressOrderDetailsSummary';
import RecipientDetailsSummary from './partials/RecipientDetailsSummary';

class ReviewOrder extends React.Component {
	constructor (props) {
		super(props);
	}

	calculateTotalSum = () => {
		let sum = 0;

		this.props.products.forEach(e => {
			sum += e.price * e.quantity;
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
							key={e.id}
							index={i + 1}
							editable={false}
							data={e}/>;
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

				<Row className="buttons-container">
					<Col xs={3}>
						<Button bsStyle='default' onClick={this.props.cancelOrder}>Отказ</Button>
					</Col>

					<Col xs={9} className="text-right">
						<Button onClick={this.props.goBack}>Назад</Button>
						<Button bsStyle="danger"  onClick={this.props.continue}>Изпрати поръчката</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ReviewOrder;

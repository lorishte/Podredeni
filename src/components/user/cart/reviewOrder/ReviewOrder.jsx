import React from 'react';

import { Table, Row, Col } from 'react-bootstrap';

import CartTableHeader from '../products/partials/CartTableHeader';
import CartTableFooter from '../products/partials/CartTableFooter';
import CartProductRow from '../products/partials/CartProductRow';
import EkontOrderDetailsSummary from './partials/EkontOrderDetailsSummary';
import AddressOrderDetailsSummary from './partials/AddressOrderDetailsSummary';
import RecipientDetailsSummary from './partials/RecipientDetailsSummary';

import { RESOLUTIONS } from '../../../../data/constants/componentConstants';

class ReviewOrder extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

	calculateTotalSum = () => {
		let sum = 0;

		this.props.products.forEach(e => {
			sum += e.price * e.quantity;
		});

		return sum.toFixed(2);
	};

	render () {
		let resolution = this.state.resolution < RESOLUTIONS.xs;
		let totalSum = this.calculateTotalSum();

		let recipient = this.props.orderDetails.recipientInfo;

		let deliveryDetails = this.props.orderDetails.ekontDetails;
		if (this.props.orderDetails.toAddress) {
			deliveryDetails = this.props.orderDetails.addressDetails;
		}

		return (
			<div>
				<Row>
					<Col xs={12}>
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
									{this.props.orderDetails.comment ? <Col xs={12}><h4>Забележка:</h4>
										<p>{this.props.orderDetails.comment}</p>
									</Col> : <Col xs={12}><h4>Няма добавени забележки.</h4></Col>
									}
								</Row>
							</Col>
						</Row>

					</Col>
				</Row>

				<Table responsive id="cart-products-table">
					<CartTableHeader editable={false}/>
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

					<CartTableFooter resolution={resolution} totalSum={totalSum} colSpan={4}/>
				</Table>

				<Row className="buttons-container">
					<Col xs={12} className="text-center">
						<button className="btn-custom default md" onClick={this.props.cancel}>Отказ</button>
						<button className="btn-custom default md" onClick={this.props.goBack}>Назад</button>
						{sessionStorage.getItem('role') !== 'admin' &&
						<button className="btn-custom primary lg" onClick={this.props.continue}>Изпрати
							поръчката</button>}

						{sessionStorage.getItem('role') === 'admin' &&
						<button className="btn-custom primary lg" onClick={this.props.continue}>Запази
							промените</button>
						}
					</Col>
				</Row>
			</div>
		);
	}
}

export default ReviewOrder;

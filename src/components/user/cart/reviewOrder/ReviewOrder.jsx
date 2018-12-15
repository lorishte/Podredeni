import React from 'react';

import { Row, Col } from 'react-bootstrap';

import CartTableHeader from '../products/partials/CartTableHeader';
import CartTableFooter from '../products/partials/CartTableFooter';
import CartProductRow from '../products/partials/CartProductRow';

import EkontOrderDetailsSummary from './partials/EkontOrderDetailsSummary';
import AddressOrderDetailsSummary from './partials/AddressOrderDetailsSummary';
import RecipientDetailsSummary from './partials/RecipientDetailsSummary';

import utils from '../../../../utils/utils';

import { RESOLUTIONS, BUTTONS_BG, LABELS_BG, CART } from '../../../../data/constants/componentConstants';

class ReviewOrder extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);

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

		// Check if promotion
		if (this.props.promotionProducts && Object.keys(this.props.promotionProducts).length > 0) {
			this.props.promotionProducts.cart.forEach(e => {
				let price = utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2);
				sum += price * e.quantity;
			});

			// Check if promotion has presents
			if (this.props.selectedPresents.length > 0) {
				this.props.selectedPresents.forEach(e => {
					let price = utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2);
					sum += price * e.quantity;
				});
			}

		} else {
			this.props.products.forEach(e => {
				let price = utils.calculatePriceAfterDiscount(e.price, e.discount).toFixed(2);
				sum += price * e.quantity;
			});
		}

		return sum.toFixed(2);
	};

	render () {
		let resolution = this.state.resolution > RESOLUTIONS.bootstrapXS;

		let isAdmin = sessionStorage.getItem('role') === 'admin';

		let totalSum = this.calculateTotalSum();

		let recipient = this.props.orderDetails.recipientInfo;

		let deliveryDetails = this.props.orderDetails.ekontDetails;

		if (this.props.orderDetails.toAddress) {
			deliveryDetails = this.props.orderDetails.addressDetails;
		}

		let products;
		let presents;

		// Check if promotion
		if (this.props.promotionProducts && Object.keys(this.props.promotionProducts).length > 0) {
			products = this.props.promotionProducts.cart.map((e, i) => {
				return <CartProductRow
					key={e.id + i}
					editable={false}
					data={e}/>;
			});

			// Check if promotion has presents
			if (this.props.selectedPresents.length > 0) {
				presents = this.props.selectedPresents.map((e, i) => {
					return <CartProductRow
						key={e.id}
						editable={false}
						data={e}/>;
				});
			}

		} else {
			products = this.props.products.map((e, i) => {
				return <CartProductRow
					key={e.id}
					editable={false}
					data={e}/>;
			});
		}

		return (
			<Row>


				<RecipientDetailsSummary recipient={recipient}/>


				{this.props.orderDetails.toAddress
					? <AddressOrderDetailsSummary deliveryDetails={deliveryDetails}/>
					: <EkontOrderDetailsSummary deliveryDetails={deliveryDetails}/>
				}

				<Col sm={4}>
					{this.props.orderDetails.comment
						? <Col xs={12}><h4>{CART.comment}</h4> <p>{this.props.orderDetails.comment}</p></Col>
						: <Col xs={12}><h4>{CART.noComment}</h4></Col>
					}
				</Col>


				<Col xs={12} id="cart-products-table">

					<CartTableHeader editable={false} resolution={resolution}/>

					{products}
					{presents}

					<CartTableFooter resolution={resolution} totalSum={totalSum} colSpan={4}/>

				</Col>


				<Col xs={12} className="text-center buttons-container">
					<button className={isAdmin ? 'btn btn-default' : 'btn-custom default md'}
					        onClick={this.props.goBack}>{BUTTONS_BG.back}
					</button>

					<button className={isAdmin ? 'btn btn-primary' : 'btn-custom primary md'}
					        onClick={this.props.continue}>
						{isAdmin ? BUTTONS_BG.saveChanges : BUTTONS_BG.sendOrder}
					</button>

				</Col>

			</Row>
		);
	}
}

export default ReviewOrder;

import React from 'react';
import { ToastContainer } from 'react-toastr';

// Helpers
import { Grid, Row, Col } from 'react-bootstrap';

// Partials
import CartProductsTable from '../../../user/cart/products/CartProductsTable';
import OrderDetailsForm from '../../../user/cart/orderDetails/OrderDetailsForm';
import ReviewOrder from '../../../user/cart/reviewOrder/ReviewOrder';

import ordersService from '../../../../services/orders/ordersService';

import { REDIRECT_DELAY, TOASTR_MESSAGES, BUTTONS_BG} from '../../../../data/constants/componentConstants';

class OrderEdit extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			orderDetails: {},
			deliveryDataId: '',
			orderId: '',
			productsView: true,
			orderDetailsView: false,
			reviewView: false
		};
	}

	componentDidMount () {
		ordersService.loadOrder(this.props.match.params.id)
			.then(res => {
				this.setState({
					products: res.order.products,
					deliveryDataId: res.order.deliveryDataId,
					orderId: res.order.id
				});

				ordersService
					.loadDeliveryData(res.order.deliveryDataId)
					.then(data => {

						let dd = data.deliveryData;

						let orderDetails = {
							recipientInfo: {
								firstName: dd.customerName,
								lastName: dd.customerLastName,
								email: dd.email,
								phone: dd.phoneNumber
							},
							ekontDetails: {
								country: dd.officeCountry || '',
								city: dd.officeCity || '',
								officeCode: dd.officeCode || '',
								officeName: dd.officeName || '',
								address: dd.officeAddress || ''
							},
							addressDetails: {
								country: dd.country || '',
								city: dd.city || '',
								postalCode: dd.postCode || '',
								street: dd.street || '',
								streetNo: dd.streetNumber || '',
								district: dd.district || '',
								block: dd.block || '',
								entrance: dd.entrance || '',
								floor: dd.floor || '',
								apartment: dd.apartment || ''
							},
							comment: dd.comments || '',
							toAddress: !dd.deliveredToAnOffice
						};

						this.setState({orderDetails: orderDetails});

					});
			})
			.catch(err => console.log(err));
	}

	updateInfo = (stateProp, data) => {
		this.setState({[stateProp]: data});
	};

	showProducts = () => {
		this.setState({
			productsView: true,
			orderDetailsView: false,
			reviewView: false
		});
	};

	showDeliveryDetailsForm = () => {
		this.setState({
			productsView: false,
			orderDetailsView: true,
			reviewView: false
		});
	};

	showReview = () => {
		this.setState({
			productsView: false,
			orderDetailsView: false,
			reviewView: true
		});
	};

	submitOrder = () => {
		ordersService
			.editDeliveryData(this.state.deliveryDataId, this.state.orderDetails)
			.then(res => {

				ordersService
					.editOrder(this.state.orderId, this.state.products)
					.then(res => {
						this.toastContainer.success(TOASTR_MESSAGES.successEdit, '', {
							closeButton: true,
						});
						setTimeout(() => this.props.history.push('/order/list'), REDIRECT_DELAY);
					});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};


	render () {
		return (
			<Grid id="cart">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Col className="text-right">
					<button className={'btn btn-default sm'}
					        onClick={this.props.history.goBack}>{BUTTONS_BG.cancel}
					</button>
				</Col>

				<Row>
					{this.state.products.length > 0 && this.state.productsView &&
					<Col xs={12}>
						<CartProductsTable
							products={this.state.products}
							onChange={this.updateInfo}
							continue={this.showDeliveryDetailsForm}
							cancel={this.cancel}
						/>

					</Col>
					}

					{this.state.orderDetailsView &&
					<Col xs={12}>
						<OrderDetailsForm
							data={this.state.orderDetails}
							toastContainer={this.toastContainer}
							onChange={this.updateInfo}
							goBack={this.showProducts}
							continue={this.showReview}/>
					</Col>
					}

					{this.state.reviewView &&
					<Col xs={12}>

						<ReviewOrder
							products={this.state.products}
							orderDetails={this.state.orderDetails}
							goBack={this.showDeliveryDetailsForm}
							continue={this.submitOrder}/>
					</Col>
					}
				</Row>
			</Grid>
		);
	}
}

export default OrderEdit;

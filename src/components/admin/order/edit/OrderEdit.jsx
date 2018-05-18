import React from 'react';
import { ToastContainer } from 'react-toastr';

// Helpers
import { Grid, Row, Col } from 'react-bootstrap';

// Partials
import CartProductsTable from '../../../user/cart/products/CartProductsTable';
import OrderDetailsForm from '../../../user/cart/orderDetails/OrderDetailsForm';
import ReviewOrder from '../../../user/cart/reviewOrder/ReviewOrder';

import orderService from '../../../../services/orders/ordersService';

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
		orderService.loadOrder(this.props.match.params.id)
			.then(res => {
				this.setState({
					products: res.order.products,
					deliveryDataId: res.order.deliveryDataId,
					orderId: res.order.id
				});

				orderService
					.loadDeliveryData(res.order.deliveryDataId)
					.then(data => {

						let dd = data.deliveryData;

						let orderDetails = {
							recipientInfo: {
								firstName: dd.customerName.split(' ')[0],
								lastName: dd.customerName.split(' ')[1],
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
		orderService
			.editDeliveryData(this.state.deliveryDataId, this.state.orderDetails)
			.then(res => {

				let products = generateOrderData(this.state.products);

				orderService
					.editOrder(this.state.orderId, products)
					.then(res => {
						this.toastContainer.success('Успешна редакция.', '', {
							closeButton: true,
						});
						setTimeout(() => this.props.history.push('/order/list'), 2000 )
					});
			})
			.catch(err => {
				this.toastContainer.error('', err.responseText, {
					closeButton: true,
				});
			});
	};

	cancel = () => {
		this.props.history.go(-1);
	};

	render () {
		return (
			<Grid id="cart">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

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
							continue={this.showReview}
							cancel={this.cancel}/>
					</Col>
					}

					{this.state.reviewView &&
					<Col xs={12}>

						<ReviewOrder
							products={this.state.products}
							orderDetails={this.state.orderDetails}
							goBack={this.showDeliveryDetailsForm}
							continue={this.submitOrder}
							cancel={this.cancel} />
					</Col>
					}
				</Row>
			</Grid>
		);
	}
}

export default OrderEdit;

function generateOrderData (products) {
	return products.map(e => {
			return {
				ProductId: e.id,
				Quantity: e.quantity,
				Price: e.price
			};
		}
	);
}
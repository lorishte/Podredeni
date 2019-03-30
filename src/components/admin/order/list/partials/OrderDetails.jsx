import React from 'react';

import { Row, Col, Label, Button } from 'react-bootstrap';

import utils from '../../../../../utils/utils';

import { LABELS_BG, ORDER_STATUS_BG, CURRENCY } from '../../../../../data/constants/componentConstants';

class OrderDetails extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			showDetails: this.props.visible,
		};
	}

	componentWillReceiveProps (nextProps) {
		this.setState({showDetails: nextProps.visible});
	}

	changeStatus = (status) => {
		let o = this.props.order;
		this.props.changeStatus(o.id, status);
	};

	render () {
		let o = this.props.order;
		let d = this.props.delivery;

		let products;
		let totalSum = 0; //order total sum

		if (o !== '') {
			products = o.products.map(e => {

				let price = utils.calculatePriceAfterDiscount(e.price, e.discount);

				totalSum += price * e.quantity;

				return (
					<Col xs={12} key={e.productOrderId}>
						<Row >
							<Col xs={4}>
								<p>{e.name}
									{e.discount > 0 &&
									<span className="promo-label">-{e.discount}%</span>
									}
								</p>
							</Col>
							<Col xs={2} className="text-right">{e.quantity}</Col>
							<Col xs={3} className="text-right">
								{e.discount > 0 &&
								<span className="old-price">{e.price.toFixed(2) + ' ' + CURRENCY}</span>}
								{price.toFixed(2) + ' ' + CURRENCY}
							</Col>


							<Col xs={3} className="text-right">{(price * e.quantity).toFixed(2)}</Col>
						</Row>
					</Col>
				);
			});
		}

		return (
			<div>
				<div className={this.state.showDetails ? 'overlay' : ''} onClick={this.props.hideDetails}/>

				<div className={this.state.showDetails ? 'order-info visible' : 'order-info'}>
					<Row>
						<Col xs={12}>
							<h4>{LABELS_BG.orderNumber} <Label bsStyle="success">{o.number}</Label><Label bsStyle="info">Промо: ReadeREST</Label></h4>
							<p className="">
								<small className="text-grey">{LABELS_BG.lastModification}:</small>
								&nbsp;{utils.formatDate(o.lastModificationDate)}
								{/*&nbsp;<Label>{ORDER_STATUS_BG[o.status]}</Label>*/}
							</p>
							<hr />
						</Col>

						<Col xs={4} sm={3}><p className="text-grey">{LABELS_BG.customer}:</p></Col>
						<Col xs={8}><p>{d.customerName} {d.customerLastName}</p></Col>

						<Col xs={4} sm={3}><p className="text-grey">{LABELS_BG.deliveredTo}:</p></Col>

						{!d.deliveredToAnOffice &&
						<Col xs={8}>
							<p>
								{d.city} {d.postCode},
								{d.street !== '' && LABELS_BG.streetShort + ' ' + d.street + ' ' + d.streetNumber + ', '}
								{d.district !== '' && LABELS_BG.districtShort + ' ' + d.district + ', '}
								{d.block !== '' && LABELS_BG.blockShort + ' ' + d.block + ', '}
								{d.entrance !== undefined && LABELS_BG.entranceShort + ' ' + d.entrance + ', '}
								{d.floor !== '' && LABELS_BG.floorShort + ' ' + d.floor + ', '}
								{d.apartment !== '' && LABELS_BG.apartmentShort + ' ' + d.apartment }&nbsp;
								<Label bsStyle="success">{LABELS_BG.address}</Label>
							</p>
						</Col>
						}
						{d.deliveredToAnOffice &&
						<Col xs={8}>
							<p>{d.officeAddress}&nbsp;
								<Label bsStyle="danger">{LABELS_BG.office}</Label>
							</p>
						</Col>
						}

						<Col xs={4} sm={3}><p className="text-grey">{LABELS_BG.phone}:</p></Col>
						<Col xs={8}><p>{d.phoneNumber}</p></Col>

						<Col xs={4} sm={3}><p className="text-grey">{LABELS_BG.email}:</p></Col>
						<Col xs={8}><p>{d.email}</p></Col>

						<Col xs={4} sm={3}><p className="text-grey">{LABELS_BG.comments}:</p></Col>
						<Col xs={8}><p className="text-bigger"><Label bsStyle="warning">{d.comments}</Label></p></Col>

					</Row>


					<Row>
						<Col xs={12}>
							<hr />
							<Col xs={12} className="order-info-table-header">
								<Col xs={4}>{LABELS_BG.product}</Col>
								<Col xs={2} className="text-right">{LABELS_BG.quantity}</Col>
								<Col xs={3} className="text-right">{LABELS_BG.price}</Col>
								<Col xs={3} className="text-right">{LABELS_BG.amount}</Col>
							</Col>

							{products}

							<Col xs={12}>
								<hr />
								<h4 className="text-info text-right">{LABELS_BG.total}: {totalSum.toFixed(2)}</h4>
							</Col>
						</Col>
					</Row>

					<Row>
						<Col xs={12} className="buttons-container">

							<Button className={o.status === 0 ? 'btn btn-sm btn-success' : 'btn btn-sm'}
							        disabled={o.status === 0}
							        onClick={() => this.changeStatus('reset')}>{ORDER_STATUS_BG['0']}</Button>

							<Button className={o.status === 1 ? 'btn btn-sm btn-success' : 'btn btn-sm'}
							        disabled={o.status === 1}
							        onClick={() => this.changeStatus('confirm')}>{ORDER_STATUS_BG['1']}</Button>

							<Button className={o.status === 2 ? 'btn btn-sm btn-success' : 'btn btn-sm'}
							        disabled={o.status === 2}
							        onClick={() => this.changeStatus('dispatch')}>{ORDER_STATUS_BG['2']}</Button>

							<Button className={o.status === 3 ? 'btn btn-sm btn-success' : 'btn btn-sm'}
							        disabled={o.status === 3}
							        onClick={() => this.changeStatus('cancel')}>{ORDER_STATUS_BG['3']}</Button>
						</Col>
					</Row>

					<button className="btn btn-info btn-xs close-btn" onClick={this.props.hideDetails}>
						<i className="fa fa-times" aria-hidden="true"/>
					</button>

				</div>
			</div>
		);
	}
}

export default OrderDetails;

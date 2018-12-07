import React from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastr';

import { confirmAlert } from 'react-confirm-alert';

import { Grid, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';

import TableHead from './partials/PromosTableHead';
import PromoTableRow from './partials/PromosTableRow';

import discountPromosService from '../../../../services/promos/discountPromosService';
import productPromosService from '../../../../services/promos/productPromosService';

import {
	TOASTR_MESSAGES
} from '../../../../data/constants/componentConstants';

import { BUTTONS_BG, CONFIRM_DIALOGS } from '../../../../data/constants/componentConstants';

class PromoList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			discountPromos: [],
			productPromos: []
		};
	}

	componentDidMount () {

		this.loadAll();
	}

	loadAll = () => {

		discountPromosService
			.loadAll()
			.then(res => {
				this.setState({discountPromos: res});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});

		productPromosService
			.loadAll()
			.then(res => {
				this.setState({productPromos: res});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});

	};

	deletePromo = (promoId) => {
		// discountPromosService.delete(promoId).then(res => {
		// 	window.location.reload();
		// }).catch(err => {
		// 	this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
		// 		closeButton: false,
		// 	});
		// });
	};

	confirmDeletePromo = (promoId) => {
		confirmAlert({
			title: '',
			message: CONFIRM_DIALOGS.deletePromo,
			buttons: [{
				label: BUTTONS_BG.yes,
				onClick: () => this.deletePromo(promoId)
			},
				{label: BUTTONS_BG.no}]
		});

	};

	render () {

		let discountPromosList;

		if (this.state.discountPromos.length > 0) {
			discountPromosList = this.state.discountPromos.map(e => {
				let isProductPromo = e.promoCode;
				return <PromoTableRow key={e.id}
				                      isProductPromo={isProductPromo}
				                      data={e}
				                      confirmDelete={this.confirmDeletePromo}/>;
			});
		}


		let productPromosList;

		if (this.state.productPromos.length > 0) {
			productPromosList = this.state.productPromos.map(e => {
				let isProductPromo = e.promoCode;
				return <PromoTableRow key={e.id}
				                      isProductPromo={isProductPromo}
				                      data={e}
				                      confirmDelete={this.confirmDeletePromo}/>;
			});
		}

		return (
			<Grid>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>


				<Row>
					<Col xs={12} className="buttons-container">
						<Link to="/promos/create-discount-promo" className="btn btn-sm btn-primary">Нова Промоция с
							намаление</Link>
						<Link to="/promos/create-product-promo" className="btn btn-sm btn-primary">Нова Промоция с
							продукти</Link>
					</Col>
				</Row>

				<Tabs defaultActiveKey={0}
				      id="admin-promos-table"
				      onSelect={this.handleSelect}>


					<Tab eventKey={0}
					     title='Промоции с намаление'>

						<Table striped bordered condensed hover>
							<TableHead/>
							<tbody>
							{discountPromosList}
							</tbody>
						</Table>
					</Tab>

					<Tab eventKey={1}
					     title='Продуктови промоции'>

						<Table striped bordered condensed hover>
							<TableHead/>
							<tbody>
							{productPromosList}
							</tbody>
						</Table>
					</Tab>

				</Tabs>

			</Grid>
		);
	}
}

export default PromoList;

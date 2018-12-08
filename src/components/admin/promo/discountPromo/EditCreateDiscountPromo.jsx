import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';

import MultiSelect from '../partials/MultiSelect';

import discountPromosService from '../../../../services/promos/discountPromosService';
import productsService from '../../../../services/products/productsService';

import utils from '../../../../utils/utils';

import { TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';

class EditCreateDiscountPromo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			discount: '',
			startDate: '',
			endDate: [],
			allProducts: [],
			selectedProductsIds: [],
			newSelectedProductsIds: []
		};
	}

	promoId = this.props.match.params.id;

	componentDidMount () {

		if (this.promoId) {
			this.loadPromo();
		}

		this.loadProducts();
	}

	loadProducts = () => {

		productsService.loadProducts(this.state).then(res => {

			this.setState({
				allProducts: res.products
			});
		})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});

			});

	};

	loadPromo = () => {

		discountPromosService.load(this.promoId)
			.then(res => {

				this.setState({
					name: res.name,
					discount: res.discount,
					startDate: utils.formatDateYearFirst(res.startDate),
					endDate: utils.formatDateYearFirst(res.endDate),
					selectedProductsIds: res.productsIds,
					newSelectedProductsIds: res.productsIds
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});

			});
	};

	cancel = () => {
		this.props.history.go(-1);
	};

	handleChange = (e) => {

		this.setState({[e.target.name]: e.target.value});
	};

	addProduct = (e) => {

		this.setState({newSelectedProductsIds: e});
	};

	manageProductsInPromotion = (promoId) => {

		let removedProducts = getRemovedProducts(this.state.newSelectedProductsIds, this.state.selectedProductsIds);
		let assignedProducts = getAssignedProducts(this.state.newSelectedProductsIds, this.state.selectedProductsIds);

		if (assignedProducts.length > 0) {

			discountPromosService.assign(promoId, assignedProducts);
		}

		if (removedProducts.length > 0) {

			discountPromosService.remove(promoId, removedProducts);
		}
	};

	submitInfo = (e) => {

		e.preventDefault();

		if (this.promoId) {

			discountPromosService.edit(this.promoId, this.state).then(res => {

				this.manageProductsInPromotion(this.promoId);

				this.props.history.go(-1);

			}).catch(err => {

				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});

		} else {

			discountPromosService.create(this.state).then(res => {

				this.manageProductsInPromotion(res.promoDiscountId);

				this.props.history.go(-1);

			}).catch(err => {

				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});

			});

		}
	};

	render () {

		return (
			<Grid id="create-edit-promo">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>


				<Row>
					<Col sm={12}>
						{!this.promoId && <h3>Създаване на промоция с отстъпка</h3>}
						{this.promoId && <h3>Редакция</h3>}
						<hr/>
					</Col>
				</Row>


				<form onSubmit={(e) => this.submitInfo(e)}>

					<Row>
						<Col sm={6} xs={12}>
							<FormInputField
								label="Наименование"
								name="name"
								type="text"
								value={this.state.name}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>

					<Row>
						<Col sm={3} xs={4}>
							<FormInputField
								label="Oтстъпка (%)"
								name="discount"
								type="number"
								step="0.01"
								min="0"
								max="100"
								value={this.state.discount}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>


						<Col sm={4} xs={12}>
							<FormInputField
								label="Начална дата"
								name="startDate"
								type="date"
								value={this.state.startDate}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>


						<Col sm={4} xs={12}>
							<FormInputField
								label="Крайна дата"
								name="endDate"
								type="date"
								value={this.state.endDate}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>


					<Row>
						<label className="col-xs-12">Избрани продукти:</label>

						<MultiSelect
							name="selectedProductsIds"
							onChange={this.addProduct}
							allProducts={this.state.allProducts}
							selectedProductsIds={this.state.newSelectedProductsIds}
						/>
					</Row>

					<Row className="buttons-container">
						<Col xs={12}>
							<Button onClick={this.cancel}>Отказ</Button>
							<Button bsStyle='primary' type="submit">Потвърди</Button>
						</Col>
					</Row>

				</form>
			</Grid>
		);
	}
}

function getRemovedProducts (newSelectedProductsIds, selectedProductsIds) {

	let result = [];

	for (let i = 0; i < selectedProductsIds.length; i++) {

		let currentId = selectedProductsIds[i];

		if (!newSelectedProductsIds.includes(currentId)) {

			result.push(currentId);
		}

	}

	return result;
}

function getAssignedProducts (newSelectedProductsIds, selectedProductsIds) {

	let result = [];

	for (let i = 0; i < newSelectedProductsIds.length; i++) {

		let currentId = newSelectedProductsIds[i];

		if (!selectedProductsIds.includes(currentId)) {

			result.push(currentId);
		}

	}

	return result;
}

export default EditCreateDiscountPromo;

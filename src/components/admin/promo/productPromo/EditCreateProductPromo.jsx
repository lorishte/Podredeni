import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';

import MultiSelect from '../partials/MultiSelect';

import productPromosService from '../../../../services/promos/productPromosService';
import productsService from '../../../../services/products/productsService';

import utils from '../../../../utils/utils';

import { TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';

class EditCreateProductPromo extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			startDate: '',
			endDate: '',
			promoCode: '',
			isInclusive: false,
			isAccumulative: false,
			productsCount: 0,
			discountedProductsCount: 0,
			discount: 0,
			includePriceDiscounts: false,
			quota: 100,
			discountedProducts: [],
			newDiscountedProducts: [],
			products: [],
			newProducts: []
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
				products: res.products,
				discountedProducts: res.products
			});
		})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	loadPromo = () => {

		productPromosService.load(this.promoId)
			.then(res => {

				this.setState({
					name: res.name,
					startDate: utils.formatDateYearFirst(res.startDate),
					endDate: utils.formatDateYearFirst(res.endDate),
					promoCode: res.promoCode,
					isInclusive: res.isInclusive,
					isAccumulative: res.isAccumulative,
					productsCount: res.productsCount,
					discountedProductsCount: res.discountedProductsCount,
					discount: res.discount,
					includePriceDiscounts: res.includePriceDiscounts,
					quota: res.quota,
					discountedProducts: res.discountedProducts,
					products: res.products
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

	handleCheckBox = (e) => {
		this.setState({[e.target.name]: e.target.checked});
	};

	addDiscountedProduct = (e) => {
		this.setState({newDiscountedProducts: e});
	};

	addProduct = (e) => {
		this.setState({newProducts: e});
	};

	submitInfo = (e) => {

		console.log(this.state);

		e.preventDefault();

		if (this.promoId) {

			productPromosService
				.edit(this.promoId, this.state)
				.then(res => {
					this.toastContainer.success('', TOASTR_MESSAGES.successEdit, {
						closeButton: false,
					});
					// this.props.history.go(-1);

				}).catch(err => {

				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
		} else {

			productPromosService.create(this.state).then(res => {
				console.log(res);

				this.toastContainer.success('', TOASTR_MESSAGES.successPromotionCreate, {
					closeButton: false,
				});
				// this.props.history.go(-1);

			}).catch(err => {
				console.log(err);
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
						{!this.promoId && <h3>Създаване на промоция с продукти</h3>}
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


						<Col sm={2} xs={7}>
							<FormInputField
								label="Промо код"
								name="promoCode"
								type="text"
								value={this.state.promoCode}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>

					<Row>
						<Col sm={4} xs={6}>
							<FormInputField
								label="Начална дата"
								name="startDate"
								type="date"
								value={this.state.startDate}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>


						<Col sm={4} xs={6}>
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

						<Col sm={4} xs={6}>
							<FormInputField
								label="Минимален брой закупени продукти"
								name="productsCount"
								type="text"
								value={this.state.productsCount}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>

						<Col sm={4} xs={6}>
							<FormInputField
								label="Брой промоционални продукти"
								name="discountedProductsCount"
								type="text"
								value={this.state.discountedProductsCount}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>

					<Row>
						<Col md={2} sm={3} xs={6}>
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

						<Col md={2} sm={3} xs={6}>
							<FormInputField
								label="Квота"
								name="quota"
								type="number"
								step="1"
								min="0"
								value={this.state.quota}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<label>
								<input type="checkbox"
								       name="isAccumulative"
								       defaultChecked={this.state.isAccumulative}
								       onChange={this.handleCheckBox}/>

								Натрупване на подаръци в една поръчка
							</label>
						</Col>

						<Col xs={12}>
							<label>
								<input type="checkbox"
								       name="isAccumulative"
								       defaultChecked={this.state.isAccumulative}
								       onChange={this.handleCheckBox}/>

								Включвай отстъпки от други промоции
							</label>
						</Col>
					</Row>

					<Col>
						<h3 className="col-xs-12 smaller">Избери продукти в промоция</h3>

						<MultiSelect
							name="productsIds"
							onChange={this.addProduct}
							allProducts={this.state.products}
							selectedProductsIds={this.state.newProducts}
						/>
					</Col>

					<Col>
						<label id="inclusive-checkbox">
							<input type="checkbox"
							       name="isInclusive"
							       defaultChecked={this.state.isInclusive}
							       onChange={this.handleCheckBox}/>

							Ще подарявам различен продукт
						</label>

						{this.state.isInclusive &&
						<div>

							<h3 className="col-xs-12 smaller">Избери продукти за подарък</h3>
							<MultiSelect
								name="discountedProductsIds"
								onChange={this.addDiscountedProduct}
								allProducts={this.state.discountedProducts}
								selectedProductsIds={this.state.newDiscountedProducts}
							/>
						</div>

						}
					</Col>

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

export default EditCreateProductPromo;

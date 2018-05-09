import React from 'react';

import { Grid, Row, Col, Checkbox, Button, Image } from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';
import FormTextareaField from '../../../common/formComponents/FormTextareaField';
import AddImageForm from './partials/AddImageFrom';

import productsService from '../../../../services/products/productsService';

class CreateProduct extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			description: '',
			price: '',
			imageUrls: [],
			isTopSeller: false,
			isBlocked: false
		};
	}

	fromCreate = false;
	requestPath = this.props.location.pathname;
	productId = this.props.match.params.id;

	componentDidMount () {
		if (this.requestPath === '/product/create') {
			this.fromCreate = true;
			return;
		}

		this.loadProductData();

	}

	loadProductData = () => {
		productsService
			.getProduct(this.productId)
			.then(res => {
				let p = res.product;

				this.setState({
					name: p.name,
					description: p.description,
					price: p.price,
					imageUrls: p.images,
					isTopSeller: p.isTopSeller,
					isBlocked: p.isBlocked
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	submitInfo = (e) => {
		e.preventDefault();

		if (this.fromCreate) {
			productsService
				.addProduct(this.state)
				.then(res => {
					console.log(res);
					//redirect back
					this.props.history.go(-1);
				})
				.catch(err => {
					console.log(err.responseText);
				});
			return;
		}

		productsService
			.updateProduct(this.state, this.productId)
			.then(res => {
				console.log(res);
				//redirect back
				this.props.history.go(-1);
			})
			.catch(err => {
				console.log(err.responseText);
			});
	};

	cancel = () => {
		//redirect back
		this.props.history.go(-1);
	};

	addImage = (url) => {
		this.setState({imageUrls: [...this.state.imageUrls, url]});
	};

	removeImage = (e) => {
		this.setState({
			imageUrls: this.state.imageUrls.filter(el => el !== e.target.name)
		}, () => console.log(this.state.imageUrls));
	};

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleCheckBox = (e) => {
		this.setState({[e.target.name]: !this.state[e.target.name]});
	};

	render () {

		let images = this.state.imageUrls.map((e, i) => {
			return (
				<div className="image-container" key={i}>
					<Image
						thumbnail
						className="image-thumbnail"
						src={e}/>
					<button className="deleteImgBtn" name={e} onClick={this.removeImage}>x</button>
				</div>
			);
		});
		return (
			<Grid id="create-edit-product">
				<Row>
					<Col sm={12}>
						{this.requestPath.includes('create') && <h3>Създаване на продукт</h3>}
						{this.requestPath.includes('edit') && <h3>Редакция</h3>}
						<hr/>
					</Col>
				</Row>


				<form onSubmit={(e) => this.submitInfo(e)}>
					<Row>
						{this.requestPath.includes('edit') &&
							<div className="text-right">
								<Col xs={12}>
									{this.state.isBlocked && <span>Този продукт е блокиран &nbsp;</span>}
									<Button bsStyle={this.state.isBlocked ? 'info' : 'danger'}
									        name="isBlocked"
									        onClick={this.handleCheckBox}>
										{!this.state.isBlocked && 'Блокиране'}
										{this.state.isBlocked && 'Отблокиране'}
									</Button>
								</Col>
							</div>
						}


						<Col md={5} sm={8}>
							<FormInputField
								label="Име"
								name="name"
								type="text"
								value={this.state.name}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>

							<Checkbox readOnly
							          name="isTopSeller"
							          checked={this.state.isTopSeller}
							          onChange={this.handleCheckBox}>
								Top Seller
							</Checkbox>
						</Col>
					</Row>

					<Row>
						<Col md={5} sm={8}>
							<FormTextareaField
								label="Описание"
								name="description"
								value={this.state.description}
								required={true}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>

					<Row>
						<Col md={2} sm={5} xs={6}>
							<FormInputField
								label="Цена"
								name="price"
								type="number"
								step="any"
								value={this.state.price}
								required={false}
								disabled={false}
								onChange={this.handleChange}/>
						</Col>
					</Row>

					<Row>

						<Col xs={12}>
							{images}
						</Col>

						<Col md={6} sm={12}>
							<AddImageForm
								label="Добави снимка"
								addImage={this.addImage}/>
						</Col>
					</Row>


					<Row>
						<Col xs={12}>
							<Button onClick={this.cancel}>Отказ</Button>
							<Button bsStyle='primary' type="submit">Потвърди</Button>
						</Col>
					</Row>

				</form>
			</Grid>
		)
			;
	}
}

export default CreateProduct;

import React from 'react';

import { Grid, Row, Col, Checkbox, Button } from 'react-bootstrap';

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
			return
		}

		this.loadProductData();

	}

	loadProductData = () => {
		productsService
			.getProduct(this.productId)
			.then (res => {
				let p = res.product;

				this.setState({
					name: p.name,
					description: p.desription,
					price: p.price,
					imageUrls: p.images,
					isTopSeller: p.isTopSeller,
					isBlocked: p.isBlocked
				})
			})
			.catch(err => {
				console.log(err);
			});
	};

	updateInfo = (e) => {
		console.log(e.target.name);
		this.setState({[e.target.name]: e.target.value}, (e) => {
			console.log(this.state)
		});
	};

	addImage = (url) => {
		this.setState({imageUrls: [...this.state.imageUrls, url]});
	};

	submitInfo = (e) => {
		e.preventDefault();

		if (this.fromCreate) {
			productsService
				.addProduct(this.state)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err.responseText)
				});
			return
		}

		productsService
			.updateProduct(this.state, this.productId)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err.responseText)
			});
	};

	cancel = () => {
		//redirect back
		this.props.history.go(-1);
	};

	handleCheckBox = (e) => {

		console.log(e.target.name);
		console.log(this.state[e.target.name]);

		this.setState({[e.target.name]: !this.state[e.target.name]}, () => {
			console.log(this.state)
		});
	};

	render () {
		return (
			<Grid>
				<Row>
					<Col sm={12}>
						{this.requestPath.includes('create') && <h3>Създаване на продукт</h3>}
						{this.requestPath.includes('edit') && <h3>Редакция</h3>}
						<hr/>
					</Col>
				</Row>
				<Row className="bg-light">

					<form onSubmit={(e) => this.submitInfo(e)}>
						<Col md={3} sm={4} xs={8}>
							<FormInputField
								label="Име"
								name="name"
								type="text"
								value={this.state.name}
								required={true}
								disabled={false}
								onChange={this.updateInfo}/>
						</Col>

						<Col md={3} sm={4} xs={8}>
							<FormTextareaField
								label="Описание"
								name="description"
								value={this.state.description}
								required={true}
								disabled={false}
								onChange={this.updateInfo}/>
						</Col>

						<Col md={3} sm={4} xs={8}>
							<FormInputField
								label="Цена"
								name="price"
								type="number"
								value={this.state.price}
								required={false}
								disabled={false}
								onChange={this.updateInfo}/>
						</Col>


						<AddImageForm
							onEnter={this.addImage}/>


						<Col md={3} sm={4} xs={8}>
							<Checkbox readOnly
							          name="isTopSeller"
							          onChange={this.handleCheckBox}>
								Top Seller
							</Checkbox>
						</Col>

						<Col md={3} sm={4} xs={8}>
							<Checkbox readOnly
							          name="isBlocked"
							          onChange={this.handleCheckBox}>
								Блокиране
							</Checkbox>
						</Col>


						<Col xs={12}>
							<Button onClick={this.cancel}>Отказ</Button>
							<Button bsStyle='primary' type="submit">Потвърди</Button>
						</Col>

					</form>
				</Row>
			</Grid>
		);
	}
}

export default CreateProduct;

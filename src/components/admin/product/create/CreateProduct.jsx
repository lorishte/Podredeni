import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button } from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';
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
			isTopSeller: false
		};
	}

	updateInfo = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	addImage = (url) => {
		this.setState({imageUrls: [...this.state.imageUrls, url]});
	};

	submitInfo = (e) => {
		e.preventDefault();

		productsService
			.addProduct(this.state)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err.responseText)
			})
	};

	cancel = () => {
		console.log('cancel');
	};

	handleCheckBox = () => {
		this.setState({isTopSeller: !this.state.isTopSeller}, () => {
			console.log(this.state.isTopSeller)
		});
	};

	render () {
		return (
			<Grid>
				<Row>
					<Col sm={12}>
						<h3>Създаване на продукт</h3>
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
							<FormInputField
								label="Описание"
								name="description"
								type="text"
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
							          onChange={this.handleCheckBox}>
								Top Seller
							</Checkbox>
						</Col>


						<Col xs={12}>
							<Button onClick={this.cancel}>Отказ</Button>
							<Button bsStyle='primary' type="submit">Създай</Button>
						</Col>

					</form>
				</Row>
			</Grid>
		);
	}
}

export default CreateProduct;

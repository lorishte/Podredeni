import React from 'react';
import {Link} from 'react-router-dom';

import XMLParser from 'react-xml-parser';

import { Row, Col, FormGroup, FormControl, ControlLabel, Checkbox, Radio, Button } from 'react-bootstrap';

import ekontRequester from '../../../../services/ekontRequester'

import FormField from './FormField';

class OrderDetails extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			country: '',
			city: '',
			postalCode: '',
			district: '',
			street: '',
			streetNo: '',
			block: '',
			entrance: '',
			floor: '',
			apartment: '',
			additional: ''
		};
	}

	componentDidMount () {
		ekontRequester.getOffices()
			.then(response => {

			console.log(response)
		})
			.catch(err => {
				console.log(err)
			})
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			console.log(this.state);
		});
	};


	getValidationState () {
		const length = this.state.firstName.length;
		if (length > 2) return 'success';

		return null;
	}

	render () {
		return (
			<form>
				<Row className="bg-light">
					<Col sm={12}>
						<h3>Recipient details</h3>
					</Col>
					<hr/>
					<Col sm={6}>
						<FormField
							label="First Name"
							name="firstName"
							type="text"
							value={this.state.firstName}
							required={true}
							onChange={this.handleChange}
							validation={this.getValidationState()}/>
					</Col>

					<Col sm={6}>
						<FormField
							label="Last Name"
							name="lastName"
							type="text"
							value={this.state.lastName}
							required={true}
							onChange={this.handleChange}
							validation={this.getValidationState()}/>
					</Col>

					<Col sm={6}>
						<FormField
							label="Phone"
							name="phone"
							type="phone"
							value={this.state.phone}
							required={true}
							onChange={this.handleChange}
							validation={this.getValidationState()}/>
					</Col>

					<Col sm={6}>
						<FormField
							label="Email"
							name="email"
							type="email"
							value={this.state.email}
							required={true}
							onChange={this.handleChange}
							validation={this.getValidationState()}/>
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						<h3>Delivery details</h3>
					</Col>
					<FormGroup>
						<Radio name="radioGroup" inline>
							Delivery to address
						</Radio>{' '}
						<Radio name="radioGroup" inline>
							Delivery to Ekont office
						</Radio>{' '}
					</FormGroup>

					<FormGroup controlId="formControlsSelect">
						<ControlLabel>Select</ControlLabel>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select</option>
							<option value="other">...</option>
						</FormControl>
					</FormGroup>

					<FormGroup controlId="formControlsTextarea">
						<ControlLabel>Comment</ControlLabel>
						<FormControl componentClass="textarea"/>
					</FormGroup>

					<Checkbox readOnly>
						I agree with the <Link to={'/products'} className="btn-link">Terms of Use.</Link>
					</Checkbox>
				</Row>


				<Button type="submit">Submit</Button>
			</form>
		);
	}
}

export default OrderDetails;

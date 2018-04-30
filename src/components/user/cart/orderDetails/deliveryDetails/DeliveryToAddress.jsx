import React from 'react';

import { Row, Col, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

import FormInputField from '../formComponents/FormInputField';

class AddressInfoInputs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			country: 'България',
			city: this.props.data.city,
			postalCode: this.props.data.postalCode,
			district: this.props.data.district,
			street: this.props.data.street,
			streetNo: this.props.data.streetNo,
			block: this.props.data.block,
			entrance: this.props.data.entrance,
			floor: this.props.data.floor,
			apartment: this.props.data.apartment,
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('addressDetails', this.state);
		});
	};

	render () {
		return (
			<div>
				<Row>
					<Col xs={12}>
						<h4>Please fill your address details</h4>
					</Col>
				</Row>

				<Row>
					<Col md={3} sm={4} xs={8}>
						<FormInputField
							label="Country"
							name="country"
							type="text"
							value={this.state.country}
							required={true}
							disabled={true}/>
					</Col>

					<Col md={4} sm={5} xs={8}>
						<FormInputField
							label="City"
							name="city"
							type="text"
							value={this.state.city}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col md={2} sm={3} xs={4}>
						<FormInputField
							label="Postal code"
							name="postalCode"
							type="text"
							value={this.state.postalCode}
							required={true}
							onChange={this.handleChange}/>
					</Col>
				</Row>

				<Row>

					<Col sm={4}  xs={8}>
						<FormInputField
							label="District"
							name="district"
							type="text"
							value={this.state.district}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={5} xs={8}>
						<FormInputField
							label="Street"
							name="street"
							type="text"
							value={this.state.street}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col md={2} sm={3} xs={3}>
						<FormInputField
							label="Str. No"
							name="streetNo"
							type="text"
							value={this.state.streetNo}
							required={true}
							onChange={this.handleChange}/>
					</Col>
				</Row>

				<Row>

					<Col sm={2} xs={3}>
						<FormInputField
							label="Block"
							name="block"
							type="text"
							value={this.state.block}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={2} xs={3}>
						<FormInputField
							label="Entrance"
							name="entrance"
							type="text"
							value={this.state.entrance}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={2} xs={3}>
						<FormInputField
							label="Floor"
							name="floor"
							type="text"
							value={this.state.floor}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={2} xs={3}>
						<FormInputField
							label="Apartment"
							name="apartment"
							type="text"
							value={this.state.apartment}
							required={true}
							onChange={this.handleChange}/>
					</Col>

				</Row>
			</div>

		);
	}
}

export default AddressInfoInputs;

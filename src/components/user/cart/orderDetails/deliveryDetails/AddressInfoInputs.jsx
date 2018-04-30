import React from 'react';

import { Row, Col, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

import FormInputField from '../formComponents/FormInputField';

class AddressInfoInputs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
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
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('addressDetails', this.state)
		});
	};

	render () {
		return (
			<Row>
				<Col xs={12}>
					<h4>Please fill your address details</h4>
				</Col>
				<Col sm={6}>
					<FormInputField
						label="District"
						name="district"
						type="text"
						value={this.state.district}
						required={true}
						onChange={this.handleChange}/>
				</Col>
				<Col sm={6}>
					<FormInputField
						label="Street"
						name="street"
						type="text"
						value={this.state.street}
						required={true}
						onChange={this.handleChange}/>
				</Col>
				<Col sm={6}>
					<FormInputField
						label="No"
						name="streetNo"
						type="number"
						value={this.state.streetNo}
						required={true}
						onChange={this.handleChange}/>
				</Col>
			</Row>
		);
	}
}

export default AddressInfoInputs;

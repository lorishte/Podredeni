import React from 'react';

import { Row, Col } from 'react-bootstrap';

import FormInputField from '../../../../common/formComponents/FormInputField';

import { ORDER_DELIVERY_INPUTS } from '../../../../../data/constants/componentConstants';


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
					<Col md={3} sm={4} xs={8}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.country}
							name="country"
							type="text"
							value={this.state.country}
							required={true}
							disabled={true}/>
					</Col>

					<Col md={4} sm={5} xs={8}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.city}
							name="city"
							type="text"
							value={this.state.city}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col md={2} sm={3} xs={4}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.postalCode}
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
							label={ORDER_DELIVERY_INPUTS.district}
							name="district"
							type="text"
							value={this.state.district}
							required={false}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={5} xs={8}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.street}
							name="street"
							type="text"
							value={this.state.street}
							required={false}
							onChange={this.handleChange}/>
					</Col>

					<Col md={2} sm={3} xs={3}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.streetNo}
							name="streetNo"
							type="text"
							value={this.state.streetNo}
							required={false}
							onChange={this.handleChange}/>
					</Col>
				</Row>

				<Row>

					<Col sm={2} xs={3}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.block}
							name="block"
							type="text"
							value={this.state.block}
							required={false}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={2} xs={3}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.entrance}
							name="entrance"
							type="text"
							value={this.state.entrance}
							required={false}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={2} xs={3}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.floor}
							name="floor"
							type="text"
							value={this.state.floor}
							required={false}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={2} xs={3}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.apartment}
							name="apartment"
							type="text"
							value={this.state.apartment}
							required={false}
							onChange={this.handleChange}/>
					</Col>

				</Row>
			</div>

		);
	}
}

export default AddressInfoInputs;

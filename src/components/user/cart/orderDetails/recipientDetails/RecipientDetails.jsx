import React from 'react';

import { Row, Col } from 'react-bootstrap';

import FormInputField from '../../../../common/formComponents/FormInputField';

import { ORDER_DELIVERY_INPUTS } from '../../../../../data/constants/componentConstants';


class RecipientInfoInputs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			firstName: this.props.data.firstName,
			lastName: this.props.data.lastName,
			email: this.props.data.email,
			phone: this.props.data.phone
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('recipientInfo', this.state);
		});
	};

	render () {
		return (
			<div>
				<Row>
					<Col md={4} sm={5} xs={6}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.firstName}
							name="firstName"
							type="text"
							value={this.state.firstName}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col md={4} sm={5} xs={6}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.lastName}
							name="lastName"
							type="text"
							value={this.state.lastName}
							required={true}
							onChange={this.handleChange}/>
					</Col>

				</Row>

				<Row>
					<Col md={4} sm={5} xs={6}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.phone}
							name="phone"
							type="tel"
							value={this.state.phone}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col md={4} sm={5} xs={6}>
						<FormInputField
							label={ORDER_DELIVERY_INPUTS.email}
							name="email"
							type="email"
							value={this.state.email}
							required={true}
							onChange={this.handleChange}/>
					</Col>
				</Row>
			</div>
		);
	}
}

export default RecipientInfoInputs;

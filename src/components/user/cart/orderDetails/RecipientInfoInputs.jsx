import React from 'react';

import { Row, Col } from 'react-bootstrap';

import FormField from './FormField';

class RecipientInfoInputs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: ''
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('recipientInfo', this.state);
		});
	};

	render () {
		return (
				<Row>
					<Col sm={6}>
						<FormField
							label="First Name"
							name="firstName"
							type="text"
							value={this.state.firstName}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={6}>
						<FormField
							label="Last Name"
							name="lastName"
							type="text"
							value={this.state.lastName}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={6}>
						<FormField
							label="Phone"
							name="phone"
							type="phone"
							value={this.state.phone}
							required={true}
							onChange={this.handleChange}/>
					</Col>

					<Col sm={6}>
						<FormField
							label="Email"
							name="email"
							type="email"
							value={this.state.email}
							required={true}
							onChange={this.handleChange}/>
					</Col>
				</Row>
		);
	}
}

export default RecipientInfoInputs;

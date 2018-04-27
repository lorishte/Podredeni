import React from 'react';
import { Redirect } from 'react-router-dom';

import { Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';

import requester from '../../services/requester';

class Login extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	getData (e) {
		this.setState({[e.target.name]: e.target.value});
	}

	loginUser = (e) => {
		e.preventDefault();

		requester
			.login(this.state)
			.then(response => {

				if (!response.success) {
					// toastr.error(response.message);
					console.log(response.message);
					return;
				}

				localStorage.setItem('token', response.token);
				localStorage.setItem('name', response.user.name);

				// toastr.success('Logged in')
				this.props.history.push('/');
			});
	};

	render () {
		return (
			<div className="container well">
				<Form horizontal>
					<h1>Login</h1>

					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl type="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl type="password" placeholder="Password" />
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Checkbox>Remember me</Checkbox>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit">Sign in</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default Login;
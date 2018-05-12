import React from 'react';

import { Grid, Form, FormGroup, Col, Button } from 'react-bootstrap';

import FormInputField from '../common/formComponents/FormInputField';

import authService from '../../services/auth/authService';

import constants from '../../data/constants/componentConstants';

class Login extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	loginUser = (e) => {
		e.preventDefault();

		authService
			.login(this.state)
			.then(response => {
				sessionStorage.setItem('p_token', response.token);
				this.props.history.push('/order/list');
			})
			.catch(err => console.log(err));
	};

	cancelLogin = () => {
		this.setState({
			email: '',
			password: ''
		});

		this.props.history.go(-1);
	};

	render () {
		return (
			<Grid>
				<Col xs={12} md={4}>
					<Form onSubmit={this.loginUser}>
						<h1>{constants.USER_ACCOUNT.login}</h1>

						<FormInputField
							label={constants.USER_ACCOUNT.email}
							name="email"
							type="email"
							value={this.state.email}
							required={true}
							onChange={this.handleChange}/>


						<FormInputField
							label={constants.USER_ACCOUNT.password}
							name="password"
							type="password"
							value={this.state.password}
							required={true}
							onChange={this.handleChange}/>

						<FormGroup>
							<Button onClick={this.cancelLogin}>{constants.USER_ACCOUNT.cancel}</Button>
							<Button type="submit" bsStyle="primary">{constants.USER_ACCOUNT.login}</Button>
						</FormGroup>
					</Form>
				</Col>
			</Grid>

		);
	}
}

export default Login;
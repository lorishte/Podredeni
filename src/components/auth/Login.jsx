import React from 'react';
import { ToastContainer } from 'react-toastr';

import { Grid, Form, FormGroup, Col, Button } from 'react-bootstrap';

import FormInputField from '../common/formComponents/FormInputField';

import authService from '../../services/auth/authService';

import { USER_ACCOUNT, TOASTR_MESSAGES } from '../../data/constants/componentConstants';

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
				sessionStorage.setItem('role', response.role);

				if (response.role === 'admin') {
					this.props.history.push('/order/list');
				} else {
					this.props.history.push('/');
				}
			})
			.catch(err => {
				this.toastContainer.error(err.statusText, TOASTR_MESSAGES.error, {
					closeButton: true,
				});
			});
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

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Col xs={12} md={4}>
					<Form onSubmit={this.loginUser}>
						<h1>{USER_ACCOUNT.login}</h1>

						<FormInputField
							label={USER_ACCOUNT.email}
							name="email"
							type="email"
							value={this.state.email}
							required={true}
							onChange={this.handleChange}/>


						<FormInputField
							label={USER_ACCOUNT.password}
							name="password"
							type="password"
							value={this.state.password}
							required={true}
							onChange={this.handleChange}/>

						<FormGroup>
							<Button onClick={this.cancelLogin}>{USER_ACCOUNT.cancel}</Button>
							<Button type="submit" bsStyle="primary">{USER_ACCOUNT.login}</Button>
						</FormGroup>
					</Form>
				</Col>
			</Grid>

		);
	}
}

export default Login;
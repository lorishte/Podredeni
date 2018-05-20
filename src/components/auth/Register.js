import React from 'react';
import { withRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastr';

import { Grid, Form, FormGroup, Col, Button } from 'react-bootstrap';

import FormInputField from '../common/formComponents/FormInputField';

import authService from '../../services/auth/authService';

import { USER_ACCOUNT, TOASTR_MESSAGES } from '../../data/constants/componentConstants';

class Register extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	registerUser = (e) => {
		e.preventDefault();

		if (this.state.password !== this.state.confirmPassword) {
			this.toastContainer.error(TOASTR_MESSAGES.passwordsMismatch, TOASTR_MESSAGES.error, {
				closeButton: true,
			});
			return
		}

		authService
			.register(this.state)
			.then(res => {
				sessionStorage.setItem('p_token', res.token);
				this.props.history.push('/order/list');
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value})
	};

	cancelRegister = () => {
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
					<Form onSubmit={this.registerUser}>
						<h1>{USER_ACCOUNT.register}</h1>

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


						<FormInputField
							label={USER_ACCOUNT.confirmPassword}
							name="confirmPassword"
							type="password"
							value={this.state.confirmPassword}
							required={true}
							onChange={this.handleChange}/>


						<FormGroup>
							<Button onClick={this.cancelRegister}>{USER_ACCOUNT.cancel}</Button>
							<Button type="reset">Reset</Button>
							<Button type="submit" bsStyle="primary">{USER_ACCOUNT.register}</Button>
						</FormGroup>
					</Form>
				</Col>
			</Grid>

		);
	}
}

export default withRouter(Register);
import React from 'react';
import { withRouter } from 'react-router-dom';
// import toastr from 'toastr';

import requester from '../../services/requester';


class Register extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
		};
	}

	getData (e) {
		this.setState({[e.target.name]: e.target.value});
	}

	registerUser = (e) => {
		e.preventDefault();

		requester
			.register({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				console.log(response);

				if (!response.success) {
					// toastr.error(response.message);
					console.log(response.message);
					return;
				}

				// toastr.success('User registered successfully!');
				this.props.history.push('/login');
			});
	};

	render () {

		return (
			<div className="container well">
				<h2>Register</h2>
			</div>
		);
	}
}

export default withRouter(Register);
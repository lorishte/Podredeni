import requesterService from '../requester';
const loginEndPoint = '/users/login';
const registerEndPoint = '/users/register';

export default {

	register: (state) => {

		let data = {
			Email: state.email,
			Password: state.password,
			ConfirmPassword: state.confirmPassword
		};

		return requesterService
			.post(registerEndPoint, null, data);
	},

	login: (state) => {

		let data = {
			Email: state.email,
			Password: state.password
		};

		return requesterService
			.post(loginEndPoint, null, data);
	}

};

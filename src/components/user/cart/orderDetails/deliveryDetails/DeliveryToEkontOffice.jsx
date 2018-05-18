import React from 'react';

import { Row, Col } from 'react-bootstrap';

import FormSelectField from '../../../../common/formComponents/FormSelectField';

// Services
import ekontRequester from '../../../../../services/ekont/ekontRequester';
import ekontDataParser from '../../../../../services/ekont/ekontDataConvertor';

import { RESOLUTIONS } from '../../../../../data/constants/componentConstants';

class EkontInfoInputs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			country: this.props.data.country || 'България',
			city: this.props.data.city || '',
			officeCode: this.props.data.officeCode || '',
			officeName: this.props.data.officeName || '',
			address: this.props.data.address || '',
			ekontData: '',
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		this.loadEkontOffices();

		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange );
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	loadEkontOffices = () => {
		ekontRequester.getOffices()
			.then(response => {
				let data = ekontDataParser.transformXml(response);
				this.setState({ekontData: data});
			})
			.catch(err => {
				console.log(err);
			});
	};

	handleChange = (e) => {

		if (e.target.name === 'country') {
			this.setState({
				city: '',
				address: '',
				officeCode: '',
				officeName: '',
			});

		} else if (e.target.name === 'city') {
			this.setState({
				address: '',
				officeCode: '',
				officeName: '',
			});
		} else if (e.target.name === 'officeName') {

			if (e.target.value === '') {
				this.setState({
					address: '',
					officeCode: '',
					officeName: '',
				});

				return;
			}

			let address = this.state.ekontData[this.state.country][this.state.city][e.target.value].address;
			let officeCode = this.state.ekontData[this.state.country][this.state.city][e.target.value].officeCode;

			this.setState({
				address,
				officeCode,
			});
		}

		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('ekontDetails', {
				country: this.state.country,
				city: this.state.city,
				officeCode: this.state.officeCode,
				officeName: this.state.officeName,
				address: this.state.address
			});
		});
	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth})
	};

	render () {

		let resolution = this.state.resolution < RESOLUTIONS.xs;
		let isAdmin = sessionStorage.getItem('role') === 'admin';

		return (
			<Row>
				{this.state.ekontData === '' && isAdmin && <div className="admin-loader"/> }
				{this.state.ekontData === '' && !isAdmin && <div className="loader"/> }

				{this.state.ekontData !== '' &&

					<div className="form-group">

						<Col xs={resolution ? 12 : 6} sm={4}>
							<FormSelectField
								label="Държава"
								name="country"
								value={this.state.country}
								defaultValue={this.state.country}
								optionsList={this.state.ekontData}
								required={true}
								onChange={this.handleChange}/>
						</Col>

						{this.state.country !== '' &&

							<div>
								<Col xs={resolution ? 12 : 6} sm={4}>
									<FormSelectField
										label="Населено място"
										name="city"
										value={this.state.city}
										defaultValue={this.state.city}
										optionsList={this.state.ekontData[this.state.country]}
										required={true}
										onChange={this.handleChange}/>
								</Col>

								{this.state.city !== '' &&

									<Col xs={resolution ? 12 : 6} sm={4}>
										<FormSelectField
											label="Наименование на офиса"
											name="officeName"
											defaultValue={this.state.officeName}
											value={this.state.officeName}
											optionsList={this.state.ekontData[this.state.country][this.state.city]}
											required={true}
											onChange={this.handleChange}/>
									</Col>
								}
							</div>
						}
					</div>
				}
			</Row>
		);
	}
}

export default EkontInfoInputs;

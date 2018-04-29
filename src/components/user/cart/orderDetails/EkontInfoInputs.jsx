import React from 'react';

import { Row, Col, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

import FormSelectField from './FormSelectField';

// Services
import ekontRequester from '../../../../services/ekontRequester';
import ekontDataParser from '../../../../services/ekontData';

class EkontInfoInputs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			country: 'България',
			city: '',
			address: '',
			officeCode: '',
			officeName: '',
			ekontData: ''
		};
	}

	componentDidMount () {
		ekontRequester.getOffices()
			.then(response => {
				let data = ekontDataParser.transformXml(response);
				console.log(data);
				this.setState({ekontData: data});
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleChange = (e) => {

		if (e.target.name === 'country') {
			this.setState({
				city: '',
				address: '',
				officeCode: '',
				officeName: '',
			})
		}
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('ekontDetails', this.state);
		});
	};

	render () {
		return (
			<Row>
				<Col xs={12}>
					<h4>Please select Ekont office</h4>
				</Col>

				{this.state.ekontData !== '' &&
				<div>
					<Col sm={6}>
						<FormSelectField
							label="Country"
							name="country"
							optionsList={this.state.ekontData}
							onChange={this.handleChange}/>
					</Col>
					{this.state.country !== '' &&
						<div>
						<Col sm={6}>
							<FormSelectField
								label="City"
								name="city"
								optionsList={this.state.ekontData[this.state.country]}
								onChange={this.handleChange}/>
						</Col>
							{this.state.city !== '' &&
							<Col sm={6}>
								<FormSelectField
									label="Office Name"
									name="officeName"
									optionsList={this.state.ekontData[this.state.country][this.state.city]}
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

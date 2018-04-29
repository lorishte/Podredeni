import React from 'react';

import { Row, Col, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

// Services
import ekontRequester from '../../../../services/ekontRequester';
import ekontDataParser from '../../../../services/ekontData';


class EkontInfoInputs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			country: '',
			city: '',
			address: '',
			officeCode: '',
			officeName: ''
		};
	}

	componentDidMount () {
		ekontRequester.getOffices()
			.then(response => {
				let ekontOffices = ekontDataParser.transformXml(response);
				console.log(ekontOffices);
			})
			.catch(err => {
				console.log(err);
			});
	}



	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('ekontDetails', this.state)
		});
	};

	render () {
		return (
			<Row>
				<Col xs={12}><h4>Please select Ekont office</h4></Col>
				<Col sm={6}>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>Select</ControlLabel>
						<FormControl componentClass="select" placeholder="select">
							<option value="select">select</option>
							<option value="other">some option</option>
						</FormControl>
					</FormGroup>
				</Col>
			</Row>
		);
	}
}

export default EkontInfoInputs;

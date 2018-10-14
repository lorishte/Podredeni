import React from 'react';
import { Row, Col, InputGroup, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { BUTTONS_BG, PARTNERS } from '../../../../../data/constants/componentConstants';

class PartnerAddressInput extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			city: '',
			address: ''
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	addAddress = (e) => {
		e.preventDefault();

		let el = this.state;

		for (let prop in el) {
			el[prop] = el[prop].trim();

			if (el[prop].length === 0) {
				this.props.showMessage(prop);
				return;
			}
		}

		this.props.addToAddressList(this.state);
		this.setState({
			city: '',
			address: ''
		});
	};

	render () {

		return (
			<Row>

				<Col xs={3} md={3} sm={3}>
					<FormGroup>
						<ControlLabel>{PARTNERS.city}</ControlLabel>
						<InputGroup>
							<FormControl type="text"
							             name="city"
							             value={this.state.city}
							             required={false}
							             disabled={false}
							             onChange={this.handleChange}/>
						</InputGroup>
					</FormGroup>
				</Col>

				<Col xs={7} md={7} sm={7}>
					<FormGroup>
						<ControlLabel>{PARTNERS.address}</ControlLabel>
						<InputGroup>
							<FormControl type="text"
							             name="address"
							             onChange={this.handleChange}
							             value={this.state.address}/>
							<InputGroup.Button >
								<button className="btn btn-primary"
								        onClick={this.addAddress}>{BUTTONS_BG.add}</button>
							</InputGroup.Button>
						</InputGroup>
					</FormGroup>
				</Col>
			</Row>
		);
	}
}

export default PartnerAddressInput;

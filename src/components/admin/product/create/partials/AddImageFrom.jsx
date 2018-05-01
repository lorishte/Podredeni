import React from 'react';
import { Link } from 'react-router-dom';


import { Row, Col, Button } from 'react-bootstrap';

import FormInputField from '../../../../common/formComponents/FormInputField';

class AddImageForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			imageUrl: '',
		};
	}

	handleChange = (e) => {
		this.setState({imageUrl: e.target.value}, () => {
			console.log(this.state);
		});
	};

	render () {
		return (
			<Col md={3} sm={4} xs={8}>
				<FormInputField
					label="Добави снимка"
					name="imageUrl"
					type="text"
					required={false}
					disabled={false}
					onChange={this.handleChange}/>

				<Button onClick={() => this.props.onEnter(this.state.imageUrl)} bsStyle='primary'>Добави</Button>
			</Col>
		);
	}
}

export default AddImageForm;

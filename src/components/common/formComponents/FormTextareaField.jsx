import React from 'react';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FormTextareaField extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			description: this.props.value
		};
	}

	componentWillReceiveProps (nextProps) {
		this.setState({description: nextProps.value});
	}


	render () {
		const {label, name, value, required, onChange, defaultValue} = this.props;

		return (
			<FormGroup controlId={name}>
				<ControlLabel>{label}{required && <label>&nbsp;*</label>}</ControlLabel>
				<FormControl
					defaultValue={defaultValue}
					componentClass="textarea"
					name={name}
					value={this.state.description}
					onChange={onChange}
					required={required}>
					{this.state.description}
				</FormControl>
			</FormGroup>
		);
	}
}

export default FormTextareaField;

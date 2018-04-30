import React from 'react';

import { FormGroup, HelpBlock, FormControl, ControlLabel  } from 'react-bootstrap';

class FormInputField extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const {type, label, name, value, required, onChange, placeholder, disabled} = this.props;

		return (
			<FormGroup controlId={name}>
				<ControlLabel>{label}{required && <label>&nbsp;*</label>}</ControlLabel>
				<FormControl
					type={type}
					name={name}
					value={value}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					onChange={onChange}
				/>
			</FormGroup>
		);
	}
}

export default FormInputField;

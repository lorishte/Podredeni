import React from 'react';

import { FormGroup, HelpBlock, FormControl, ControlLabel  } from 'react-bootstrap';

class FormField extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			value: this.props.value
		};
	}


	render () {

		const {type, label, name, value, required, onChange, validation} = this.props;

		return (
			<FormGroup
				controlId={name}
				validationState={validation}>
				<ControlLabel>{label}
				{required && <label>&nbsp;*</label>}</ControlLabel>
				<FormControl
					type={type}
					name={name}
					value={value}
					placeholder=''
					required={required}
					onChange={onChange}
				/>
				<FormControl.Feedback />
				<HelpBlock>Validation is based on string length.</HelpBlock>
			</FormGroup>
		);
	}
}

export default FormField;

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

		const {type, label, name, value, required, onChange} = this.props;

		return (
			<FormGroup controlId={name}>
				<ControlLabel>{label} {required && <label>&nbsp;*</label>}</ControlLabel>
				<FormControl
					type={type}
					name={name}
					value={value}
					placeholder=''
					required={required}
					onChange={onChange}
				/>
			</FormGroup>
		);
	}
}

export default FormField;

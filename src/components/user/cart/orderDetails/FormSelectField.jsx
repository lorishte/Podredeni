import React from 'react';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FormSelectField extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const {label, name, value, placeholder, required, onChange, optionsList} = this.props;

		let optionElements;
		let defaultValue = 'България' || 'Bulgaria';

		if (optionsList.isArray) {
			console.log(222);
		} else {
			let options = Object.keys(optionsList);

			optionElements = options.map(e => {
				if (e === 'България' || e === 'Bulgaria') {
					return <option key={e}>{e}</option>;
				}
				return <option key={e}>{e}</option>;
			});
		}

		return (
			<FormGroup controlId={name}>
				<ControlLabel>{label}{required && <label>&nbsp;*</label>}</ControlLabel>
				<FormControl
					defaultValue={defaultValue}
					componentClass="select"
					name={name}
					value={value}
					onChange={onChange}>
					{optionElements}
				</FormControl>
			</FormGroup>
		);
	}
}

export default FormSelectField;

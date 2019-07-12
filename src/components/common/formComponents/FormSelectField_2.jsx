import React from 'react';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FormSelectField_2 extends React.Component {

	render () {
		const {label, value, name, required, onChange, optionsList } = this.props;

		let optionElements = optionsList.map(e => {
			return <option key={e.id} name={e.id}>{e.name}</option>;
		});

		return (
			<FormGroup>
				<ControlLabel>{label}{required && <label className="text-danger">&nbsp;*</label>}</ControlLabel>
				<FormControl
					componentClass="select"
					name={name}
					value={value}
					onChange={onChange}
					required={required}>

					{optionElements}

				</FormControl>
			</FormGroup>
		);
	}
}

export default FormSelectField_2;

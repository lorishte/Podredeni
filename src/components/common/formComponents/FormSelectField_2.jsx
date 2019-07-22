import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FormSelectField_2 extends React.Component {

	render () {
		const {label, required, optionsList, onChange} = this.props;

		let optionElements = optionsList.map(e => {
			return <option key={e.id}  name={e.id}>{e.name}</option>;
		});

		return (
			<FormGroup>
				<ControlLabel>{label}{required && <label className="text-danger">&nbsp;*</label>}</ControlLabel>
				<FormControl
					componentClass="select"
					onChange={onChange}>

					{optionElements}

				</FormControl>
			</FormGroup>
		);
	}
}

export default FormSelectField_2;

FormSelectField_2.propTypes = {
	label: PropTypes.string,
	required: PropTypes.bool,
	optionsList: PropTypes.array,
	onChange: PropTypes.func,
};
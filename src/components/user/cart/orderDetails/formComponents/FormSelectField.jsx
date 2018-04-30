import React from 'react';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class FormSelectField extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			selected: this.props.value
		};
	}

	componentWillReceiveProps (nextProps) {
		this.setState({selected: nextProps.value});
	}

	render () {
		const {label, name, value, required, onChange, optionsList, defaultValue} = this.props;

		let options = Object.keys(optionsList);

		let optionElements = options.map(e => {
			return <option key={e}>{e}</option>;
		});

		return (
			<FormGroup controlId={name}>
				<ControlLabel>{label}{required && <label>&nbsp;*</label>}</ControlLabel>
				<FormControl
					defaultValue={defaultValue}
					componentClass="select"
					name={name}
					value={this.state.value}
					onChange={onChange}
					required={required}>

					<option value="">Please select:</option>

					{optionElements}

				</FormControl>
			</FormGroup>
		);
	}
}

export default FormSelectField;

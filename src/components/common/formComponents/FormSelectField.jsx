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
		const {label, name, required, onChange, optionsList } = this.props;

		let options = Object.keys(optionsList);

		let optionElements = options.map(e => {
			return <option key={e}>{e}</option>;
		});

		return (
			<FormGroup controlId={name}>
				<ControlLabel>{label}{required && <label className="text-danger">&nbsp;*</label>}</ControlLabel>
				<FormControl
					componentClass="select"
					name={name}
					value={this.state.selected}
					onChange={onChange}
					required={required}>

					<option value="" disabled={false}>Моля, изберете:</option>

					{optionElements}

				</FormControl>
			</FormGroup>
		);
	}
}

export default FormSelectField;

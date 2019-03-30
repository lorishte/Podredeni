import React from 'react';
import PropTypes from 'prop-types';
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
		const {label, name, value, required, onChange, defaultValue, rows, cols, placeholder} = this.props;

		return (
			<FormGroup controlId={name}>
				<ControlLabel>{label}{required && <label className="text-danger">&nbsp;*</label>}</ControlLabel>
				<FormControl
					defaultValue={defaultValue}
					componentClass="textarea"
					rows={rows}
					cols={cols}
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

FormTextareaField.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	defaultValue: PropTypes.string,
	placeholder: PropTypes.string,
	rows: PropTypes.number,
	cols: PropTypes.number,
	onChange: PropTypes.func
};
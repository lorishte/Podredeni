import React from 'react';

import { FormControl, ControlLabel, FormGroup, MenuItem, DropdownButton, InputGroup } from 'react-bootstrap';

class FormInputWithDropdown extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			filterProperty: this.props.filterProperty,
			filterValue: this.props.filterValue
		};
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			filterProperty: nextProps.filterProperty,
			filterValue: nextProps.filterValue
		});
	}

	render () {
		const {label, inputName, placeholder, dropdownName, onSelect, onKeyDown, onChange, optionsList} = this.props;

		let options = Object.keys(optionsList);

		let optionElements = options.map((e, i) => {
			return <MenuItem key={i} eventKey={e}>{optionsList[e]}</MenuItem>
		});

		return (
			<FormGroup>
				<ControlLabel>{label}</ControlLabel>
				<InputGroup>

					<FormControl type="text"
					             name={inputName}
					             value={this.state.filterValue}
					             placeholder={placeholder}
					             onChange={onChange}
					             onKeyDown={onKeyDown}/>

					<DropdownButton componentClass={InputGroup.Button}
					                bsStyle="primary"
					                id='filter-options-dropdown'
					                title={optionsList[this.state.filterProperty]}
					                value={this.state.filterProperty}
					                name={dropdownName}
					                onSelect={onSelect}>

						{optionElements}

					</DropdownButton>
				</InputGroup>
			</FormGroup>
		);
	}
}

export default FormInputWithDropdown;

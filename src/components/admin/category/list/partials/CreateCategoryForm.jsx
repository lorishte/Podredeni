import React from 'react';

import { FormControl, InputGroup, Button, FormGroup, ControlLabel  } from 'react-bootstrap';

class CreateCategoryForm extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const {btnLabel, text, label, createCategory, updateNewCategoryName } = this.props;

		return (
			<FormGroup>
				<ControlLabel>{label}</ControlLabel>
				<InputGroup>
					<FormControl onChange={updateNewCategoryName} type="text" value={text}/>
					< InputGroup.Button >
						< Button className={'btn btn-primary'} onClick={createCategory}>{btnLabel}</Button>
					</InputGroup.Button>
				</InputGroup>
			</FormGroup>
		);
	}
}

export default CreateCategoryForm;

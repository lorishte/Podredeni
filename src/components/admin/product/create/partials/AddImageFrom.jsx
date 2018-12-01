import React from 'react';

import { ControlLabel, Button, FormControl, FormGroup, InputGroup } from 'react-bootstrap';


class AddImageForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			imageUrl: '',
		};
	}

	handleChange = (e) => {
		this.setState({imageUrl: e.target.value});
	};

	addImage = () => {
		if(this.state.imageUrl === '') return;

		this.props.addImage((this.state.imageUrl));
		this.setState({imageUrl: ''});
	};

	render () {
		return (
			<FormGroup>
				<ControlLabel>{this.props.label}</ControlLabel>
				<InputGroup>
					<FormControl type="text"
					             onChange={this.handleChange}
					             value={this.state.imageUrl}/>
					< InputGroup.Button >
						< Button onClick={this.addImage}>Добави</Button>
					</InputGroup.Button>
				</InputGroup>
			</FormGroup>
		);
	}
}

export default AddImageForm;

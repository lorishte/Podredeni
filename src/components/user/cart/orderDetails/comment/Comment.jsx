import React from 'react';

import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import FormInputField from '../formComponents/FormInputField';

class Comment extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			comment: ''
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('comment', this.state.comment);
		});
	};

	render () {
		return (
			<FormGroup controlId={this.props.id}>
				<ControlLabel>Comment</ControlLabel>
				<FormControl
					componentClass="textarea"
					name="comment"
					onChange={this.handleChange}/>
			</FormGroup>
		);
	}
}

export default Comment;

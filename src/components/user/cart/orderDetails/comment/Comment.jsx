import React from 'react';

import { FormGroup, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';

class Comment extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			comment: this.props.data
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.props.onChange('comment', this.state.comment);
		});
	};

	render () {
		return (

			<Row>
				<Col sm={8}>
					<FormGroup controlId={this.props.id}>
						<ControlLabel>Забележка</ControlLabel>
						<FormControl
							componentClass="textarea"
							name="comment"
							value={this.state.comment}
							onChange={this.handleChange}/>
					</FormGroup>
				</Col>
			</Row>

		);
	}
}

export default Comment;

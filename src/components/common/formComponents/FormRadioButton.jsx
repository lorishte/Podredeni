import React from 'react';

class FormRadioButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxState: true
        };
    }

    render() {

        return (
            <label>
                <input type="radio" checked={this.props.checked} value={this.props.value} onChange={this.props.onChange} />
		        {this.props.label}
            </label>
        );
    }
}

export default FormRadioButton;

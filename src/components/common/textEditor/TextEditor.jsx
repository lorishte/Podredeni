import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';

class TextEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: RichTextEditor.createValueFromString(this.props.value, 'html')
        }
    }

    onChange = (value) => {

        this.setState({value});

        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.

            this.props.onChange(value.toString('html'), this.props.name);
        }
    };

    render() {

        let value = this.state.value;

        return (
            <div>
                <RichTextEditor
                    value={value}
                    onChange={this.onChange}
                />
            </div>

        );
    }
}

export default TextEditor;

TextEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
}
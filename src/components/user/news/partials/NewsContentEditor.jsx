import React from 'react';

//external components
import {Editor} from 'slate-react'

function CodeNode(props) {
    return (
        <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
    )
}

function BoldMark(props) {
    return <strong>{props.children}</strong>
}

class NewsContentEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initialValue,
        }
    }

    onKeyDown = (event, change) => {

        if (!event.ctrlKey) return;

        switch (event.key) {
            // When "B" is pressed, add a "bold" mark to the text.
            case 'b': {
                console.log('b pressed');
                event.preventDefault();
                change.addMark('bold');
                return true
            }
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
                const isCode = change.value.blocks.some(block => block.type === 'code');
                event.preventDefault();
                change.setBlocks(isCode ? 'paragraph' : 'code');
                return true
            }
        }

    };

    renderNode = props => {
        switch (props.node.type) {
            case 'code':
                return <CodeNode {...props} />
        }
    };

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
        }
    };

    render() {

        const {onChange, value} = this.props;

        return <div>
            <Editor
                value={value}
                onChange={onChange}
                onKeyDown={this.onKeyDown}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
            />
        </div>
    }
}

export default NewsContentEditor;
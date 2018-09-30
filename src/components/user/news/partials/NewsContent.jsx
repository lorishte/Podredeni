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

class NewsContent extends React.Component {

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

        const {value} = this.props;

        return <div>
            <Editor value={value}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
            />
        </div>
    }
}

export default NewsContent;
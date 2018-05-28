import React, {Component} from 'react'

class Video extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return <iframe src={this.props.src}
                       width="500"
                       height=""
                       key=""
                       style={{"border": "none", "overflow": "hidden"}}
                       scrolling="no"
                       frameBorder="0"
                       data-show-text="false"
                       allowtransparency="false"
                       allow="encrypted-media"
                       allowFullScreen="false">
        </iframe>
    }
}

export default Video;
import React, {Component} from 'react'

class Video extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return <iframe src={this.props.src}
                       className="video"
                       scrolling="no"
                       frameBorder="0"
                       data-show-text="false"
                       allowtransparency="false"
                       allow="encrypted-media"
                       allowFullScreen={true}>
        </iframe>
    }
}

export default Video;
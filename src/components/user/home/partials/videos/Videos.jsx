import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Video from './partials/Video';

import {FACEBOOK_VIDEOS} from '../../../../../data/constants/componentConstants';

class Videos extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let index = 1;
        let count = FACEBOOK_VIDEOS.length;

        let videos = FACEBOOK_VIDEOS.map(v => {
            return <Col key={index++}  xs={12 / count}>
                <div className="facebook-responsive">
                    <Video src={v}/>
                </div>
            </Col>
        });
        return <div className="videos">
            {videos}
        </div>
    }
}

export default Videos;
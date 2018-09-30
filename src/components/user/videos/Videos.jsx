import React from 'react';

import {Grid, Col} from 'react-bootstrap';

import Video from './partials/Video';

import videos from '../../../services/videos/videosService';

import {FACEBOOK_VIDEOS} from '../../../data/constants/componentConstants';

class Videos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: []
        }
    }

    loadVideos = () => {

        videos.loadAll()
            .then(res => {
                this.setState({videos: res})
            })
            .catch(err => {
                this.props.history.push('/error');
            });

    };

    render() {

        let videos = FACEBOOK_VIDEOS;

        if (this.state.videos.length > 0) videos = this.state.videos;

        videos = videos.map((v, i) => {
            return (
                <Col key={i} sm={6} xs={12}>
                    <Video src={v}/>
                </Col>);
        });


        return (
            <Grid id="videos">
                {videos}
            </Grid>
        );
    }
}

export default Videos;
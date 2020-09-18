import React from 'react';
import {Grid, Col} from 'react-bootstrap';

// SEO
import SEO_MetaTags from '../../common/SEO/SEO_MetaTags'

// Partials
import Video from './partials/Video';


// Services
import videos from '../../../services/videos/videosService';



class Videos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        this.loadVideos();
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

        let videos;
        if (this.state.videos.length > 0) {
	        videos = this.state.videos.map((v, i) => {
		        return (
                    <Col key={i} sm={6} xs={12}>
                        <Video src={v.url}/>
                    </Col>);
	        });

        }

        let urlPath = this.props.location.pathname;

        return (
            <Grid id="videos">

                <SEO_MetaTags activeLanguage={'bg'} pageName={'videos'} url={urlPath}/>

	            {this.state.videos.length === 0 && <div className="loader"/>}
                {videos}
            </Grid>
        );
    }
}

export default Videos;
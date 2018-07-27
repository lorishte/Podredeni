import React from 'react';

import { Grid, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import newsService from '../../../services/news/newsService';

import { RESOLUTIONS, BUTTONS_BG } from '../../../data/constants/componentConstants';

class News extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            title: '',
            imageUrl: '',
            content: '',
            resolution: window.innerWidth
        };
    }

    componentDidMount () {
        window.scrollTo(0, 0);
        window.addEventListener('orientationchange',  this.handleResolutionChange );
        window.addEventListener('resize', this.handleResolutionChange);

        this.loadNewsData();
    }

    componentWillUnmount () {
        window.removeEventListener('orientationchange', this.handleResolutionChange );
        window.removeEventListener('resize', this.handleResolutionChange);
    }

    loadNewsData = () => {
        let id = this.props.match.params.id;
        newsService
            .loadNews(id)
            .then(res => {
                this.setState({title: res.news.title, imageUrl: res.news.imageUrl, content: res.news.content});
            })
            .catch(err => {
                this.props.history.push('/error');
            });
    };

     handleResolutionChange = () => {
        this.setState({resolution: window.innerWidth})
    };

    render () {
        let resolution = this.state.resolution < RESOLUTIONS.xs;

        return (
            <Grid id="news-details">
                <Row>
                    <Col xs={resolution ? 12 : 6} sm={6} md={5}>
                        <Image src={this.state.imageUrl}/>
                    </Col>
                    <Col xs={resolution ? 12 : 6} sm={6} md={7}>
                        <h2>{this.state.title}</h2>
                        <p>{this.state.content}</p>
                    </Col>
                </Row>

                <Col xs={12} className="text-center">
                    <Link className={"btn-custom default md"} to={{pathname: '/news'}} >{BUTTONS_BG.back}</Link>
                </Col>
            </Grid>
        );
    }
}

export default News;
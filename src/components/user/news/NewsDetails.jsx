import React from 'react';

//external components
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//services
import newsService from '../../../services/news/newsService';

//constants
import {RESOLUTIONS, BUTTONS_BG, NEWS_CONTENT_EMPTY} from '../../../data/constants/componentConstants';

class News extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            imageUrl: '',
            content: '',
            resolution: window.innerWidth
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('orientationchange', this.handleResolutionChange);
        window.addEventListener('resize', this.handleResolutionChange);

        this.loadNewsData();
    }

    componentWillUnmount() {
        window.removeEventListener('orientationchange', this.handleResolutionChange);
        window.removeEventListener('resize', this.handleResolutionChange);
    }

    loadNewsData = () => {
        let id = this.props.match.params.id;
        newsService
            .loadNews(id)
            .then(res => {

                this.setState({
                    title: res.news.title,
                    imageUrl: res.news.imageUrl,
                    content: res.news.content
                });
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            });
    };

    handleResolutionChange = () => {
        this.setState({resolution: window.innerWidth})
    };

    render() {
        let resolution = this.state.resolution < RESOLUTIONS.xs;

        return (
            <Grid id="news-details">
                <Row>
                    <Col xs={resolution ? 12 : 6} sm={6} md={5}>
                        <Image src={this.state.imageUrl}/>
                    </Col>
                    <Col xs={resolution ? 12 : 6} sm={6} md={7}>
                        <h2>{this.state.title}</h2>

                        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />

                        <div className="buttons-container">
                            <Link className={"btn-custom light md"} to={{pathname: '/news/list'}}>{BUTTONS_BG.back}</Link>
                        </div>

                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default News;
import React from 'react';

// SEO
import SEO_MetaTags_Dynamic from "../../common/SEO/SEO_MetaTags_Dynamic";

//external components
import {Grid, Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//services
import newsService from '../../../services/news/newsService';

//constants
import {RESOLUTIONS, BUTTONS_BG, NEWS_CONTENT_EMPTY} from '../../../data/constants/componentConstants';

// Utils
import utils from '../../../utils/utils'
import SEO_MetaTags_News from "../../common/SEO/SEO_MetaTags_News";

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
        let title = this.state.title;

        let urlPath = this.props.location.pathname;
        let description = utils.removeTags(this.state.content)
        description = utils.shortenString(description, 155, ' ')

        return (
            <Grid id="news-details">

                <SEO_MetaTags_News activeLanguage={'bg'} pageName={'newsDetails'} description={description} title={title} url={urlPath} />

                <Row>
                    <Col xs={resolution ? 12 : 6} sm={6} md={5}>
                        <Image src={this.state.imageUrl}/>
                    </Col>
                    <Col xs={resolution ? 12 : 6} sm={6} md={7}>
                        <h1>{title}</h1>

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
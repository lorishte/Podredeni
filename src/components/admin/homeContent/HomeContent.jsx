import React from 'react';
import { ToastContainer } from 'react-toastr';

// Partials
import ArticleManage from './article/ArticleManage';
import CarouselManage from './carousel/CarouselManage';
import { TOASTR_MESSAGES } from '../../../data/constants/componentConstants';

// Helpers
import { Grid, Tabs, Tab } from 'react-bootstrap';

import homeContentService from '../../../services/homeContent/homeContentService';

class HomeContent extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            sectionHeading: '',
            sectionContent: '',
            articleHeading: '',
            articleContent: '',
            carouselItems: []
        }
    }

    componentDidMount () {
        this.loadArticle();
        this.loadCarouselItems();
    }

    loadCarouselItems = () => {
        homeContentService
            .loadCarouselItems()
            .then(res => {
                this.setState({carouselItems: res.carouselItems})
            })
            .catch(err => {
            this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                closeButton: false,
            });
        });

    };

    loadArticle = () => {
        homeContentService
            .loadArticle()
            .then(res => {
                this.setState({sectionHeading: res.content.sectionHeading,
                    sectionContent: res.content.sectionContent,
                    articleHeading: res.content.articleHeading,
                    articleContent: res.content.articleContent})
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    handleChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    };


    render () {

        return (
            <Grid id="homeContent">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Tabs defaultActiveKey={1} id="homeContent-tabs">
                    <Tab eventKey={1} title="Карусел">

                        <CarouselManage
                            data={this.state}
                        />

                    </Tab>
                    <Tab eventKey={2} title="Статия">

                        <ArticleManage

                            data={this.state}
                            handleChange={this.handleChange}
                        />
                    </Tab>
                </Tabs>

            </Grid>
        );
    }
}

export default HomeContent;

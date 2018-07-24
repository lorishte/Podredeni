import React from 'react';

import { Grid, Carousel } from 'react-bootstrap';

import { MAIN_CAROUSEL_TIMER_INTERVAL } from '../../../../../data/constants/componentConstants';

import newsService from '../../../../../services/news/newsService';
import NewsCard from "./partials/NewsCard";

class NewsCarousel extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            index: 0,
            direction: null,

            news: [],
            page: 1,      //3 most recent news
            size: 3       //3 most recent news
        };

        this.carousel = React.createRef();
        this.timer = null;
    }

    componentDidMount () {
        this.loadNews();
        this.startTimer();
    };

    componentWillUnmount () {
        clearInterval(this.timer);
    }

    startTimer = () => {
        this.timer = setInterval(this.changeSlide, MAIN_CAROUSEL_TIMER_INTERVAL);
    };

    changeSlide = () => {
        let index = this.state.index + 1;
        if (this.state.index === this.carousel.current.props.children.length - 1) {
            index = 0
        }

        this.setState({
            index: index,
            direction: 'next'
        });
    };

    handleSelect = (selectedIndex, e) => {
        clearInterval(this.timer);

        this.setState({
            index: selectedIndex,
            direction: e.direction
        });

        this.startTimer();
    };

    loadNews = () => {

        newsService.loadNewsList(this.state)
            .then(res => {
                this.setState({news: res.news});
            })
            .catch(err => {
            this.props.history.push('/error');
        });
    };


    render () {
        const {index, direction} = this.state;

        let news;
        if(this.state.news.length > 0) {

            news = this.state.news.map(e => {

                return <Carousel.Item>
                    <NewsCard
                        key={e.id}
                        data={e}/>
                    </Carousel.Item>
            })
        }

        return (
            <Grid fluid id="home-news-carousel">

                <div className="section-heading" style={{textAlign: 'center'}}>
                    <h1>НОВИНИ</h1>
                </div>


                <Carousel
                    ref={this.carousel}
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.handleSelect}>

                    {news}

                </Carousel>
            </Grid>
        );
    }
}

export default NewsCarousel;
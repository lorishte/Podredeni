import React from 'react';

// Helpers
import {Grid, Carousel} from 'react-bootstrap';

import homeContentService from '../../../../../services/homeContent/homeContentService';

import {MAIN_CAROUSEL_TIMER_INTERVAL} from '../../../../../data/constants/componentConstants';

class ControlledCarousel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            carouselItems: [],
            index: 0,
            direction: null
        };

        this.carousel = React.createRef();
        this.timer = null;
    }

    componentDidMount() {
        this.loadCarouselItems();
        this.startTimer();
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    loadCarouselItems = () => {
        homeContentService
            .loadCarouselItems()
            .then(res => {
                this.setState({carouselItems: res.carouselItems});
            })
            .catch(err => {
                console.log(err);
            });

    };

    startTimer = () => {
        this.timer = setInterval(this.changeSlide, MAIN_CAROUSEL_TIMER_INTERVAL);
    };

    changeSlide = () => {
        let index = this.state.index + 1;
        if (this.state.index === this.carousel.current.props.children.length - 1) {
            index = 0;
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

    render() {
        const {index, direction} = this.state;

        let items = [];

        for (let i = 0; i < this.state.carouselItems.length; i++) {

            let item = this.state.carouselItems[i];

            items.push(
                <Carousel.Item key={item.id}>
                    <img className="carousel-img" alt={item.heading} src={item.imageUrl}/>
                    <Carousel.Caption>
                        <h1 className="carousel-heading">{item.heading}</h1>
                        {window.innerWidth > 550 &&
                        <p className="carousel-text">{item.content}</p>
                        }

                    </Carousel.Caption>
                </Carousel.Item>
            );

        }

        return (
            <Grid fluid id="home-main-carousel">
                <img src="/images/readerest_logo.png" className="logo"/>
                <Carousel
                    ref={this.carousel}
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.handleSelect}>

                    {items}

                </Carousel>
            </Grid>
        );
    }
}

export default ControlledCarousel;
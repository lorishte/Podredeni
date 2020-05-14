import React from 'react';
import {Grid, Carousel} from 'react-bootstrap';

// Services
import homeContentService from '../../../../../services/homeContent/homeContentService';
import miscDataService from "../../../../../services/miscData/miscDataService";


// Constants
import {MAIN_CAROUSEL_TIMER_INTERVAL, TOASTR_MESSAGES} from '../../../../../data/constants/componentConstants';
import sliders from "../../../../../data/slider";


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

        this.setState({carouselItems: sliders});

        miscDataService
            .loadMiscData('homeSliders')
            .then(res => {

                let data = JSON.parse(res).filter(e => e.isVisible);

                this.setState({
                    carouselItems: data
                })
            })
            .catch(err => {
                console.log(err);
            });

        // homeContentService
        //     .loadCarouselItems()
        //     .then(res => {
        //         // console.log(res)
        //
        //         // this.setState({carouselItems: res.carouselItems});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

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

            let url = 'images/slider/' + item.imageUrl

            items.push(
                <Carousel.Item key={item._id}>
                    <img className="carousel-img" src={url} alt={item.imageUrl}/>
                    <Carousel.Caption>
                        <h3 className="carousel-heading">{item.heading}</h3>
                        {window.innerWidth > 550 &&
                        <p className="carousel-text">{item.text}</p>
                        }

                        {item.buttonLink !== '' &&
                        <a href={item.buttonLink} className={'btn btn-custom light'}>{item.buttonText}</a>
                        }
                    </Carousel.Caption>
                </Carousel.Item>
            );

        }

        return (
            <Grid fluid id="home-main-carousel">
                {/*<img src="/images/readerest_logo.png" className="logo"/>*/}
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
import React from 'react';

import {Grid} from 'react-bootstrap';

import TopSellerProductCard from './partials/TopSellerProductCard';

import productsService from '../../../../../services/products/productsService';

import {
    TOASTR_MESSAGES,
    HOME,
    RESOLUTIONS,
    TOP_SELLERS_TIMER_INTERVAL, TESTIMONIALS_TIMER_INTERVAL
} from '../../../../../data/constants/componentConstants';

class TopSellers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            size: 50,
            page: 1,
            filterProperty: 'IsTopSeller',
            filterValue: true,
            translateValue: 0,
            cardWidth: 0,
            productsToShow: 0,
            direction: 'next'
        };

        this.topSellers = React.createRef();
        this.container = React.createRef();
        this.timer = null;
    }

    componentDidMount() {
        this.loadProducts();
        this.handleResolutionChange();
        window.addEventListener('resize', this.handleResolutionChange);
        window.addEventListener('orientationchange', this.handleResolutionChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResolutionChange);
        window.removeEventListener('orientationchange', this.handleResolutionChange);

        clearInterval(this.timer);
    }

    startTimer = () => {
        this.timer = setInterval(this.moveCarousel, TOP_SELLERS_TIMER_INTERVAL);
    }

    stopTimer = () => {
        clearInterval(this.timer);
    }

    handleResolutionChange = () => {

        if (window.innerWidth < RESOLUTIONS.smTopSellers) {
            this.setState({productsToShow: 1}, () => {
                this.getCardWidth();
            });
        } else if (window.innerWidth < RESOLUTIONS.mdTopSellers) {
            this.setState({productsToShow: 2}, () => {
                this.getCardWidth();
            });
        } else {
            this.setState({productsToShow: 3}, () => {
                this.getCardWidth();
            });
        }
    };

    loadProducts = () => {
        productsService
            .loadProducts(this.state)
            .then(res => {
                res.products.forEach(p => p.images.reverse());
                this.setState({products: res.products}, () => this.startTimer());
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    getCardWidth = () => {
        let cardWidth = Math.floor(this.container.current.clientWidth / this.state.productsToShow);

        if (this.state.products.length > 0) {
            this.topSellers.current.style.width = (cardWidth * this.state.products.length) + 'px';
        } else {
            this.topSellers.current.style.width = window.innerWidth + 'px';
        }

        this.setState({cardWidth: cardWidth});
    };

    move = (direction) => {
        this.setState({direction}, () => this.moveCarousel())
    }

    moveCarousel = () => {

        let step = this.state.cardWidth;

        let translateValue = this.state.translateValue;

        let direction = this.state.direction;

        if (direction === 'next') {
            translateValue += step;
        } else if (direction === 'prev') {
            translateValue -= step;
        }

        let translateMaxValue = (this.state.products.length - this.state.productsToShow) * this.state.cardWidth;

        if (translateValue > translateMaxValue) {
            this.setState({direction: 'prev'})
            translateValue = translateMaxValue;
        } else if (translateValue < 0) {
            this.setState({direction: 'next'})
            translateValue = 0;
        }


        this.setState({translateValue});

        let topSellersContainer = this.topSellers.current;

        window.requestAnimationFrame(function () {
            topSellersContainer.style.transform = `translateX(-${translateValue}px)`;
            topSellersContainer.style.transition = '.5s';
        });
    };

    render() {

        let cards;
        if (this.state.products.length > 0) {
            cards = this.state.products.map(product => {
                return <TopSellerProductCard key={product.id} data={product} width={this.state.cardWidth}/>;
            });
        }

        let translateMaxValue = (this.state.products.length - this.state.productsToShow) * this.state.cardWidth;

        return (
            <Grid fluid id="top-sellers" className="bg-white">
                <Grid>

                    <h1 className="section-heading">{HOME.topSellers}</h1>

                    {this.state.products.length === 0 && <div className="loader"/>}

                    <div className="top-sellers-carousel"
                         onMouseEnter={this.stopTimer}
                         onMouseLeave={this.startTimer}
                         ref={this.container}>


                        <div className="top-sellers"
                             ref={this.topSellers}
                             >
                            {cards}
                        </div>

                        <button disabled={this.state.translateValue <= 10}
                                className="carousel-control left"
                                onClick={() => this.move('prev')}>
                            <span className="glyphicon glyphicon-chevron-left"/>
                            <span className="sr-only">Prev</span>
                        </button>

                        {this.topSellers.current !== null &&
                        <button
                            disabled={this.state.translateValue >= translateMaxValue}
                            className="carousel-control right"
                            onClick={() => this.move('next')}>
                            <span className="glyphicon glyphicon-chevron-right"/>
                            <span className="sr-only">Next</span>
                        </button>}

                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default TopSellers;
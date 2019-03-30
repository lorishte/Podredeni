import React from 'react';

import { Grid } from 'react-bootstrap';

import TopSellerProductCard from './partials/TopSellerProductCard';

import productsService from '../../../../../services/products/productsService';

import { TOASTR_MESSAGES, HOME, RESOLUTIONS } from '../../../../../data/constants/componentConstants';

class TopSellers extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],
			size: 50,
			page: 1,
			filterProperty: 'IsTopSeller',
			filterValue: true,
			translateValue: 0,
			cardWidth: 0,
			productsToShow: 0
		};

		this.topSellers = React.createRef();
		this.container = React.createRef();
	}

	componentDidMount () {
		this.loadProducts();
		this.handleResolutionChange();
		window.addEventListener('resize', this.handleResolutionChange);
		window.addEventListener('orientationchange', this.handleResolutionChange);
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResolutionChange);
		window.removeEventListener('orientationchange', this.handleResolutionChange);
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

	getCardWidth = () => {
		let cardWidth = Math.floor(this.container.current.clientWidth / this.state.productsToShow);

		if (this.state.products.length > 0) {
			this.topSellers.current.style.width = (cardWidth * this.state.products.length) + 'px';
		} else {
			this.topSellers.current.style.width = window.innerWidth + 'px';
		}

		this.setState({cardWidth: cardWidth});
	};

	loadProducts = () => {
		productsService
			.loadProducts(this.state)
			.then(res => {
				res.products.forEach(p => p.images.reverse());
				this.setState({products: res.products});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	loadPrevious = () => {
		let step = this.state.cardWidth;
		let translateValue = this.state.translateValue - step;
		this.moveCarousel(translateValue);
	};

	loadNext = () => {
		let step = this.state.cardWidth;
		let translateValue = this.state.translateValue + step;
		this.moveCarousel(translateValue);
	};

	moveCarousel = (translateValue) => {

		let translateMaxValue = (this.state.products.length - this.state.productsToShow ) * this.state.cardWidth;
		if (translateValue < 0 || translateValue > translateMaxValue ) return;

		this.setState({translateValue});

		let topSellersContainer = this.topSellers.current;
		window.requestAnimationFrame(function () {
			topSellersContainer.style.transform = `translateX(-${translateValue}px)`;
			topSellersContainer.style.transition = '.5s';
		});
	};

	render () {

		let cards;
		if (this.state.products.length > 0) {
			cards = this.state.products.map(product => {
				return <TopSellerProductCard key={product.id} data={product} width={this.state.cardWidth}/>;
			});
		}

		let translateMaxValue = (this.state.products.length - this.state.productsToShow ) * this.state.cardWidth;

		return (
			<Grid fluid id="top-sellers" className="bg-white">
				<Grid>

					<h1 className="section-heading">{HOME.topSellers}</h1>

					{this.state.products.length === 0 && <div className="loader"/> }

					<div className="top-sellers-carousel" ref={this.container}>

						<button disabled={this.state.translateValue <= 10}
						        className="carousel-control left"
						        onClick={this.loadPrevious}>
							<span className="glyphicon glyphicon-chevron-left"/>
							<span className="sr-only">Prev</span>
						</button>

						{this.topSellers.current !== null &&
						<button
							disabled={this.state.translateValue >= translateMaxValue}
							className="carousel-control right"
							onClick={this.loadNext}>
							<span className="glyphicon glyphicon-chevron-right"/>
							<span className="sr-only">Next</span>
						</button>}

						<div className="top-sellers" ref={this.topSellers}>
							{cards}
						</div>


					</div>
				</Grid>
			</Grid>
		);
	}
}

export default TopSellers;
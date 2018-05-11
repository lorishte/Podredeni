import React from 'react';

import { Row, Col } from 'react-bootstrap';

import ProductCard from '../../../product/list/partials/ProductCard';
import TopSellerProductCard from './TopSellerProductCard';

import productsService from '../../../../../services/products/productsService';

class TopSellers extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: '',
			size: 50,
			page: 1,
			filterProperty: 'IsTopSeller',
			filterValue: true,
			translateValue: 0,
			cardWidth: 0,
			productsToShow: this.props.productsToShow
		};

		this.topSellers = React.createRef();
		this.container = React.createRef();
	}



	componentDidMount () {
		this.loadProducts();
		window.addEventListener('resize', this.loadProducts);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.loadProducts);
	}

	loadProducts = () => {
		if (window.innerWidth < 800) {
			this.setState({productsToShow: 2});
		}

		productsService
			.loadProducts(this.state)
			.then(res => {
				res.products.forEach(e => e.images.reverse());
				let cardWidth = Math.floor(this.container.current.clientWidth / this.state.productsToShow);
				this.topSellers.current.style.width = (cardWidth * res.products.length) + 'px';
				this.setState({products: res.products, cardWidth: cardWidth});
			})
			.catch(err => {
				console.log(err.responseText);
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
		console.log(translateValue);

		let element = this.topSellers.current;
		console.log(element.clientWidth);

		if (translateValue < 0 || translateValue > (Math.floor(element.clientWidth) - this.state.productsToShow * this.state.cardWidth)) return;
		this.setState({translateValue});

		window.requestAnimationFrame(function () {
			element.style.transform = `translateX(-${translateValue}px)`;
			element.style.transition = '.5s';
		});
	};

	render () {

		let cards;
		if (this.state.products !== '') {
			cards = this.state.products.map(product => {
				return <TopSellerProductCard key={product.id} data={product} width={this.state.cardWidth}/>;
			});
		}

		if (this.topSellers.current !== null) {

		}

		return (
			<div id="top-sellers">
				<div>

					<h1 className="section-heading">Top sellers</h1>

					<div className="top-sellers-carousel" ref={this.container}>
						<div className="top-sellers" ref={this.topSellers}>
							{cards}
						</div>

						<button disabled={this.state.translateValue <= 10}
						        className="carousel-control left"
						        onClick={this.loadPrevious}>
							<span className="glyphicon glyphicon-chevron-left"/>
							<span className="sr-only">Prev</span>
						</button>
						{this.topSellers.current !== null &&
						<button disabled={this.state.translateValue >=  Math.floor(this.topSellers.current.clientWidth) - this.state.productsToShow * this.state.cardWidth - 10}
						        className="carousel-control right"
						        onClick={this.loadNext}>
							<span className="glyphicon glyphicon-chevron-right"/>
							<span className="sr-only">Next</span>
						</button>}

					</div>

				</div>

			</div>
		);
	}
}

export default TopSellers;
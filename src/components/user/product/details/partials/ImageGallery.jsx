import React from 'react';

import { Image, Row, Col } from 'react-bootstrap';

class ImageGallery extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			selected: this.props.images[0],
			currentIndex: 0
		};

		this.mainImage = React.createRef();
	}

	changeActive = (i) => {
		if (i < 0 || i > this.props.images.length - 1) return;

		let element = this.mainImage.current;

		this.fadeOut(element);
		setTimeout(() => this.setState({ selected: this.props.images[i], currentIndex: i }), y);
		setTimeout(() => this.fadeIn(element), 500);
	};

	fadeOut = (el) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity 200ms';
			el.style.opacity = 0;
		});
	};

	fadeIn = (el) => {
		window.requestAnimationFrame(function () {
			el.style.transition = 'opacity 2000ms';
			el.style.opacity = 1;
		});
	};


	render () {
		let images = this.props.images;

		let thumbnails = images.map((imageName, i) => {

			let url = imageName;

			if (!url.includes('http')) url = '/images/products/' + imageName;

			return (
				<Image key={i}
				       src={url}
				       alt={imageName}
				       thumbnail
				       className="image-thumbnail"
				       onClick={() => this.changeActive(i)}/>
			);
		});

		let selectedImageUrl = this.state.selected;
		if (!selectedImageUrl.includes('http')) selectedImageUrl = '/images/products/' + selectedImageUrl;

		return (

			<div id="image-gallery">

				<div className="main-image-container img-thumbnail">

					<img ref={this.mainImage}
					     src={selectedImageUrl}
					     className="main-image"/>

					<div className="gallery-controls">
						<button
							className={this.state.currentIndex === 0 ? 'carousel-control-prev disabled' : 'carousel-control-prev'}
							onClick={() => this.changeActive(this.state.currentIndex - 1)}>
							<i className="fa fa-chevron-left" aria-hidden="true"/>
						</button>
						<button
							className={this.state.currentIndex === this.props.images.length - 1 ? 'carousel-control-next disabled' : 'carousel-control-next'}
							onClick={() => this.changeActive(this.state.currentIndex + 1)}>
							<i className="fa fa-chevron-right" aria-hidden="true"/>
						</button>
					</div>
				</div>

				<div className="gallery-thumbnails">
					{thumbnails}
				</div>
			</div>

		);
	}
}

export default ImageGallery;

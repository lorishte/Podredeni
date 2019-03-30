import React from 'react';
import { Link } from 'react-router-dom';

// Partials
import CarouselItem from './partials/CarouselItem';

import { BUTTONS_BG } from '../../../../data/constants/componentConstants';

function CarouselContent (props) {

	const {carouselItems} = props.data;

	let items;

	if (carouselItems.length > 0) {
		items = carouselItems.map(i => {
			return <CarouselItem key={i.id} item={i} deleteItem={props.deleteItem}/>;
		});
	}

	return (
		<div id="carousel-content">

			<div className="buttons-container">
				<Link className={'btn btn-success btn-md'}
				      to={'/carousel-item/create/'}>{BUTTONS_BG.create}
				</Link>
			</div>

			<div id="carousel-items-list">
				{items}
			</div>

		</div>
	);
}

export default CarouselContent;

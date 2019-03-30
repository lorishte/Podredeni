import React from 'react';
import { Link } from 'react-router-dom';

function CarouselItem (props) {

	const {id, imageUrl} = props.item;

	return (

		<div className="carousel-item">
			<figure className="carousel-image">
				<img src={imageUrl} className="img-fit" alt="carouselItem-image"/>
			</figure>

			<div className="controls">

				<Link className="btn btn-success sm" to={'/carousel-item/edit/' + id}>
					<i className="fa fa-pencil" aria-hidden="true"/>
				</Link>

				<button className="btn btn-danger sm" onClick={() => props.deleteItem(id)}>
					<i className="fa fa-trash" aria-hidden="true"/>
				</button>

			</div>
		</div>

	);

}

export default CarouselItem;

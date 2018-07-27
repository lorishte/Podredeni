import React from 'react';
import { Link } from 'react-router-dom';

import utils from '../../../../../../utils/utils'

class NewsCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		const data = this.props.data;

		return (

			<Link to={'/news/' + data.id} className="news-card">

				<div className="news-image-container">
					<img className="image" src={data.imageUrl} alt="News image"/>
				</div>

				<div className="news-body">
					<h4 className="news-title">{data.title}</h4>
					<p className="news-publishedOn">{utils.formatDateAndTime(data.creationDate)}</p>
				</div>

			</Link>

		);
	}
}

export default NewsCard;

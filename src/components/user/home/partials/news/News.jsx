import React from 'react';

import { Grid, Carousel } from 'react-bootstrap';

import { MAIN_CAROUSEL_TIMER_INTERVAL } from '../../../../../data/constants/componentConstants';

import newsService from '../../../../../services/news/newsService';
import NewsCard from './partials/NewsCard';

class News extends React.Component {
	constructor (props, context) {
		super(props, context);

		this.state = {
			news: [],
			page: 1,      //3 most recent news
			size: 3       //3 most recent news
		};

		this.carousel = React.createRef();
		this.timer = null;
	}

	componentDidMount () {
		this.loadNews();
	};

	loadNews = () => {
		newsService.loadNewsList(this.state)
			.then(res => {
				this.setState({news: res.news});
			})
			.catch(err => {
				// this.props.history.push('/error');
			});
	};

	render () {

		let news;
		if (this.state.news.length > 0) {

			news = this.state.news.map(e => {

				return <Carousel.Item>
					<NewsCard
						key={e.id}
						data={e}/>
				</Carousel.Item>;
			});
		}

		return (
			<Grid fluid id="home-news">

				<h1 className="section-heading">НОВИНИ</h1>
				<div id="news-container">
					{news}
				</div>

			</Grid>
		);
	}
}

export default News;
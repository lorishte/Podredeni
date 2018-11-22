import React from 'react';

import { Grid } from 'react-bootstrap';

import { HOME } from '../../../../../data/constants/componentConstants';

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

				return <NewsCard key={e.id}
				                 data={e}/>;

			});
		}

		return (
			<Grid fluid id="home-news" className="bg-white">

				<Grid id="news-container">

					<h1 className="section-heading">{HOME.news}</h1>

					<div className="container">
						{news}
					</div>
				</Grid>

			</Grid>
		);
	}
}

export default News;
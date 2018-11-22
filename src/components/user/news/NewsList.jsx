import React from 'react';

//external components
import { Link } from 'react-router-dom';
import { Col, Row, Grid, Clearfix } from 'react-bootstrap';
import { ToastContainer } from 'react-toastr';

//internal components
import NewsBrief from './partials/NewsBrief';
import Paging from '../../common/pagination/Paging';

//services
import newsService from '../../../services/news/newsService';

//constants
import { RESOLUTIONS, BUTTONS_BG } from '../../../data/constants/componentConstants';

class NewsList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			news: [],
			size: 30,
			page: 1,

			newsCount: '',
			pagesCount: '',

			cardsToDisplayOnRow: 0,
			resolution: window.innerWidth
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		this.loadNews();
		this.calculateCardsOnRow();
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	loadNews = () => {
		newsService
			.loadNewsList(this.state)
			.then(res => {
				let newsCount = Number(res.newsCount);
				let size = Number(this.state.size);

				this.setState({
					news: res.news,
					newsCount: newsCount,
					pagesCount: Math.ceil(newsCount / size)
				});
			})
			.catch(err => {
				this.props.history.push('/error');
			});
	};

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth}, () => {
			this.calculateCardsOnRow();
		});
	};

	calculateCardsOnRow = () => {

		let resolution = this.state.resolution;

		if (resolution < RESOLUTIONS.bootstrapXS) {
			if (resolution < RESOLUTIONS.xs) {
				this.setState({cardsToDisplayOnRow: 1});
			} else {
				this.setState({cardsToDisplayOnRow: 2});
			}

		} else if (resolution < RESOLUTIONS.bootstrapSM) {
			this.setState({cardsToDisplayOnRow: 2});
		} else {
			this.setState({cardsToDisplayOnRow: 3});
		}
	};

	goToPage = (page) => {
		this.setState({page: page}, () => this.loadNews());
	};

	handleSizeChange = (e) => {
		if (e.target.value === '') return;
		this.setState({size: e.target.value}, () => this.goToPage(1));
	};

	render () {

		let isAdmin = sessionStorage.getItem('role') === 'admin';

		let cardsOnRow = this.state.cardsToDisplayOnRow;
		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let newsList = [];

		if (this.state.news.length > 0) {
			this.state.news.map((el, i) => {

				newsList.push(
					<Col xs={resolution ? 12 : 6} sm={6} md={4} key={el.id}>
						<NewsBrief data={el}
						           toastContainer={this.toastContainer}/>
					</Col>);

				if ((i + 1) % cardsOnRow === 0) {
					newsList.push(<Clearfix key={i}/>);
				}
			});
		}

		return (
			<Grid id="news">
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				{isAdmin &&
				<Row>
					<Col xs={12} className="buttons-container">
						<Link className={'btn btn-success'} to={'/news/create'}>{BUTTONS_BG.create}</Link>
					</Col>
				</Row>
				}

				{this.state.news.length === 0 && <div className="loader"/> }

				<Row id="news-container">
					{newsList}
				</Row>

				{this.state.size !== '0' && this.state.newsCount !== 0 &&

				<Row>
					<Paging
						active={Number(this.state.page)}
						pagesCount={Number(this.state.pagesCount)}
						goToPage={this.goToPage}/>
				</Row>
				}
			</Grid>
		);
	}
}

export default NewsList;
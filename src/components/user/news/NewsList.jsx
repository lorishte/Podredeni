import React from 'react';

//external components
import { Link } from 'react-router-dom';
import { Col, Row, Grid } from 'react-bootstrap';
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
			resolution: window.innerWidth,

			newsCount: '',
			pagesCount: ''
		};
	}

	componentDidMount () {
		window.scrollTo(0, 0);
		window.addEventListener('orientationchange', this.handleResolutionChange);
		window.addEventListener('resize', this.handleResolutionChange);

		this.loadNews();
	}

	componentWillUnmount () {
		window.removeEventListener('orientationchange', this.handleResolutionChange);
		window.removeEventListener('resize', this.handleResolutionChange);
	}

	handleResolutionChange = () => {
		this.setState({resolution: window.innerWidth});
	};

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

	goToPage = (page) => {
		this.setState({page: page}, () => this.loadNews());
	};

	handleSizeChange = (e) => {
		if (e.target.value === '') return;
		this.setState({size: e.target.value}, () => this.goToPage(1));
	};

	render () {

		let isAdmin = sessionStorage.getItem('role') === 'admin';

		let resolution = this.state.resolution < RESOLUTIONS.xs;

		let newsList;
		newsList = this.state.news.map(e => {
			return <NewsBrief key={e.id}
			                  data={e}
			                  toastContainer={this.toastContainer}
			                  xsRes={resolution ? 12 : 6}/>;

		});

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
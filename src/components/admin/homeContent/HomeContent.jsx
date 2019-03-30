import React from 'react';
import { ToastContainer } from 'react-toastr';
import { confirmAlert } from 'react-confirm-alert';

// Partials
import ArticleManage from './article/ArticleManage';
import CarouselContent from './carousel/CarouselContent';
import { TOASTR_MESSAGES, CONFIRM_DIALOGS, BUTTONS_BG } from '../../../data/constants/componentConstants';

// Helpers
import { Grid, Tabs, Tab } from 'react-bootstrap';

import homeContentService from '../../../services/homeContent/homeContentService';

class HomeContent extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			sectionHeading: '',
			sectionContent: '',
			articleHeading: '',
			articleContent: '',
			carouselItems: []
		};
	}

	componentDidMount () {
		this.loadArticle();
		this.loadCarouselItems();
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	loadCarouselItems = () => {
		homeContentService
			.loadCarouselItems()
			.then(res => {
				this.setState({carouselItems: res.carouselItems});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});

	};

	deleteCarouselItem = (itemId) => {
		homeContentService
			.deleteCarouselItem(itemId)
			.then(res => {
				this.toastContainer.success(TOASTR_MESSAGES.successCarouselItemDelete, '', {
					closeButton: false,
				});

				setTimeout(() => window.location.reload(), 3000);

			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};


	confirmDelete = (itemId) => {
		confirmAlert({
			title: '',
			message: CONFIRM_DIALOGS.deleteCarouselItem,
			buttons: [{
				label: BUTTONS_BG.yes,
				onClick: () => this.deleteCarouselItem(itemId)
			},
				{label: BUTTONS_BG.no}]
		});
	};


	loadArticle = () => {
		homeContentService
			.loadArticle()
			.then(res => {
				this.setState({
					sectionHeading: res.content.sectionHeading,
					sectionContent: res.content.sectionContent,
					articleHeading: res.content.articleHeading,
					articleContent: res.content.articleContent
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};


	saveArticleChanges = () => {
		homeContentService
			.modifyArticle(this.props.data)
			.then(res => {
				this.toastContainer.success(TOASTR_MESSAGES.successHomeContentModification, '', {
					closeButton: false,
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	render () {

		return (
			<Grid id="home-content">

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Tabs defaultActiveKey={1} id="homeContent-tabs">

					<Tab eventKey={1} title="Карусел">
						<CarouselContent
							data={this.state}
							deleteItem={this.confirmDelete}/>
					</Tab>

					<Tab eventKey={2} title="Статия">
						<ArticleManage
							data={this.state}
							handleChange={this.handleChange}
							saveChanges={this.saveArticleChanges}/>
					</Tab>
				</Tabs>

			</Grid>
		);
	}
}

export default HomeContent;

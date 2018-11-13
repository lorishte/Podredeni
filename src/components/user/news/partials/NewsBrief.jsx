import React from 'react';

//external components
//internal components
//services
//constants

//external components
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

//services
import newsService from '../../../../services/news/newsService';
import Utils from '../../../../utils/utils';

//constants
import { BUTTONS_BG, CONFIRM_DIALOGS, TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';

class NewsBrief extends React.Component {

	news = this.props.data;

	constructor (props) {
		super(props);
	}

	confirmDeleteNews = () => {
		confirmAlert({
			title: '',
			message: CONFIRM_DIALOGS.deleteNews,
			buttons: [{
				label: BUTTONS_BG.yes,
				onClick: this.deleteNews
			},
				{label: BUTTONS_BG.no}]
		});

	};

	deleteNews = () => {
		newsService.deleteNews(this.news.id)
			.then(res => {

				window.history.back(-1);

			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});

	};

	render () {

		let isAdmin = sessionStorage.getItem('role') === 'admin';
		let date = this.news.creationDate;

		return (

			<Link to={'/news/' + this.news.id}>

				<div className="news-card">

					<div className="news-image-container">
						<img className="news-image" src={this.news.imageUrl} alt="News image"/>
					</div>

					<div className="news-body">
						<h4 className="news-title">{this.news.title}</h4>
						<p className="news-date">
							<span className="day">{Utils.getDay(date)} &nbsp;</span>
							<span className="month">{Utils.getMonth(date)} &nbsp;</span>
							<span className="year">{Utils.getYear(date)}</span>
						</p>
					</div>

					{isAdmin &&
					<div className="news-buttons-container">
						<Link className={'btn btn-primary btn-sm'}
						      to={'/news/edit/' + this.news.id}>{BUTTONS_BG.edit}</Link>

						<button className={'btn btn-danger btn-sm'}
						        onClick={this.confirmDeleteNews}>{BUTTONS_BG.delete}</button>
					</div>
					}
				</div>

			</Link>
		);
	}
}

export default NewsBrief;
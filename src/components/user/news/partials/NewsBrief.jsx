import React from 'react';
import {Link} from 'react-router-dom';

import {Col} from 'react-bootstrap';


import {confirmAlert} from 'react-confirm-alert';

import newsService from '../../../../services/news/newsService';

import Utils from '../../../../utils/utils';

import {BUTTONS_BG, CONFIRM_DIALOGS} from '../../../../data/constants/componentConstants';
import {TOASTR_MESSAGES, REDIRECT_DELAY} from '../../../../data/constants/componentConstants';
import {NEWS} from '../../../../data/constants/componentConstants';

class NewsBrief extends React.Component {

    news = this.props.data;

    constructor(props) {
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

                window.location.reload();

            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });

    };

    render() {

        let isAdmin = sessionStorage.getItem('role') === 'admin';

        return (


            <Col xs={this.props.xsRes} sm={6} md={4} lg={4} className="news-card">

                <div className="news-image-container">
                    <img className="news-image" src={this.news.imageUrl} alt="News image"/>
                </div>

                <div className="news-body">
                    <h4 className="news-title">{this.news.title}</h4>
                    <p className="news-date">{Utils.formatDate(this.news.creationDate)}</p>
                </div>

                <div className="news-buttons-container">

                    {isAdmin &&
                    <Link className={'btn btn-primary btn-sm'}
                          to={'/news/edit/' + this.news.id}>{BUTTONS_BG.edit}</Link>
                    }

                    {isAdmin &&
                    <button className={'btn btn-danger btn-sm'}
                            onClick={this.confirmDeleteNews}>{BUTTONS_BG.delete}</button>
                    }

                    {!isAdmin &&
                    <Link className={'btn-custom primary sm'} to={'/news/' + this.news.id}>{BUTTONS_BG.more}</Link>
                    }
                </div>


            </Col>



        );
    }
}

export default NewsBrief;
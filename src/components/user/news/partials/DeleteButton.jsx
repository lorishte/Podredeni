import React from 'react';
import {ToastContainer} from 'react-toastr';
import {confirmAlert} from 'react-confirm-alert';

import {Grid, Row, Button} from 'react-bootstrap';

import newsService from '../../../../services/news/newsService';

import {BUTTONS_BG, CONFIRM_DIALOGS} from '../../../../data/constants/componentConstants';

import {TOASTR_MESSAGES, REDIRECT_DELAY} from '../../../../data/constants/componentConstants';

class DeleteButton extends React.Component {
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

        newsService.deleteNews(this.props.newsId)
            .then(res => {

                this.toastContainer.success(TOASTR_MESSAGES.successNewsDelete, '', {
                    closeButton: false,
                });

                setTimeout(() => {
                    window.location.reload();
                }, REDIRECT_DELAY);
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });

    };

    render() {

        return (
            <Grid>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row>
                    <Button onClick={this.confirmDeleteNews}>{BUTTONS_BG.delete}</Button>
                </Row>
            </Grid>
        );
    }
}

export default DeleteButton;
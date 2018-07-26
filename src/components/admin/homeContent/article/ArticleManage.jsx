import React from 'react';
import { ToastContainer } from 'react-toastr';

// Helpers
import { Grid, Row, Col, Button } from 'react-bootstrap';

// Partials
import FormInputField from "../../../common/formComponents/FormInputField";
import FormTextareaField from "../../../common/formComponents/FormTextareaField";

// Constants
import { TOASTR_MESSAGES, BUTTONS_BG } from '../../../../data/constants/componentConstants';

import homeContentService from '../../../../services/homeContent/homeContentService';

class ArticleManage extends React.Component {
    constructor (props) {
        super(props);
    }

    saveChanges = () => {

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

        const {sectionHeading, sectionContent, articleHeading, articleContent} = this.props.data;

        return (
            <Grid id="article-modify">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row>
                    <FormInputField
                        type='text'
                        name='sectionHeading'
                        label='Заглавие на секция'
                        value={sectionHeading}
                        required={true}
                        disabled={false}
                        onChange={this.props.handleChange}
                    />

                    <FormTextareaField
                        componentClass='textarea'
                        label='Съдържание на секция'
                        name='sectionContent'
                        value={sectionContent}
                        onChange={this.props.handleChange}
                        required={true}
                    />

                    <FormInputField
                        type='text'
                        name='articleHeading'
                        label='Заглавие на статия'
                        value={articleHeading}
                        required={true}
                        disabled={false}
                        onChange={this.props.handleChange}
                    />

                    <FormTextareaField
                        componentClass='textarea'
                        label='Съдържание на статия'
                        name='articleContent'
                        value={articleContent}
                        onChange={this.props.handleChange}
                        required={true}
                    />
                </Row>

                <Col xs={12} className="text-center">
                    <Button onClick={this.saveChanges}>{BUTTONS_BG.saveChanges}</Button>
                </Col>

            </Grid>
        );
    }
}

export default ArticleManage;

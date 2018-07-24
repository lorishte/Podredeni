import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Link } from 'react-router-dom'

// Helpers
import { Grid, Row, Col, Button } from 'react-bootstrap';

import homeContentService from '../../../services/homeContent/homeContentService';

// Partials
import { TOASTR_MESSAGES, BUTTONS_BG } from '../../../data/constants/componentConstants';
import FormInputField from "../../common/formComponents/FormInputField";
import FormTextareaField from "../../common/formComponents/FormTextareaField";

class HomeContent extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            sectionHeading: '',
            sectionContent: '',
            articleHeading: '',
            articleContent: ''
        }
    }

    componentDidMount () {
    this.loadHomeContent();
}

    loadHomeContent = () => {
        homeContentService
            .loadHomeContent()
            .then(res => {
                this.setState({sectionHeading: res.content.sectionHeading,
                    sectionContent: res.content.sectionContent,
                    articleHeading: res.content.articleHeading,
                    articleContent: res.content.articleContent})
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    handleChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    };

    saveChanges = () => {

        homeContentService
            .modifyHomeContent(this.state)
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
            <Grid id="homeContent-modify">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row>
                    <div>Съдържание на начална страница</div>

                    <FormInputField
                        type='text'
                        name='sectionHeading'
                        label='Заглавие на секция'
                        value={this.state.sectionHeading}
                        required={true}
                        disabled={false}
                        onChange={this.handleChange}
                    />

                    <FormTextareaField
                        componentClass='textarea'
                        label='Съдържание на секция'
                        name='sectionContent'
                        value={this.state.sectionContent}
                        onChange={this.handleChange}
                        required={true}

                    />

                    <FormInputField
                        type='text'
                        name='articleHeading'
                        label='Заглавие на статия'
                        value={this.state.articleHeading}
                        required={true}
                        disabled={false}
                        onChange={this.handleChange}
                    />

                    <FormTextareaField
                        componentClass='textarea'
                        label='Съдържание на статия'
                        name='articleContent'
                        value={this.state.articleContent}
                        onChange={this.handleChange}
                        required={true}

                    />
                </Row>

                <Col xs={12} className="text-center">
                    <Link className={"btn-custom default md"} to={{pathname: '/order/list'}} >{BUTTONS_BG.cancel}</Link>

                    <Button onClick={this.saveChanges}>{BUTTONS_BG.saveChanges}</Button>
                </Col>

            </Grid>
        );
    }
}

export default HomeContent;

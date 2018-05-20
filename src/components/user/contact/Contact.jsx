import React from 'react';
import {ToastContainer} from 'react-toastr';

import {PageHeader, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

import contactService from '../../../services/contact/contactService';

import { TOASTR_MESSAGES } from '../../../data/constants/componentConstants';


class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            subject: '',
            content: ''
        };

        this.baseState = this.state;

        this.toastContainer = React.createRef();
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    resetState = () => {
        this.setState(this.baseState);
    };

    sendContactForm = () => {

        const [name, email, subject, content] = [this.state.name, this.state.email, this.state.subject, this.state.content];

        contactService.sendContactForm(name, email, subject, content)
            .then(res => {

                this.resetState();

                this.toastContainer.success('', "Вашето съобщение беше изпратено!", {
                    closeButton: true,
                });

            })
            .catch(err => {
	            this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
		            closeButton: false,
	            });
            });
    };

    render() {
        return (
            <Grid >

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <PageHeader>
                    Contact
                </PageHeader>

                <Row>
                    <Col xs={8} sm={6} md={4}>
                        <FormGroup
                            controlId="contact-form">

                            <ControlLabel>Име: </ControlLabel>
                            <FormControl
                                type="text"
                                name="name"
                                required={true}
                                value={this.state.name}
                                placeholder=""
                                onChange={this.handleChange}/>

                            <ControlLabel>Имейл: </ControlLabel>
                            <FormControl
                                type="email"
                                name="email"
                                required={true}
                                value={this.state.email}
                                placeholder=""
                                onChange={this.handleChange}/>

                            <ControlLabel>Тема: </ControlLabel>
                            <FormControl
                                type="text"
                                name="subject"
                                required={true}
                                value={this.state.subject}
                                placeholder=""
                                onChange={this.handleChange}/>

                            <ControlLabel>Съдържание: </ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                type="text"
                                name="content"
                                required={true}
                                value={this.state.content}
                                placeholder=""
                                onChange={this.handleChange}/>
                        </FormGroup>

                        <button className="btn-custom primary lg" onClick={this.sendContactForm}>Изпрати</button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Contact;

import React from 'react';
import {ToastContainer} from 'react-toastr';
import {Grid, Row, Col, Checkbox, Button, Image} from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';

import TextEditor from '../../../common/textEditor/TextEditor'

import partnersService from '../../../../services/partners/partnersService';

import {TOASTR_MESSAGES, REDIRECT_DELAY} from '../../../../data/constants/componentConstants';


class EditCreatePartner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            logoUrl: '',
            webUrl: '',
            details: '',
        };
    }

    partnerId = this.props.match.params.id;

    componentDidMount() {

        if (this.partnerId) {
            this.loadPartner();
        }
    }

    loadPartner = () => {
        partnersService.load(this.partnerId)
            .then(res => {

                this.setState({
                    name: res.name,
                    logoUrl: res.logoUrl,
                    webUrl: res.webUrl,
                    details: res.details
                })
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            })
    };


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleChangeContent = (e) => {

        this.setState({details: e});
    };

    cancel = () => {
        this.props.history.go(-1);
    };

    submitInfo = (e) => {

        e.preventDefault();

        if (this.partnerId) {

            partnersService.edit(this.partnerId, this.state).then(res => {

                this.props.history.go(-1);

            }).catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            });
        } else {

            partnersService.create(this.state).then(res => {

                this.props.history.go(-1);

            }).catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            });
        }
    };

    render() {

        return (
            <Grid id="create-partner">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row>
                    <Col sm={12}>
                        {!this.promoId && <h3>Добавяне на партньор</h3>}
                        {this.promoId && <h3>Редакция на партньор</h3>}
                        <hr/>
                    </Col>
                </Row>

                <form onSubmit={(e) => this.submitInfo(e)}>
                    <Row>
                        <Col xs={12} md={5} sm={8}>
                            <FormInputField
                                label="Име"
                                name="name"
                                type="text"
                                value={this.state.name}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>

                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={5} sm={8}>
                            <FormInputField
                                label="Лого (Url)"
                                name="logoUrl"
                                type="url"
                                value={this.state.logoUrl}
                                required={false}
                                disabled={false}
                                onChange={this.handleChange}/>

                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={5} sm={8}>
                            <FormInputField
                                label="Уебсайт (Url)"
                                name="webUrl"
                                type="url"
                                value={this.state.webUrl}
                                required={false}
                                disabled={false}
                                onChange={this.handleChange}/>

                        </Col>
                    </Row>

                    {(!this.partnerId || this.state.details !== '') &&
                    <TextEditor
                        value={this.state.details}
                        onChange={this.handleChangeContent}/>
                    }

                    <Row className="buttons-container">
                        <Col xs={12}>
                            <Button onClick={this.cancel}>Отказ</Button>
                            <Button bsStyle='primary' type="submit">Потвърди</Button>
                        </Col>
                    </Row>

                </form>
            </Grid>
        );
    }
}

export default EditCreatePartner;

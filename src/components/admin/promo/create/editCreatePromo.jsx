import React from 'react';
import {ToastContainer} from 'react-toastr';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';

import promosService from '../../../../services/promos/promosService';

import utils from '../../../../utils/utils';

import {TOASTR_MESSAGES} from '../../../../data/constants/componentConstants';


class CreatePromo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            discount: '',
            startDate: '',
            endDate: []
        };
    }

    promoId = this.props.match.params.id;

    componentDidMount() {

        if (this.promoId) {
            this.load();
        }
    }

    loadPromo = () => {

        promosService.load(this.promoId)
            .then(res => {

                this.setState({
                        name: res.name,
                        discount: res.discount,
                        startDate: utils.formatDateYearFirst(res.startDate),
                        endDate:  utils.formatDateYearFirst(res.endDate),
                    });
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            })
    };

    cancel = () => {
        this.props.history.go(-1);
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    submitInfo = (e) => {

        e.preventDefault();

        if (this.promoId) {

            promosService.edit(this.promoId, this.state).then(res => {

                this.props.history.go(-1);

            }).catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            });
        } else {

            promosService.create(this.state).then(res => {

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
            <Grid id="create-edit-promo">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />


                <Row>
                    <Col sm={12}>
                        {!this.promoId && <h3>Създаване на промоция</h3>}
                        {this.promoId && <h3>Редакция</h3>}
                        <hr/>
                    </Col>
                </Row>


                <form onSubmit={(e) => this.submitInfo(e)}>

                    <Row>
                        <Col md={2} sm={5} xs={6}>
                            <FormInputField
                                label="Наименование"
                                name="name"
                                type="text"
                                value={this.state.name}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={2} sm={5} xs={6}>
                            <FormInputField
                                label="Процент отстъпка"
                                name="discount"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={this.state.discount}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={2} sm={5} xs={6}>
                            <FormInputField
                                label="Начална дата"
                                name="startDate"
                                type="date"
                                value={this.state.startDate}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={2} sm={5} xs={6}>
                            <FormInputField
                                label="Крайна дата"
                                name="endDate"
                                type="date"
                                value={this.state.endDate}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>

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

export default CreatePromo;

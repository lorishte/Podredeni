import React from 'react';
import {ToastContainer} from 'react-toastr';
import {Grid, Row, Col, Button, Checkbox, Well, Panel} from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';
import FormTextareaField from '../../../common/formComponents/FormTextareaField';
import MultiSelect from '../partials/MultiSelectSortedProducts';

import productPromosService from '../../../../services/promos/productPromosService';
import productsService from '../../../../services/products/productsService';

import utils from '../../../../utils/utils';

import {TOASTR_MESSAGES} from '../../../../data/constants/componentConstants';

class EditCreateProductPromo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            promoCode: '',

            description: '',

            startDate: '',
            endDate: '',

            isAccumulative: false,
            includePriceDiscounts: false,
            isInclusive: false,

            productsCount: 0,
            discountedProductsCount: 0,
            discount: 0,

            quota: 100,
            discountedProducts: {},
            newDiscountedProducts: [],
            products: {},
            newProducts: []
        };
    }

    promoId = this.props.match.params.id;

    componentDidMount() {

        if (this.promoId) {
            this.loadPromo();
        }

        this.loadProducts();
    }

    loadProducts = () => {
        productsService.loadProducts(this.state).then(res => {


            // Sort products by category
            let sortedProducts = {};

            res.categories.forEach(c => {

                let key = c.id

                sortedProducts[key] = {
                    name: c.name,
                    products: []
                }
            })

            res.products.forEach(p => {
                p.categories.forEach(c => {
                    sortedProducts[c.id].products.push(p)
                })
            })

            this.setState({
                products: sortedProducts,
                discountedProducts: sortedProducts
            });
        })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    loadPromo = () => {

        productPromosService.load(this.promoId)
            .then(res => {

                this.setState({
                    name: res.name,
                    description: res.description,
                    startDate: utils.formatDateYearFirst(res.startDate),
                    endDate: utils.formatDateYearFirst(res.endDate),
                    promoCode: res.promoCode,
                    isInclusive: !res.isInclusive,
                    isAccumulative: res.isAccumulative,
                    productsCount: res.productsCount,
                    discountedProductsCount: res.discountedProductsCount,
                    discount: res.discount,
                    includePriceDiscounts: res.includePriceDiscounts,
                    quota: res.quota,
                    newDiscountedProducts: res.discountedProductsIds,
                    newProducts: res.productsIds
                });
            })
            .catch(err => {

                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    cancel = () => {
        this.props.history.go(-1);
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleCheckBox = (e) => {
        this.setState({[e.target.name]: e.target.checked});

        if (e.target.name === 'isInclusive') {

            this.state.newDiscountedProducts = [];

        }
    };

    addDiscountedProduct = (e) => {

        console.log(e)
        this.setState({newDiscountedProducts: e});
    };

    addProduct = (e) => {
        console.log(222, e)
        this.setState({newProducts: e});
    };

    submitInfo = (e) => {

        e.preventDefault();

        if (this.promoId) {


            productPromosService
                .edit(this.promoId, this.state)
                .then(res => {

                    this.toastContainer.success('', TOASTR_MESSAGES.successEdit, {
                        closeButton: false,
                    });
                    this.props.history.go(-1);

                })
                .catch(err => {

                    this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                        closeButton: false,
                    });
                });
        } else {

            let stateCopy = Object.assign({}, this.state);

            productPromosService
                .create(stateCopy)
                .then(res => {
                    this.toastContainer.success('', TOASTR_MESSAGES.successPromotionCreate, {
                        closeButton: false,
                    });
                    setTimeout(() => this.props.history.go(-1), 3000);

                }).catch(err => {
                console.log(err);
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
                        {!this.promoId && <h3>Създаване на промоция с продукти</h3>}
                        {this.promoId && <h3>Редакция</h3>}
                        <hr/>
                    </Col>
                </Row>

                <form onSubmit={(e) => this.submitInfo(e)}>

                    <Row>
                        <Col sm={6} xs={12}>
                            <FormInputField
                                label="Наименование"
                                name="name"
                                type="text"
                                value={this.state.name}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>


                        <Col sm={2} xs={7}>
                            <FormInputField
                                label="Промо код"
                                name="promoCode"
                                type="text"
                                value={this.state.promoCode}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>

                        <Col sm={8} xs={12}>
                            <FormTextareaField
                                label="Описание"
                                name="description"
                                value={this.state.description}
                                required={false}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4} xs={6}>
                            <FormInputField
                                label="Начална дата"
                                name="startDate"
                                type="date"
                                value={this.state.startDate}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>


                        <Col sm={4} xs={6}>
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

                    <Row>

                        <Col sm={4} xs={6}>
                            <FormInputField
                                label="Минимален брой закупени продукти"
                                name="productsCount"
                                type="text"
                                value={this.state.productsCount}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>

                        <Col sm={4} xs={6}>
                            <FormInputField
                                label="Брой промоционални продукти"
                                name="discountedProductsCount"
                                type="text"
                                value={this.state.discountedProductsCount}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={2} sm={3} xs={6}>
                            <FormInputField
                                label="Oтстъпка (%)"
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

                        <Col md={2} sm={3} xs={6}>
                            <FormInputField
                                label="Квота"
                                name="quota"
                                type="number"
                                step="1"
                                min="0"
                                value={this.state.quota}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <Checkbox checked={this.state.isAccumulative}
                                      name="isAccumulative"
                                      onChange={this.handleCheckBox}
                                      readOnly>
                                Натрупване на подаръци в една поръчка
                            </Checkbox>
                        </Col>

                        <Col xs={12}>
                            <Checkbox checked={this.state.includePriceDiscounts}
                                      name="includePriceDiscounts"
                                      onChange={this.handleCheckBox}
                                      readOnly>
                                Включвай отстъпки от други промоции
                            </Checkbox>
                        </Col>
                    </Row>


                    <Panel bsStyle="info" >
                        <Panel.Heading>
                            <Panel.Title toggle componentClass="h4">Избери продукти в промоция</Panel.Title>
                        </Panel.Heading>

                        <Panel.Body collapsible>
                            <MultiSelect
                                name="productsIds"
                                onChange={this.addProduct}
                                allProducts={this.state.products}
                                selectedProductsIds={this.state.newProducts}
                            />
                        </Panel.Body>
                    </Panel>


                    <Checkbox
                        checked={this.state.isInclusive}
                        name="isInclusive"
                        onChange={this.handleCheckBox}
                        readOnly>
                        Ще подарявам различен продукт
                    </Checkbox>


                    {this.state.isInclusive &&
                    <Panel bsStyle="success" >
                        <Panel.Heading>
                            <Panel.Title toggle componentClass="h4" >Избери продукти за подарък</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <MultiSelect
                                name="discountedProductsIds"
                                onChange={this.addDiscountedProduct}
                                allProducts={this.state.discountedProducts}
                                selectedProductsIds={this.state.newDiscountedProducts}
                            />
                        </Panel.Body>
                    </Panel>
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

export default EditCreateProductPromo;

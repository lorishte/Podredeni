import React from 'react';
import {ToastContainer} from 'react-toastr';
import {Grid, Row, Col, Checkbox, Button, Image} from 'react-bootstrap';

import FormInputField from '../../../common/formComponents/FormInputField';
import FormTextareaField from '../../../common/formComponents/FormTextareaField';
import AddImageForm from './partials/AddImageFrom';

import productsService from '../../../../services/products/productsService';
import promosService from '../../../../services/promos/discountPromosService';
import categoriesService from '../../../../services/categories/categoryService'

import {TOASTR_MESSAGES, REDIRECT_DELAY} from '../../../../data/constants/componentConstants';
import MultiSelect from "./partials/MultiSelect";



class CreateProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            imageUrls: [],
            isTopSeller: false,
            isBlocked: false,
	        discountPromos: [],
            discount: '',
            selectedCategories: [],
            selectedSubcategories: [],
            categories: [],
            subcategories: []
        };
    }

    fromCreate = false;
    requestPath = this.props.location.pathname;
    productId = this.props.match.params.id;

    componentDidMount() {
       
        this.loadCategories();

        this.loadSubcategories();

        if (this.requestPath === '/product/create') {
            this.fromCreate = true;
            return;
        }

        this.loadProductData();
    }

    loadCategories = () => {
        categoriesService.loadCategories(null, false)
            .then(res => {

                let result = res.map((c) => ({value: c.id, label: c.name}));

                this.setState({categories: result});
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    loadSubcategories = () => {
        categoriesService.loadCategories(null, true)
            .then(res => {

                let result = res.map((c) => ({value: c.id, label: c.name}));

                this.setState({subcategories: result});
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    loadPromoDiscounts = (promoDiscountsIds) => {

        promosService.loadAll()
            .then(res => {

                this.setState({
                    discountPromos: res.filter(p => promoDiscountsIds.includes(p.id))
                });
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    loadProductData = () => {
        productsService
            .getProduct(this.productId)
            .then(res => {
                let p = res.product;
                
                this.setState({
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    imageUrls: p.images.reverse(),
                    isTopSeller: p.isTopSeller,
                    isBlocked: p.isBlocked,
                    discount: p.discount,
                    selectedCategories: p.categories.map((c) => ({value: c.id, label: c.name})),
                    selectedSubcategories: p.subcategories.map((c) => ({value: c.id, label: c.name}))
                });

                this.loadPromoDiscounts(p.promoDiscountsIds);
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    submitInfo = (e) => {
        e.preventDefault();

        if (this.fromCreate) {
            productsService
                .addProduct(this.state)
                .then(res => {
                    //redirect back
                    this.props.history.go(-1);
                })
                .catch(err => {
                    this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                        closeButton: false,
                    });
                });
            return;
        }

        productsService
            .updateProduct(this.state, this.productId)
            .then(res => {
                //redirect back
                this.toastContainer.success(TOASTR_MESSAGES.successEdit, '', {
                    closeButton: false,
                });
                setTimeout(() => this.props.history.go(-1), REDIRECT_DELAY)
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    cancel = () => {
        //redirect back
        this.props.history.go(-1);
    };

    addImage = (url) => {
        this.setState({imageUrls: [...this.state.imageUrls, url]});
    };

    removeImage = (e) => {
        e.preventDefault();
        this.setState({imageUrls: this.state.imageUrls.filter(el => el !== e.target.name)});
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleCheckBox = (e) => {
        this.setState({[e.target.name]: !this.state[e.target.name]});
    };




    handleCategoryChange = (selectedCategories) => {
    this.setState({ selectedCategories });
    };


    handleSubcategoryChange = (selectedSubcategories) => {
    this.setState({ selectedSubcategories });
    }
    




    render() {

        let promos = [];

        let priceAfterDiscount = this.state.price;

        if (this.state.discount !== '') {
            priceAfterDiscount = (priceAfterDiscount - priceAfterDiscount * (this.state.discount / 100)).toFixed(2);

            if (priceAfterDiscount < 0) priceAfterDiscount = 0;
        }

        if (this.state.discountPromos.length > 0) {
            promos = this.state.discountPromos.map(p => {
                return <p key={p.id}>
                    {p.name} - {p.discount}%
                </p>
            })
        }


        let images = this.state.imageUrls.map((e, i) => {
            return (
                <div className="image-container" key={i}>
                    <Image
                        thumbnail
                        className="image-thumbnail"
                        src={e}/>
                    <button className="deleteImgBtn" name={e} onClick={this.removeImage}>x</button>
                </div>
            );
        });
        

        return (
            <Grid id="create-edit-product">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />


                <Row>
                    <Col sm={12}>
                        {this.requestPath.includes('create') && <h3>Създаване на продукт</h3>}
                        {this.requestPath.includes('edit') && <h3>Редакция</h3>}
                        <hr/>
                    </Col>
                </Row>


                <form onSubmit={(e) => this.submitInfo(e)}>
                    <Row>
                        {this.requestPath.includes('edit') &&
                        <div className="text-right">
                            <Col xs={12}>
                                {this.state.isBlocked && <span>Този продукт е блокиран &nbsp;</span>}
                                <Button bsStyle={this.state.isBlocked ? 'info' : 'danger'}
                                        name="isBlocked"
                                        onClick={this.handleCheckBox}>
                                    {!this.state.isBlocked && 'Блокиране'}
                                    {this.state.isBlocked && 'Отблокиране'}
                                </Button>
                            </Col>
                        </div>
                        }


                        <Col xs={12} md={5} sm={8}>
                            <FormInputField
                                label="Име"
                                name="name"
                                type="text"
                                value={this.state.name}
                                required={true}
                                disabled={false}
                                onChange={this.handleChange}/>

                            <Checkbox readOnly
                                      name="isTopSeller"
                                      checked={this.state.isTopSeller}
                                      onChange={this.handleCheckBox}>
                                Top Seller
                            </Checkbox>
                        </Col>
                    </Row>

                    <Col lg={8} md={8} sm={12}>
                        <Row>
                            <Col md={5} sm={8}>
                                <FormTextareaField
                                    label="Описание"
                                    name="description"
                                    value={this.state.description}
                                    required={true}
                                    disabled={false}
                                    onChange={this.handleChange}/>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={2} sm={5} xs={6}>
                                <FormInputField
                                    label="Цена"
                                    name="price"
                                    type="number"
                                    step="0.1"
                                    value={this.state.price}
                                    required={false}
                                    disabled={false}
                                    onChange={this.handleChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <h4 className="text-danger">Активни промоции</h4>

                            {promos}

                            <h4 className="text-danger">Цена след отстъпки</h4>
                            <p>
                                {priceAfterDiscount}
                            </p>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                {images}
                            </Col>

                            <Col xs={12} md={6} sm={12}>
                                <AddImageForm
                                    label="Добави снимка"
                                    addImage={this.addImage}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={4} md={4} sm={12}>
                        {!(this.state.selectedCategories.length > 0 && this.state.selectedCategories[0].label == ' ') &&
                        <Row className="product-category-select">
                        <h4>Категория</h4>
                            <MultiSelect
                            handleChange={this.handleCategoryChange}
                            options={this.state.categories}
                            selectedOption={this.state.selectedCategories}
                            />

                        </Row>}

                        {!(this.state.selectedSubcategories.length > 0 && this.state.selectedSubcategories[0].label == ' ') &&
                        <Row className="product-category-select">
                        <h4>Подкатегория</h4>
                            <MultiSelect
                            handleChange={this.handleSubcategoryChange}
                            options={this.state.subcategories}
                            selectedOption={this.state.selectedSubcategories}
                            />

                        </Row>}
                       
                    </Col>

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

export default CreateProduct;

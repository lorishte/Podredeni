import React from 'react';

import {Col, Row, Grid} from 'react-bootstrap';
import {ToastContainer} from 'react-toastr';


// Partials
import ProductCard from './partials/ProductCard';


// Services
import productsService from '../../../../services/products/productsService';
import categoryService from '../../../../services/categories/categoryService';


// Constants
import {RESOLUTIONS} from '../../../../data/constants/componentConstants';

class FilterObject {
    constructor() {
        this.original = [];
        this.selected = [];
        this.matched = [];
    }
}

class ProductsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],

            categories: new FilterObject(),
            subcategories: new FilterObject(),

            size: 50,
            page: 1,
            sortProperty: 'number',
            descending: true,
            filterProperty: 'name',
            filterValue: '',

            resolution: window.innerWidth,

            loading: true,
            filtering: false
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('orientationchange', this.handleResolutionChange);
        window.addEventListener('resize', this.handleResolutionChange);

        this.loadProducts();

        this.loadCategories();
    }

    componentWillUnmount() {
        window.removeEventListener('orientationchange', this.handleResolutionChange);
        window.removeEventListener('resize', this.handleResolutionChange);
    }

    handleResolutionChange = () => {
        this.setState({resolution: window.innerWidth});
    };

    loadCategories = () => {
        categoryService
            .loadCategories(null, false)
            .then(res => {

                    let categories = Object.assign({}, this.state.categories);      //creating copy of object
                    categories.original = res;                                      //updating value
                    this.setState({categories});

                    categoryService
                        .loadCategories(null, true)
                        .then(res => {
                            let subcategories = Object.assign({}, this.state.subcategories);      //creating copy of object
                            subcategories.original = res;                                      //updating value
                            this.setState({subcategories});
                            this.loadProducts();
                        })
                }
            )
            .catch(err => console.log(err))
    };

    loadProducts = () => {
        this.setState({filtering: true});

        productsService
            .loadProducts(this.state)
            .then(res => {

                res.products.forEach(e => e.images.reverse());
                this.setState({
                    products: res.products,
                    loading: false,
                    filtering: false
                });

                let categories = Object.assign({}, this.state.categories);
                categories.matched = res.categories;

                let subcategories = Object.assign({}, this.state.subcategories);
                subcategories.matched = res.subcategories;

                this.setState({categories, subcategories}, () => console.log(this.state));

            })
            .catch(err => {
                this.props.history.push('/error');
            });
    };

    selectFilterCategory = (e) => {

        let stateProp = e.target.getAttribute('name');

        let id = e.target.getAttribute('id');


        if (this.state[stateProp].selected.includes(id)) {

            let selectedStateProp = Object.assign({}, this.state[stateProp]);
            let test = selectedStateProp.selected.filter(e => e !== id);
            selectedStateProp.selected = test;
            this.setState({[stateProp]: selectedStateProp});

        } else {

            let selectedStateProp = Object.assign({}, this.state[stateProp]);
            selectedStateProp.selected.push(id);
            this.setState({[stateProp]: selectedStateProp});
        }

        setTimeout(() => {
            this.loadProducts();
        }, 2000)
    };


    render() {

        if (this.state.loading) return <div className='loader'/>;


        let resolution = this.state.resolution < RESOLUTIONS.xs;

        let productsList = this.state.products.map(e => {
            return <ProductCard key={e.id}
                                data={e}
                                toastContainer={this.toastContainer}
                                xsRes={resolution ? 12 : 6}/>;
        });


        let categories = this.state.categories.original.map(c => {

            if (c.name === 'Default') return;

            let catStyle = this.state.categories.matched.map(e => e.id).includes(c.id) ? 'category' : 'category disabled';

            let style = this.state.categories.selected.includes(c.id) ? 'check-box selected' : 'check-box';

            return <div key={c.id} className={catStyle}>
                <span className={style}/>{c.name}
                <span className="over"
                      id={c.id}
                      name="categories"
                      onClick={this.selectFilterCategory}/>
            </div>
        });


        let subCategories = this.state.subcategories.original.map(sc => {

            let catStyle = this.state.subcategories.matched.map(e => e.id).includes(sc.id) ? 'category' : 'category disabled';

            let style = this.state.subcategories.selected.includes(sc.id) ? 'check-box selected' : 'check-box';

            return <div key={sc.id} className={catStyle}>
                <span className={style}/>{sc.name}
                <span className="over"
                      id={sc.id}
                      name="subcategories"
                      onClick={this.selectFilterCategory}/>
            </div>
        });


        return (
            <Grid id="products">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />


                <Row>
                    <Col xs={2}>
                        <aside>
                            <div className="filters-container">
                                <h4>Categories</h4>
                                {categories}
                            </div>

                            <div className="filters-container">
                                <h4>Subcategories</h4>
                                {subCategories}
                            </div>
                        </aside>
                    </Col>

                    <Col xs={10}>

                        {this.state.filtering &&
                        <div className="loader"/>
                        }
                        {!this.state.filtering &&
                        productsList
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default ProductsList;
import React from 'react';
import {Redirect} from 'react-router';
import {Col, Row, Grid, Breadcrumb, PageHeader} from 'react-bootstrap';
import {ToastContainer} from 'react-toastr';

// SEO
import SEO_MetaTags from '../../../common/SEO/SEO_MetaTags'

// Partials
import ProductCard from './partials/ProductCard';

// Services
import categoryService from '../../../../services/categories/categoryService';

// Constants
import {RESOLUTIONS} from '../../../../data/constants/componentConstants';
import {categorySefUrls, subCategorySefUrls, subCategorySefUrlsToId} from '../../../../data/constants/sefUrls'
import productsInStock from '../../../../data/constants/productsInStock'


class ProductsListByCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryId: '',
            categoryName: '',
            allProducts: [],
            filteredProducts: [],
            subcategories: [],

            selectedSubcategoryIds: [],

            size: 50,
            page: 1,
            sortProperty: 'number',
            descending: true,
            filterProperty: 'name',
            filterValue: '',

            resolution: window.innerWidth,

            loading: true,
            filtering: false,

            filterOpen: false
        };

        // this.catId = this.props.match.params.id;

        this.catId = categorySefUrls[this.props.match.params.categoryName];
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('orientationchange', this.handleResolutionChange);
        window.addEventListener('resize', this.handleResolutionChange);

        this.loadNestedCategories();
    }


    componentWillUnmount() {
        window.removeEventListener('orientationchange', this.handleResolutionChange);
        window.removeEventListener('resize', this.handleResolutionChange);

        // sessionStorage.setItem('selectedSubcategoryIds', JSON.stringify(this.state.selectedSubcategoryIds));
        // sessionStorage.setItem('categoryId', JSON.stringify(this.state.categoryId));
    }


    checkFilters = () => {
        let prevCategory = JSON.parse(sessionStorage.getItem('categoryId'))

        let currentCategory = categorySefUrls[this.props.match.params.categoryName]

        if (prevCategory && prevCategory === currentCategory) {
            let subCategories = JSON.parse(sessionStorage.getItem('selectedSubcategoryIds'));

            if (subCategories) {
                this.setState({selectedSubcategoryIds: subCategories}, () => {
                    this.setState({
                        filteredProducts: this.filterProducts()
                    });
                });
            }
        }
    };

    handleResolutionChange = () => {
        this.setState({resolution: window.innerWidth});
    };

    checkUrl = () => {

        let filter = this.props.location.search

        if (filter) {

            let filterNames = filter.split('=').pop().split('&').map(e => e = subCategorySefUrls[e])

            console.log(filterNames)

            // let subCatId = subCategorySefUrls[filterName]

            console.log(filterNames)

            this.setState({
                selectedSubcategoryIds: filterNames,
            }, () => {
                this.setState({
                    filteredProducts: this.filterProducts(),
                    filtering: false
                });
            });
        }
    }

    removeFilterFromUrl = (id) => {

        let query = this.props.location.search

        let filtersArr = query.split('=').pop().split('&')

        let filterToRemove = subCategorySefUrlsToId[id]

        const index = filtersArr.indexOf(filterToRemove);

        if (index > -1) {
            filtersArr.splice(index, 1);
        }

        let queryFinal = ''

        if (filtersArr.length > 0) {

            let newQuery = '?filter='

            filtersArr.forEach(e => newQuery += e + '&')

            queryFinal = newQuery.slice(0, -1)
        }

        this.props.history.push(this.props.location.pathname + queryFinal)
    }

    addFilterToUrl = (id) => {
        let filter = this.props.location.search

        if (filter) {
            filter += '&' + subCategorySefUrlsToId[id]
        } else {
            filter = '?filter=' + subCategorySefUrlsToId[id]
        }

        this.props.history.push(this.props.location.pathname + filter);
    }

    loadNestedCategories = () => {

        categoryService
            .loadNestedCategories(null, 1000)
            .then(res => {

                let selectedCategory = res.filter(c => c.id === this.catId)[0];

                let products = selectedCategory.products

                // Reverse images to get the first and get inStock
                products.forEach(p => {
                    p.images.reverse();

                    if (productsInStock[p.id]) {
                        p.inStock = productsInStock[p.id].inStock
                    } else {
                        p.inStock = true
                    }

                });

                // Put OutOfStock products at the end of the list
                let inStockProducts = products.filter(e => e.inStock)
                let outOfStockProducts = products.filter(e => !e.inStock)

                products = inStockProducts.concat(outOfStockProducts)

                // Sort subcategories by alphabetical order
                selectedCategory.subcategories.sort((a, b) => a.name.localeCompare(b.name));


                this.setState({
                    categoryName: selectedCategory.name,
                    categoryId: selectedCategory.id,
                    allProducts: products,
                    filteredProducts: products,
                    subcategories: selectedCategory.subcategories,
                    loading: false
                }, () => {
                    // this.checkFilters()
                    this.checkUrl()
                });
            })
            .catch(err => console.log(err));
    };

    selectFilterCategory = (e) => {

        this.setState({filtering: true});

        let id = e.target.getAttribute('id');

        let subCats = this.state.selectedSubcategoryIds;

        // Remove subcategory if already selected
        if (subCats.includes(id)) {

            this.setState({
                selectedSubcategoryIds: subCats.filter(scId => scId !== id),
            }, () => {
                this.setState({
                    filteredProducts: this.filterProducts(),
                    filtering: false
                });

                this.removeFilterFromUrl(id);
            });
        } else {
            // Add subcategory
            this.setState({
                selectedSubcategoryIds: [...this.state.selectedSubcategoryIds, id],
            }, () => {

                this.addFilterToUrl(id);

                this.setState({
                    filteredProducts: this.filterProducts(),
                    filtering: false
                });
            });
        }

    };

    filterProducts = () => {

        let filteredProducts = [];

        if (this.state.selectedSubcategoryIds.length > 0) {
            this.state.allProducts.forEach(p => {
                p.subcategories.forEach(sc => {
                    if (this.state.selectedSubcategoryIds.includes(sc.id)) {
                        filteredProducts.push(p);
                    }
                });
            });
        } else {
            filteredProducts = this.state.allProducts;
        }

        return filteredProducts;
    };

    showMessage = (type, header, message) => {
        this.toastContainer[type](header, message);
    };

    render() {

        if (this.state.loading) return <div className='loader'/>;

        let resolution = this.state.resolution < RESOLUTIONS.xs;

        let productsList = this.state.filteredProducts.map(e => {

            return <ProductCard key={e.id}
                                product={e}
                                showMessage={this.showMessage}
                                xsRes={resolution ? 12 : 6}/>;

        });

        let subcategories = this.state.subcategories.map(sc => {

            let catStyle = this.state.selectedSubcategoryIds.map(e => e.id).includes(sc.id) ? 'sub-category' : 'sub-category disabled';

            let checked = this.state.selectedSubcategoryIds.includes(sc.id) ? 'check-box selected' : 'check-box';

            return (

                <div key={sc.id} className={catStyle}>
					<span className={checked}>
						<i className="fa fa-check" aria-hidden="true"/>
					</span>
                    <span className='name'>{sc.name} </span>
                    <span className='label'>{sc.count}</span>
                    <span className="over"
                          id={sc.id}
                          onClick={this.selectFilterCategory}/>
                </div>
            );
        });

        let urlPath = this.props.location.pathname;


        return (

            <Grid id="products" bsClass={'container-fluid'}>

                <SEO_MetaTags activeLanguage={'bg'} pageName={this.catId} url={urlPath}/>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"/>


                <Col xs={12}>

                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Начало</Breadcrumb.Item>
                        <Breadcrumb.Item href="/products">Продукти</Breadcrumb.Item>
                        <Breadcrumb.Item active>{this.state.categoryName}</Breadcrumb.Item>
                    </Breadcrumb>

                    <Col xs={12} sm={4} md={3}>

                        <Col xs={12} className="filters-container">
                            <div className={'category-name'}>
                                <h1>{this.state.categoryName}</h1>
                                <button className={this.state.filterOpen ? 'toggle-menu' : 'toggle-menu clicked'}
                                        onClick={() => this.setState({filterOpen: !this.state.filterOpen})}>
                                    <span className={'toggle'}/>
                                    <span className={'toggle'}/>
                                </button>
                            </div>
                            <div className={this.state.filterOpen ? 'body' : 'body visible'}>
                                {subcategories}
                            </div>

                        </Col>
                    </Col>

                    <Col xs={12} sm={8} md={9}>

                        <Row>
                            {this.state.filtering && <div className="loader"/>}

                            {!this.state.filtering && productsList}
                        </Row>
                    </Col>
                </Col>

            </Grid>
        );
    }
}

export default ProductsListByCategory;
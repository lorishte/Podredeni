import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import PropTypes from 'prop-types';


// Constants
import {TOASTR_MESSAGES, CURRENCY, PRODUCT} from '../../../../../data/constants/componentConstants';

// Utils
import utils from '../../../../../utils/utils';


class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xsRes: this.props.xsRes
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({xsRes: nextProps.xsRes});
    }

    addToCart = (e) => {

        e.preventDefault()


        if (sessionStorage.getItem('products') === null) {
            sessionStorage.setItem('products', '[]');
        }

        let addedProducts = JSON.parse(sessionStorage.getItem('products'));

        if (this.checkIfProductIsInCart(addedProducts)) {
            this.props.showMessage('warning', TOASTR_MESSAGES.editQuantityFromCart, TOASTR_MESSAGES.productAlreadyInCart);
            return;
        }

        let p = this.props.product

        let product = {
            id: p.id,
            name: p.name,
            image: p.images[0],
            price: p.price,
            quantity: 1,
            discount: p.discount,
        };

        addedProducts.push(product);
        sessionStorage.products = JSON.stringify(addedProducts);

        this.props.showMessage('success', TOASTR_MESSAGES.productAddedToCart, '');

        // Paths are different if added from category list or all products
        let path = this.props.match.path;

        this.props.history.push(path);// to refresh products count in header
        this.props.history.go(-1); // step back to fix history logic
    };

    checkIfProductIsInCart = (array) => {
        return (array.filter(e => e.id === this.props.product.id).length > 0);
    };

    render() {
        const {product, size} = this.props;

        let url = product.images[0];

        let altTag = product.images[0];

        if (url && !url.includes('http')) url = '/images/products/' + url;

        let categoryName = utils.generateRouteName(product.categories[0].name)

        let productName = utils.generateRouteName(product.name)

        return (
            <Col xs={this.state.xsRes} sm={6} md={size === 'smaller' ? 3 : 4}>
                <Link to={'/products/' + categoryName + '/' + productName}>
                    <div className="card">

                        {product.discount > 0 && <span className="promo-label">-{product.discount}%</span> }

                        {product.isNewProduct && <span className={'new-label'}>{PRODUCT.new}</span>}

                        <div className={product.inStock ? "product-image" : "product-image faded"}>
                            <img className="card-img-top" src={url} alt={altTag}/>
                        </div>

                        <div className="card-body">
                            <h4 className="card-title">{product.name}</h4>
                            {!product.inStock &&
                                <span className="outOfStock">{PRODUCT.outOfStock}</span>
                            }

                            <p className="card-text">{product.description.substring(0, 80) + ' ...'}</p>

                            {product.discount === 0 &&
                            <p className="price">{product.price.toFixed(2)} {CURRENCY}</p>}

                            {product.discount > 0 &&
                            <p className="price">
                                <span className="old-price">{product.price.toFixed(2)} {CURRENCY}</span>
                                <span>{(utils.calculatePriceAfterDiscount(product.price, product.discount)).toFixed(2)} {CURRENCY}</span>
                            </p>
                            }

                            {product.inStock &&
                            <button className="add-to-cart-btn" onClick={this.addToCart}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"/>
                            </button>
                            }

                            <span className="add-to-cart-btn">
                                <i className="fa fa-search" aria-hidden="true"/>
                            </span>

                        </div>
                    </div>
                </Link>


            </Col>
        );
    }
}

export default withRouter(ProductCard);

ProductCard.propTypes = {
    product: PropTypes.object,
    showMessage: PropTypes.func,
    size: PropTypes.string,
    xsRes: PropTypes.number
};
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Private route
import PrivateRoute from './PrivateRoute';

// Components
// AUTH
import Login from '../auth/Login';
import Register from '../auth/Register';

// USER
import Home from '../user/home/Home';
import Videos from '../user/videos/Videos';
import Partners from '../user/partners/Partners';
import Contact from '../user/contact/Contact';
import Terms from '../user/termsAndConditions/Terms';

// User Products
import ProductsList from '../user/product/list/ProductsList';
import ProductDetails from '../user/product/details/ProductDetails';

// User News
import NewsList from '../user/news/NewsList';
import NewsDetails from '../user/news/NewsDetails';
import NewsEdit from '../user/news/NewsEdit';
import NewsCreate from '../user/news/NewsCreate';

// User Cart
import Cart from '../user/cart/Cart';


// ADMIN
// Admin Products
import CreateProduct from '../admin/product/create/EditCreateProduct';
import AdminProductsList from '../admin/product/list/ProductsList';

// Admin Promos
import AdminPromosList from '../admin/promo/list/PromosList';
import EditCreateDiscountPromo from '../admin/promo/discountPromo/EditCreateDiscountPromo';
import EditCreateProductPromo from '../admin/promo/productPromo/EditCreateProductPromo';

// Admin Partners
import AdminPartnersList from '../admin/partner/list/PartnersList'
import PartnerEditCreate from '../admin/partner/create/EditCreatePartner';

// Admin Orders
import AdminOrdersList from '../admin/order/list/OrdersList';
import OrderLog from '../admin/order/log/OrderLog';
import OrderEdit from '../admin/order/edit/OrderEdit';

//Admin Videos
import VideosList from '../admin/video/list/VideosList';

// Admin Home content
import HomeContent from '../admin/homeContent/HomeContent';
import CarouselItemCreate from '../admin/homeContent/carousel/partials/CarouselItemCreate'
import CarouselItemEdit from '../admin/homeContent/carousel/partials/CarouselItemEdit';

// Admin Categories
import CategoriesList from '../admin/category/list/CategoriesList';

// Admin Settings
import Settings from '../admin/settings/settings';

// ERRORS and CONFIRMATIONS
import OrderReceived from '../common/confirmation/OrderReceived';
import Error from '../common/errors/Error';
import NotFound from '../common/errors/NotFound';


let Routes = () => {
	return (
		<Switch>
			/*User*/
			<Route exact path='/' component={Home}/>
			<Route exact path='/home' component={Home}/>

			<Route path='/login' component={Login}/>
			<Route path='/register' component={NotFound}/>

			<Route exact path='/products' component={ProductsList}/>
			<Route path='/products/:id' component={ProductDetails}/>

			<Route exact path='/news/create' component={NewsCreate}/>
			<Route exact path='/news/list' component={NewsList}/>
			<Route exact path='/news/:id' component={NewsDetails}/>
			<Route exact path='/news/edit/:id' component={NewsEdit}/>


			<Route path='/cart' component={Cart}/>

			<Route exact path='/videos' component={Videos}/>

			<Route exact path='/partners' component={Partners}/>

			<Route path='/contact' component={Contact}/>

			<Route path='/terms' component={Terms}/>

			/*Admin*/
			<PrivateRoute path='/product/create' component={CreateProduct}/>
			<PrivateRoute path='/product/edit/:id' component={CreateProduct}/>
			<PrivateRoute path='/product/list' component={AdminProductsList}/>

			<PrivateRoute path='/category/list' component={CategoriesList}/>

			<PrivateRoute path='/promos/list' component={AdminPromosList}/>
			<PrivateRoute path='/promos/edit-discount-promo/:id' component={EditCreateDiscountPromo}/>
			<PrivateRoute path='/promos/create-discount-promo' component={EditCreateDiscountPromo}/>

			<PrivateRoute path='/promos/edit-product-promo/:id' component={EditCreateProductPromo}/>
			<PrivateRoute path='/promos/create-product-promo' component={EditCreateProductPromo}/>

			<PrivateRoute path='/videos/list' component={VideosList}/>

			<PrivateRoute path='/partners/list' component={AdminPartnersList}/>
			<PrivateRoute path='/partners/edit/:id' component={PartnerEditCreate}/>
			<PrivateRoute path='/partners/create' component={PartnerEditCreate}/>

			<PrivateRoute path='/order/list' component={AdminOrdersList}/>
			<PrivateRoute path='/order/log/:id' component={OrderLog}/>
			<PrivateRoute path='/order/edit/:id' component={OrderEdit}/>

			<PrivateRoute exact path='/home-content' component={HomeContent}/>
			<PrivateRoute exact path='/carousel-item/create' component={CarouselItemCreate}/>
			<PrivateRoute exact path='/carousel-item/edit/:id' component={CarouselItemEdit}/>

			<PrivateRoute exact path='/settings' component={Settings}/>


			/*Errors and Confirmations*/
			<Route path='/error' component={Error}/>
			<Route path='/order/confirmation' component={OrderReceived}/>

			/*Rest*/
			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;
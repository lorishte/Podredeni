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
import Contact from '../user/contact/Contact';
import Terms from '../user/termsAndConditions/Terms';

// User Products
import ProductsList from '../user/product/list/ProductsList';
import ProductDetails from '../user/product/details/ProductDetails';

// User Cart
import Cart from '../user/cart/Cart';


// ADMIN
// Admin Products
import CreateProduct from '../admin/product/create/editCreateProduct';
import AdminProductsList from '../admin/product/list/ProductsList';

// Admin Orders
import AdminOrdersList from '../admin/order/list/OrdersList';
import OrderLog from '../admin/order/log/OrderLog';
import OrderEdit from '../admin/order/edit/OrderEdit';

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

			<Route path='/cart' component={Cart}/>

			<Route path='/videos' component={Videos}/>

			<Route path='/contact' component={Contact}/>

			<Route path='/terms' component={Terms}/>

			/*Admin*/
			<PrivateRoute path='/product/create' component={CreateProduct}/>
			<PrivateRoute path='/product/edit/:id' component={CreateProduct}/>
			<PrivateRoute path='/product/list' component={AdminProductsList}/>

			<PrivateRoute path='/order/list' component={AdminOrdersList}/>
			<PrivateRoute path='/order/log/:id' component={OrderLog}/>
			<PrivateRoute path='/order/edit/:id' component={OrderEdit}/>


			/*Errors and Confirmations*/
			<Route path='/error' component={Error}/>
			<Route path='/order/confirmation' component={OrderReceived}/>

			/*Rest*/
			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;
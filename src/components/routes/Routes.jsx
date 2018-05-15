import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Private route
import PrivateRoute from './PrivateRoute';

// Components
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../user/home/Home';
import ProductsList from '../user/product/list/ProductsList';
import ProductDetails from '../user/product/details/ProductDetails';
import Cart from '../user/cart/Cart';
import OrderReceived from '../common/OrderReceived';
import About from '../user/about/About';
import Contact from '../user/contact/Contact';
import NotFound from '../common/NotFound';
import CreateProduct from '../admin/product/create/editCreateProduct';
import AdminProductsList from '../admin/product/list/ProductsList';
import AdminOrdersList from '../admin/order/list/OrdersList';
import OrderLog from '../admin/order/log/OrderLog';
import OrderEdit from '../admin/order/edit/OrderEdit';


let Routes = () => {
	return (
		<Switch>
			/*User*/
			<Route exact path='/' component={Home}/>
			<Route path='/home' component={Home}/>

			<Route path='/login' component={Login}/>
			<Route path='/register' component={NotFound}/>

			<Route exact path='/products' component={ProductsList}/>
			<Route path="/products/:id" component={ProductDetails}/>

			<Route path='/cart' component={Cart}/>

			<Route path='/order/confirmation' component={OrderReceived}/>

			<Route path='/about' component={About}/>
			<Route path='/contact' component={Contact}/>

			/*Admin*/
			<PrivateRoute path='/product/create' component={CreateProduct}/>
			<PrivateRoute path='/product/edit/:id' component={CreateProduct}/>
			<PrivateRoute path='/product/list' component={AdminProductsList}/>

			<PrivateRoute path='/order/list' component={AdminOrdersList}/>
			<PrivateRoute path='/order/log/:id' component={OrderLog}/>
			<PrivateRoute path='/order/edit/:id' component={OrderEdit}/>

			/*Rest*/
			<Route path='*' component={NotFound}/>
		</Switch>
	);
};

export default Routes;
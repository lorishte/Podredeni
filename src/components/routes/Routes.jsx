import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Private route
import PrivateRoute from './PrivateRoute'

// Components
import Login from '../auth/Login'
import Register from '../auth/Register'
import Home from '../user/home/Home'
import ProductsList from '../user/productList/ProductsList'
import Product from '../user/product/Product'
import Cart from '../user/cart/Cart'
import About from '../user/about/About'
import Contact from '../user/contact/Contact'
import NotFound from '../common/NotFound'


let Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component= {Home} />

            <Route path='/login' component= {Login} />
            <Route path='/register' component= {NotFound} />

            <Route exact path='/products' component= {ProductsList} />
            <Route path="/products/:id" component={Product} />

            <Route path='/cart' component= {Cart} />

            <Route path='/about' component= {About} />
            <Route path='/contact' component= {Contact} />

            {/*<PrivateRoute path='/addVideo' component= {Modal} />*/}

            <Route path='*' component= {NotFound}/>
        </Switch>
    )
};

export default Routes
import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Private route
import PrivateRoute from './PrivateRoute'

// Components
import Login from '../auth/Login'
import Register from '../auth/Register'
import Home from '../home/Home'
import ProductsList from '../product/ProductsList'
import Product from '../product/Product'
import Cart from '../cart/Cart'
import About from '../about/About'
import Contact from '../contact/Contact'
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
        </Switch>
    )
};

export default Routes
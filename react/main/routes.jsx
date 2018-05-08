import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Products from '../product/productList'
import About from '../about/about'

export default props => (
    <Router history={hashHistory}>
        <Route path='/products' component={Products} />
        <Route path='/about' component={About} />
        <Redirect from='*' to='/products' />
    </Router>
)
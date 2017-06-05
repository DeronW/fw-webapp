import React, { Component } from "react"
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import BlankPage from './pages/blank-page'
import Home from './pages/home'
import Car from './pages/car'
import Insurance from './pages/insurance'
import Quote from './pages/quote'
import Customer from './pages/customer'
import Confirm from './pages/confirm'
import Payment from './pages/payment'
import Result from './pages/result'
import OrderList from './pages/order-list'
import QuoteDetail from './pages/quote-detail'
import CarInfo from './pages/car-info'
import UserInfo from './pages/user-info'

export default (stores) => {

    return <Router>
        <Provider {...stores} >
            <Switch>
            <Route exact path='/home' component={Home} />
            <Route exact path='/car' component={Car} />
            <Route exact path='/insurance' component={Insurance} />
            <Route exact path='/quote' component={Quote} />
            <Route exact path='/customer' component={Customer} />
            <Route exact path='/confirm' component={Confirm} />
            <Route exact path='/payment' component={Payment} />
            <Route exact path='/result' component={Result} />
            <Route exact path='/order-list' component={OrderList} />
            <Route exact path='/quote-detail' component={QuoteDetail} />
            <Route exact path='/car-info' component={CarInfo} />
            <Route exact path='/user-info' component={UserInfo} />
                <Route component={BlankPage} />
            </Switch>
        </Provider>
    </Router>

}

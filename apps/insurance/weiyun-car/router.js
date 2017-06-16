import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Home from './pages/home'
import Basic from './pages/basic.js'
import CarInfo from './pages/car-info'
import PolicyDetail from './pages/policy-detail'
import PolicyQuotation from './pages/policy-quotation'
import CustomerInfo from './pages/customer-info'
import OrderConfirm from './pages/order-confirm'
import OrderPayment from './pages/order-payment'
import OrderResult from './pages/order-result'
import Orders from './pages/orders'


export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/basic' component={Basic} />
                <Route exact path='/car-info' component={CarInfo} />
                <Route exact path='/policy-detail' component={PolicyDetail} />
                <Route exact path='/policy-quotation' component={PolicyQuotation} />
                <Route exact path='/customer-info' component={CustomerInfo} />
                <Route exact path='/order-confirm' component={OrderConfirm} />
                <Route exact path='/order-payment' component={OrderPayment} />
                <Route exact path='/order-result' component={OrderResult} />
                <Route exact path='/orders' component={Orders} />
            </Switch>
        </Provider>
    </Router>
}

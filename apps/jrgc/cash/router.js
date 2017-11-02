import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import Login from './pages/login'

import Home from './pages/home'

import Credit from './pages/credit'
import CreditEmc from './pages/credit-emc'

import * as Bills from './pages/bills'

import * as User from './pages/user'

import LoanApply from './pages/loan-apply'
import LoanStatus from './pages/loan-status'


export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                {/* 登录 */}
                <Route exact path="/login" component={Login}/>

                {/* 首页 */}
                <Route exact path="/" component={Home}/>

                {/* 授信 */}
                <Route exact path="/credit" component={Credit} />
                <Route exact path="/credit/emc" component={CreditEmc} />

                {/* 借款 */}
                <Route exact path="/loan/apply" component={LoanApply} />
                <Route exact path="/loan/status" component={LoanStatus} />

                {/* 账单 */}
                <Route exact path="/bills" component={Bills.Bills}/>
                <Route exact path="/bills/details" component={Bills.Details}/>

                {/* 我的 */}
                <Route exact path="/user" component={User.User}/>
                <Route exact path="/user/set-bank-card" component={User.SetBankCard}/>
            </Switch>
        </Provider>
    </Router>
}
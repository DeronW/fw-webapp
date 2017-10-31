import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import Home from './pages/home'
import * as Bills from './pages/bills'
import * as User from './pages/user'


export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                {/* 首页 */}
                <Route exact path="/" component={Home}/>

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
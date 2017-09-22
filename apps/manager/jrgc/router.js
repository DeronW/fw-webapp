import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import * as Stats from './pages/stats'
import * as User from './pages/user'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                {/* 业绩 相关页面 */}
                <Route exact path="/stats" component={Stats.Stats}/>
                <Route exact path="/" component={User.User}/>
                <Route exact path="/user-rebate" component={User.Rebate}/>
                <Route exact path="/user-transfer-coupon" component={User.TransferCoupon}/>
                <Route exact path="/user-transfer-records" component={User.TransferRecords}/>
            </Switch>
        </Provider>
    </Router>
}
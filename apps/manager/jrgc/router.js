import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import * as Stats from './pages/stats'
import * as User from './pages/user'
import * as Vistor from './pages/vistor'
import Login from './pages/login.js';

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>

                {/* 业绩 相关页面 */}
                <Route exact path="/stats" component={Stats.Overview}/>
                <Route exact path="/stats-invested" component={Stats.Invested}/>
                <Route exact path="/stats-registered" component={Stats.Registered}/>
                <Route exact path="/stats-invested-first-time" component={Stats.InvestedFirstTime}/>

                <Route exact path="/login" component={Login}/>
                {/*我的 相关页面*/}
                <Route exact path="/" component={User.User}/>
                <Route exact path="/user-rebate" component={User.Rebate}/>
                <Route exact path="/user-transfer-coupon" component={User.TransferCoupon}/>
                <Route exact path="/user-transfer-record" component={User.TransferRecord}/>
                <Route exact path="/user-transfer-friends" component={User.TransferFriends}/>

                {/*客户相关页面*/}
                <Route exact path="/vistor-score" component={Vistor.Score}/>
            </Switch>
        </Provider>
    </Router>
}
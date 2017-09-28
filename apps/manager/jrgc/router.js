import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import * as Stats from './pages/stats'
import * as User from './pages/user'
import * as Investor from './pages/investor'
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
                <Route exact path="/investor" component={Investor.Investor}/>
                <Route exact path="/investor-remark" component={Investor.Remark}/>
                <Route exact path="/investor-search" component={Investor.Search}/>
                <Route exact path="/investor-birthday" component={Investor.Birthday}/>
                <Route exact path="/investor-info" component={Investor.Info}/>
                <Route exact path="/investor-coupon" component={Investor.Coupon}/>
                <Route exact path="/investor-score" component={Investor.Score}/>
                <Route exact path="/investor-bean" component={Investor.Bean}/>
                <Route exact path="/investor-account-hj" component={Investor.AccountHj}/>
                <Route exact path="/investor-hj-list" component={Investor.HjList}/>
            </Switch>
        </Provider>
    </Router>
}
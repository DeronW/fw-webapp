import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Entry from './pages/entry.js'
import Login from './pages/login.js'
import SetPassword from './pages/set-password.js'
import Redbag from './pages/redbag.js'
import RedbagRecords from './pages/redbag-records.js'
import RedbagResult from './pages/redbag-result.js'
import BankCard from './pages/bank-card.js'
import BankCardAdd from './pages/bank-card-add.js'
import BankCardVerify from './pages/bank-card-verify.js'
import RepaymentList from './pages/repayment-list.js'
import Repayment from './pages/repayment.js'
import RepaymentResult from './pages/repayment-result.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/entry' component={Entry} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/set-password' component={SetPassword} />
                {/*注册用户领取红包*/}
                <Route exact path='/redbag' component={Redbag} />
                <Route exact path='/redbag-records' component={RedbagRecords} />
                <Route exact path='/redbag-result' component={RedbagResult} />
                {/*银行卡绑定*/}
                <Route exact path='/bank-card' component={BankCard} />
                <Route exact path='/bank-card-add' component={BankCardAdd} />
                <Route exact path='/bank-card-verify' component={BankCardVerify} />
                {/*还款*/}
                <Route exact path='/repayment-list' component={RepaymentList} />
                {/*还款相关页面*/}
                <Route exact path='/repayment' component={Repayment} />
                <Route exact path='/repayment-result' component={RepaymentResult} />
                <Route exact path='/repayment-bank-card' component={BankCard} />
            </Switch>
        </Provider>
    </Router>
}

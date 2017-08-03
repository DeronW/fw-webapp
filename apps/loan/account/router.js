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
import UserPanel from './pages/user-panel.js'

import Redbag from './pages/redbag.js'
import RedbagRecords from './pages/redbag-records.js'
import RedbagResult from './pages/redbag-result.js'

import BankCard from './pages/bank-card.js'
import BankCardAdd from './pages/bank-card-add.js'
import BankCardVerify from './pages/bank-card-verify.js'

import BillRecords from './pages/bill-records.js'
import BillYouyiDetail from './pages/bill-youyi-detail.js'

import RepaymentRecords from './pages/repayment-records.js'
import RepaymentYouyi from './pages/repayment-youyi.js'
import RepaymentFenqi from './pages/repayment-fenqi.js'
import RepaymentFangXinResult from './pages/repayment-fangxin-result.js'
import RepaymentYouyiResult from './pages/repayment-youyi-result.js'
import RepaymentFangXin from './pages/repayment-fangxin.js'
import RepaymentBankCard from './pages/repayment-bank-card.js'
import RepaymentYouyiRecords from './pages/repayment-youyi-records'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/entry' component={Entry} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/set-password' component={SetPassword} />
                <Route exact path='/user-panel' component={UserPanel} />
                {/*注册用户领取红包*/}
                <Route exact path='/redbag' component={Redbag} />
                <Route exact path='/redbag-records' component={RedbagRecords} />
                <Route exact path='/redbag-result' component={RedbagResult} />
                {/*银行卡绑定*/}
                <Route exact path='/bank-card' component={BankCard} />
                <Route exact path='/bank-card-add' component={BankCardAdd} />
                <Route exact path='/bank-card-verify' component={BankCardVerify} />
                {/*还款相关页面*/}
                <Route exact path='/repayment-records' component={RepaymentRecords} />
                <Route exact path='/repayment-youyi' component={RepaymentYouyi} />
                <Route exact path='/repayment-fangxin' component={RepaymentFangXin} />
                <Route exact path='/repayment-fenqi' component={RepaymentFenqi} />
<<<<<<< HEAD
                <Route exact path='/repayment-result' component={RepaymentResult} />
                <Route exact path='/repayment-fangxin-result' component={RepaymentFangXinResult} />
=======
                <Route exact path='/repayment-youyi-result' component={RepaymentYouyiResult} />
>>>>>>> b69c1f2ebdb64f2b4d5570bff81025cff85c29e7
                <Route exact path='/repayment-bank-card' component={RepaymentBankCard} />
                <Route exact path='/repayment-youyi-records' component={RepaymentYouyiRecords} />
                <Route exact path='/bill-records' component={BillRecords} />
                <Route exact path='/bill-youyi-detail' component={BillYouyiDetail} />

            </Switch>
        </Provider>
    </Router>
}

import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Home from './pages/home.js'
import LoopLoan from './pages/loan-youyi-index.js'
import LoopLoanLoan from './pages/loan-youyi-form.js'
import LoopLoanResult from './pages/loan-youyi-result.js'
import LoopLoanAuthorization from './pages/loan-youyi-authorization.js'
import LoopLoanCard from './pages/loan-youyi-card.js'
import LoopLoanAuthlist from './pages/loan-youyi-authlist.js'
import LoopLoanCardAdd from './pages/loan-youyi-card-add.js'
import LoopLoanCity from './pages/loan-youyi-city.js'

import FxhIndex from './pages/loan-fxh-index.js'
import FxhWant from './pages/loan-fxh-want.js'
import FxhConfirm from './pages/loan-fxh-confirm.js'
import FxhResult from './pages/loan-fxh-result.js'

import FqIndex from './pages/loan-fq-index.js'
import FqForm from './pages/loan-fq-form.js'

import * as Protocols from './pages/protocols'
import * as Mortgage from './pages/mortgage'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/loan-youyi-index' component={LoopLoan} />
                <Route exact path='/loan-youyi-form' component={LoopLoanLoan} />
                <Route exact path='/loan-youyi-result' component={LoopLoanResult} />
                <Route exact path='/loan-youyi-authorization' component={LoopLoanAuthorization} />
                <Route exact path='/loan-youyi-card' component={LoopLoanCard} />
                <Route exact path='/loan-youyi-authlist' component={LoopLoanAuthlist} />
                <Route exact path='/loan-youyi-card-add' component={LoopLoanCardAdd} />
                <Route exact path='/loan-youyi-city' component={LoopLoanCity} />

                <Route exact path='/loan-fxh-index' component={FxhIndex} />
                <Route exact path='/loan-fxh-want' component={FxhWant} />
                <Route exact path='/loan-fxh-confirm' component={FxhConfirm} />
                <Route exact path='/loan-fxh-result' component={FxhResult} />

                <Route exact path='/loan-fq-index' component={FqIndex} />
                <Route exact path='/loan-fq-form' component={FqForm} />

                {/* 房屋抵押贷款  */}
                <Route exact path='/mortgage/apply' component={Mortgage.Apply} />
                <Route exact path='/mortgage/download' component={Mortgage.Download} />
                <Route exact path='/mortgage/success' component={Mortgage.Success} />
                <Route exact path='/mortgage/outside-entry' component={Mortgage.OutsideEntry} />
                <Route exact path='/mortgage/outside-apply' component={Mortgage.OutsideApply} />

                {/* 所有产品协议  */}
                <Route exact path='/protocols/register' component={Protocols.Register} />
                <Route exact path='/protocols/borrowing' component={Protocols.Borrowing} />
                <Route exact path='/protocols/cost' component={Protocols.Cost} />
                <Route exact path='/protocols/dumiao' component={Protocols.Dumiao} />
                <Route exact path='/protocols/partner' component={Protocols.Partner} />
                <Route exact path='/protocols/info-collect' component={Protocols.InfoCollect} />

                {/* 优易借相关协议 */}
                <Route exact path='/protocols/youyi-loan' component={Protocols.YouyiLoan} />
                <Route exact path='/protocols/youyi-loan-service' component={Protocols.YouyiLoanService} />
                <Route exact path='/protocols/youyi-repayment' component={Protocols.YouyiRepayment} />
                <Route exact path='/protocols/youyi-repayment-service' component={Protocols.YouyiRepaymentService} />

            </Switch>
        </Provider>
    </Router>
}

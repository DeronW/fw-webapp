import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Home from './pages/home.js'
import MortgageDownload from './pages/mortgage-download.js'
import MortgageOutsideEntry from './pages/mortgage-outside-entry.js'
import MortgageOutsideApply from './pages/mortgage-outside-apply.js'
import MortgageApply from './pages/mortgage-apply.js'
import MortgageSuccess from './pages/mortgage-success.js'
import LoopLoan from './pages/loan-youyi-index.js'
import LoopLoanLoan from './pages/loan-youyi-form.js'
import LoopLoanResult from './pages/loan-youyi-result.js'
import LoopLoanAuthorization from './pages/loan-youyi-authorization.js'
import LoopLoanCard from './pages/loan-youyi-card.js'

import FxhIndex from './pages/loan-fxh-index.js'
import FxhWant from './pages/loan-fxh-want.js'
import FxhConfirm from './pages/loan-fxh-confirm.js'
import FxhResult from './pages/loan-fxh-result'

import * as Protocols from './pages/protocols/'

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

                <Route exact path='/loan-fxh-index' component={FxhIndex} />
                <Route exact path='/loan-fxh-want' component={FxhWant} />
                <Route exact path='/loan-fxh-confirm' component={FxhConfirm} />
                <Route exact path='/loan-fxh-result' component={FxhResult} />

                {/* 房屋抵押贷款  */}
                <Route exact path='/mortgage-download' component={MortgageDownload} />
                <Route exact path='/mortgage-outside-entry' component={MortgageOutsideEntry} />
                <Route exact path='/mortgage-outside-apply' component={MortgageOutsideApply} />
                <Route exact path='/mortgage-apply' component={MortgageApply} />
                <Route exact path='/mortgage-success' component={MortgageSuccess} />

                {/* 所有产品协议  */}
                <Route exact path='/protocols/register' component={Protocols.Register} />
                <Route exact path='/protocols/borrowing' component={Protocols.Borrowing} />
                <Route exact path='/protocols/cost' component={Protocols.Cost} />
                <Route exact path='/protocols/dumiao' component={Protocols.Dumiao} />
                <Route exact path='/protocols/partner' component={Protocols.Partner} />
                <Route exact path='/protocols/info-collect' component={Protocols.InfoCollect} />

                <Route exact path='/protocols/youyi-loan' component={Protocols.YouyiLoan} />
                <Route exact path='/protocols/youyi-loan-service' component={Protocols.YouyiLoanService} />
                <Route exact path='/protocols/youyi-repayment' component={Protocols.YouyiRepayment} />
                <Route exact path='/protocols/youyi-repayment-service' component={Protocols.YouyiRepaymentService} />

            </Switch>
        </Provider>
    </Router>
}

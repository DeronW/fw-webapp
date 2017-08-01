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

import * as Protocols from './pages/protocols/'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path='/' exact component={Home} />
                <Route exact path='/loan-youyi-index' component={LoopLoan} />
                <Route exact path='/loan-youyi-form' component={LoopLoanLoan} />
                <Route exact path='/loan-youyi-result' component={LoopLoanResult} />
                <Route exact path='/loan-youyi-authorization' component={LoopLoanAuthorization} />
                <Route exact path='/loan-youyi-card' component={LoopLoanCard} />
                <Route exact path='/mortgage-download' component={MortgageDownload} />
                <Route exact path='/mortgage-outside-entry' component={MortgageOutsideEntry} />
                <Route exact path='/mortgage-outside-apply' component={MortgageOutsideApply} />
                <Route exact path='/mortgage-apply' component={MortgageApply} />
                <Route exact path='/mortgage-success' component={MortgageSuccess} />

                <Route exact path='/protocols/register' component={Protocols.Register} />
                <Route exact path='/protocols/borrowing' component={Protocols.Borrowing} />
                <Route exact path='/protocols/cost' component={Protocols.Cost} />
                <Route exact path='/protocols/dumiao' component={Protocols.Dumiao} />
                <Route exact path='/protocols/partner' component={Protocols.Partner} />
                <Route exact path='/protocols/info-collect' component={Protocols.InfoCollect} />
            </Switch>
        </Provider>
    </Router>
}

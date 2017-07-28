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

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/loan-youyi-index' component={LoopLoan} />
                <Route path='/loan-youyi-form' component={LoopLoanLoan} />
                <Route path='/loan-youyi-result' component={LoopLoanResult} />
                <Route path='/loan-youyi-authorization' component={LoopLoanAuthorization} />
                <Route path='/loan-youyi-card' component={LoopLoanCard} />
                <Route path='/mortgage-download' component={MortgageDownload} />
                <Route path='/mortgage-outside-entry' component={MortgageOutsideEntry} />
                <Route path='/mortgage-outside-apply' component={MortgageOutsideApply} />
                <Route path='/mortgage-apply' component={MortgageApply} />
                <Route path='/mortgage-success' component={MortgageSuccess} />
            </Switch>
        </Provider>
    </Router>
}

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
import LoopLoan from './pages/loop-loan.js'
import LoopLoanLoan from './pages/loop-loan-loan.js'
import LoopLoanResult from './pages/loop-loan-result.js'
import LoopLoanAuthorization from './pages/loop-loan-authorization.js'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/loop-loan' component={LoopLoan} />
                <Route path='/loop-loan-loan' component={LoopLoanLoan} />
                <Route path='/loop-loan-result' component={LoopLoanResult} />
                <Route path='/loop-loan-authorization' component={LoopLoanAuthorization} />
                <Route path='/mortgage-download' component={MortgageDownload} />
                <Route path='/mortgage-outside-entry' component={MortgageOutsideEntry} />
                <Route path='/mortgage-outside-apply' component={MortgageOutsideApply} />
                <Route path='/mortgage-apply' component={MortgageApply} />
                <Route path='/mortgage-success' component={MortgageSuccess} />
            </Switch>
        </Provider>
    </Router>
}

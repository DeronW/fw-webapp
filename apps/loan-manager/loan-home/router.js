import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import Loan from './pages/loan'
import UserEntey from './pages/user-entry'
import Bills from './pages/bills'
import FXHBillDetail from './pages/fxh-bill-detail'
// import DMBillDetail from './pages/dm-bill-detail'
import Promote from './pages/promote'
import Market from './pages/market'
import User from './pages/user'
import NoMatch from './pages/no-match'

export default (stores) => {

    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/loan' component={Loan} />
                <Route exact path='/user-entry' component={UserEntey} />
                <Route exact path='/bills' component={() => <Redirect to='/bills/applying' />} />
                <Route exact path='/bills/:billType' component={Bills} />
                <Route exact path='/bill/fxh/:billId' component={FXHBillDetail} />
                {/* <Route exact path='/bill/dumiao/:billId' component={DMBillDetail} /> */}
                {/* <Route exact path='/bill/fxh/:billId/repay' component={Repayment} />
                <Route exact path='/bill/fxh/:billId/repayment-record/:repaymentId' component={RepaymentRecord} /> */}
                <Route exact path='/promote' component={Promote} />
                <Route exact path='/market' component={Market} />
                <Route exact path='/user' component={User} />
                <Route path='/' component={() => <Redirect to='/user-entry' />} />
                <Route component={NoMatch} />
            </Switch>
        </Provider>
    </Router>

}

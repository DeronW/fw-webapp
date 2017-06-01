import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import PrivateRoute from './pages/components/private-route'

import UserEntry from './pages/user-entry'
import Login from './pages/login'
import Loan from './pages/loan'
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
                <PrivateRoute exact path='/' component={() => <Redirect to='/loan' />} />
                <PrivateRoute exact path='/loan' component={Loan} />
                <PrivateRoute exact path='/bills' component={() => <Redirect to='/bills/applying' />} />
                <PrivateRoute exact path='/bills/:billType' component={Bills} />
                <PrivateRoute exact path='/bill/fxh/:billId' component={FXHBillDetail} />
                {/* <PrivateRoute exact path='/bill/dumiao/:billId' component={DMBillDetail} /> */}
                {/* <PrivateRoute exact path='/bill/fxh/:billId/repay' component={Repayment} />
                <PrivateRoute exact path='/bill/fxh/:billId/repayment-record/:repaymentId' component={RepaymentRecord} /> */}
                <PrivateRoute exact path='/promote' component={Promote} />
                <PrivateRoute exact path='/market' component={Market} />
                <PrivateRoute exact path='/user' component={User} />
                <Route exact path='/user-entry' component={UserEntry} />
                <Route exact path='/login' component={Login} />
                <Route component={NoMatch} />
            </Switch>
        </Provider>
    </Router>

}

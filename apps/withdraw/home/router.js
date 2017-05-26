import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import BlankPage from './pages/blank-page'
import Cash from './pages/cash'
import BankAccount from './pages/bank-account'
import CashRecords from './pages/cash-records'
import ResetDealPassword from './pages/reset-deal-password'

export default (stores) => {

    return <Router>
        <Provider {...stores} >
            <Switch>
            <Route exact path='/cash' component={Cash} />
            {/*<Route exact path='/cash/:search' component={BankAccount} />*/}
            <Route exact path='/cash-records' component={CashRecords} />
            <Route exact path='/reset-deal-password' component={ResetDealPassword} />
                <Route component={BlankPage} />
            </Switch>
        </Provider>
    </Router>

}
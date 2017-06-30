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

import RedBag from './pages/red-bag.js'
import RedPacketDetail from './pages/red-packet-detail.js'
import RedBagResult from './pages/red-bag-result.js'
import BankCard from './pages/bank-card.js'
import BankCardAdd from './pages/bank-card-add.js'
import BankCardVerify from './pages/bank-card-verify.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/entry' component={Entry} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/set-password' component={SetPassword} />
                <Route exact path='/red-bag' component={RedBag} />
                <Route exact path='/red-packet-detail' component={RedPacketDetail} />
                <Route exact path='/red-bag-result' component={RedBagResult} />
                <Route exact path='/bank-card' component={BankCard} />
                <Route exact path='/bank-card-add' component={BankCardAdd} />
                <Route exact path='/bank-card-verify' component={BankCardVerify} />
            </Switch>
        </Provider>
    </Router>
}

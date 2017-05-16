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
import Bill from './pages/bill'
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
                <Route exact path='/bill' component={Bill} />
                <Route exact path='/promote' component={Promote} />
                <Route exact path='/market' component={Market} />
                <Route exact path='/user' component={User} />
                {/* <Route path='/' component={() => <Redirect to='/user-entry' />} /> */}
                <Route component={NoMatch} />
            </Switch>
        </Provider>
    </Router>

}

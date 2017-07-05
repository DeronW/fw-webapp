import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Register from './pages/register.js'
import Borrowing from './pages/borrowing.js'
import Cost from './pages/cost.js'
import DumiaoOpenaccount from './pages/dumiao-openaccount.js'
import Partner from './pages/partner.js'
import PersoninfoCollect from './pages/personinfo-collect.js'

export default () => {
    return <Router>
        <Provider>
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/borrowing' component={Borrowing} />
                <Route exact path='/cost' component={Cost} />
                <Route exact path='/dumiao' component={DumiaoOpenaccount} />
                <Route exact path='/partner' component={Partner} />
                <Route exact path='/info-collect' component={PersoninfoCollect} />
            </Switch>
        </Provider>
    </Router>
}

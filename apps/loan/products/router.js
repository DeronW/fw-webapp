import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import MortgageDownload from './pages/mortgage-download.js'
import MortgageOutsideEntry from './pages/mortgage-outside-entry.js'
import MortgageOutsideApply from './pages/mortgage-outside-apply.js'
import MortgageApply from './pages/mortgage-apply.js'


export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route path='/mortgage-download' component={MortgageDownload} />
                <Route path='/mortgage-outside-entry' component={MortgageOutsideEntry} />
                <Route path='/mortgage-outside-apply' component={MortgageOutsideApply} />
                <Route path='/mortgage-apply' component={MortgageApply} />
            </Switch>
        </Provider>
    </Router>
}

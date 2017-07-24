import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Mortgage from './pages/mortgage.js'
import MortgageDownload from './pages/mortgage-download.js'
import MortgageOutsideEntry from './pages/mortgage-outside-entry.js'


export default () => {
    return <Router>
        <Provider>
            <Switch>
                <Route path='/mortgage' component={Mortgage} />
                <Route path='/mortgage-download' component={MortgageDownload} />
                <Route path='/mortgage-outside-entry' component={MortgageOutsideEntry} />
            </Switch>
        </Provider>
    </Router>
}

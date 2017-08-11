import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import NotFound from './pages/not-found.js'
import * as FAQ from './pages/faq.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/faq' component={FAQ.List} />
                <Route exact path='/faq/:kind' component={FAQ.Page} />
                <Route component={NotFound} />
            </Switch>
        </Provider>
    </Router>

}
import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import NotFound from './pages/not-found.js'
import * as FAQ from './pages/faq.js'
import AppDownload from './pages/app-download.js'
import InterestRewords from './pages/interest-reward.js'
import Invite from './pages/invite'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/faq' component={FAQ.List}/>
                <Route exact path='/faq/:kind' component={FAQ.Page}/>
                <Route exact path='/app-download' component={AppDownload}/>
                <Route exact path='/interest-reward' component={InterestRewords}/>
                <Route exact path='/invite' component={Invite}/>
                <Route component={NotFound}/>
            </Switch>
        </Provider>
    </Router>

}
import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import More from './pages/more.js'
import AboutUs from './pages/about-us.js'
import FAQ from './pages/faq.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/more' component={More} />
                <Route exact path='/about-us' component={AboutUs} />
                <Route exact path='/faq' component={FAQ} />
            </Switch>
        </Provider>
    </Router>
}

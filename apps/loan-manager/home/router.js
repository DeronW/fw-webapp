import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Login from './pages/login'
import NoMatch from './pages/no-match'

export default (stores) => {

    return <Router>
        <Provider {...stores} >
            <Route exact path='/login' component={Login} />
            {/*<Route component={NoMatch} />*/}
        </Provider>
    </Router>

}

import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import ReserveInfo from './pages/reserve/info'
import ReserveRecords from './pages/reserve/records'
import ReserveApply from './pages/reserve/apply'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path="/reserve/info" component={ReserveInfo} />
                <Route exact path="/reserve/apply" component={ReserveApply} />
                <Route exact path="/reserve/records" component={ReserveRecords} />
            </Switch>
        </Provider>
    </Router>
}
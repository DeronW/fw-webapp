import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import UserEvaluate from './pages/user/evaluate.js'
import ReserveInfo from './pages/reserve/info'
import ReserveRecords from './pages/reserve/records'
import ReserveApply from './pages/reserve/apply'
import ReserveProtocol from './pages/reserve/protocol'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path="/user/evaluate" component={UserEvaluate}/>
                <Route exact path="/reserve/info" component={ReserveInfo}/>
                <Route exact path="/reserve/apply" component={ReserveApply}/>
                <Route exact path="/reserve/records" component={ReserveRecords}/>
                <Route exact path="/reserve/protocol" component={ReserveProtocol}/>
            </Switch>
        </Provider>
    </Router>
}
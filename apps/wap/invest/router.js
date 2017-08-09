import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import * as Reserve from './pages/reserve'
import * as User from './pages/user'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                {/* 用户相关 模块  */}
                <Route exact path="/user/evaluate" component={User.Evaluate} />
                <Route exact path="/user/register-success-b" component={User.RegisterSuccessB} />

                {/*预约投资  */}
                <Route exact path="/reserve/info" component={Reserve.Info} />
                <Route exact path="/reserve/apply" component={Reserve.Apply} />
                <Route exact path="/reserve/records" component={Reserve.Records} />
                <Route exact path="/reserve/protocol" component={Reserve.Protocol} />
            </Switch>
        </Provider>
    </Router>
}
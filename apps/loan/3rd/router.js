import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Fail from './pages/fail.js'
import Authorize from './pages/authorize.js'
import Interface from './pages/interface.js'

import JRGCHome from "./pages/jrgc-home.js"
import JRGCLogin from "./pages/jrgc-login.js"

import IdcardOcr from './pages/idcard-ocr.js'
import IdcardLiveMatch from './pages/idcard-live-match.js'
import IdentificationResult from './pages/identification-result.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/fail' component={Fail} />
                <Route exact path='/authorize' component={Authorize} />
                <Route exact path='/' component={Interface} />

                {/* 金融工场作为内部第三方, 有特殊的处理方式  */}
                <Route exact path="/jrgc-home" component={JRGCHome} />
                <Route exact path="/jrgc-login" component={JRGCLogin} />

                {/* 微信相关页面 */}

                {/* 身份识别相关页面 */}
                <Route exact path='/idcard-ocr' component={IdcardOcr} />
                <Route exact path='/idcard-live-match' component={IdcardLiveMatch} />
                <Route exact path='/identification-result' component={IdentificationResult} />
            </Switch>
        </Provider>
    </Router>
}

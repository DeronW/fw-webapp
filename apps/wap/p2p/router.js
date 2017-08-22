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
import AppDownload from './pages/app-download.js'
import InterestRewords from './pages/interest-reward.js'
import Invite from './pages/invite'
import InvestSchool from './pages/invest-school'
import NoticeSafeguard from './pages/notice-safeguard'
import VipPrerogative from './pages/vip-prerogative'
import PolicyBox from './pages/policy'
import Evaluate from './pages/evaluate.js'
import * as Protocol from './pages/protocol'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/faq' component={FAQ.List} />
                <Route exact path='/faq/:kind' component={FAQ.Page} />
                <Route exact path='/app-download' component={AppDownload} />
                <Route exact path='/interest-reward' component={InterestRewords} />
                <Route exact path='/invite' component={Invite} />
                <Route exact path='/invest-school' component={InvestSchool} />
                <Route exact path='/notice-safeguard' component={NoticeSafeguard} />
                <Route exact path='/vip-prerogative' component={VipPrerogative} />
                <Route exact path='/policy' component={PolicyBox} />
                <Route exact path='/evaluate' component={Evaluate} />
                <Route exact path='/protocol/entrust-transfer' component={Protocol.EntrustTransferprotocol} />
                <Route exact path='/protocol/protocol-batch-invest' component={Protocol.ProtocolBatchInvest} />
                <Route exact path='/protocol/protocol-counseling' component={Protocol.ProtocolCounseling} />
                <Route component={NotFound} />
            </Switch>
        </Provider>
    </Router>

}
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
import NoticeDisclosure from './pages/notice-disclosure.js'
import NoticeSafeguard from './pages/notice-safeguard'
import VipPrerogative from './pages/vip-prerogative'
import PolicyBox from './pages/policy'
import PDF from './pages/pdf.js'
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
                <Route exact path='/notice-disclosure' component={NoticeDisclosure} />
                <Route exact path='/vip-prerogative' component={VipPrerogative} />
                <Route exact path='/policy' component={PolicyBox} />
                <Route exact path='/pdf' component={PDF} />
                <Route exact path='/evaluate' component={Evaluate} />

                {/* 微金协议 */}
                <Route exact path='/protocol/batch-invest' component={Protocol.BatchInvest} />
                <Route exact path='/protocol/counseling' component={Protocol.Counseling} />
                <Route exact path='/protocol/entrust-transfer' component={Protocol.EntrustTransfer} />
                <Route exact path='/protocol/leader-promise' component={Protocol.LeaderPromise} />
                <Route exact path='/protocol/perform-duty' component={Protocol.PerformDuty} />
                <Route exact path='/protocol/special-bind' component={Protocol.SpecialBind} />
                <Route exact path='/protocol/special-cash' component={Protocol.SpecialCash} />
                <Route exact path='/protocol/special-recharge' component={Protocol.SpecialRecharge} />
                <Route exact path='/protocol/trusteeship' component={Protocol.TrusteeShip}/>
                <Route exact path='/protocol/service' component={Protocol.Service}/>
                <Route exact path='/protocol/risk-prompt' component={Protocol.RiskPrompt} />

                <Route component={NotFound} />
            </Switch>
        </Provider>
    </Router>

}
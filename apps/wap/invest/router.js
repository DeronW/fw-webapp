import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import * as ReserveBid from './pages/reserve-bid'
import * as NoviceBid from './pages/novice-bid'
import * as User from './pages/user'
import * as Features from './pages/features'
import * as Faxian from './pages/fa-xian'
import * as Protocol from './pages/protocol'
import * as Topic from './pages/topic'
import NotFound from './pages/not-found.js'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                {/* 用户相关 模块  */}
                <Route exact path="/user/evaluate" component={User.Evaluate}/>
                <Route exact path="/user/contribute" component={User.Contribute}/>
                <Route exact path="/user/register-success-b" component={User.RegisterSuccessB}/>

                {/*预约投资普通标*/}
                <Route exact path="/reserve-bid/info" component={ReserveBid.Info}/>
                <Route exact path="/reserve-bid/apply" component={ReserveBid.Apply}/>
                <Route exact path="/reserve-bid/records" component={ReserveBid.Records}/>
                <Route exact path="/reserve-bid/protocol" component={ReserveBid.Protocol}/>
                <Route exact path="/reserve-bid/info-intro" component={ReserveBid.InfoIntro}/>
                <Route exact path="/reserve-bid/faq" component={ReserveBid.Faq}/>

                {/*预约投资新手标*/}
                <Route exact path="/novice-bid/info" component={NoviceBid.Info}/>
                <Route exact path="/novice-bid/apply" component={NoviceBid.Apply}/>
                <Route exact path="/novice-bid/protocol" component={NoviceBid.Protocol}/>
                <Route exact path="/novice-bid/records" component={NoviceBid.Records}/>
                <Route exact path="/novice-bid/info-intro" component={NoviceBid.InfoIntro}/>

                {/* 杂项页面 */}
                <Route exact path='/features/faq' component={Features.FAQList}/>
                <Route exact path='/features/faq/:kind' component={Features.FAQPage}/>
                <Route exact path='/features/about-us' component={Features.AboutUs}/>
                <Route exact path='/features/app-download' component={Features.AppDownload}/>
                <Route exact path='/features/cookbook' component={Features.Cookbook}/>
                <Route exact path='/features/vip-prerogative' component={Features.VipPrerogative}/>

                {/*主题模块  */}
                <Route exact path='/topic/huang-jin' component={Topic.HuangJin}/>
                <Route exact path='/topic/zeng-jin-bao' component={Topic.ZengJinBao}/>
                <Route exact path='/topic/novice' component={Topic.Novice}/>
                <Route exact path='/topic/invite' component={Topic.Invite}/>
                <Route exact path='/topic/score' component={Topic.Score}/>

                {/*发现模块  */}
                <Route exact path='/fa-xian' component={Faxian.Home}/>
                <Route exact path='/fa-xian/coupon' component={Faxian.Coupon}/>

                {/* 协议 */}
                <Route exact path='/protocol/service' component={Protocol.Service}/>
                <Route exact path='/protocol/trusteeship' component={Protocol.Trusteeship}/>

                <Route component={NotFound}/>
            </Switch>
        </Provider>
    </Router>
}

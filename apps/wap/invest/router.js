import React from 'react'
import {Provider} from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

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
                <Route exact path='/topic/commission' component={Topic.Commission}/>

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

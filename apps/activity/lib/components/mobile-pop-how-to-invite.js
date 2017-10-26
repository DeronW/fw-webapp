import React from 'react'
import CSSModules from 'react-css-modules'

import { NativeBridge, Browser } from '../../lib/helpers'

import styles from '../css/mobile-pop-how-to-invite.css'


/*
    props:
    -- isLoggedIn|!boolean
    -- gcm|!string
    -- loginHandler|!function
    -- closeHandler|!function
*/
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class InviteRewardPop extends React.Component {

    moreRewardforNew = () => {
        const link = 'https://fore.9888.cn/cms/addhtml/2078.html';
        if (Browser.inApp) NativeBridge.goto(link)
        location.href = link;
    }

    render() {
        const { isLoggedIn, gcm, closeHandler } = this.props;

        return <div styleName="mask">
            { isLoggedIn ? (
                <div styleName="pop">
                    <div styleName="close-btn" onClick={closeHandler}></div>

                    <div styleName="invite-desc">请好友在注册或投标时填写您的工场码</div>
                    <div styleName="gcm">{gcm}</div>
                    <div styleName="reward-for-new-coming">
                        新手注册即送<span styleName="text-red">200元</span>+<span styleName="text-red">2.1g</span>黄金，
                        首投还获<span styleName="text-red">0.6%</span>返息券，<br />
                        邀友最高再送<span styleName="text-red">350元</span>
                    </div>
                    <div styleName="btn" onClick={this.moreRewardforNew}>更多新手秘籍</div>
                </div>
            ) : (
                <div styleName="pop" style={{ height: '571px', backgroundSize: '100% 571px' }}>
                    <div styleName="close-btn" onClick={closeHandler}></div>

                    <div styleName="not-loggedIn-info-1">活动期内，请好友用您的工场码注册或投标，<br />好友累投达标您可获奖励</div>
                    <div styleName="not-loggedIn-info-2">登录后查看您的工场码</div>
                    <div styleName="not-loggedIn-info-3">还没有工场码？注册即可拥有</div>
                    <div style={{ marginTop: '20px' }} styleName="btn" onClick={this.props.loginHandler}>登录注册</div>
                    <div styleName="reward-for-new-coming">
                        新手注册即送<span styleName="text-red">200元</span>+<span styleName="text-red">2.1g</span>黄金，
                        首投还获<span styleName="text-red">0.6%</span>返息券，<br />
                        邀友最高再送<span styleName="text-red">350元</span>
                    </div>
                    <div style={{ marginTop: '20px' }} styleName="btn" onClick={this.moreRewardforNew}>更多新手秘籍</div>
                </div>
            )}
        </div>
    }

}

export default InviteRewardPop
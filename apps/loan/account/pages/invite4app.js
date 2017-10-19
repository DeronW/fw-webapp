import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import { BottomNavBar } from '../../lib/components'
import { Post, Storage, Browser, NativeBridge } from '../../lib/helpers'
import { Utils } from 'fw-javascripts'
import styles from '../css/invite4app.css'

@inject('account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class InviteForApp extends React.Component {

    state = {
        show_info: false
    }

    toggleInfo = () => {
        this.setState({ show_info: !this.state.show_info })
    }

    nativeShare = () => {
        let inviteCode = Utils.hashQuery.yqm;
        NativeBridge.command.share({
            title: '掌上钱包，随用随取',
            image: 'https://static.9888.cn/images/loan/invitation.jpg',
            link: `https://m.easyloan888.com/static/loan/outside-register/index.html?channelCode=OFFICIAL&invitationCode=${inviteCode}&jumpType=wx`,
            desc: '缺钱不用愁，注册放心花，借款神器，急速到账'
        })
    }

    render() {
        let info = <div styleName="info-panel">
            <div styleName="info-panel-cnt ">
                <div styleName="close-btn" onClick={this.toggleInfo}></div>
                <div styleName="pop-title">活动时间</div>
                <div styleName="pop-content-a">2017年9月4日-12月4日</div>
                <div styleName="pop-title">活动规则</div>
                <div styleName="pop-content-b">
                    1、邀请人奖励：<br />
                    (1)被邀请人注册，邀请人即得15元现金红包。<br />
                    (2)被邀请人完成首次借款并按期偿还本金利息，邀请人15元现金红包可提现；若被邀请人借款后出现逾期未还款，邀请人的15元红包将被系统自动收回。<br />
                    (3)活动期间每个邀请人最多可得150元现金红包。<br />
                    2、被邀请人奖励：<br />
                    (1)被邀请人注册即得到15元现金红包。<br />
                    (2)被邀请人完成首次借款并按期偿还本金利息，所得15元现金红包可提现；若借款后出现逾期未还款，则15元红包将被系统自动收回。<br />
                    3、在满足红包提现条件下，现金红包可至【我的】-【红包】进行提现。<br />
                    4、若多个邀请人邀请同一个好友注册，以被邀请人最终绑定的邀请码为准。<br />
                    5、此活动仅适用已注册用户成功邀请新用户，活动期间注册但未填写邀请码用户不奖励红包。<br />
                    6、非活动期间新用户注册、注册邀请新用户，不参与此奖励活动。<br />
                    7、用户通过欺骗、造假等非法手段参与活动的，放心花将不予奖励，已发放奖励有权要求退还，并依法追究相应的法律责任。<br />
                    8、此活动仅限放心花借款项目。<br />
                </div>
            </div>
        </div>

        return <div styleName="bg">
            <div styleName="banner">
                <div styleName="code">我的邀请码：{Utils.hashQuery.yqm}</div>
            </div>
            <a styleName="btn-info" onClick={this.toggleInfo}></a>
            <div styleName="share-txt-wrap">
                <div styleName="share-txt">
                    <div styleName="content-title">放心花</div>
                    一人借款，两人赚钱!<br />
                    活动期间邀请亲朋好友来借钱，邀请人和被邀请人皆可得15元现金红包！<br />
                    邀请越多，红包越大，最高奖励可达150元！<br />
                    放心花，有钱赚，快来邀友来借款，有！福！同！享！<br />
                </div>
             <div styleName="invite-btn" onClick={this.nativeShare}><img styleName="invite-btn-img" src={require("../images/invite4app/invite-btn.jpg")}/></div>
            </div>
            {this.state.show_info && info}
        </div>
    }
}

export default InviteForApp
import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import { Header } from '../../lib/components'
import { Browser, Post, NativeBridge } from '../../lib/helpers'

import { Utils, Components } from 'fw-javascripts'

import styles from '../css/invite-activity.css'
@inject('invite_activity')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class InviteActivity extends React.Component {
    state = {
        popShow:false
    }
    popHandler = () => {
        this.setState({popShow:true});
    }
    closePop = () => {
        this.setState({popShow:false});
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
    componentDidMount(){
        let {invite_activity} = this.props;
        invite_activity.getShareLink();
        NativeBridge.setTitle("放心花");
        
    }
    render(){
        let {invite_activity,history} = this.props;
        let goBack = () => {
            Browser.inApp ? NativeBridge.close() : history.goBack()
        }
        return <div styleName="bg">
            {!Browser.inApp && !Browser.inWeixin && <Header title="放心花" goBack={goBack}/>}
            <div styleName="banner">
                <img src={require("../images/invite-activity/banner.jpg")} />
            </div>
            {
                Browser.inApp ? (<div styleName="share-btn" onClick={this.nativeShare}>
                立即分享
            </div>) : (<div styleName="share-link">
                <div styleName="top-tip">长按复制链接分享给好友注册</div>
                <div styleName="btn-tip">
                    <input type="text" value={invite_activity.shareLink+ `&jumpType=${Browser.inWeixin ? 'to_home' : 'app'}`}/>
                </div>
            </div>)
            }
            <div styleName="instruction" onClick={this.popHandler}>
                    活动说明
                    <b styleName="arrow-right"><img src={require("../images/invite-activity/arrow-right.png")} /></b>
            </div>
            {this.state.popShow && <div styleName="mask">
                <div styleName="pop-content">
                    <div styleName="close-btn" onClick={this.closePop}></div>
                    <div styleName="pop-title">活动时间</div>
                    <div styleName="pop-item activity-time">2017年7月6日-7月19日</div>
                    <div styleName="pop-title activity-rules">活动规则</div>
                    <div styleName="rule-content">
                        <div styleName="pop-item">1、邀请人奖励：</div>
                        <div styleName="pop-item">(1)被邀请人注册，邀请人即得15元现金红包。</div>
                        <div styleName="pop-item">(2)被邀请人完成首次借款并按期偿还本金利息，邀请人15元现金红包可提现；若被邀请人借款后出现逾期未还款，邀请人的15元红包将被系统自动收回。</div>
                        <div styleName="pop-item">(3)活动期间每个邀请人最多可得150元现金红包。</div>
                        <div styleName="pop-item">2、被邀请人奖励：</div>
                        <div styleName="pop-item">(1)被邀请人注册即得到15元现金红包。</div>
                        <div styleName="pop-item">(2)被邀请人完成首次借款并按期偿还本金利息，所得15元现金红包可提现；若借款后出现逾期未还款，则15元红包将被系统自动收回。</div>
                        <div styleName="pop-item">3、在满足红包提现条件下，现金红包可至【我的】-【红包】进行提现。</div>
                        <div styleName="pop-item">4、若多个邀请人邀请同一个好友注册，以被邀请人最终绑定的邀请码为准。</div>
                        <div styleName="pop-item">5、此活动仅适用已注册用户成功邀请新用户，活动期间注册但未填写邀请码用户不奖励红包。</div>
                        <div styleName="pop-item">6、非活动期间新用户注册、注册邀请新用户，不参与此奖励活动。</div>
                        <div styleName="pop-item">7、用户通过欺骗、造假等非法手段参与活动的，放心花将不予奖励，已发放奖励有权要求退还，并依法追究相应的法律责任。</div>
                        <div styleName="pop-item">8、此活动仅限放心花借款项目。</div>
                    </div>
                </div>
            </div>}
        </div>
    }
}
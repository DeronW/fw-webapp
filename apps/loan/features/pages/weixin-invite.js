import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'

import {Header, BottomNavBar} from '../../lib/components'
import {Browser, Post, NativeBridge, Storage} from '../../lib/helpers'

import {Utils, Components,Event} from 'fw-javascripts'

import styles from '../css/weixin-invite.css'
@inject('weixin_invite')
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class WeixinInvite extends React.Component {
    state = {
        maskShow: false,
        fxhShow: true,
        recordsShow: false

    }
    componentDidMount() {
        document.title = "邀请好友";
        let {weixin_invite} = this.props;
        weixin_invite.getContent();
        weixin_invite.loadMore(null).then(() => {
            Event.touchBottom(weixin_invite.loadMore);
        })
    }
    componentWillUnmount(){
        Event.cancelTouchBottom();
    }
    maskShow = () => {
        this.setState({maskShow: true});
    }
    maskClose = () => {
        this.setState({maskShow: false});
    }
    showTabFxh = () => {
        this.setState({fxhShow: true, recordsShow: false});
    }
    showTabRecords = () => {
        this.setState({fxhShow: false, recordsShow: true});
    }
    getCode = link => {
        return (String(String(link.split("?")[1]).split("&")[1]).split("="))[1];
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
        let {weixin_invite} = this.props;
        let {hasData,invitationRecord} = weixin_invite;
        // const USER = Storage.getUserDict();
        let record_item = (item,index) => {
            <div styleName="invite-item" key={item.uuid + index}>
                <span styleName="phone-num">{item.mobile}</span>
                <span styleName="invite-status">{item.userStatus}</span>
                <span styleName="invite-date">{item.createTime}</span>
            </div>
        }
        return <div>
            <div styleName="invite-bg">
                <div styleName="activity-btn" onClick={this.maskShow}></div>
            <div styleName="invitation-code">我的邀请码：{this.getCode(weixin_invite.shareLink)}
                </div>
            </div>
            <div styleName="tab-content">
                <div styleName="tabs">
                    <span styleName={this.state.fxhShow ? "selected" : ""} onClick={this.showTabFxh}>放心花</span>
                    <span styleName={this.state.recordsShow ? "selected" : ""} onClick={this.showTabRecords}>邀请记录</span>
                </div>
                {this.state.fxhShow && <div styleName="tab-content-item">
                    <div styleName="tab-content-item-wrap1">
                        <div styleName="rule-item">一人借款，两人赚钱!</div>
                        <div styleName="rule-item">活动期间邀请亲朋好友来借钱，邀请人和被邀请人皆可得15元现金红包！</div>
                        <div styleName="rule-item">邀请越多，红包越大，最高奖励可达150元！</div>
                        <div styleName="rule-item">放心花，有钱赚，快来邀友来借款，有！福！同！享！</div>
                        {/* <!--<div styleName="rule-item">放心花是由深圳市众利财富管理有限公司推出的基于移动端线上贷款信息聚合平台，满足您的各类贷款需求。</div>--> */}
                    </div>
                    {!Browser.inApp && <div styleName="copy-link">
                        <div styleName="top-tip">长按复制链接分享给好友</div>
                    <div styleName="btm-tip"><input type="text" value={weixin_invite.shareLink+ `&jumpType=${Browser.inWeixin ? 'to_home' : 'app'}`}/></div>
                    </div>}
                    {Browser.inApp && <div styleName="invite-btn" onClick = {this.nativeShare}></div>}
                </div>}
                {!Browser.inApp && this.state.recordsShow && <div styleName="tab-content-item">
                    <div styleName="tab-content-item-wrap2">
                        {invitationRecord.length > 0 && invitationRecord.map(record_item)}
                        {invitationRecord.length == 0 && <div styleName="more">暂无数据</div>}
                        {invitationRecord.length > 0 && invitationRecord.length < 20 && !hasData && <div styleName="more">已全部显示</div>}
                        {invitationRecord.length >= 20 && hasData && <div styleName="more">更多</div>}
                    </div>
                </div>}
                </div>
                <BottomNavBar/>
            {this.state.maskShow && <div styleName="mask">
                    <div styleName="pop-content">
                        <div styleName="close-btn" onClick={this.maskClose}></div>
                        <div styleName="pop-title">活动时间</div>
                        <div styleName="pop-item activity-time">2017年9月4日-12月4日</div>
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

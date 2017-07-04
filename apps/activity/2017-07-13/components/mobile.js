import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'
import {Get} from '../../lib/helpers/request.js'
import MobileHeader from '../../lib/components/mobile-header.js'
import {PopStartPanel, PopTeamTips, PopInviteMobile} from './popall.js'
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class JulyMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timestamp: null,
            isLogin: this.props.isLogin
        }
    }

    componentDidMount() {
        Get('/activity/v1/timestamp.json')
            .then(data => {
                this.setState({timestamp: data.timestamp})
                this.popStatusHandler()
            })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLogin: nextProps.isLogin
        })
    }

    popStatusHandler = () => {
        let {timestamp} = this.state
        let july_start_time = 1499875200000;//2017-07-13 00:00:00  时间戳
        let july_end_time = 1502726400000;//2017-08-15 00:00:00 时间戳
        console.log(timestamp)
        console.log(`mobile:${july_start_time}`)
        console.log(`mobile:${july_end_time}`)
        if (timestamp < july_start_time) {
            console.log("notstart")
            ReactDOM.render(<PopStartPanel/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            ReactDOM.render(<PopEndPanel/>, document.getElementById("pop"))
            console.log("aleadyend")
        }
    }

    startmove = (x, y) => {
        window.scrollTo(x, y)
    }

    popTeamShow = () => {
        ReactDOM.render(<PopTeamTips closePopHandler={this.props.closePopHandler}/>, document.getElementById("pop"))
    }

    showInvitePop = () => {
        ReactDOM.render(<PopInviteMobile gotoLogin={this.props.gotoLogin}
                                         closePopHandler={this.props.closePopHandler}
                                         isLogin={this.state.isLogin}/>, document.getElementById("pop"))
    }

    render() {
        let {isLogin, timestamp} = this.state
        let coupon_panel = <div styleName="m-coupon">
            <div styleName="m-c-title">
                <img src={require("../images/mobile/m-coupon-title.png")}/>
            </div>
            <div styleName="m-c-tips">
                每周、限时抢高达千元返现、1%返息
            </div>
            <div styleName="m-c-text">
                <img src={require("../images/mobile/m-get-coupon.png")}/>
            </div>
            <div styleName="m-c-des">
                <div styleName="des-text">
                    点击“去抢券”<br/>
                    进入领券中心
                </div>
            </div>
        </div>
        let invite_panel = <div styleName="m-invite">
            <div styleName="m-i-title">
                <img src={require("../images/mobile/m-invite-title.png")}/>
            </div>
            <div styleName="m-i-tips">
                注册7天内，累投年化额≥1000元算一个有效邀请
            </div>
            <div styleName="m-i-one">
                <div styleName="one-text">
                    活动期间，成功邀请有效好友至少送50元。
                    <a href="" styleName="one-detail">查看详情</a>
                </div>
            </div>
            <div styleName="m-i-two">
                <div styleName="two-text">
                    根据活动内有效邀请数，每人可获对应最高档位奖励
                </div>
                <div styleName="two-num">
                    <div styleName="num-left">
                        有效邀请 <span styleName="num-yellow">1-19人</span>，奖励
                    </div>
                    <div styleName="num-right">
                        有效邀请 <span styleName="num-red">≥20人</span>，奖励
                    </div>
                </div>
            </div>
            <div styleName="m-i-three">
                <div styleName="three-title">
                    活动内，成为人脉王的工友（有效邀请≥20）<br/>
                    且新增好友累投年化额（不含自身）≥100万的工友<br/>
                    可进入TOP5瓜分奖金！
                </div>
            </div>
            <div styleName="m-i-method">
                奖金分配方式：本人有效好友累投年化额/前5名有效好友累投<br/>
                年化总额，仅计算满足获奖资格的用户。
            </div>
        </div>
        let fight_panel = <div styleName="m-fight">
            <div styleName="m-f-title">
                <img src={require("../images/mobile/m-fight-title.png")}/>
            </div>
            <div styleName="m-f-top">
                <div styleName="top-item">
                    <div styleName="top-item-left">
                        <img src={require("../images/mobile/m-top1.jpg")}/>
                    </div>
                    <div styleName="top-item-right top-r-one">

                    </div>
                </div>
                <div styleName="top-item">
                    <div styleName="top-item-left">
                        <img src={require("../images/mobile/m-top2.jpg")}/>
                    </div>
                    <div styleName="top-item-right top-r-two">

                    </div>
                </div>
                <div styleName="top-item">
                    <div styleName="top-item-left">
                        <img src={require("../images/mobile/m-top3.jpg")}/>
                    </div>
                    <div styleName="top-item-right top-r-three">

                    </div>
                </div>
                <div styleName="top-item">
                    <div styleName="top-item-left">
                        <img src={require("../images/mobile/m-top4.jpg")}/>
                    </div>
                    <div styleName="top-item-right top-r-four">

                    </div>
                </div>
                <div styleName="top-item">
                    <div styleName="top-item-left">
                        <img src={require("../images/mobile/m-top5.png")}/>
                    </div>
                    <div styleName="top-item-right top-r-five">

                    </div>
                </div>
            </div>
        </div>
        let bonus_panel = <div styleName="m-bonus">
            <div styleName="m-b-title">
                <img src={require("../images/mobile/m-bonus-title.png")}/>
            </div>
            <div styleName="m-n-tips">
                <div>活动期间，团队累投年化额≥350万且排名前10的用户</div>
                <div>送出88万奖金！</div>
            </div>
            <div styleName="m-b-treasure">
                <img src={require("../images/mobile/m-star.png")} styleName="treasure-pic" onClick={this.popTeamShow}/>
            </div>
            <div styleName="m-fish-tips">
                <div styleName="fish-text">
                    奖金分配方式：<br/>
                    本人团队累投年化额/前10名团队累投<br/>
                    年化总额，仅计算满足获奖资格的用户。
                </div>
            </div>
        </div>
        let rank_panel = <div styleName="m-rank">
            <div styleName="m-r-data">
                <div styleName="data-name">
                    <span styleName="name-one">排名</span>
                    <span styleName="name-two">用户名</span>
                    <span styleName="name-three">团队累投年化额(元)</span>
                    <span styleName="name-four">奖金(元)</span>
                </div>
                <div styleName="data-detil">

                </div>
            </div>
            <div styleName="m-rank-tips">
                温馨提示：以上数据实时更新，最终奖金以活动结束后数据为准发放。
            </div>
        </div>
        let explain_panel = <div styleName="m-explain">
            <div styleName="m-e-text">
                <div styleName="m-x-title">活动说明</div>
                1.活动期间，投资债权转让产品，不能参与本次活动；若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；<br/>
                2.投资等额标时，＞18个月的项目按18个月计算年化投资额<br/>
                3.奖金奖励以工豆形式发放；<br/>
                4.工豆奖励将于活动结束后7个工作日内，统一发放至邀人的工场账户；
                5.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；<br/>
                6.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                <div styleName="m-x-des">声明：以上活动由金融工场主办 与Apple Inc. 无关。</div>
            </div>
        </div>
        let bottom_panel = () => {
            let logged_text = <div styleName="m-logged">
                活动内，您可以邀请50人参与活动，
                <span styleName="howinvite" onClick={this.showInvitePop}>如何邀请</span> | <a href="">立即投资</a>
            </div>
            let notlogged_text = <div styleName="m-notlogged">
                请登录后查看您活动内的邀友和投标情况，
                <span>立即登录</span> |
                <span styleName="howinvite" onClick={this.showInvitePop}>如何邀请</span>
            </div>
            return <div styleName="m-bottom">
                {isLogin ? logged_text : notlogged_text}
            </div>
        }
        return <div styleName="july-mobile-box">
            <MobileHeader/>
            <div styleName="m-banner">
                <img src={require("../images/mobile/m-anchor-1.png")} styleName="banner-item m-anchor-one"
                     onClick={() => this.startmove(0, 700)}/>
                <img src={require("../images/mobile/m-anchor-2.png")} styleName="banner-item m-anchor-two"
                     onClick={() => this.startmove(0, 3200)}/>
                <img src={require("../images/mobile/m-anchor-3.png")} styleName="banner-item m-anchor-three"
                     onClick={() => this.startmove(0, 2540)}/>
                <img src={require("../images/mobile/m-anchor-4.png")} styleName="banner-item m-anchor-four"
                     onClick={() => this.startmove(0, 2000)}/>
                <img src={require("../images/mobile/m-anchor-5.png")} styleName="banner-item m-anchor-five"
                     onClick={() => this.startmove(0, 5750)}/>
            </div>
            {coupon_panel}
            {invite_panel}
            {fight_panel}
            {bonus_panel}
            {rank_panel}
            {explain_panel}
            {bottom_panel()}
        </div>
    }
}

export default JulyMobile
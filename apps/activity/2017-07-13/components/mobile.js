import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'
import MobileHeader from '../../lib/components/mobile-header.js'
import {PopStartPanel, PopTeamTips, PopInviteMobile, PopEndPanel} from './popall.js'
import gotoPage from '../../lib/helpers/goto-page.js'
import Browser from '../../lib/helpers/browser.js'


@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class JulyMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timestamp: null,
            isLogin: this.props.isLogin,
            bottom_close: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLogin: nextProps.isLogin,
            timestamp: nextProps.timestamp,
            rankdata: nextProps.rankdata,
            fightdata: nextProps.fightdata
        });
        //活动状态判断
        this.popStatusHandler(nextProps.timestamp)
    }

    componentDidMount() {
    }

    popStatusHandler = (timestamp) => {
        if (timestamp > 1502726400000 + 60 * 60 * 24 * 7 * 1000) {
            ReactDOM.render(<PopEndPanel/>, document.getElementById("pop"))
        } else {
            ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
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
    login = () => {
        gotoPage('登录', 'http://www.gongchangp2p.com/api/activityPullNew/ActivityControl.do?code=WZNHD')
    }

    bottomHandler = () => {
        this.setState({bottom_close: true})
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
                <a href="http://m.9888.cn/static/wap/coupon-center/index.html" styleName="get-coupon-container">
                    <img src={require("../images/mobile/m-get-coupon.png")}/>
                </a>
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
                    <a href="https://www.9888keji.com/cms/addhtml/2057.html" styleName="one-detail">查看详情</a>
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
        let fight_panel = () => {
            let {fightdata} = this.props
            let person_data_func = (item, index) => {
                let disability_text = <div styleName="top-item-up">
                    暂无奖金
                </div>
                let ability_text = (item) => {
                    return <div styleName="person-up">
                        <div styleName="person-title">可分奖金</div>
                        <div styleName="person-number">{item.isValid}</div>
                    </div>
                }
                return <div styleName="top-item" key={index}>
                    <div styleName="top-item-left">
                        <img src={require(`../images/mobile/m-top${index + 1}.jpg`)}/>
                    </div>
                    <div styleName={`top-item-right top-r-${index + 1}`}>
                        {item.isValid == "暂无瓜分资格" ? disability_text : ability_text(item)}
                        <div styleName="person-down">
                            <div styleName="person-realName">{item.realName}</div>
                            <div styleName="person-subtitle">好友累投年化</div>
                            <div styleName="person-total">{item.yearAmtSum}元</div>
                        </div>
                    </div>
                </div>
            }
            let fight_data_box = () => {
                let data_item_func = (num, text) => {
                    return <div styleName="top-item">
                        <div styleName="top-item-left">
                            <img src={require(`../images/mobile/m-top${num}.jpg`)}/>
                        </div>
                        <div styleName={`top-item-right top-r-${num}`}>
                            <div styleName="top-item-up">暂无奖金</div>
                            <div styleName="top-item-down">{text}...</div>
                        </div>
                    </div>
                }
                return <div styleName="f-data-box">
                    {fightdata.length > 0 ? fightdata.map(person_data_func) : data_item_func(1, '马上就来')}
                    {fightdata.length > 1 ? '' : data_item_func(2, '在潜艇上')}
                    {fightdata.length > 2 ? '' : data_item_func(3, '在游轮上')}
                    {fightdata.length > 3 ? '' : data_item_func(4, '在帆船上')}
                    {fightdata.length > 4 ? '' : data_item_func(5, '游泳中')}
                </div>
            }
            return <div styleName="m-fight">
                <div styleName="m-f-title">
                    <img src={require("../images/mobile/m-fight-title.png")}/>
                </div>
                <div styleName="m-f-top">
                    {fight_data_box()}
                </div>
            </div>
        }
        let bonus_panel = <div styleName="m-bonus">
            <div styleName="m-b-title">
                <img src={require("../images/mobile/m-bonus-title.png")}/>
            </div>
            <div styleName="m-n-tips">
                <div>活动期间，团队累投年化额≥350万且排名前10的用户</div>
                <div>瓜分88万奖金！</div>
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
        let rank_panel = () => {
            let rankdata = this.props.rankdata
            let empty_box = <div styleName="empty-box">
                参赛团队还在努力准备中...
            </div>
            let rank_data_func = (item, index) => {
                return <div styleName={index % 2 == 0 ? "rank-data-item" : "rank-data-item rank-data-odd"} key={index}>
                    <span styleName="rank_number">{index + 1}</span>
                    <span styleName="rank-username">
                        {item.realName}({item.ucount ? item.ucount : '0' })
                    </span>
                    <span styleName="rank-totalmoney">{item.yearAmtSum}</span>
                    <span styleName="rank-bonus">
                        {item.isValid == "暂无瓜分资格" ? "暂无资格" : item.isValid}
                    </span>
                </div>
            }
            let data_box = <div styleName="data-box">
                {rankdata.map(rank_data_func)}
            </div>
            return <div styleName="m-rank">
                <div styleName="m-r-data">
                    <div styleName="data-name">
                        {/*<span styleName="name-one">排名</span>*/}
                        <span styleName="name-two">用户名(团队人数)</span>
                        <span styleName="name-three">团队累投年化(元)</span>
                        <span styleName="name-four">奖金(元)</span>
                    </div>
                    <div styleName="data-detil">
                        {rankdata.length == 0 ? empty_box : data_box}
                    </div>
                </div>
                <div styleName="m-rank-tips">
                    温馨提示：以上数据实时更新，最终奖金以活动结束后数据为准发放。
                </div>
            </div>
        }
        let explain_panel = <div styleName="m-explain">
            <div styleName="m-e-text">
                <div styleName="m-x-title">活动说明</div>
                1.活动期间，投资转让项目，不能参与本次活动；若被邀请人首次投资选择转让项目，则该被邀请的好友不计入邀请人奖励统计；<br/>
                2.投资等额标时，＞18个月的项目按18个月计算年化投资额<br/>
                3.排序规则：按累投年化先后顺序排名，累投年化相同时以达到该累投年化的先后顺序为准。<br/>
                4.奖金奖励以工豆形式发放，工豆奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br/>
                5.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；<br/>
                6.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                <div styleName="m-x-des">声明：以上活动由金融工场主办 与Apple Inc. 无关。</div>
            </div>
        </div>
        let bottom_panel = () => {
            let {singledata} = this.props
            let team_text = <span>，团队累投年化
                    <span styleName="color-yellow">
                        {singledata.yearAmtSumAll ? singledata.yearAmtSumAll : "0"}元
                    </span> </span>
            let logged_text = <div styleName="m-logged">
                <div styleName="logged-des">
                    活动内，您有效邀友
                    <span styleName="color-yellow">{singledata.ucount}人</span>
                    ，好友累投年化
                    <span styleName="color-yellow">{singledata.yearAmtSum}元</span>
                    {((singledata.yearAmtSumAll == '0') || (!singledata.yearAmtSumAll)) ? null : team_text}。
                </div>
                <div styleName="logged-text">
                    <span styleName="howinvite-after" onClick={this.showInvitePop}>如何邀请</span>
                    <a href="" styleName="after-invest">立即投资</a>
                </div>
            </div>
            let notlogged_text = <div styleName="m-notlogged">
                <div styleName="pre-des">请登录后查看您活动内的邀友和投标情况</div>
                <div styleName="pre-text">
                    <span styleName="pre-golog" onClick={this.login}>立即登录</span>
                    <span styleName="howinvite-pre" onClick={this.showInvitePop}>如何邀请</span>
                </div>
            </div>
            let bottom_style = this.state.bottom_close ? "none" : "block"
            return <div styleName="m-bottom" style={{'display': bottom_style}}>
                {isLogin ? logged_text : notlogged_text}
                <div styleName="m_bottom_close" onClick={this.bottomHandler}>&times;</div>
            </div>
        }
        return <div styleName="july-mobile-box">
            {Browser.inApp ? null : <MobileHeader bgColor="rgba(0,0,0,0.5)"/>}
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
            {fight_panel()}
            {bonus_panel}
            {rank_panel()}
            {explain_panel}
            {bottom_panel()}
        </div>
    }
}

export default JulyMobile

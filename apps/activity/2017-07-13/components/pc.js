import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import gotoPage from '../../lib/helpers/goto-page.js'
import PCHeader from '../../lib/components/pc-header.js'
import {PopStartPanel, PopInvitePC, PopEndPanel} from './popall.js'


@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class JulyPC extends React.Component {
    state = {
        timestamp: this.props.timestamp,
        closeBottom: false,
        isLogin: this.props.isLogin,
        rankdata: this.props.rankdata,
        singledata: this.props.singledata
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLogin: nextProps.isLogin,
            timestamp: nextProps.timestamp,
            rankdata: nextProps.rankdata,
            singledata: nextProps.singledata,
            fightdata: nextProps.fightdata
        });
        //活动状态判断
        this.popStatusHandler(nextProps.timestamp)
    }

    componentDidMount() {
    }

    popStatusHandler = (timestamp) => {
        //1499875200000   2017-07-13 00:00:00
        //1502726400000   2017-08-15 00:00:00
        if (timestamp > 1502726400000 + 60 * 60 * 24 * 7 * 1000) {
            ReactDOM.render(<PopEndPanel />, document.getElementById("pop"))
        } else {
            ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
        }
    }


    scroll = (x, y) => {
        window.scrollTo(x, y)
    }

    showHowInvite = () => {
        ReactDOM.render(<PopInvitePC gotoLogin={this.props.gotoLogin} isLogin={this.state.isLogin}
                                     closePopHandler={this.props.closePopHandler}/>, document.getElementById("pop"))
    }

    closeBottom = () => {
        this.setState({closeBottom: true})
    }

    login = () => {
        gotoPage('登录', 'http://www.gongchangp2p.com/api/activityPullNew/ActivityControl.do?code=WZNHD')
    }

    render() {
        let content_panel = <div styleName="pc-content">
            <div styleName="pc-coupon">
                <div styleName="coupon-title">
                    <img src={require("../images/pc/coupon-title.png")}/>
                </div>
                <div styleName="coupon-des">
                    （APP专享）每周、限时抢高达千元返现、1%返息
                </div>
                <div styleName="coupon-code">
                    <img src={require("../images/pc/coupon-qrcode.png")} styleName="coupon-pic"/>
                </div>
                <div styleName="code-tips">
                    <img src={require("../images/pc/coupon-code-tips.png")}/>
                    <div styleName="tips-text">
                        <div>扫描二维码下载金融工场APP</div>
                        <div>即可到 APP-领券中心 参与抢券狂欢</div>
                    </div>
                </div>
            </div>
            <div styleName="pc-welfare">
                <div styleName="welfare-title">
                    <img src={require("../images/pc/welfare-title.png")}/>
                </div>
                <div styleName="welfare-tips">
                    注册7天内，累投年化额≥1000元算一个有效邀请
                </div>
                <div styleName="welfare-one">
                    <div styleName="one-text">
                        活动期间，成功邀请有效好友至少送50元。
                        <a href="https://www.9888keji.com/news/notice/2167.html" styleName="one-link" target="_blank">查看详情></a>
                    </div>
                </div>
                <div styleName="welfare-two">
                    <div styleName="two-text">
                        根据活动内有效邀请数，每人可获对应最高档位奖励。
                    </div>
                    <div styleName="common-text left-text">
                        有效邀请 <span styleName="yellow-text">1-19 人</span>，奖励
                    </div>
                    <div styleName="common-text right-text">
                        有效邀请 <span styleName="red-text">≥20 人</span>，奖励
                    </div>
                </div>
                <div styleName="welfare-three">
                    <div styleName="three-text">
                        <div>活动内，成为人脉王的工友（有效邀请≥20），</div>
                        <div>且新增有效好友累投年化额（不含自身）≥100万的工友可进入TOP5瓜分奖金！</div>
                    </div>
                    <div styleName="bottom-text">
                        奖金分配方式：本人有效好友累投年化额/前5名有效好友累投年化总额，仅计算满足获奖资格的用户。
                    </div>
                </div>
            </div>
        </div>
        let fight_panel = () => {
            let {fightdata} = this.props;
            let fight_data_func = (item, index) => {
                let disability = <div styleName="item-data-up">
                    <div styleName="data-up-disability">
                        暂无奖金
                    </div>
                </div>
                let ability = (item) => {
                    return <div styleName="item-data-up">
                        <div styleName="separable-bonus">可分奖金</div>
                        <div styleName="bonus-amount">
                            {item.isValid == "暂无瓜分资格" ? item.isValid : `${item.isValid}元`}
                        </div>
                    </div>
                }
                return <div styleName="data-item" key={index}>
                    {item.isValid == "暂无瓜分资格" ? disability : ability(item)}
                    <div styleName="item-data-down">
                        <div styleName={`username itemdown-${index}`}>{item.realName}</div>
                        <div styleName="add-year">好友累投年化</div>
                        <div styleName="year-amount">
                            {item.yearAmtSum}元
                        </div>
                    </div>
                </div>
            }
            let fight_data_box = () => {
                let item_func = (num, text) => {
                    return <div styleName="data-item">
                        <div styleName="item-up">
                            暂无奖金
                        </div>
                        <div styleName={`item-down itemdown-${num}`}>
                            {text}...
                        </div>
                    </div>
                }
                return <div styleName="fight-data-box">
                    {fightdata.length > 0 ? fightdata.map(fight_data_func) : item_func(0, '马上就来')}
                    {fightdata.length > 1 ? '' : item_func(1, '在潜艇上')}
                    {fightdata.length > 2 ? '' : item_func(2, '在游轮上')}
                    {fightdata.length > 3 ? '' : item_func(3, '在帆船上')}
                    {fightdata.length > 4 ? '' : item_func(4, '游泳中')}
                </div>

            }
            return <div styleName="pc-fight">
                {fight_data_box()}
            </div>
        }
        let bonus_panel = <div styleName="pc-bonus">
            <img src={require("../images/pc/bonus-title.png")} styleName="bonus-title"/>
            <div styleName="bouns-tips">
                活动期间，团队累投年化额≥350万且排名前10的用户，瓜分88万奖金！
            </div>
            <div styleName="bonus-star">
                <div styleName="star-tips">
                    <div styleName="star-tips-text">
                        团队即：邀请人及被邀请人。(例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队），且团队人数≥2人。
                    </div>
                </div>
            </div>
            <div styleName="bonus-context">
                <img src={require("../images/pc/bonus-box.png")}/>
                <div styleName="bonus-bottom">
                    <div styleName="bonus-text">
                        奖金分配方式：<br />
                        本人团队累投年化额/前10名团队累投年化总额，<br />
                        仅计算满足获奖资格的用户。
                    </div>
                </div>
            </div>
        </div>
        let rank_panel = () => {
            let {rankdata} = this.state
            let empty = <div styleName="rank-data">
                <div styleName="empty-box">
                    参赛团队还在努力准备中...
                </div>
            </div>
            let rankdata_func = (item, index) => {
                return <div key={index} styleName={index % 2 != 0 ? "rank-item rank-even" : "rank-item"}>
                    <span styleName="r-data-item rank-num">{index + 1}</span>
                    <span styleName="r-data-item rank-username">{item.realName}</span>
                    <span styleName="r-data-item rank-teamcount">
                        {item.ucount ? item.ucount : '0'}
                    </span>
                    <span styleName="r-data-item rank-total">{item.yearAmtSum}</span>
                    <span styleName="r-data-item rank-bonus">
                        {item.isValid == "暂无瓜分资格" ? "暂无资格" : item.isValid}
                    </span>
                </div>
            }
            let rankdata_box = <div styleName="rank-data">
                {rankdata.map(rankdata_func)}
            </div>
            return <div styleName="pc-rank">
                <div styleName="rank-content">
                    <div styleName="rank-name">
                        <span styleName="name-item item-one">排名</span>
                        <span styleName="name-item item-two">用户名</span>
                        <span styleName="name-item item-five">团队人数</span>
                        <span styleName="name-item item-three">团队累投年化(元)</span>
                        <span styleName="name-item item-four">奖金(元)</span>
                    </div>
                    {rankdata.length == 0 ? empty : rankdata_box}
                </div>
                <div styleName="rank-tips">
                    温馨提示：以上数据实时更新，最终奖金以活动结束后数据为准发放。
                </div>
            </div>
        }
        let expalin_panel = <div styleName="pc-explain">
            <div styleName="explain">
                <div styleName="explain-title">活动说明</div>
                1.活动期间，投资转让项目，不能参与本次活动；
                若被邀请人首次投资选择转让项目，则该被邀请的好友不计入邀请人奖励统计；<br />
                2.投资等额标时，＞18个月的项目按18个月计算年化投资额；<br />
                3.排序规则：按累投年化先后顺序排名，累投年化相同时以达到该累投年化的先后顺序为准。<br />
                4.奖金奖励以工豆形式发放，工豆奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br />
                5.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚假手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；<br />
                6.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                <div styleName="explain-tips">
                    声明：以上活动由金融工场主办 与Apple Inc. 无关。
                </div>
            </div>
        </div>
        let bottom_panel = () => {
            let {isLogin, closeBottom} = this.state;
            let {singledata} = this.props;
            let close_name = closeBottom ? "none" : "block";
            let team_des = <span>
                ，团队累投年化<span styleName="color-yellow">{singledata.yearAmtSumAll}元</span>            </span>
            let logged = <div styleName="log-box logged-box">
                活动内，您有效邀友
                <span styleName="color-yellow">{singledata.ucount}个</span>
                ，好友累投年化
                <span styleName="color-yellow">{singledata.yearAmtSum}元</span>
                {((singledata.yearAmtSumAll == '0') || (!singledata.yearAmtSumAll)) ? null : team_des}。
                <div styleName="invite-pc-after" onClick={this.showHowInvite}>
                    如何邀请
                </div>
                <a href="https://www.9888keji.com/" styleName="pc-invest">立即投资</a>
            </div>;
            let unlogged = <div styleName="log-box unlogged-box">
                请登录后查看您活动内的邀友和投标情况
                <div styleName="pre-login" onClick={this.login}>立即登录</div>
                <div styleName="invite-pc-pre" onClick={this.showHowInvite}>如何邀请</div>
            </div>;
            return <div styleName="bottom-box" style={{display: close_name}}>
                {isLogin ? logged : unlogged}
                <img src={require("../images/pc/ship.png")} styleName="pic-ship"/>
                <div styleName="bottom-btn" onClick={this.closeBottom}>&times;</div>
            </div>
        }
        return <div styleName="july-pc-box">
            <PCHeader bgColor="rgba(0,0,0,0.5)"/>
            <div styleName="pc-banner">
                <div styleName="pc-banner-pics">
                    <img src={require("../images/pc/anchor-1.png")} styleName="anchor-item anchor-one"
                         onClick={() => this.scroll(0, 1100)}/>
                    <img src={require("../images/pc/anchor-2.png")} styleName="anchor-item anchor-two"
                         onClick={() => this.scroll(0, 3500)}/>
                    <img src={require("../images/pc/anchor-3.png")} styleName="anchor-item anchor-three"
                         onClick={() => this.scroll(0, 2800)}/>
                    <img src={require("../images/pc/anchor-4.png")} styleName="anchor-item anchor-four"
                         onClick={() => this.scroll(0, 2300)}/>
                    <img src={require("../images/pc/anchor-5.png")} styleName="anchor-item anchor-five"
                         onClick={() => this.scroll(0, 4920)}/>
                </div>
            </div>
            {content_panel}
            {fight_panel()}
            {bonus_panel}
            {rank_panel()}
            {expalin_panel}
            {bottom_panel()}
        </div>
    }


}
export default JulyPC
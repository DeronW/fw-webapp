import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import {Get} from '../../lib/helpers/request.js'
import PCHeader from '../../lib/components/pc-header.js'
import {PopStartPanel, PopTeamTips, PopInvitePC, PopEndPanel} from './popall.js'
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class JulyPC extends React.Component {
    state = {
        timestamp: this.props.timestamp,
        closeBottom: false,
        isLogin: this.props.isLogin,
        username: this.props.username,
        fightdata: [
            {name: "fxr", money: 15000},
            {name: "fxr", money: 20000},
            {name: "fxr", money: 30000},
            {name: "fxr", money: 40000},
            {name: "fxr", money: 50000}
        ],
        rankdata: [
            {username: "rising", total_monty: 15000, bonus: 2000},
            {username: "rising", total_monty: 15000, bonus: 3000},
            {username: "rising", total_monty: 15000, bonus: 4000},
            {username: "rising", total_monty: 15000, bonus: 5000},
            {username: "rising", total_monty: 15000, bonus: 6000},
            {username: "rising", total_monty: 15000, bonus: 7000},
            {username: "rising", total_monty: 15000, bonus: 8000},
            {username: "rising", total_monty: 15000, bonus: 9000},
            {username: "rising", total_monty: 15000, bonus: 1000},
            {username: "rising", total_monty: 15000, bonus: 2000}
        ]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLogin: nextProps.isLogin,
            timestamp: nextProps.timestamp,
            username: nextProps.username
        });
        this.popStatusHandler(nextProps.timestamp)
    }

    componentDidMount() {
        Get('http://www.gongchangp2p.cn/api/fiveYearsActivity/v1/getTeamYam.do')
            .then(data=>{
                console.log(data)
            })
    }

    popStatusHandler = (timestamp) => {
        if (timestamp < 1499875200000) {
            ReactDOM.render(<PopStartPanel/>, document.getElementById("pop"))
        } else if (timestamp > 1502726400000) {
            ReactDOM.render(<PopEndPanel/>, document.getElementById("pop"))
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

    render() {
        let content_panel = <div styleName="pc-content">
            <div styleName="pc-coupon">
                <div styleName="coupon-title">
                    <img src={require("../images/pc/coupon-title.png")}/>
                </div>
                <div styleName="coupon-des">
                    每周、限时抢高达千元返现、1%返息
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
                        <a href="" styleName="one-link">查看详情></a>
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
                        <div>且新增好友累投年化额（不含自身）≥100万的工友可进入TOP5瓜分奖金！</div>
                    </div>
                    <div styleName="bottom-text">
                        奖金分配方式：本人有效好友累投年化额/前5名有效好友累投年化总额，仅计算满足获奖资格的用户。
                    </div>
                </div>
            </div>
        </div>
        let fight_panel = () => {
            let {fightdata} = this.state;
            //如果数据为空
            let no_fight_data = <div styleName="fight-data-box">
                <div styleName="data-item">
                    <div styleName="item-up">
                        暂无奖金
                    </div>
                    <div styleName="item-down itemdown-0">
                        马上就来...
                    </div>
                </div>
                <div styleName="data-item">
                    <div styleName="item-up">
                        暂无奖金
                    </div>
                    <div styleName="item-down itemdown-1">
                        在潜艇上...
                    </div>
                </div>
                <div styleName="data-item">
                    <div styleName="item-up">
                        暂无奖金
                    </div>
                    <div styleName="item-down itemdown-2">
                        在游轮上...
                    </div>
                </div>
                <div styleName="data-item">
                    <div styleName="item-up">
                        暂无奖金
                    </div>
                    <div styleName="item-down itemdown-3">
                        在帆船上...
                    </div>
                </div>
                <div styleName="data-item">
                    <div styleName="item-up">
                        暂无奖金
                    </div>
                    <div styleName="item-down itemdown-4">
                        游泳中...
                    </div>
                </div>
            </div>
            let fight_data_func = (item, index) => {
                return <div styleName="data-item" key={index}>
                    <div styleName="item-data-up">
                        <div styleName="separable-bonus">可分奖金</div>
                        <div styleName="bonus-amount">{item.money}元</div>
                    </div>
                    <div styleName="item-data-down">
                        <div styleName={`username itemdown-${index}`}>{item.name}</div>
                        <div styleName="add-year">好友累投年化</div>
                        <div styleName="year-amount">{item.money}元</div>
                    </div>
                </div>
            }
            let fight_data_box = <div styleName="fight-data-box">
                {fightdata.map(fight_data_func)}
            </div>
            return <div styleName="pc-fight">
                {fightdata.length == 0 ? no_fight_data : fight_data_box}
            </div>
        }
        let bonus_panel = <div styleName="pc-bonus">
            <img src={require("../images/pc/bonus-title.png")} styleName="bonus-title"/>
            <div styleName="bouns-tips">
                活动期间，团队累投年化额≥350万且排名前10的用户，送出88万奖金！
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
                        奖金分配方式：<br/>
                        本人团队累投年化额/前10名团队累投年化总额，<br/>
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
                    <span styleName="r-data-item rank-username">{item.username}</span>
                    <span styleName="r-data-item rank-total">{item.total_monty}</span>
                    <span styleName="r-data-item rank-bonus">{item.bonus}</span>
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
                        <span styleName="name-item item-three">团队累投年化额(元)</span>
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
                1.活动期间，投资债权转让产品，不能参与本次活动；
                若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；<br/>
                2.投资等额标时，＞18个月的项目按18个月计算年化投资额<br/>
                3.奖金奖励以工豆形式发放；<br/>
                4.工豆奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br/>
                5.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚假手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；<br/>
                6.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                <div styleName="explain-tips">
                    声明：以上活动由金融工场主办 与Apple Inc. 无关。
                </div>
            </div>
        </div>
        let bottom_panel = () => {
            let isLogin = this.state.isLogin;
            let {closeBottom} = this.state;
            let close_name = closeBottom ? "none" : "block";
            let logged = <div styleName="log-box logged-box">
                活动内，您有效邀友50人，有效好友累投年化3,4567元，团队累投年化40,5678.89元 。
                <div styleName="invite-pc-after" onClick={this.showHowInvite}>
                    如何邀请
                </div>
                <a href="" styleName="pc-invest">立即投资</a>
            </div>;
            let unlogged = <div styleName="log-box unlogged-box">
                请登录后查看您活动内的邀友和投标情况，
                <div styleName="pre-login">立即登录</div>
                <div styleName="invite-pc-pre" onClick={this.showHowInvite}>如何邀请</div>
            </div>;
            return <div styleName="bottom-box" style={{display: close_name}}>
                {isLogin ? logged : unlogged}
                <img src={require("../images/pc/ship.png")} styleName="pic-ship"/>
                <div styleName="bottom-btn" onClick={this.closeBottom}>&times;</div>
            </div>
        }
        return <div styleName="july-pc-box">
            <PCHeader/>
            <div styleName="pc-banner">
                <div styleName="pc-banner-pics">
                    <img src={require("../images/pc/anchor-1.png")} styleName="anchor-item anchor-one"
                         onClick={() => this.scroll(0, 750)}/>
                    <img src={require("../images/pc/anchor-2.png")} styleName="anchor-item anchor-two"
                         onClick={() => this.scroll(0, 3170)}/>
                    <img src={require("../images/pc/anchor-3.png")} styleName="anchor-item anchor-three"
                         onClick={() => this.scroll(0, 2450)}/>
                    <img src={require("../images/pc/anchor-4.png")} styleName="anchor-item anchor-four"
                         onClick={() => this.scroll(0, 1950)}/>
                    <img src={require("../images/pc/anchor-5.png")} styleName="anchor-item anchor-five"
                         onClick={() => this.scroll(0, 4600)}/>
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
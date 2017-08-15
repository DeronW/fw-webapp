import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import { Utils } from 'fw-javascripts'

import styles from '../css/pc.css'
import { gotoPage } from '../../lib/helpers'
import PCHeader from '../../lib/components/pc-header.js'
import { PopStartPC } from '../../lib/components/pop-start.js'
import { PopInvitePC } from './pop-invest.js'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PC extends React.Component {
    state = {
        close: true,
        ladderData:[]
    }
    closeHandler = () => {
        this.setState({ close: false })
    }
    showInvestHandler = () =>{
        let {loginHandler,closePopHandler,isLogin} =this.props;
        ReactDOM.render(<PopInvitePC gotoLogin={loginHandler} isLogin={isLogin}
                                     closePopHandler={closePopHandler}/>,document.getElementById("pop"))
    }
    render() {
        let { close } = this.state;
        let { isLogin, loginHandler, timestamp,ladderData,personData,total } = this.props;
        let empty = <div styleName="empty">人气王还在堵车，马上就来！</div>
        let ladder = () => {
            let topName = ['最强王者','至尊星耀','璀璨钻石','永恒钻石','尊贵铂金','超凡大师','荣耀黄金','秩序白银','不屈白银','倔强青铜'];
            let list = (item,index) => {
                return <tr key={index}>
                    <td >{topName[index]}</td>
                    <td >{item.realName}</td>
                    <td >{item.uCount}</td>
                    <td styleName="rankAmt">
                        {item.yearAmtSum}<br/>
                        <span>{item.yearAmtDe && `( 含等额标${item.yearAmtDe} )`}</span>
                    </td>
                    <td styleName="rankAmt">{item.isValid}</td>   
                </tr>
            }
            return <table>
                <thead>
                    <td>排名</td>
                    <td>用户名</td>
                    <td>团队人数</td>
                    <td>团队累投年化额（元）</td>
                    <td>奖金（元）</td>
                </thead>
                <tbody>
                    {ladderData && ladderData.map(list)}
                </tbody>
            </table>
        }
        let bottom_panel = () => {
            let team_des = <span>
                当前可分<span styleName="color-yellow">{personData.isValid}</span>奖金！
            </span>
            let logged = <div styleName="log-box logged-box">
                活动期内，您团队内共
                <span styleName="color-yellow">{personData.uCount}人</span>
                ，累投年化
                <span styleName="color-yellow">{personData.yearAmtSum}元，</span>
                {total > 80000000 && personData.isValid !=0 ? team_des :'继续加油!'}
                <div styleName="invite-pc-after" onClick={this.showInvestHandler}>
                    如何邀请
                </div>
                <a href="https://www.9888keji.com/" styleName="pc-invest">立即投资</a>
            </div>;

            let unlogged = <div styleName="log-box unlogged-box">
                请登录后查看您活动内的邀友和投标情况
                <div styleName="pre-login" onClick={loginHandler}>立即登录</div>
                <div styleName="invite-pc-pre" onClick={this.showInvestHandler}>如何邀请</div>
            </div>;
            return <div styleName="bottom-box">
                {isLogin ? logged : unlogged}
                <img src={require("../images/pc/bottomIcon.png")} styleName="pic-ship" />
                <div styleName="bottom-btn" onClick={this.closeHandler}>&times;</div>
            </div>
        }

        return <div styleName="pc">
            <PCHeader bgColor="rgba(8,11,22,0.6)" />
            <div styleName="banner"></div>
            <div styleName="peopleTitle"></div>
            <div styleName="layer">
                <div styleName="layerText">邀请人及被邀请人，且团队人数≥2人；<br/>例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队。</div>
            </div>
            <div styleName="qrTittle">APP专享</div>
            <div styleName="qrText">活动期间，每天7点、14点、20点领券中心上架最划算优惠券！</div>
            <div styleName="qrcode"></div>
            <div styleName="kingTitle"></div>
            <div styleName="kingExplain">活动期间，平台累投年化金额达标，团队累计年化投资额≥350万且团队人数≥2人，排名前10的用户，将获得其团队总年化投资金额*对应团队奖金系数的奖金。累计金额越多获得的奖金就越多。
            </div>
            <div styleName="future">
                <div styleName="futureleft">平台累投年化额</div>
                <div styleName="futureRight">奖金系数</div>
                <div styleName="investTop investTop1">55000万</div>
                <div styleName="investTop investTop2">40000万</div>
                <div styleName="investTop investTop3">25000万</div>
                <div styleName="investTop investTop4">8000万</div>
                <div styleName="coeTop coeTop1">1.2%</div>
                <div styleName="coeTop coeTop2">0.8%</div>
                <div styleName="coeTop coeTop3">0.5%</div>
                <div styleName="coeTop coeTop4">0.1%</div>
                <div styleName="total">当前平台累投年化额：{Utils.format.price(total / 10000,2)}万</div>
                <div styleName="totalExplain">团队奖金奖励=(非等额标年化额+等额标年化额*0.56)*奖金系数</div>
                <div styleName="textExplain">奖金按照对应的平台累投年化金额开启，只开启一个最高标准奖金系数。</div>
            </div>
            
            <div styleName="topTen">
                <div styleName="tenTitle"></div>
                <div styleName="ladder">
                    {ladderData && ladderData.length > 0 ? ladder():empty}
                </div>
                <div styleName="remind">
                    <p>温馨提示：</p>
                    <p>1、奖金包奖励以工豆形式发放；</p>
                    <p>2、投资等额标时，＞18个月的项目按18个月计算年化投资额。</p>
                </div>
                <div styleName="activityExplain">
                    <div styleName="actEx">
                        <div styleName="activityTitle">活动说明</div>
                        <p>1.活动期间，投资转让项目，不能参与本次活动；</p>
                        <p>2.投资等额标时，＞18个月的项目按18个月计算年化投资额；</p>
                        <p>3.排序规则：按累投年化先后顺序排名，累投年化相同时以达到该累投年化的先后顺序为准；</p>
                        <p>4.奖金活动奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；</p>
                        <p>5.金融工场有权随时随机抽查邀请人所推荐好友的真实性，一旦发现存在好友用虚假手机号注册、好友对注册金融工场账户不知情及非好友真实意愿等造假和欺骗行为，则立即清除虚假好友的统计数据并回收相关奖励，且保留追究由此给金融工场带来的一切损失的权利；</p>
                        <p>6.活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。</p>
                    </div>
                </div>
            </div>
            
            {close && bottom_panel()}
            {timestamp && <PopStartPC timestamp={timestamp} />}
        </div>
    }
}
export default PC
import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'
import gotoPage from '../../lib/helpers/goto-page.js'
import MobileHeader from '../../lib/components/mobile-header.js'
import { PopStartMobile } from '../../lib/components/pop-start.js'
import { PopInviteMobile } from './pop-invest.js'
import Browser from '../../lib/helpers/browser.js'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Mobile extends React.Component {

    state = {
        close:true,
        showLayer:true
    }
    componentDidMount(){

    }
    showInvestHandler = () =>{
        let {loginHandler,closePopHandler,isLogin} =this.props;
        ReactDOM.render(<PopInviteMobile gotoLogin={loginHandler} isLogin={isLogin}
                                     closePopHandler={closePopHandler}/>,document.getElementById("pop"))
    }
    showLayerHandler = () => {
        this.setState({showLayer:true})
    }
    closeHandler = () => {
        this.setState({close:false})
    }
    render() {
        let {close,showLayer} =this.state;
        let { isLogin, loginHandler, timestamp,ladderData,personData,total } = this.props;
        
        // let rank = item.yearAmtDe ? styles.rankAmt : styles.rankAmtDe;
        // let rank = (item) => {
        //     return item.yearAmtDe ? styles['rankAmtDe'] : styles['rankAmt'];
        // }
        let ladder = () => {
            let empty = <div>人气王还在堵车，马上就来！</div>
            let list = (item,index) => {
                return <tr key={index}>
                    <td styleName={`icon icon-${index}`}>{index+1}</td>
                    <td >{item.realName}</td>
                    <td >{item.uCount}</td>
                    <td styleName="rank" style={{"lineHeight":item.yearAmtDe?"24px":"0px"}}>
                        {item.yearAmtSum}<br/>
                        <span>{item.yearAmtDe && `( 含等额标${item.yearAmtDe} )`}</span>
                    </td>
                    <td styleName="rankAmt">{item.isValid}</td>   
                </tr>
            }
            return <div>
                <div styleName="ladderPrice">活动期内，您团队内共<span>{personData.uCount}</span>人，累投年化<span>{personData.yearAmtSum}</span>元，当前可分<span>{personData.isValid}</span>元奖金！</div>    
                <table>
                    <thead>
                        <td>排名</td>
                        <td>用户名</td>
                        <td>团队人数</td>
                        <td>团队累计<br/>投年化额（元）</td>
                        <td>奖金（元）</td>
                    </thead>
                    <tbody>
                        {ladderData && ladderData.map(list)}
                    </tbody>
                </table>
            </div>
        }
        let bottom_panel = () => {
            let team_text = <span>，团队累投年化<span styleName="color-yellow">元</span></span>
            let logged_text = <div styleName="m-logged">
                <div styleName="logged-des">
                    活动内，您有效邀友
                    <span styleName="color-yellow">人</span>，好友累投年化
                    <span styleName="color-yellow">元</span>
                </div>
                <div styleName="logged-text">
                    <span styleName="howinvite-after" onClick={this.showInvestHandler}>如何邀请</span>
                    <a href="" styleName="after-invest">立即投资</a>
                </div>
            </div>
            let notlogged_text = <div styleName="m-notlogged">
                <div styleName="pre-des">请登录后查看您活动内的邀友和投标情况</div>
                <div styleName="pre-text">
                    <span styleName="pre-golog" onClick={loginHandler}>立即登录</span>
                    <span styleName="howinvite-pre" onClick={this.showInvestHandler}>如何邀请</span>
                </div>
            </div>
            return <div styleName="m-bottom">
                <img styleName="bottomIcon" src={require("../images/mobile/bottomIcon.png")} alt=""/>
                {isLogin ? logged_text : notlogged_text}
                <div styleName="m_bottom_close" onClick={this.closeHandler}></div>
            </div>
        }
        return <div styleName="mobile">
            {Browser.inApp ? null : <MobileHeader bgColor="rgba(0,0,0,0.5)" />}
            <div styleName="banner"></div>
            <div styleName="layer" onClick={this.showLayerHandler}>
                <div styleName="layerText" style={{"display":showLayer?"block":"none"}}>邀请人及被邀请人，且团队人数≥2人；<br/>例如：A邀请的好友有B、C、D、E，那么ABCDE算一个团队。</div>
            </div>
            <div styleName="peopleTitle"></div>
            <div styleName="qrTittle">APP专享</div>
            <div styleName="qrText">活动期间，每天7点、14点、20点领券中心上架最划算优惠券！</div>
            <div styleName="coupon" onClick="">去抢券</div>
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
                <div styleName="total">当前平台累投年化额：{total}万</div>
                <div styleName="totalExplain">团队奖金奖励=(非等额标年化额+等额标年化额x0.56)x奖金系数</div>
                <div styleName="textExplain">奖金按照对应的平台累投年化金额开启，只开启一个最高标准奖金系数。</div>
            </div>
            <div styleName="topTen">
                <div styleName="tenTitle"></div>
                <div styleName="topExplain">活动期间，平台累投年化金额达标，团队累计年化投资额≥200万且团队人数≥2人，排名前10的用户，将按照其累计投资金额
占比进行不同级别的奖金分配。累计金额越多获得的奖金就越多</div>
                <div styleName="ladder">
                    {ladder()}
                </div>
                <div styleName="remind">
                    <p>温馨提示：</p>
                    <p>1、奖金包奖励以工豆形式发放；</p>
                    <p>2、投资等额标时，＞18个月的项目按18个月计算年化投资额。</p>
                </div>
                <div styleName="apple">以上活动由金融工场主办 与Apple Inc. 无关</div>
            </div>
            {close && bottom_panel()}
            {timestamp && <PopStartMobile timestamp={timestamp}/>}
        </div>
    }
}
export default Mobile
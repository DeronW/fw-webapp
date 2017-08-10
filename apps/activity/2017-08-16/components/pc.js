import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import gotoPage from '../../lib/helpers/goto-page.js'
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
        let { isLogin, loginHandler, timestamp,ladderData,personData } = this.props;
        // console
        let ladder = () => {
            let top = ['TOP1','TOP2','TOP3','TOP4','TOP5','TOP6','TOP7','TOP8','TOP9','TOP10'];
            let topName = ['最强王者','至尊星耀','璀璨钻石','永恒钻石','尊贵铂金','超凡大师','荣耀黄金','秩序白银','不屈白银','倔强青铜'];
            let empty = <div>人气王还在堵车，马上就来！</div>
            let list = (item,index) => {
                return <tr key={index}>
                    <td>
                        <div styleName={`icon icon-${index}`}></div>
                        <div styleName="rank">
                            <div styleName="rankTop">{top[index]}</div>
                            <div styleName="rankTopName">{topName[index]}</div>
                        </div>
                    </td>
                    <td styleName="realName">{item.realName}</td>
                    <td >{item.ucount}</td>
                    <td >{item.yearAmtSum}</td>
                    <td >{item.isValid}</td>   
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
            // let team_des = <span>
            //     ，当前可分<span styleName="color-yellow">{personData.isValid}</span>奖金！</span>
            let logged = <div styleName="log-box logged-box">
                活动期内，您团队内共
                <span styleName="color-yellow">{personData.ucount}个</span>
                ，累投年化
                <span styleName="color-yellow">{personData.yearAmtSum}元</span>
                ，当前可分<span styleName="color-yellow">{personData.isValid}</span>奖金！
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
                <img src="" styleName="pic-ship" />
                <div styleName="bottom-btn" onClick={this.closeHandler}>&times;</div>
            </div>
        }
        return <div styleName="pc">
            <PCHeader bgColor="rgba(0,0,0,0.5)" />
            <div styleName="ladder">
                {ladder()}
            </div>
            {close && bottom_panel()}
            {timestamp && <PopStartPC timestamp={timestamp} />}
        </div>
    }
}
export default PC
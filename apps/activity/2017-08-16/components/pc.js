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
        close: true
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
        let { isLogin, loginHandler, timestamp } = this.props;
        let bottom_panel = () => {
            let team_des = <span>
                ，团队累投年化<span styleName="color-yellow">元</span></span>
            let logged = <div styleName="log-box logged-box">
                活动内，您有效邀友
                <span styleName="color-yellow">个</span>
                ，好友累投年化
                <span styleName="color-yellow">元</span>
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
            {close && bottom_panel()}
            {timestamp && <PopStartPC timestamp={timestamp} />}
        </div>
    }
}
export default PC
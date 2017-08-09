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
        close:true
    }
    componentDidMount(){

    }
    showInvestHandler = () =>{
        let {loginHandler,closePopHandler,isLogin} =this.props;
        ReactDOM.render(<PopInviteMobile gotoLogin={loginHandler} isLogin={isLogin}
                                     closePopHandler={closePopHandler}/>,document.getElementById("pop"))
    }
    closeHandler = () => {
        this.setState({close:false})
    }
    render() {
        let {close} =this.state;
        let {isLogin,loginHandler,timestamp} = this.props;
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
                    <span styleName="pre-golog" onClick={this.login}>立即登录</span>
                    <span styleName="howinvite-pre" onClick={this.showInvestHandler}>如何邀请</span>
                </div>
            </div>
            return <div styleName="m-bottom">
                {isLogin ? logged_text : notlogged_text}
                <div styleName="m_bottom_close" onClick={this.closeHandler}>&times;</div>
            </div>
        }
        return <div styleName="mobile">
            {Browser.inApp ? null : <MobileHeader bgColor="rgba(0,0,0,0.5)" />}
            {close && bottom_panel()}
            {timestamp && <PopStartMobile timestamp={timestamp}/>}
        </div>
    }
}
export default Mobile
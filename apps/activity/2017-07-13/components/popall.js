import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pop.css'
import UserReady from '../../lib/helpers/user-ready.js'
import gotoPage from '../../lib/helpers/goto-page.js'
import Clipboard from 'clipboard'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopStartPanel extends React.Component {
    render() {
        return <div styleName="pop_status_box pop_notbegun_box">
            <div styleName="pop_status_text pop_notbegun_text">

            </div>
        </div>
    }
}

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopEndPanel extends React.Component {
    render() {
        return <div styleName="pop_status_box pop_end_box">
            <div styleName="pop_status_text pop_end_text">
            </div>
        </div>
    }
}

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopTeamTips extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div styleName="pop-team">
            <div styleName="content">
                <div styleName="pra">
                    团队即：邀请人及被邀请人。(例如:A邀请<br />
                    的好友有B、C、D、E，那么ABCDE算一<br />
                    个团队），且团队人数≥2人。
                </div>
                <div styleName="m-close" onClick={this.props.closePopHandler}></div>
            </div>
        </div>
    }
}

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopInviteMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            gcm: '',
        }
    }

    componentDidMount() {
        UserReady((isLogin, user) => {
            this.setState({isLogin: isLogin, gcm: user.gcm})
        })
    }

    login = () => {
        gotoPage('登录', 'https://www.gongchangp2p.com/api/activityPullNew/ActivityControl.do?code=WZNHD')
    }

    render() {
        let {isLogin, closePopHandler} = this.props
        let pre_tips = <div styleName="pre-box">
            <div>请好友用您的工场码注册,去投标,达成团队目标。</div>
            <div>登录后查看我的工场码</div>
            <div>还没有工场码？注册即可拥有。</div>
            <div styleName="log-btn" onClick={this.login}>登录注册</div>
            <div>新手注册即送<span styleName="color-red">200元</span>，首投即获<span styleName="color-red">0.6%返息券</span></div>
            <div>邀请好友升级最高再送<span styleName="color-red">350元</span></div>
            <a styleName="more" href="https://www.9888keji.com/cms/addhtml/2057.html">更多新手秘笈</a>
        </div>
        let after_tips = <div styleName="after-box">
            <div>请好友注册或投资时</div>
            <div>填写我的工场码</div>
            <div styleName="m-gcm">{this.state.gcm}</div>
            <div styleName="m-newer">新手注册即送<span styleName="color-red">200元</span>，首投即获<span styleName="color-red">0.6%返息券</span>
            </div>
            <div styleName="m-newer">邀请好友升级最高再送<span styleName="color-red">350元</span></div>
            <a styleName="more" href="https://www.9888keji.com/cms/addhtml/2057.html">更多新手秘笈</a>
        </div>
        return <div styleName="pop-invite-box">
            <div styleName="pop-m-invite">
                {isLogin ? after_tips : pre_tips}
                <div styleName="m-close-btn" onClick={closePopHandler}></div>
            </div>
        </div>

    }
}

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopInvitePC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            gcm: '',
        }
    }

    componentDidMount() {
        this.clipboardHandler();
        UserReady((isLogin, user) => {
            this.setState({isLogin: isLogin, gcm: user.gcm})
        })
    }

    clipboardHandler = () => {
        let clipboard = new Clipboard('#copy-value-pc');//复制功能
        clipboard.on('success', function (e) {
            alert('复制成功');
        });
        clipboard.on('error', function (e) {
            alert('复制失败');
        });
    }

    login = () => {
        gotoPage('登录', 'https://www.gongchangp2p.com/api/activityPullNew/ActivityControl.do?code=WZNHD')
    }

    render() {
        let {gcm} = this.state;
        let {closePopHandler, gotoLogin, isLogin} = this.props;

        let notLoginTips = <div styleName="nolog-box">
            <div>请好友用您的工场码注册，去投标，达成团队目标。</div>
            <div>登录后查看我的工场码</div>
            <div>还没有工场码？注册即可拥有。</div>
            <div styleName="golog" onClick={this.login}>登录注册</div>
            <div styleName="tips">新手注册即送<span styleName="color-red">200元</span>，首投即获<span
                styleName="color-red">0.6%返息券</span>，邀请好友升级最高再送<span styleName="color-red">350元</span></div>
            <a styleName="policy-link" href="https://www.9888keji.com/news/notice/2167.html" target="_blank">更多新手秘笈></a>
        </div>;

        let loginTips = <div styleName="log-box">
            <div styleName="write-gcm"><span styleName="order">1</span>请好友注册或投资时填写我的工场码<span
                styleName="gcm-text">{gcm}</span></div>
            <div styleName="copy-box">
                <div styleName="copy-tips">
                    <span styleName="order">2</span>
                    复制以下链接，发送工场码给好友邀请TA来注册&投资吧！
                </div>
                <button styleName="copy-link"
                        data-clipboard-text={`https://www.9888keji.com/depository/regist/toRegist.shtml?sourceSite=jrgc&gcm= ${gcm}`}
                        id="copy-value-pc">复制链接
                </button>
                <div styleName="copy-text">
                    https://www.9888keji.com/depository/regist/toRegist.shtml?sourceSite=jrgc&gcm={gcm}
                </div>
            </div>
            <div styleName="logged-tips">新手注册即送<span styleName="color-red">200元</span>，首投即获<span styleName="color-red">0.6%返息券</span>，邀请好友升级最高再送<span
                styleName="color-red">350元</span></div>
            <a styleName="logged-link" href="https://www.9888keji.com/news/notice/2167.html" target="_blank">更多新手秘笈></a>
        </div>
        return <div styleName="pop-invite-pc">
            <div styleName="pop-invite-pc-text">
                {isLogin ? loginTips : notLoginTips}
                <div styleName="close-btn" onClick={closePopHandler}></div>
            </div>
        </div>
    }
}
export {PopStartPanel, PopTeamTips, PopInviteMobile, PopEndPanel, PopInvitePC}
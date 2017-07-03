import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/pop.css'

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
class PopTeamTips extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div styleName="pop-team">
            <div styleName="content">
                <div styleName="pra">
                    团队即：邀请人及被邀请人。(例如:A邀请<br/>
                    的好友有B、C、D、E，那么ABCDE算一<br/>
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
        let _this = this;
        $UserReady(function (isLogin, user) {
            _this.setState({isLogin: isLogin, gcm: user.userCode});
        })
    }

    render() {
        let {isLogin, closePopHandler} = this.props
        console.log(isLogin)
        let pre_tips = <div styleName="pre-box">
            <div>请好友用您的工场码注册,去投标,达成团队目标。</div>
            <div>登录后查看我的工场码</div>
            <div>还没有工场码？注册即可拥有。</div>
            <div styleName="log-btn">登录注册</div>
            <div>新手注册即送<span styleName="color-red">200元</span>，首投即获<span styleName="color-red">0.6%返息券</span></div>
            <div>邀请好友升级最高再送<span styleName="color-red">350元</span></div>
            <div styleName="more">更多新手秘笈</div>
        </div>
        let after_tips = <div styleName="after-box">
            <div>请好友注册或投资时</div>
            <div>填写我的工场码</div>
            <div styleName="m-gcm">{this.state.gcm}</div>
            <div styleName="m-newer">新手注册即送<span styleName="color-red">200元</span>，首投即获<span styleName="color-red">0.6%返息券</span>
            </div>
            <div styleName="m-newer">邀请好友升级最高再送<span styleName="color-red">350元</span></div>
            <div styleName="more">更多新手秘笈</div>
        </div>
        return <div styleName="pop-invite-box">
            <div styleName="pop-m-invite">
                {isLogin ? after_tips : pre_tips}
                <div styleName="m-close-btn" onClick={closePopHandler}></div>
            </div>
        </div>

    }
}
export {PopStartPanel, PopTeamTips,PopInviteMobile}
import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/mobile-pop-how-to-invite.css'


/*
    props:
    -- isLoggedIn|!boolean
    -- gcm|!string
    -- loginHandler|!function
    -- closeHandler|!function
*/
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class InviteRewardPop extends React.Component {

    state = { copySuccess: false }

    handleCopy = () => {
        const linkNode = document.getElementById('link-to-copy'),
            linkRange = document.createRange();
        linkRange.selectNodeContents(linkNode);
        let selectedLink, copysuccess = false;
        if (window.getSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(linkRange);
            selectedLink = selection.toString();
        };
        this.setState({ copySuccess: !!(document.execCommand && document.execCommand("copy")) })
    }

    render() {
        const { isLoggedIn, gcm, closeHandler } = this.props;
        const { copySuccess } = this.state;

        return <div styleName="mask" onClick={closeHandler}>
            <div styleName="pop" onClick={e => e.stopPropagation()}>
                <div styleName="close-btn" onClick={closeHandler}></div>

                { isLoggedIn ? (
                    <div>
                        <div styleName="step-1">
                            <div styleName="step-no">1</div>
                            <div styleName="step-desc">请好友在注册或投标时填写您的工场码</div>
                            <div styleName="gcm">{gcm}</div>
                        </div>

                        <div styleName="step-2">
                            <div styleName="step-no">2</div>
                            <div styleName="step-desc">复制以下链接，发送您的工场码给好友，邀请TA来注册或投标吧！</div>
                            <div styleName="invite-link">
                                <div styleName="link" id="link-to-copy">{`http://www.9888keji.com/depository/regist/toRegist.shtml?sourceSite=jrgc&gcm=${gcm}`}</div>
                                <div styleName="copy-btn" onClick={this.handleCopy}>{copySuccess ? '已复制' : '复制链接'}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div styleName="login-entry">
                        活动期内，请好友用您的工场码注册或投标，好友累投达标您可获奖励<br />
                        登录后查看您的工场码<br />
                        还没有工场码？注册即可拥有
                        <div styleName="login-btn" onClick={this.props.loginHandler}>登录注册</div>
                    </div>
                )}

                <div styleName="pop-info">
                    新手注册即送<span>200元</span>+<span>2.6g</span>黄金，
                    首投还获<span>0.6%返息券</span>，
                    邀友最高再送<span>350元</span>
                    <a styleName="blue-anchor" href="https://www.9888keji.com/news/notice/2200.html" target="_blank">更多秘籍></a>
                </div>
            </div>
        </div>
    }

}

export default InviteRewardPop
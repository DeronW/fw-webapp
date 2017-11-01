import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, NavBar} from '../../components'
import styles from '../../css/user/user.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class User extends React.Component {
    render() {
        return <div>
            <div styleName="bannerBg">
                <div styleName="infoWrapper">
                    <img src={require('../../images/user/user/headpic.png')}/>
                    <div styleName="info">
                        <div>Grace<span styleName="label">未授信</span></div>
                        <div styleName="phone">13923784066</div>
                    </div>
                </div>
            </div>
            <div styleName="numWrapper">
                <div styleName="numLeft">
                    <div styleName="number">3000</div>
                    <div>总额度(元)</div>
                </div>
                <div styleName="numRight">
                    <div styleName="number">1500</div>
                    <div>可用额度(元)</div>
                </div>
            </div>
            <div styleName="bankWrapper">
                <div styleName="bankItem">
                    <div styleName="left">提现银行卡</div>
                    <div styleName="right">招商银行(8412)</div>
                </div>
                <div styleName="bankItem">
                    <div styleName="left">常见问题</div>
                    <div styleName="right"></div>
                </div>
            </div>
            <div styleName="loginOut">
                退出账号
            </div>

            <div styleName="servePhone">客服电话<span styleName="num">400-0322-988</span></div>
            <div styleName="time">周一至周日8:30-21:00</div>
            <NavBar/>
        </div>
    }
}

export default User

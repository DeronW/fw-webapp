import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/fail.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AuthFail extends React.Component {

    state = {
        showContactPop: false
    }

    toggleContactPop = () => this.setState({ showContactPop: !this.state.showContactPop })

    render() {
        let { history } = this.props,
            { showContactPop } = this.state;

        let contactPop = <div styleName="pop-bg">
            <div styleName="pop-panel">
                <div styleName="pop-title">联系客服</div>
                <div styleName="pop-content">400-102-0066</div>
                <a styleName="pop-cancel"
                    onClick={this.toggleContactPop}>取消</a>
                <a styleName="pop-confirm" href="tel:400-102-0066">马上拨打</a>
            </div>
        </div>

        return (
            <div>
                <Header title="授权失败" history={history} />
                <div styleName="info-container">
                    <img styleName="info-img" src={require("../images/fail/auth-fail.png")}/>
                    <div styleName="info-text">很抱歉，访问此页面暂时出现问题</div>
                    <div styleName="bottom-btn" onClick={this.toggleContactPop}>联系客服</div>
                </div>
                { showContactPop && contactPop }
            </div>
        )
    }
}

export default AuthFail

import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/auth-result-proxy.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AuthFail extends React.Component {

    render() {
        let { history } = this.props;
        return (
            <div>
                <Header title="授权" history={history} />
                <div styleName="info-container">
                    <img styleName="info-img" src={require("../images/auth-result-proxy/wait.png")}/>
                    <div styleName="info-text">请稍等，页面正在跳转...</div>
                </div>
            </div>
        )
    }
}

export default AuthFail

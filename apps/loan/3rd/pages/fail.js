import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/fail.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AuthFail extends React.Component {

    render() {
        let { history } = this.props;
        return (
            <div>
                <Header title="授权失败" history={history} />
                <div styleName="info-container">
                    <img styleName="info-img" src={require("../images/fail/auth-fail.png")}/>
                    <div styleName="info-text">授权失败，请稍后重试</div>
                    <div styleName="bottom-btn">返回首页</div>
                </div>
            </div>
        )
    }
}

export default AuthFail

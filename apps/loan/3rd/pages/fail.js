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
                    <div styleName="info-text">很抱歉，访问此页面暂时出现问题</div>
                    <div styleName="bottom-btn">联系客服</div>
                </div>
            </div>
        )
    }
}

export default AuthFail

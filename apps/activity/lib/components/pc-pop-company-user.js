import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/pc-pop-company-user.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class CompanyUserPop extends React.Component {
    render() {
        return <div styleName="mask">
            <div styleName="pop">很遗憾！<br />企业用户不参与本次活动！</div>
        </div>
    }
}

export default CompanyUserPop
import React from 'react'
import CSSModules from 'react-css-modules'

import { Captcha } from '../../lib/components'

class AuthFail extends React.Component {

    render() {
        let { history } = this.props;
        return (
            <div style={{ 'padding': '400px 0 0 12px' }}>
                <Captcha />
            </div>
        )
    }
}

export default AuthFail

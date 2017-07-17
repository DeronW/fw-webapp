import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/auth-fail.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class AuthFail extends React.Component {

    render() {
        let { history } = this.props;
        return (
            <div>
                <Header title="授权" history={history} />
            </div>
        )
    }
}

export default AuthFail

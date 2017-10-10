import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../lib/components'

import styles from '../css/user-info.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class UserInfo extends React.Component {
    render() {
        return <div>
            <Header title="个人信息" />
        </div>
    }
}

export default UserInfo
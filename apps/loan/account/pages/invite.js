import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import { BottomNavBar } from '../../lib/components'
import { Post, Storage } from '../../lib/helpers'
import styles from '../css/invite.css'

@inject('account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Invite extends React.Component {

    state = {
        tab: 'fxh'
    }

    switchHandler = tab => {
        if (tab != this.state.tab)
            this.setState({ tab: tab })
    }

    render() {

        let code = Storage.getUserDict().invite_code

        return <div styleName="bg">
            <div styleName="banner">
                <div styleName="code">我的邀请码：{code}</div>
            </div>
            <div styleName="content">
                <div styleName="tab">
                    <a onClick={() => this.switchHandler('fxh')}>放心花</a>
                    <a onClick={() => this.switchHandler('records')}>邀请记录</a>
                </div>

                <div>

                </div>
            </div>

            <BottomNavBar history={this.props.history} />
        </div>
    }
}

export default Invite
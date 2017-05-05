import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../less/statis-apply.less'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import BottomBar from './components/bottom-bar'

@inject('statis_apply') @observer @CSSModules(styles)
class StatisApply extends React.Component {

    static onEnter() {
        document.title = '注册统计'
    }

    render() {
        return <div>
            Statis Apply
            <BottomBar />
        </div>
    }
}

export default StatisApply

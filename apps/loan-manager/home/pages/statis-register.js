import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/statis-register.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import BottomBar from './components/bottom-bar'

@inject('statis_register') @observer @CSSModules(styles)
class StatisRegister extends React.Component {

    static onEnter() {
        document.title = '注册统计'
    }

    render() {
        return <div styleName="statis-register-panel">
            <div styleName="big-unit">注册人数</div>
            <div styleName="big-count">1500</div>
            <div styleName="classification">
                <div styleName="c-statis">
                    <div styleName="c-unit">C1 人数</div>
                    <div styleName="c-count">1100</div>
                </div>
                <div styleName="c-statis">
                    <div styleName="c-unit">C2 人数</div>
                    <div styleName="c-count">1100</div>
                </div>
                <div styleName="c-statis">
                    <div styleName="c-unit">C3 人数</div>
                    <div styleName="c-count">1100</div>
                </div>
            </div>
            <BottomBar />
        </div>
    }
}

export default StatisRegister

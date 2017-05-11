import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/statis-chart.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import BottomBar from './components/bottom-bar'


@inject('statis_chart') @observer @CSSModules(styles)
class StatisChart extends React.Component {

    static onEnter() {
        document.title = '注册统计'
    }

    render() {
        return <div styleName="statis-chart">
            <div styleName="bg"></div>
            <div styleName="txt">COMMING SOON</div>
            <BottomBar />
        </div>
    }
}

export default StatisChart

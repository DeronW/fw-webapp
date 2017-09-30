import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import styles from '../../css/investor/item-collection.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class itemCollection extends React.Component {
    render() {
        let { history } = this.props
        let SVGCircleProgress = Components.SVGCircleProgress
        return <div styleName="bg">
            <div styleName="bar">
                <div styleName="header">
                    <a styleName="btn" onClick={history.goBack}> </a>
                    闪信贷28天项目集001
                </div>
                <div styleName="earnings">年化收益 <span>8.4%</span></div>
                <div styleName="time">投资期限 <span>28天</span></div>
                <div styleName="info">
                    <div styleName="start">100元起</div>
                    <div styleName="start">一次结清</div>
                    <div styleName="amount">可投金额 ¥12000.00</div>
                    <div styleName="number">可投项目 10个</div>
                </div>
                <div styleName="circle">
                    <SVGCircleProgress percent={100 - 20} weight={12}
                        radius={120} bgColor={'#64353f'} progressColor={'#fde143'} />
                    <div styleName="percent">75%</div>
                </div>
            </div>
            <div styleName="invest">投资详情（10个子标）</div>
            <div styleName="records">
                <div styleName="record">
                    <div styleName="title">
                        <span>闪信贷28天项目集001</span>
                        <div styleName="end">已回款</div>
                    </div>
                    <div styleName="item">
                        <span>项目周期</span>
                        <span>28天</span>
                    </div>
                    <div styleName="item">
                        <span>预期年化收益率</span>
                        <span styleName="bold">0.4%</span>
                    </div>
                    <div styleName="item">
                        <span>出借金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>交易时间</span>
                        <span>2017-01-22</span>
                    </div>
                </div>
                <div styleName="record">
                    <div styleName="title">
                        <span>闪信贷28天项目集001</span>
                        <div styleName="end">已回款</div>
                    </div>
                    <div styleName="item">
                        <span>项目周期</span>
                        <span>28天</span>
                    </div>
                    <div styleName="item">
                        <span>预期年化收益率</span>
                        <span styleName="bold">0.4%</span>
                    </div>
                    <div styleName="item">
                        <span>出借金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>交易时间</span>
                        <span>2017-01-22</span>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default itemCollection
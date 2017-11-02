import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../components'

import styles from '../css/credit.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Credit extends React.Component {

    _STEPS = ['register', 'idVerify', 'liveVerify', 'setBankCard', 'emc', 'msp']

    _STEPS_NAME = {
        'register': '注册',
        'idVerify': '身份验证',
        'liveVerify': '实景验证',
        'setBankCard': '绑定银行卡',
        'emc': '紧急联系人',
        'msp': '手机运营商'
    }

    state = {
        lastStep: 'setBankCard',
        lastStepStatus: 'waiting',
    }

    toNextHandler = () => { }

    render() {
        const { lastStep, lastStepStatus } = this.state,
            lastStepIndex = this._STEPS.indexOf(lastStep),
            lastStepText = this._STEPS_NAME[lastStep],
            nextStepText = this._STEPS_NAME[this._STEPS[lastStepIndex + 1]];

        return <div styleName="container">

            <Header title="授信评估" history={this.props.history} />

            <div styleName="step-container">
                { this._STEPS.map((step, i) => {
                    let styleName;
                    if (i < lastStepIndex) styleName = `step-${i}-success`
                    if (i == lastStepIndex) styleName = lastStepStatus == 'success' ? `step-${index}-success` : `step-${lastStepStatus}`
                    if (i > lastStepIndex) styleName = `step-${i}`

                    return <div key={step} styleName={styleName}
                        style={{ color: i <= lastStepIndex ? '#555' : '#bbb' }}>
                        {this._STEPS_NAME[step]}
                    </div>
                })}
            </div>

            <div styleName="next-btn">{nextStepText}</div>

            <div styleName="next-step-tip" onClick={this.toNextHandler}>30秒之后自动跳转到{nextStepText}页面</div>
        </div>
    }
}


export default Credit
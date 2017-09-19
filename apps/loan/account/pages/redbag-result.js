import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import styles from '../css/redbag-result.css'
import { NativeBridge } from '../../lib/helpers'

@inject('redbag')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class RedBagResult extends React.Component {
    componentDidMount() {
        document.title = '提现结果'
        NativeBridge.trigger('cancel_refresh')
        // 如果没有拿到结果, 回到上一页
        // if (redbag.withdrawResult.success === null)
        //     history.goBack()
    }
    closeHandler = () => {
        let { history } = this.props
        history.goBack() // 回到红包首页
    }
    render() {
        let { redbag, history } = this.props
        let { withdrawResult } = this.props.redbag

        let success_panel = withdrawResult.success && <div styleName="wrap-box">
            <div styleName="success-icon">
                <img src={require("../images/success-icon.png")} /></div>
            <div styleName="loan-result1">
                <div styleName="icon1"></div>
                <div styleName="icon1-info">提现请求成功，等待银行处理</div>
                <div styleName="time1">{redbag.applyTimeStr}</div>
                <div styleName="line"></div>
                <div styleName="waiting-result">
                    <div styleName="icon2"></div>
                    <div styleName="icon2-info">预计1-3个工作日到账</div>
                </div>
            </div>
        </div>

        let fail_panel = withdrawResult.reason && <div>
            <div styleName="wrap-box">
                <div styleName="fail-icon">
                    <img src={require("../images/fail-icon.png")} /></div>
                <div styleName="loan-result4">
                    <div styleName="waiting-result">
                        <div styleName="icon5"></div>
                        <div styleName="icon5-info">提现失败！</div>
                        <div styleName="icon5-info-btm">{withdrawResult.reason}</div>
                    </div>
                </div>
            </div>
            <div styleName="customer-service">
                <div styleName="service-wrap">
                    <img src={require("../images/phone.png")} />有问题请联系客服：
                                <a href="tel:400-102-0066">400-102-0066</a></div>
            </div>
        </div>

        return <div>
            <Header title="提现结果" history={history} enable={'force'} />
            <div styleName="result-wrap">
                {success_panel}{fail_panel}
            </div>
            <div styleName="btn-wrap">
                <div styleName="credit-btn" onClick={this.closeHandler}>关闭</div>
            </div>
        </div>
    }
}

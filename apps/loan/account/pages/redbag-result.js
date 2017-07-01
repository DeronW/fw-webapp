import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import styles from '../css/redbag-result.css'

@inject('redbag')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class RedBagResult extends React.Component {
    closeHandler = () => {
        let { history } = this.props
        history.goBack() // 回到红包首页
    }
    render() {
        let { redbag, history } = this.props
        return (
            <div>
                <Header title="提现结果" history={history} />
                {redbag.applyTimeStr && <div styleName="waiting-result-box">
                    <div styleName="wrap-box">
                        <div styleName="success-icon"><img src={require("../images/success-icon.png")} /></div>
                        <div styleName="loan-result1">
                            <div styleName="icon1"></div>
                            <div styleName="icon1-info">提现请求成功，等待银行处理</div>
                            <div styleName="time1">{redbag.applyTimeStr}</div>
                            <div styleName="line"></div>
                            <div styleName="waiting-result">
                                <div styleName="icon2"></div>
                                <div styleName="icon2-info">预计到账时间</div>
                                <div styleName="time2">{redbag.preAccountTimeStr}</div>
                            </div>
                        </div>
                    </div>
                </div>}
                {redbag.failReason && <div styleName="fail-result-box">
                        <div styleName="wrap-box">
                            <div styleName="fail-icon"><img src={require("../images/fail-icon.png")} /></div>
                            <div styleName="loan-result4">
                                <div styleName="waiting-result">
                                    <div styleName="icon5"></div>
                                    <div styleName="icon5-info">提现失败</div>
                                    <div styleName="icon5-info-btm">{redbag.failReason}</div>
                                </div>
                            </div>
                        </div>
                        <div styleName="customer-service">
                            <div styleName="service-wrap"><img src={require("../images/phone.png")} />如有问题请致电：<a
                                href="tel:400-102-0066">400-102-0066</a></div>
                        </div>
                </div>}
                <div styleName="btn-wrap">
                    <div styleName="credit-btn" onClick={this.closeHandler}>关闭</div>
                </div>
            </div>
        )
    }
}

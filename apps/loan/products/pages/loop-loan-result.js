import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loop-loan-result.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanResult extends React.Component {
    componentDidMount(){
        document.title = '借款结果';
    }
    render(){
        let { history } = this.props;
        return (
            <div styleName="cnt-container">
                <Header title="借款结果" history={history} />
                <div styleName="success-result-box dis">
                    <div styleName="wrap-box">
                        <div styleName="success-icon"><img styleName="img-size" src={require("../images/loop-loan-result/success.png")} /></div>
                        <div styleName="loan-result3">
                            <div styleName="icon1"></div>
                            <div styleName="icon1-info">申请成功</div>
                            <div styleName="line"></div>
                            <div styleName="success-result-for-other">
                                <div styleName="icon3"></div>
                                <div styleName="icon3-info">
                                    <div styleName="icon3-info-top">已打款至</div>
                                    <div styleName="icon3-info-btm">
                                        银行卡
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div styleName="btn">查看订单</div>
                </div>
                <div styleName="fail-result-box">
                    <div styleName="wrap-box">
                        <div styleName="fail-icon"><img styleName="img-size" src={require("../images/loop-loan-result/fail.png")} /></div>
                        <div styleName="loan-result3">
                            <div styleName="icon1"></div>
                            <div styleName="icon1-info">申请成功</div>
                            <div styleName="line"></div>
                            <div styleName="success-result-for-other">
                                <div styleName="icon5"></div>
                                <div styleName="icon3-info">
                                    <div styleName="icon3-info-top">借款失败</div>
                                    <div styleName="icon3-info-btm">
                                        银行卡
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div styleName="btn">重新借款</div>
                </div>

                <div styleName="customer-service">
                    <div styleName="service-wrap"><img src={require("../images/loop-loan-result/phone.png")}/>如有问题请致电：<a
                        href="tel:400-102-0066">400-102-0066</a></div>
                </div>
            </div>
        )

    }
}


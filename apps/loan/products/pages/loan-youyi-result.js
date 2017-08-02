import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loan-youyi-result.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanResult extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        document.title = '借款结果';
    }
    loanAgainHandler = () => {
        this.props.history.push('/loan-youyi-index');
    }
    checkOrderHandler = () => {
        location.href = `/static/loan/account/index.html#/repayment-youyi?loanUuid=${this.props.loopLoan.loanUuid}`;
    }
    render(){
        let { history, loopLoan } = this.props;
        return (
            <div styleName="cnt-container">
                <Header title="借款结果" history={history}/>
                {loopLoan.loanStatus == 0 && <div styleName="checking-result-box">
                    <div styleName="wrap-box">
                        <div styleName="success-icon"><img styleName="img-size" src={require("../images/loan-youyi-result/success.png")} /></div>
                        <div styleName="loan-result3">
                            <div styleName="icon1"></div>
                            <div styleName="icon1-info">申请成功</div>
                            <div styleName="line"></div>
                            <div styleName="success-result-for-other">
                                <div styleName="icon3"></div>
                                <div styleName="icon3-info">
                                    <div styleName="icon3-info-top">稍后短信通知您借款结果</div>
                                    <div styleName="icon3-info-btm">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {loopLoan.loanStatus == 1 && <div styleName="success-result-box">
                    <div styleName="wrap-box">
                        <div styleName="success-icon"><img styleName="img-size" src={require("../images/loan-youyi-result/success.png")} /></div>
                        <div styleName="loan-result3">
                            <div styleName="icon1"></div>
                            <div styleName="icon1-info">申请成功</div>
                            <div styleName="line"></div>
                            <div styleName="success-result-for-other">
                                <div styleName="icon3"></div>
                                <div styleName="icon3-info">
                                    <div styleName="icon3-info-top">借款成功</div>
                                    <div styleName="icon3-info-btm">
                                        请关注您{loopLoan.bankName}尾号（{loopLoan.bankCardNo.slice(-4)}）的入账情况
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div styleName="btn" onClick={this.checkOrderHandler}>查看订单</div>
                </div>}
                {loopLoan.loanStatus == 2 && <div styleName="fail-result-box">
                    <div styleName="wrap-box">
                        <div styleName="fail-icon"><img styleName="img-size" src={require("../images/loan-youyi-result/fail.png")} /></div>
                        <div styleName="loan-result3">
                            <div styleName="icon1"></div>
                            <div styleName="icon1-info">申请成功</div>
                            <div styleName="line"></div>
                            <div styleName="success-result-for-other">
                                <div styleName="icon5"></div>
                                <div styleName="icon3-info">
                                    <div styleName="icon3-info-top">借款失败</div>
                                    <div styleName="icon3-info-btm">
                                        请重新尝试借款
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div styleName="btn" onClick={this.loanAgainHandler}>重新借款</div>
                </div>}

                <div styleName="customer-service">
                    <div styleName="service-wrap"><img src={require("../images/loan-youyi-result/phone.png")}/>如有问题请致电：<a
                        href="tel:400-102-0066">400-102-0066</a></div>
                </div>
            </div>
        )

    }
}


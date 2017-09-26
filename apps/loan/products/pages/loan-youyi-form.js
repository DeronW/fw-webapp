import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loan-youyi-form.css'
import { Storage, NativeBridge, Browser } from '../../lib/helpers'
import { showBlueAlert } from '../../lib/components'

@inject('loopLoan')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanLoan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            smsValue: "",
            checked: true,
            mask1Show: false,
            mask2Show: false,
            mask3Show: false,
            remain: 0,
            show: false
        }
    }

    componentDidMount() {
        document.title = '借款';
        this.props.loopLoan.check_cardinfo();
        this.props.loopLoan.get_baseinfo();
    }

    resetCalculateTimer = () => {
        this.props.loopLoan.loan_calculate(this.state.value);
    }

    resetValidateTimer = () => {
        let { loopLoan } = this.props;
        clearTimeout(this._validate_timer);
        this._validate_timer = setTimeout(() => {
            if (this.state.value > loopLoan.canBorrowAmt) {
                Components.showToast(`您当前最高可借${loopLoan.canBorrowAmt}元`)
            } else if (this.state.value < loopLoan.minLoanAmt) {
                Components.showToast(`最低${loopLoan.minLoanAmt}起借`)
            } else if (this.state.value > loopLoan.minLoanAmt && this.state.value < loopLoan.canBorrowAmt && this.state.value % 100 != 0) {
                Components.showToast('借款金额必须为100的整数倍')
            } else if (this.state.value == "") {
                Components.showToast("请输入借款金额")
            }
        }, 1000)
    }

    validate = () => {
        let { loopLoan } = this.props;
        if (this.state.value > loopLoan.canBorrowAmt) {
            this.resetValidateTimer();
        } else if (this.state.value < loopLoan.minLoanAmt) {
            this.resetValidateTimer();
        } else if (this.state.value == "") {
            this.resetValidateTimer();
        } else if (this.state.value <= loopLoan.canBorrowAmt && this.state.value >= loopLoan.minLoanAmt && this.state.value % 100 == 0) {
            this.resetCalculateTimer();
        }
    }

    changeHandler = (e) => {
        let v = e.target.value;
        if ((v.length > 5) || /\D/.test(v)) return;
        this.setState({ value: v }, this.validate);
    }

    smsValueHandler = (e) => {
        if (e.target.value.length <= 8) {
            this.setState({ smsValue: e.target.value })
        }
    }

    checkHandler = () => {
        this.setState({ checked: !this.state.checked })
    }

    detailShowHandler = () => {
        this.setState({ mask1Show: true })
    }

    detailHideHandler = () => {
        this.setState({ mask1Show: false })
    }

    popupHideHandler = () => {
        this.setState({ mask3Show: false, smsValue: "" })
    }

    overdueShowHandler = () => {
        this.setState({ mask2Show: true })
    }

    overdueHideHandler = () => {
        this.setState({ mask2Show: false })
    }

    countingDown = () => {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({ remain: this.state.remain - 1 });
    }

    tick = () => {
        this.setState({ remain: 60 });
        window.clearInterval(this._timer);
        this._timer = setInterval(this.countingDown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    getSMSCode = () => {
        if (this.state.remain <= 0) {
            this.tick();
            this.props.loopLoan.regetSMSCode();
        }
    }

    confirmHandler = () => {
        let { loopLoan, history } = this.props;
        if (!this.state.checked) {
            Components.showToast("请同意相关协议")
        } else if (this.state.value == '') {
            Components.showToast("请输入借款金额")
        } else if (this.state.value >= loopLoan.minLoanAmt && this.state.value <= loopLoan.canBorrowAmt && this.state.value % 100 == 0) {
            this.props.loopLoan.loan_confirm(this.state.value).catch(e => {
                if ([20005, 20009, 20013, 24003].indexOf(e.code) > -1) {
                    showBlueAlert(e.message).then(() => {
                        Browser.inFXHApp ? NativeBridge.close() : history.push('/')
                    })
                } else {
                    Components.showToast(e.message)
                }
                return new Promise((_, reject) => reject())
            }).then(() => {
                this.setState({ mask3Show: true });
                this.tick();
            });
        }
    }

    loanConfirmHandler = () => {
        if (this.state.smsValue.length >= 4) {
            this.props.loopLoan.check_loanStatus(this.state.smsValue).then(() => {
                this.props.history.push('/loan-youyi-result')
            }, (e) => {
                Components.showToast(e.message)
            });
        }
    }

    closeHandler = () => {
        let { history } = this.props;
        Browser.inFXHApp ? NativeBridge.close() : history.push('/')
    }

    render() {
        let { history, loopLoan } = this.props;
        let item_list = (item, index) => {
            return (
                <div styleName="item-list" key={index}><span styleName="item-left">{item.feeName}</span><span
                    styleName="item-right">{item.feeAmout}元</span></div>
            )
        };

        let validate_term = this.state.value >= loopLoan.minLoanAmt && this.state.value <= loopLoan.canBorrowAmt && this.state.value % 100 == 0;
        return (
            <div styleName="cnt-container">
                <Header title="借款" history={history} />
                <div styleName="loan-container">
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">借多少</div>
                        <div styleName="loan-num-wrap">
                            <input styleName={Browser.inIOS ? "input-num-ios" : "input-num-android"} type="number"
                                value={this.state.value}
                                placeholder={"最多可借" + loopLoan.canBorrowAmt + "元"} onChange={this.changeHandler} />
                        </div>

                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">到账金额</div>
                        <div
                            styleName={validate_term ? "loan-info-right has-input" : "loan-info-right has-not-input"}>{validate_term ? loopLoan.accountInAmount : 0}</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">应还金额</div>
                        <div
                            styleName={validate_term ? "loan-info-right has-input" : "loan-info-right has-not-input"}>{validate_term ? loopLoan.shouldRepaymentAmount : 0}</div>
                    </div>
                    <div styleName={this.state.value ? "loan-info-item-without-border" : "loan-info-item"}>
                        <div styleName="loan-info-title">总费用{validate_term &&
                            <span styleName="tip" onClick={this.detailShowHandler}></span>}</div>
                        <div
                            styleName={validate_term ? "loan-info-right has-input" : "loan-info-right has-not-input"}>{validate_term ? loopLoan.totalFeeAmount : 0}</div>
                    </div>
                    {validate_term && <div styleName="overdue-wrap"><div styleName="overdue-tip">
                        请按时还款，避免<span styleName="overdue-btn" onClick={this.overdueShowHandler}>逾期费用</span>
                    </div></div>}
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">打款至</div>
                        <div styleName="loan-bank-info">{loopLoan.bankName}({loopLoan.bankCardNo.slice(-4)})</div>
                    </div>
                </div>
                <div styleName="agreement-issue">
                    <div styleName={this.state.checked ? "checked-box" : "unchecked-box"}
                        onClick={this.checkHandler}></div>
                    <div styleName="check-item">同意<a
                        href="/static/loan/products/index.html#/protocols/youyi-loan-service">《借款服务协议》</a>、<a
                            // href="/static/loan/products/index.html#/protocols/youyi-loan">《借款合同》</a>、<a
                            href="/static/loan/products/index.html#/protocols/youyi-repayment">《委托扣款授权书》</a>、<a
                                href="/static/loan/products/index.html#/protocols/youyi-repayment-service">《数字证书服务协议》</a>
                    </div>
                </div>
                <div styleName="btn-container">
                    <div styleName="btn-tip">可提前还款或部分还款，免手续费</div>
                    <div
                        styleName={validate_term && this.state.checked ? "btn purple" : "btn gray"}
                        onClick={this.confirmHandler}>确定
                    </div>
                </div>
                {this.state.mask1Show && <div styleName="mask1">
                    <div styleName="detail-pop">
                        <div styleName="close-icon" onClick={this.detailHideHandler}></div>
                        <div styleName="item-title">借款费用详情</div>
                        <div styleName="item-wrap">
                            {loopLoan.feeAmoutExts.map(item_list)}
                        </div>
                        <div styleName="know-btn" onClick={this.detailHideHandler}>知道了</div>
                    </div>
                </div>}
                {this.state.mask2Show && validate_term && <div styleName="mask2">
                    <div styleName="notice-pop">
                        <div styleName="notice-title">逾期费用说明</div>
                        {/*<div styleName="close-icon" onClick={this.overdueHideHandler}></div>*/}
                        <div styleName="notice-content">若您未能在还款日当天24点前还清全部费用，平台将每天收取待还本金的{loopLoan.overdueFeeRateStr}作为逾期罚息，直至您还清所有费用。</div>
                        <div styleName="notice-btn" onClick={this.overdueHideHandler}>知道了</div>
                    </div>
                </div>}
                {this.state.mask3Show && <div styleName="mask3">
                    <div styleName="verify-popup">
                        <div styleName="verify-popup-wrap">
                            <div styleName="verify-popup-close" onClick={this.popupHideHandler}></div>
                            <div styleName="verify-popup-title">短信验证</div>
                            <div styleName="verify-popup-tip">
                                已向{loopLoan.mask_phone}发送短信验证码
                            </div>
                            <div styleName="verify-input">
                                <input styleName="sms-input" type="number" name="number"
                                    value={this.state.smsValue} placeholder="输入验证码" onChange={this.smsValueHandler} />
                                <span styleName="btn-countdown" onClick={this.getSMSCode}>
                                    {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                            </div>
                            <div styleName={this.state.smsValue.length >= 4 ? "confirm-btn blue" : "confirm-btn gray"}
                                onClick={this.loanConfirmHandler}>确定
                            </div>
                        </div>
                    </div>
                </div>}
                {this.state.show && <div styleName="err-mask">
                    <div styleName="err-popup">
                        <div styleName="err-popup-tip">{loopLoan.applyErrMsg}</div>
                        <div styleName="err-popup-btn" onClick={this.closeHandler}>知道了</div>
                    </div>
                </div>}
            </div>
        )
    }
}

import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Utils, Components } from 'fw-javascripts'

import { Header } from '../../lib/components'

import styles from '../css/repayment-youyi.css'


@inject('account', 'repayment_youyi')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Repayment extends React.Component {

    state = {
        amountEditDisabled: false,
        showSMSPop: false,
        SMSTimer: 60,
        SMSInput: ''
    }

    componentDidMount() {
        document.title = '还款明细';

        let { repayment_youyi } = this.props;

        repayment_youyi.setLoanId(Utils.hashQuery.id)

        repayment_youyi.resetAmount();

        repayment_youyi.fetchRepaymentInfo().then(data => {
            if (repayment_youyi.unpaidAmount < 200)
                this.setState({ amountEditDisabled: true })
        })

    }

    componentWillUnmount() {
        this.clearSMSTimer();
    }

    handleInput = e => {
        let { repayment_youyi } = this.props,
            v = e.target.value;
        v = v.replace(/[^\d|\.]/g, '');

        if (v - repayment_youyi.unpaidAmount > 0) v = repayment_youyi.unpaidAmount
        repayment_youyi.setAmount(v);
    }

    handleSubmit = () => {
        let { repayment_youyi, history } = this.props,
            repaymentAmount = repayment_youyi.repaymentAmount,
            unpaidAmount = repayment_youyi.unpaidAmount;
        if (repaymentAmount === '') return Components.showToast('请输入还款金额')
        if (repaymentAmount < 100) return Components.showToast('还款金额不能小于100')
        if (unpaidAmount - repaymentAmount < 100 && unpaidAmount - repaymentAmount > 0) return Components.showToast('剩余金额不能小于100')

        repayment_youyi.submitRepayment().then(repaymentUuid => {
            this.SMSTimerController();
            setTimeout(() => this.setState({ showSMSPop: true }), 1000);
        })
    }

    getSMS = () => {
        let ableToGetSMS = this.state.SMSTimer === 60;
        if (!ableToGetSMS) return

        let { repayment_youyi } = this.props;
        repayment_youyi.getSMS().then(data => {
            Components.showToast('验证码已发送');
            this.SMSTimerController();
        });
    }

    SMSTimerController = () => {
        this._sms_timer = setInterval(() => {
            if (this.state.SMSTimer <= 1) return this.clearSMSTimer()
            this.setState({ SMSTimer: this.state.SMSTimer - 1 })
        }, 1000)
    }

    clearSMSTimer = () => {
        this.setState({ SMSTimer: 60 });
        if (this._sms_timer) clearInterval(this._sms_timer);
    }

    handleSMSInput = e => {
        this.setState({ SMSInput: e.target.value.replace(/\D/, '') })
    }

    handleConfirm = () => {
        let { history, repayment_youyi } = this.props,
            { SMSInput } = this.state;
        if (SMSInput.length < 4) return
        repayment_youyi.confirmRepayment(history, SMSInput);
    }

    hideSMSPop = () => {
        this.setState({ SMSInput: '', showSMSPop: false });
        this.clearSMSTimer();
    }

    render() {
        let { history, repayment_youyi, account } = this.props,
            { amountEditDisabled, showSMSPop, SMSTimer, SMSInput } = this.state,
            amountEditItem;

        if (amountEditDisabled) {
            amountEditItem = <div styleName="info-item">
                <div styleName="item-name">还款金额</div>
                <div styleName="item-value">{repayment_youyi.repaymentAmount}</div>
            </div>
        } else {
            amountEditItem = <div styleName="repayment-input-item">
                <input styleName="repayment-input"
                    type="num"
                    placeholder="请输入还款金额"
                    value={repayment_youyi.repaymentAmount}
                    onChange={this.handleInput} />
                <div styleName="pay-off-btn"
                    onClick={() => { repayment_youyi.setAmount(repayment_youyi.unpaidAmount) }}>全部还清</div>
            </div>
        }

        let SMSPop = <div styleName="pop-mask">
            <div styleName="pop">
                <div styleName="pop-close"
                    onClick={this.hideSMSPop}></div>
                <div styleName="pop-title">短信验证码</div>
                <div styleName="pop-info">已向您银行卡预留手机号发送验证码</div>
                <div styleName="sms-input">
                    <input type="num" value={SMSInput} maxLength="8" onChange={this.handleSMSInput} />
                    <div styleName="sms-btn" onClick={this.getSMS}>
                        {SMSTimer === 60 ? "重新获取" : `${SMSTimer}s`}
                    </div>
                </div>
                <div styleName="pop-submit"
                    style={{ "background": SMSInput.length > 3 ? "#6aa4f0" : "#eee" }}
                    onClick={this.handleConfirm}>
                    确定</div>
            </div>
        </div>

        return (
            <div styleName="cnt-container">

                <Header title="还款明细" history={history} />

                <div styleName="banner">
                    <img src={repayment_youyi.logoUrl}></img>
                    优易借</div>

                <div styleName="amount-overview">
                    <div styleName="amount-payable">
                        <div styleName="amount-num">{repayment_youyi.unpaidAmount}</div>
                        <div styleName="amount-name">待还金额(元)</div>
                    </div>
                    <div styleName="amount-overdue">
                        <div styleName="amount-num">{repayment_youyi.overdueAmount}</div>
                        <div styleName="amount-name">逾期费(元)</div>
                    </div>
                </div>

                <div styleName="repayment-info">
                    <div styleName="info-item">
                        <div styleName="item-name">还款日</div>
                        <div styleName="item-value">{repayment_youyi.dueDate}</div>
                    </div>
                    <div styleName="info-item">
                        <div styleName="item-name">已还金额</div>
                        { repayment_youyi.paidAmount == 0 ?
                            <div styleName="item-value">{repayment_youyi.paidAmount}</div>
                            :
                            <a styleName="item-value" href={`/static/loan/account/index.html#/repayment-youyi-records?id=${repayment_youyi.loopLoanUuid}`}>{repayment_youyi.paidAmount}</a>
                        }
                    </div>
                </div>

                <div styleName="repayment-info left-space-4-btn">
                    <div styleName="info-item">
                        <div styleName="item-name">选择银行卡</div>
                        <div styleName="item-value">{`${repayment_youyi.bank}(${repayment_youyi.cardNo})`}</div>
                    </div>
                    {amountEditItem}
                </div>

                <div styleName="submit-btn-container">
                    {repayment_youyi.unpaidAmount != 0  && <a styleName="submit-btn"
                        onClick={this.handleSubmit}>
                        立即还款
                    </a>}
                    {repayment_youyi.unpaidAmount == 0  && <a styleName="waiting-btn">
                        还款中
                    </a>}
                </div>


                {showSMSPop && SMSPop}
            </div>
        )
    }

}

export default Repayment

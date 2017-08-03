import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Utils, Components } from 'fw-javascripts'

import { Header } from '../../lib/components'

import styles from '../css/repayment-youyi.css'


@inject('account', 'repayment_youyi', 'repayment_result')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Repayment extends React.Component {

    state = {
        protocolChecked: true,
        amountEditDisabled: false,
        showSMSPop: false,
        SMSTimer: 60,
        SMSInput: ''
    }

    componentDidMount() {
        document.title = '还款详情';

        let { repayment_youyi } = this.props;

        repayment_youyi.setLoanId(Utils.hashQuery.id)

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
        repayment_youyi.setAmount(v);
    }

    toggleProtocol = () => this.setState({ protocolChecked: !this.state.protocolChecked })

    handleSubmit = () => {
        if (!this.state.protocolChecked) return

        let { repayment_youyi, repayment_result, history } = this.props,
            repaymentAmount = repayment_youyi.repaymentAmount,
            unpaidAmount = repayment_youyi.unpaidAmount;
        if (repaymentAmount === '') return Components.showToast('请输入还款金额')
        if (repaymentAmount < 100) return Components.showToast('还款金额不能小于100')
        if (unpaidAmount - repaymentAmount < 100 && unpaidAmount - repaymentAmount > 0) return Components.showToast('剩余金额不能小于100')

        if (unpaidAmount - repaymentAmount < 0) repayment_youyi.setAmount(unpaidAmount);

        repayment_youyi.submitRepayment().then(repaymentUuid => {
            this.setState({ showSMSPop: true });
            this.SMSTimerController();

            repayment_result.setUidAndProduct(repaymentUuid, 'youyi');
        })
    }

    getSMS = () => {
        let ableToGetSMS = this.state.getSMSTimer === 60;
        if (!ableToGetSMS) return

        let { repayment_youyi } = this.props;
        repayment_youyi.getSMS().then(data => {
            Components.showToast('验证码已发送');
            this.setState({ SMSToken: data.codeToken });
            this.SMSTimerController();
        });
    }

    SMSTimerController = () => {
        this._sms_timer = setInterval(() => {
            if (this.state.SMSTimer <= 1) {
                clearInterval(this._sms_timer);
                return this.setState({ SMSTimer: 60 })
            }
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

    render() {
        let { history, repayment_youyi, account } = this.props,
            { protocolChecked, amountEditDisabled, showSMSPop, SMSTimer, SMSInput } = this.state,
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
                    onClick={() => { this.setState({ showSMSPop: false }); this.clearSMSTimer() }}></div>
                <div styleName="pop-title">短信验证码</div>
                <div styleName="pop-info">已向{account.mask_phone}发送验证码</div>
                <div styleName="sms-input">
                    <input type="num" value={SMSInput} onChange={this.handleSMSInput} />
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
                    <img src={require('../images/repayment-youyi/logo.png')}></img>
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
                        <a styleName="item-value" href="/static/loan/account/index.html#/repayment-youyi-records">{repayment_youyi.paidAmount}</a>
                    </div>
                </div>

                <div styleName="repayment-info">
                    <div styleName="info-item">
                        <div styleName="item-name">选择银行卡</div>
                        <div styleName="item-value">{`${repayment_youyi.bank}(${repayment_youyi.cardNo})`}</div>
                    </div>
                    {amountEditItem}
                </div>

                {/* <div className={protocolChecked ? styles['checked-protocol'] : styles['unchecked-protocol']}
                    onClick={this.toggleProtocol}>
                    同意
                    <a href="/static/loan/products/index.html#/protocols/youyi-repayment">《委托扣款授权书（还款）》</a>、
                    <a href="/static/loan/products/index.html#/protocols/youyi-repayment-service">《委托扣款授权书（支付服务费）》</a>
                </div> */}

                <div styleName="submit-btn-container">
                    <a styleName="submit-btn"
                        onClick={this.handleSubmit}>
                        立即还款
                    </a>
                </div>

                {showSMSPop && SMSPop}
            </div>
        )
    }

}

export default Repayment

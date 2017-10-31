import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../components'

import styles from '../css/loan-apply.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class LoanApply extends React.Component {

    state = {
        amountGot: '480.00',
        amountLoan: '500.00',
        interest: '20.00',
        serviceFee: '10.00',
        bank: '招商银行',
        card: '8412',
        amountToPay: '510.00',
        dueDate: '2017-08-24 20:34:43',
        agreementChecked: true,
    }

    render() {
        const { amountGot, amountLoan, interest, serviceFee, bank, card, amountToPay, dueDate, agreementChecked } = this.state;

        return <div styleName="container">
            <Header title="确认信息" history={this.props.history} />

            <div styleName="amount-got">
                <span>{amountGot}</span> <br/>
                到账金额(元)
            </div>

            <div styleName="info-item-grp">
                <div styleName="info-item">
                    <div styleName="item-name">借入金额(元)</div>
                    <div styleName="item-value">{amountLoan}</div>
                </div>
                <div styleName="info-item">
                    <div styleName="item-name">利息(元)</div>
                    <div styleName="item-value">{interest}</div>
                </div>
                <div styleName="info-item">
                    <div styleName="item-name">手续费(元)</div>
                    <div styleName="item-value">{serviceFee}</div>
                </div>
                <div styleName="info-item">
                    <div styleName="item-name">提现卡</div>
                    <div styleName="item-value">{`${bank}(${card})`}</div>
                </div>
            </div>

            <div styleName="info-item-grp">
                <div styleName="info-item">
                    <div styleName="item-name">应还金额(元)</div>
                    <div styleName="item-value">{amountToPay}</div>
                </div>
                <div styleName="info-item">
                    <div styleName="item-name">到期时间</div>
                    <div styleName="item-value">{dueDate}</div>
                </div>
            </div>

            <div styleName="loan-tip">
                请按时还款，避免产生<span>逾期费用</span>。违约或预期将会记录到银行的信用报告中
            </div>

            <div styleName="agreement">
                <i styleName={agreementChecked ? "checked" : "unchecked"}
                    onClick={this.toggleAgreementCheck} />
                同意<span>《现金大师服务协议》</span>
            </div>

            <div styleName="apply-btn">立即借款</div>
        </div>
    }
}


export default LoanApply
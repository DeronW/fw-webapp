import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Utils, Components } from 'fw-javascripts'

import { Header } from '../../lib/components'

import styles from '../css/repayment-youyi.css'


@inject('repayment_youyi')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Repayment extends React.Component {

    state = { amountEditDisabled: false }

    componentDidMount() {
        document.title = '还款详情';

        let { repayment_youyi, bank_card, history } = this.props,
            loanId = Utils.urlQuery.loanId;

        repayment_youyi.setLoanId(loanId);

        repayment_youyi.fetchRepaymentInfo().then(data => {
            if (repayment_youyi.unpaidAmount < 200) this.setState({ amountEditDisabled: true })
        });
    }

    handleInput = e => {
        let { repayment_youyi } = this.props,
            v = e.target.value;
        v = v.replace(/[^\d|\.]/g, '');
        repayment_youyi.setAmount(v);
    }

    handleSubmit = () => {
        let { repayment_youyi, history } = this.props,
            repaymentAmount = repayment_youyi.repaymentAmount,
            unpaidAmount = repayment_youyi.unpaidAmount;
        if (repaymentAmount === '') return Components.showToast('请输入还款金额')
        if (repaymentAmount < 100) return Components.showToast('还款金额不能小于100')
        if (unpaidAmount - repaymentAmount < 100 && unpaidAmount - repaymentAmount > 0) return Components.showToast('剩余金额不能小于100')

        if (unpaidAmount - repaymentAmount < 0) repayment_youyi.setAmount(unpaidAmount);
    }

    render() {
        let { history, repayment_youyi } = this.props,
            { amountEditDisabled } = this.state,
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
                    onClick={() => { repayment_youyi.setAmount(repayment_youyi.unpaidAmount)} }>全部还清</div>
            </div>
        }

        return (
            <div styleName="cnt-container">

                <Header title="还款明细" history={history} />

                <div styleName="banner">
                    <img src={require('../images/repayment-fxh/ue.png')}></img>
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
                        <a styleName="item-value">{repayment_youyi.paidAmount}</a>
                    </div>
                </div>

                <div styleName="repayment-info">
                    <div styleName="info-item">
                        <div styleName="item-name">选择银行卡</div>
                        <div styleName="item-value">{`${repayment_youyi.bank}(${repayment_youyi.cardNo})`}</div>
                    </div>
                    { amountEditItem }
                </div>

                <div styleName="checked-protocol">
                    同意<span>《委托扣款授权书（还款）》、《委托扣款授权书（支付服务费）》</span>
                </div>

                <div styleName="submit-btn-container">
                    <a styleName="submit-btn"
                        onClick={this.handleSubmit}>
                        立即还款
                    </a>
                </div>
            </div>
        )
    }

}

export default Repayment

import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../lib/components'
import styles from '../css/repayment-fangxin.css'

@inject("repayment_fangxin")
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class RepaymentFangXin extends React.Component {

    componentDidMount() {
        document.title = "还款明细";
        let { repayment_fangxin } = this.props;
        repayment_fangxin.repaymentHandler();
    }

    inputAmountHandler = () => (e) => {
        let { repayment_fangxin } = this.props;
        repayment_fangxin.setLoanAmount(e.target.value)
    }

    allAmountHandler = (value) => () => {
        let { repayment_fangxin } = this.props;
        repayment_fangxin.setLoanAmount(value)
    }
    
    render() {
        let { history, repayment_fangxin } = this.props;
        return <div styleName="repayment">
            <Header title="还款明细" history={history} />
            <div styleName="banner">
                <img src={repayment_fangxin.logo} alt="" />
                <span>优易借</span>
            </div>
            <div styleName="amount">
                <div styleName="money amountMoney">
                    <div styleName="amountNum">{repayment_fangxin.loanLeftAmount}</div>
                    <div styleName="amountName">待还金额(元)</div>
                </div>
                <div styleName="money amoutLate">
                    <div styleName="amountNum">{repayment_fangxin.overdueFee}</div>
                    <div styleName="amountName">逾期费(元)</div>
                </div>
            </div>
            <div styleName="amountPanel">
                <div styleName="amountItem">
                    <div styleName="itemName">还款日</div>
                    <div styleName="itemTime">{repayment_fangxin.dueTime}</div>
                </div>
                <div styleName="amountItem">
                    <div styleName="itemName">已还金额</div>
                    <div styleName="itemAlready">{repayment_fangxin.repaymentAmount}
                        <img src={require("../images/repayment-fxh/entry.png")} alt="" />
                    </div>
                </div>

            </div>
            <div styleName="amountPanel">
                <div styleName="amountItem">
                    <div styleName="itemName">选择银行卡</div>
                    <div styleName="itemAlready">{`${repayment_fangxin.withdrawBankShortName}(${repayment_fangxin.withdrawCardNo})`}
                        <img src={require("../images/repayment-fxh/entry.png")} alt="" />
                    </div>
                </div>
                <div styleName="amountItem">
                    <input styleName="itemInput" type="number" placeholder="输入还款金额" value={repayment_fangxin.inputAmount} onChange={this.inputAmountHandler()} />
                    <div styleName="itemAll" onClick={this.allAmountHandler(repayment_fangxin.loanLeftAmount)}>全部还清</div>
                </div>
            </div>
            <div styleName="amountBottom">
                <div styleName="submitBtn">立即还款</div>
            </div>
        </div>
    }
}
export default RepaymentFangXin
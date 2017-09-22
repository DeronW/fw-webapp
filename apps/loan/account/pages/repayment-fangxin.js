import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components, Utils } from 'fw-javascripts'

import { NativeBridge } from '../../lib/helpers'
import { Header } from '../../lib/components'
import styles from '../css/repayment-fangxin.css'


@inject("repayment_fangxin")
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class RepaymentFangXin extends React.Component {
    state = {
        remain: 0,
        show: false,
        code: ''
    }
    componentDidMount() {
        document.title = "还款明细";
        let { repayment_fangxin } = this.props;

        repayment_fangxin.setLoanGid(Utils.hashQuery.id);

        repayment_fangxin.fetchRepaymentInfo()
        repayment_fangxin.setLoanAmount('');
    }

    verifyHandler() {
        let { repayment_fangxin } = this.props;
        let { inputAmount } = this.props.repayment_fangxin.data;

        let rf = repayment_fangxin, err;

        if (rf.loanLeftAmount > 0 && rf.loanLeftAmount < 200) {
            rf.setLoanAmount(rf.loanLeftAmount);
            return !err
        }
        if (!inputAmount && rf.loanLeftAmount >= 200) {
            err = "请输入还款金额"
        }
        if ((rf.loanLeftAmount - inputAmount) > 0 && (rf.loanLeftAmount - inputAmount) < 100) {
            err = "剩余金额不能小于100"
        }
        if (inputAmount < 100) {
            err = "还款金额不能小于100"
        }
        if (rf.cardType == 1) {
            err = "信用卡暂不支持还款"
        }
        err && Components.showToast(err)
        return !err
    }

    verifySMSHandler = () => {
        if (this.verifyHandler()) {
            this.setState({ show: true });
            this.getSMSCode();
        }
    }

    inputAmountHandler = () => (e) => {
        let { repayment_fangxin } = this.props;
        let v = e.target.value;
        if (/\..{3}/.test(v)) return;
        if (v.split(".")[0].length > 7) return;

        if (v - repayment_fangxin.loanLeftAmount > 0) v = repayment_fangxin.loanLeftAmount
        repayment_fangxin.setLoanAmount(v)
    }

    allAmountHandler = (value) => () => {
        let { repayment_fangxin } = this.props;
        repayment_fangxin.setLoanAmount(value)
    }

    closePopHandler = () => {
        this.setState({ show: false, remain: 0, code:'' })
        clearInterval(this._timer)
    }
    chooseBank = () => {
        let { history } = this.props;
        history.push("/repayment-bank-card")
    }

    changeValueHandler = e => {
        this.setState({ code: e.target.value });
    }

    gotoRecord = () => {
        let { repayment_fangxin,history } = this.props;
        history.push(`/repayment-fangxin-records?repaymentUuid=${repayment_fangxin.repaymentUuid}`)
    }

    countingDown = () => {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({ remain: this.state.remain - 1 });
    }

    getSMSCode = () => {
        let { repayment_fangxin } = this.props;
        if (this.state.remain <= 0) {
            this.setState({ remain: 60 });
            window.clearInterval(this._timer);
            this._timer = setInterval(this.countingDown, 1000);
            repayment_fangxin.resendverifycode().then((data) => {
                Components.showToast(data.retCode == 1 ? '发送成功' : "发送失败")
            }, e => Components.Toast(e.message));
        }
    }
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    confirmBtnHandler = () => {
        let { repayment_fangxin, history } = this.props;

        let { code } = this.state;
        if (code == '') {
            Components.showToast("请输入验证码");
        } else {
            repayment_fangxin.confirmHandler(code).then(repaymentGid => {
                history.push(`/repayment-fangxin-result?id=${repaymentGid}`)
            });
        }
    }
    render() {
        let { history, repayment_fangxin } = this.props;
        let { inputAmount } = this.props.repayment_fangxin.data;
        let { remain, show, code } = this.state;

        let smsMask = <div styleName="mask">
            <div styleName="verify-popup">
                <div styleName="verify-popup-wrap">
                    <div styleName="verify-popup-close" onClick={this.closePopHandler}></div>
                    <div styleName="verify-popup-title">短信验证</div>
                    <div styleName="verify-popup-tip">
                        已向{repayment_fangxin.chosenBank || repayment_fangxin.withdrawBankShortName}(尾号{repayment_fangxin.chosenCardNo || repayment_fangxin.withdrawCardNo})预留的手机号发送短信验证码
                    </div>
                    <div styleName="verify-input">
                        <input styleName="sms-input" type="number" name="number" value={code}
                            placeholder="输入验证码" onChange={this.changeValueHandler} />
                        <span styleName="btn-countdown" onClick={this.getSMSCode}>
                            {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                    </div>
                    <div styleName="btn-list">
                        <div styleName="cancel-btn" onClick={this.closePopHandler}>取消</div>
                        <div styleName="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                    </div>
                </div>
            </div>
        </div>
        let m = repayment_fangxin.repaymentAmount;
        return <div styleName="repayment">
            <div styleName="repaymentBox">
                <Header title="还款明细" history={history} />
                <div styleName="banner">
                    <img src={repayment_fangxin.logo} alt="" />
                    <span>放心花</span>
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
                        <div styleName="itemTime">{repayment_fangxin.dueTimeStr}</div>
                    </div>
                    <div styleName="amountItem amountNoBorder">
                        <div styleName="itemName">已还金额</div>
                        {
                            m > 0 ? <div styleName="itemAlready" onClick={this.gotoRecord}><span>{m}</span>
                                <img src={require("../images/repayment-fangxin/entry.png")} alt="" />
                            </div> : <div styleName="itemAlready"><span>{m}</span></div>
                        }
                    </div>

                </div>
                <div styleName="amountPanel">
                    <div styleName="amountItem">
                        <div styleName="itemName">选择银行卡</div>
                        <div styleName="itemAlready" onClick={() => this.chooseBank()}>
                            <span>{`${repayment_fangxin.chosenBank || repayment_fangxin.withdrawBankShortName}(${repayment_fangxin.chosenCardNo || repayment_fangxin.withdrawCardNo})`}</span>
                            <img src={require("../images/repayment-fangxin/entry.png")} alt="" />
                        </div>
                    </div>
                    {repayment_fangxin.loanLeftAmount < 200 ?
                        <div styleName="amountItem amountNoBorder">
                            <div styleName="itemName">还款金额</div>
                            <div styleName="itemAlready">{repayment_fangxin.loanLeftAmount}</div>
                        </div> :
                        <div styleName="amountInput">
                            <input styleName="itemInput" type="number" placeholder="输入还款金额" value={inputAmount} onChange={this.inputAmountHandler()} />
                            <div styleName="itemAll" onClick={this.allAmountHandler(repayment_fangxin.loanLeftAmount)}>全部还清</div>
                        </div>
                    }

                </div>
            </div>
            <div styleName="amountBottom">
                <div styleName="submitBtn" onClick={this.verifySMSHandler}>立即还款</div>
            </div>
            {show && smsMask}
        </div>
    }
}
export default RepaymentFangXin

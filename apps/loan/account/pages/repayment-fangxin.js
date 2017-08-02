import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import { NativeBridge } from '../../lib/helpers'
import { Header } from '../../lib/components'
import styles from '../css/repayment-fangxin.css'


@inject("repayment_fangxin", "repayment_result")
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
        repayment_fangxin.repaymentHandler();
    }

    get verifyHandler() {
        let { repayment_fangxin } = this.props;
        let rf = repayment_fangxin;
        if (!rf.inputAmount) return Components.showToast("请输入还款金额");
        if ((rf.inputAmount - rf.loanLeftAmount) > 0) return repayment_fangxin.setLoanAmount(rf.loanLeftAmount)
        if ((rf.loanLeftAmount - rf.inputAmount) > 0 && (rf.loanLeftAmount - rf.inputAmount) < 100) return Components.showToast("剩余金额不能小于100");
        if (rf.inputAmount < 100) return Components.showToast("还款金额不能小于100");
        if (repayment_fangxin.cardType == 1) {
            return Components.showToast("信用卡暂不支持还款");
        }
        return true
    }

    verifySMSHandler = () => {
        if (this.verifyHandler) {
            this.setState({ show: true });
        }
    }

    inputAmountHandler = () => (e) => {
        let { repayment_fangxin } = this.props;
        let v = e.target.value;
        if (/\..{3}/.test(v)) return;
        if (v.split(".")[0].length > 7) return;
        repayment_fangxin.setLoanAmount(v)
    }

    allAmountHandler = (value) => () => {
        let { repayment_fangxin } = this.props;
        repayment_fangxin.setLoanAmount(value)
    }

    closePopHandler = () => {
        this.setState({ show: false })
    }
    chooseBank = () => {
        let { history } = this.props;
        history.push("/repayment-bank-card")
    }

    changeValueHandler = e => {
        this.setState({ code: e.target.value });
    }
    
    gotoRecord = () => {
        NativeBridge.goto(`https://m.easyloan888.com/static/loan/repayment-record/index.html?repaymentUuid${this.repaymentUuid}`,true)
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
                Components.showToast(data.retCode == 1 ?'发送成功':"发送失败")
            }, e => Components.Toast(e.message));
        }
    }
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    confirmBtnHandler = () => {
        let { repayment_fangxin, repayment_result,history } = this.props;
        let { code } = this.state;
        if (code == '') {
            Components.showToast("请输入验证码");
        } else {
            repayment_fangxin.confirmHandler(code).then(repaymentGid => {
                repayment_result.setUidAndProduct(repaymentGid, "fangxin")
            })
            setTimeout(()=>{
                history.push("/repayment-result")
            },800)
        }
    }
    render() {
        let { history, repayment_fangxin } = this.props;
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

        return <div styleName="repayment">
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
                    <div styleName="itemTime">{repayment_fangxin.dueTime}</div>
                </div>
                <div styleName="amountItem">
                    <div styleName="itemName">已还金额</div>
                    <div styleName="itemAlready" onClick={this.gotoRecord}>{repayment_fangxin.repaymentAmount}
                        <img src={require("../images/repayment-fangxin/entry.png")} alt="" />
                    </div>
                </div>

            </div>
            <div styleName="amountPanel">
                <div styleName="amountItem">
                    <div styleName="itemName">选择银行卡</div>
                    <div styleName="itemAlready" onClick={() => this.chooseBank()}>{`${repayment_fangxin.chosenBank || repayment_fangxin.withdrawBankShortName}(${repayment_fangxin.chosenCardNo || repayment_fangxin.withdrawCardNo})`}
                        <img src={require("../images/repayment-fangxin/entry.png")} alt="" />
                    </div>
                </div>
                {repayment_fangxin.loanLeftAmount < 200 ?
                    <div styleName="amountItem">
                        <div styleName="itemName">还款金额</div>
                        <div styleName="itemAlready">{repayment_fangxin.loanLeftAmount}</div>
                    </div> : 
                    <div styleName="amountItem">
                        <input styleName="itemInput" type="number" placeholder="输入还款金额" value={repayment_fangxin.inputAmount} onChange={this.inputAmountHandler()} />
                        <div styleName="itemAll" onClick={this.allAmountHandler(repayment_fangxin.loanLeftAmount)}>全部还清</div>
                    </div>
                }

            </div>
            <div styleName="amountBottom">
                <div styleName="submitBtn" onClick={() => this.verifySMSHandler()}>立即还款</div>
            </div>
            {show && smsMask}
        </div>
    }
}
export default RepaymentFangXin
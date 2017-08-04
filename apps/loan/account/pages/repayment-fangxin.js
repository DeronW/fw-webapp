import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components, Utils } from 'fw-javascripts'

import { NativeBridge, Storage, Browser } from '../../lib/helpers'
import { Header } from '../../lib/components'
import styles from '../css/repayment-fangxin.css'

@inject('repayment_fangxin')
@observer
@CSSModules(styles, { allowMultiple: true })
class RepaymentFangXinResult extends React.Component {

    componentDidMount() {
        document.title = '还款结果';
        this.props.repayment_fangxin.fetchRepaymentInfo();
    }

    render() {
        let { history, repayment_fangxin } = this.props,
            { repaymentAmountNow, leftAmount, repaymentResult } = repayment_fangxin,
            { loanGid } = repayment_fangxin.data;

        let USER = Storage.getUserDict();

        let sourceType;
        let jrgc_ios = Browser.inIOSApp;
        let jrgc_android = Browser.inAndroidApp;
        let jrgc_weixin = Browser.inWeixin;
        let jrgc_wap = Browser.inMobile;
        let jrgc_web = !Browser.inMobile;

        if (jrgc_ios) sourceType = 1;
        if (jrgc_android) sourceType = 2;
        if (jrgc_wap) sourceType = 3;
        if (jrgc_weixin) sourceType = 4;
        if (jrgc_web) sourceType = 5;

        let fangxin_home_link = '/static/loan/fxh/index.html',
            repayment_fangxin_link = `/static/loan/account/index.html#/repayment-fangxin?id=${loanGid}`;

        let paidOff = <div>
            <div styleName="result-container success"></div>
            <div styleName="info">本次成功还款{repaymentAmountNow}元
                    <br />
                恭喜您已还清全部借款，请保持良好的信用
                </div>
            <a styleName="btn" href={fangxin_home_link}>再借一笔</a>
        </div>

        let stillLeft = <div>
            <div styleName="result-container success"></div>
            <div styleName="info">
                还有 <span>{leftAmount}</span> 元未还，请记得按时还款<br />
                还款金额： {repaymentAmountNow}元
            </div>
            <a styleName="credit-btn" href={`/api/credit/v1/creditlist.shtml?sourceType=${sourceType}&token=${USER.token}&uid=${USER.uid}`}>
                提升额度</a>
            <a styleName="apply-btn" href={fangxin_home_link}>申请用钱</a>
        </div>

        let fail = <div>
            <div styleName="result-container fail"> </div>
            <div styleName="info">请检查网络原因，本次还款失败</div>
            <div styleName="payback-customer-service"><img src={require("../images/repayment-fangxin-result/phone.png")} />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
            <a styleName="btn" href={repayment_fangxin_link}>查看订单</a>
        </div>

        let waiting = <div>
            <div styleName="result-container waiting"></div>
            <div styleName="info">
                <div styleName="payback-result-ing-tip">稍后可到账单页面<br />查看具体还款结果</div>
                <div styleName="payback-customer-service"><img src={require("../images/repayment-fangxin-result/phone.png")} />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
            </div>
            <a styleName="btn" href={repayment_fangxin_link}>查看订单</a>
        </div>

        return <div styleName="cnt-container">
            <Header title="还款结果" history={history} />

            {repaymentResult == 'success' && leftAmount == 0 && paidOff}
            {repaymentResult == 'success' && leftAmount != 0 && stillLeft}
            {repaymentResult == 'fail' && fail}
            {repaymentResult == 'waiting' && waiting}
        </div>
    }
}

@inject("repayment_fangxin")
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class RepaymentFangXin extends React.Component {
    state = {
        remain: 0,
        show: false,
        code: '',
        showResult: false
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

        let rf = repayment_fangxin;
        if (rf.loanLeftAmount > 0 && rf.loanLeftAmount < 200) {
            return rf.setLoanAmount(rf.loanLeftAmount)
        }

        if (!inputAmount && rf.loanLeftAmount >= 200) {
            return Components.showToast("请输入还款金额");
        }

        if ((inputAmount - rf.loanLeftAmount) > 0) return rf.setLoanAmount(rf.loanLeftAmount)
        if ((rf.loanLeftAmount - inputAmount) > 0 && (rf.loanLeftAmount - inputAmount) < 100) return Components.showToast("剩余金额不能小于100");
        if (inputAmount < 100) return Components.showToast("还款金额不能小于100");
        if (rf.cardType == 1) {
            return Components.showToast("信用卡暂不支持还款");
        }
        return true
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
        let { repayment_fangxin } = this.props;
        location.href = `https://m.easyloan888.com/static/loan/repayment-record/index.html?repaymentUuid=${repayment_fangxin.repaymentUuid}`
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
            this.setState({ show: false, showResult: true });
        }
    }
    render() {
        let { history, repayment_fangxin } = this.props;
        let { inputAmount } = this.props.repayment_fangxin.data;
        let { remain, show, code, showResult } = this.state;
        let m = repayment_fangxin.repaymentAmount;

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
                        <span styleName="btn-countdown">
                            {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                    </div>
                    <div styleName="btn-list">
                        <div styleName="cancel-btn" onClick={this.closePopHandler}>取消</div>
                        <div styleName="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                    </div>
                </div>
            </div>
        </div>


        let repaymentDetail = <div><div styleName="repaymentBox">
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
                    {
                        m > 0 ? <div styleName="itemAlready" onClick={this.gotoRecord}>{m}
                            <img src={require("../images/repayment-fangxin/entry.png")} alt="" />
                        </div> : <div styleName="itemAlready">{m}</div>
                    }
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
                        <input styleName="itemInput" type="number" placeholder="输入还款金额" value={inputAmount} onChange={this.inputAmountHandler()} />
                        <div styleName="itemAll" onClick={this.allAmountHandler(repayment_fangxin.loanLeftAmount)}>全部还清</div>
                    </div>
                }

            </div>
        </div>
            <div styleName="amountBottom">
                <div styleName="submitBtn" onClick={() => this.verifySMSHandler()}>立即还款</div>
            </div>
        </div>
        return <div styleName="repayment">
            {!showResult && repaymentDetail}
            {showResult && <RepaymentFangXinResult />}
            {show && smsMask}
        </div>
    }
}
export default RepaymentFangXin

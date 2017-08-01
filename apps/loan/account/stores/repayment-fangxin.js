import { extendObservable } from 'mobx'
import { Utils, Components } from 'fw-javascripts'

export default class RepaymentFangXin {
    constructor(Post) {
        this.Post = Post;
        extendObservable(this, {
            logo: '',//logo url
            loanLeftAmount: 0,//待还金额
            overdueFee: 0,//逾期费
            dueTime: '',//还款日期
            repaymentAmount: 0,//已还金额
            withdrawBankShortName: '',//提现银行卡
            withdrawCardNo: null,//银行卡号
            inputAmount: "",
            orderGid: null,
            cardGid: '',
            cardType: '',
            chosenBank: '', // 选择的银行卡银行名称
            chosenCardNo: '', // 选择的银行卡卡号
            repaymentGid:null,
            loanGid: Utils.urlQuery.loanGid,
        })
    }

    repaymentHandler = () => {
        this.Post('/api/repayment/v1/loandetail.json', {
            loanGid: this.loanGid
        }).then(data => {
            this.logo = data.productLogo;
            this.loanLeftAmount = data.loanLeftAmount;
            this.overdueFee = data.overdueFee || 0;
            this.dueTime = new Date(data.dueTime).toLocaleDateString();
            this.repaymentAmount = data.repaymentAmount;
            this.withdrawBankShortName = data.withdrawBankShortName;
            this.withdrawCardNo = data.withdrawCardNo.slice(-4);
        })
    }

    chooseCard = (gid, type, name, no) => {
        this.cardGid = gid;
        this.cardType = type;
        this.chosenBank = name;
        this.chosenCardNo = no;
    }

    paybackHandler = () => {
        if (this.cardType == 1) {
            Components.showToast("信用卡暂不支持还款");
        }
        this.Post(`/api/repayment/v1/checksmsverifycode.json`, {
            repaymentAmount: this.inputAmount,
            loanGid: this.loanGid,
            cardGid: this.cardGid
        }).then(date => {
            this.orderGid = date.orderGid;
        }, e => Components.showToast(e.message))
    }
    resendverifycode = ()=>{
        
    }
    confirmHandler = (code) => {
        alert(code)
        this.Post('/api/repayment/v1/do.json', {
            orderGid: this.orderGid,
            verifyCode: code
        }).then(data => {
            this.repaymentGid = data.repaymentGid;
        }, e => Components.showToast(e.message)
            );
    }

    setLoanAmount = (value) => this.inputAmount = value
}

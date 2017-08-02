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
            repaymentGid: null,
            loanGid: null,
        })
    }

    setLoanId = id => this.loanGid = id;

    chooseCard = (gid, type, name, no) => {
        this.cardGid = gid;
        this.cardType = type;
        this.chosenBank = name;
        this.chosenCardNo = no;
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
        }).then(() => this.Post("/api/bankcard/v1/bankcardlist.json"))
          .then(data => {
            let card = data.userBankList.withdrawBankcard.filter((item, index) => {
                return item.isRealNameBindCard == true
            });
            this.withdrawBankShortName = card[0].bankShortName;
            this.withdrawCardNo = card[0].cardNo.slice(-4)
          })
    }

    resendverifycode = () => {
        return this.Post(`/api/repayment/v1/checksmsverifycode.json`, {
            repaymentAmount: this.inputAmount,
            loanGid: this.loanGid,
            cardGid: this.cardGid
        }).then(data => {
            this.orderGid = data.orderGid;
        }, e => Components.showToast(e.message))
          .then(() => this.Post('/api/repayment/v1/resendverifycode.json', {
            orderGid: this.orderGid
          }))
    }

    confirmHandler = (code) => {
        return this.Post('/api/repayment/v1/do.json', {
            orderGid: this.orderGid,
            verifyCode: code
        }).then(data => {
            return data.repaymentGid;
        }, e => Components.showToast(e.message));
    }

    setLoanAmount = (value) => this.inputAmount = value
}

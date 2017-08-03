import { extendObservable } from 'mobx'
import { Components } from 'fw-javascripts'

export default class RepaymentFangXin {
    constructor(Post) {
        this.Post = Post

        this.data = {}

        extendObservable(this.data, {
            loanGid: '',
            inputAmount: "",
        })

        extendObservable(this, {
            logo: '', //logo url
            loanLeftAmount: null, //待还金额
            overdueFee: null, //逾期费
            dueTime: '', //还款日期
            repaymentAmount: 0, //已还金额
            withdrawBankShortName: '', //提现银行卡
            withdrawCardNo: null, //银行卡号
            repaymentUuid: null,
            defaultCardGid:null,
            orderGid: null,
            cardGid: '',
            cardType: '',
            chosenBank: '', // 选择的银行卡银行名称
            chosenCardNo: '', // 选择的银行卡卡号
            repaymentGid: null,
        })
    }

    setLoanGid = id => this.data.loanGid = id;

    setLoanAmount = (value) => this.data.inputAmount = value

    chooseCard = (gid, type, name, no) => {
        this.cardGid = gid;
        this.cardType = type;
        this.chosenBank = name;
        this.chosenCardNo = no;
    }

    fetchRepaymentInfo = () => {
        this.Post('/api/repayment/v1/loandetail.json', {
                loanGid: this.data.loanGid
            }).then(data => {
                this.logo = data.productLogo;
                this.loanLeftAmount = data.loanLeftAmount;
                this.overdueFee = data.overdueFee || 0;
                this.dueTime = new Date(data.dueTime).toLocaleDateString();
                this.repaymentAmount = data.repaymentAmount;
                this.repaymentUuid = data.repaymentUuid;
            }).then(() => this.Post("/api/bankcard/v1/bankcardlist.json"))
            .then(data => {
                let card = data.userBankList.withdrawBankcard.filter((item, index) => {
                    return item.isRealNameBindCard == true
                });
                this.withdrawBankShortName = card[0].bankShortName;
                this.withdrawCardNo = card[0].cardNo.slice(-4)
                this.defaultCardGid = card[0].cardGid;
            })
    }

    resendverifycode = () => {
        return this.Post(`/api/repayment/v1/checksmsverifycode.json`, {
                repaymentAmount: this.data.inputAmount,
                loanGid: this.data.loanGid,
                cardGid: this.cardGid || this.defaultCardGid
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
}

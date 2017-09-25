import { extendObservable } from 'mobx'
import { Components } from 'fw-javascripts'

export default class RepaymentFangXin {
    constructor(Post) {
        this.Post = Post

        this.data = {}

        extendObservable(this.data, {
            loanGid: '',
            inputAmount: "",
            // records: [], // 还款记录
        })

        extendObservable(this, {
            logo: '', //logo url
            loanLeftAmount: null, //待还金额
            overdueFee: null, //逾期费
            dueTimeStr: '', //还款日期
            repaymentAmount: 0, //已还金额
            withdrawBankShortName: '', //提现银行卡
            withdrawCardNo: '', //银行卡号
            repaymentUuid: null,
            defaultCardGid: null,
            orderGid: null,
            cardGid: '',
            cardType: '',
            chosenBank: '', // 选择的银行卡银行名称
            chosenCardNo: '', // 选择的银行卡卡号
            repaymentResult: '', // 'fail', 'success', 'waiting'
            leftAmount: '', // 还款成功后仍剩余金额
            repaymentAmountNow: 0,
        })
    }

    setLoanGid = id => {
        this.data.loanGid = id;
    }


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
                this.loanLeftAmount = data.loanLeftAmountStr;
                this.overdueFee = data.overdueFeeStr || 0;
                this.dueTimeStr = data.dueTimeStr;
                this.repaymentAmount = data.repaymentAmountStr;
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
            return data.repaymentGid
        }, e => Components.showToast(e.message));
    }

    fetchRepaymentResult = (gid) => {
        return this.Post('/api/repayment/v1/repaymentstatus.json', {
            repaymentGid: gid
        }).then(data => {
            let { loanLeftAmount, repaymentAmount, status, activityRecomUrl } = data;
            this.status = status;
            this.leftAmount = loanLeftAmount;
            this.repaymentAmountNow = repaymentAmount;
            this.activityRecomUrl = activityRecomUrl;
            if (status == 0) {
                this.repaymentResult = 'waiting'
            } else if (status == 1) {
                this.repaymentResult = 'success'
            } else if (status == 2) {
                this.repaymentResult = 'fail'
            }
        })
    }
}

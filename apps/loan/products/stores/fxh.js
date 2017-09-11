import { extendObservable} from 'mobx'
import { Utils } from 'fw-javascripts'

export default class Fxh{
    constructor(Post){
        this.Post = Post
        extendObservable(this, {
            data:[],
            sliderNum:'',
            cashBankList:[],
            bankName:"",
            bankNo:"",
            baseRateDay:"",
            baseRateDayStr:"",
            productPeriod:"",
            orderGid:"",
            accountInAmount:"",
            shouldRepaymentAmount:"",
            dueTimeStr:"",
            totalFeeAmount:"",
            feeExtList:[],
            latedescription:""
        })
    }
    saveOrderGid = orderGid => this.orderGid = orderGid;
    // saveOrioleOrderGid = orioleOrderGid => this.orioleOrderGid = orioleOrderGid;
    saveLoanNum = loanNum => this.loanNum = loanNum;

    get_base_info = () => {
        return this.Post(`/api/loan/v1/tryLoanBudget.json`,{orioleOrderGid: this.data.orioleOrderGid,loanAmount: this.loanNum})
        .then(data => {
            this.accountInAmount = data.accountInAmount;
            this.shouldRepaymentAmount = data.shouldRepaymentAmount;
            this.dueTimeStr = data.dueTimeStr;
            this.totalFeeAmount = data.totalFeeAmount;
            this.feeExtList = data.feeExtList;
        }).then(() => {
                this.Post(`/api/bankcard/v1/bankcardlist.json`).then(data => {
                this.cashBankList = data.userBankList.withdrawBankcard;
                let filtered = this.cashBankList.filter(e => e.isRealNameBindCard === true);
                if(filtered[0]){
                    this.bankName = filtered[0].bankShortName;
                    this.bankNo = filtered[0].cardNo.slice(-4);
                }
            })
        }).then(() => {
                this.Post(`/api/repayment/v1/latedescription.json`).then(data => {
                    this.latedescription = data.latedescription;
                })
        })
    }


    get_info = () => {
        return this.Post(`/api/loan/v1/baseinfo.json`,{productId:1}).then(data => {
            this.baseRateDay = data.baseRateDay;
            this.baseRateDayStr = data.baseRateDayStr;
            this.productPeriod = data.productPeriod;
        }).then(() => {
            this.Post(`/api/bankcard/v1/bankcardlist.json`).then(data => {
                this.cashBankList = data.userBankList.withdrawBankcard;
                let filtered = this.cashBankList.filter((item, index) => {
                    return item.isRealNameBindCard == true
                });
                if(filtered[0]){
                    this.bankName = filtered[0].bankShortName;
                    this.bankNo = filtered[0].cardNo.slice(-4);
                    this.defaultCardGid = filtered[0].cardGid;
                }
            })
        })
    }
    getVerifyCode = () => {
        console.log(this.orderGid);
        return this.Post(`/api/loan/v1/sendSmsverifycode.json`,{orderGid: this.orioleOrderGid})
    }

    watchSliderNum = (num) => {
        this.sliderNum = num;
    }


    getBaseInfo = () => {
        this.Post(`/api/loan/v1/baseinfo.json`,{
            productId: Utils.urlQuery.pid || 1
        }).then((data)=>{
            this.data = data
        })
    }






}

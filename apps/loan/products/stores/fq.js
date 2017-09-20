import { extendObservable, computed } from 'mobx'
import { Components, Utils } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'


export default class Fq {
    constructor(Post) {
        this.Post = Post
        extendObservable(this, {
            product:null,
            borrowStatus:null,
            canStatus:null,
            canMessage:null,
            loanUuid:null,
            failMsg:null,
            pid:Utils.hashQuery.pid,
            productLogo:null,
            productName:null,
            amountStr:null,
            monthRateStr:null,
            termRangeStr:null,
            fastLoanValue:null,
            productLabelList:[],
            loanRateStr:null,
            serviceRateStr:null,
            commRateStr:null
        })

    }

    get_base_info = () => {
        return this.Post(`/api/product/v1/productDetail.json`,{productId:this.pid})
        .then(data=>{
            this.productLogo = data.productLogo;
            this.productName = data.productName;
            this.amountStr = data.amountStr;
            this.monthRateStr = data.monthRateStr;
            this.termRangeStr = data.termRangeStr;
            this.fastLoanValue = data.fastLoanValue;
            this.productLabelList = data.productLabelList;
            this.loanRateStr = data.loanRateStr;
            this.serviceRateStr = data.serviceRateStr;
            this.commRateStr = data.commRateStr;
        }).then(()=>{
            return this.Post(`/api/loan/v1/baseinfo.json`,{productId:this.pid})
        }).then(data=>{
            this.borrowStatus = data.borrowStatus
        }).then(()=>{
            return this.Post(`/api/loan/v1/dmStatus.json`)
        }).then(data=>{
            this.canStatus = data.canStatus;
            this.canMessage = data.canMessage;
            this.loanUuid = data.loanUuid;
        },e => {
            this.failMsg = e.message;
            this.errCode = e.code
        })
    }

}


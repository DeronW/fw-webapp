import { extendObservable, computed } from 'mobx'
import * as $FW from 'fw-components'
import { Components, Utils } from 'fw-javascripts'

export default class Details {
    constructor(Post) {
        this.Post = Post
        extendObservable(this, {
            context: {
                avgLoanPeriod: null,//平均起息时间
                bookValidPeriod: null,//预约有效期
                id: null,//预约标id
                loadRate: null,//利率
                minAmt: null,//最小预约额
                repayPeriod: null,//期限
            },
            records: [

            ],
            pageData: {
                pageNo: 1,
                pageSize: 4,
                totalCount: 20
            },
            accountAmount: null,//可用余额
            isRisk: 0,//是不是进行风险评估：0-为评估 1-已评估
            batchMaxmum: 0,//批量投资限额
            reserveMoney: '',//用户输入的预约金额
            isChecked: true
        })
    }

    reserveHandler = () => {
        this.Post('/api/invest/v1/entryReserve.json', { applyInvestClaimId: Utils.hashQuery.applyInvestClaimId })
            .then(data => {
                this.context = data.appointClaim;
                this.accountAmount = data.accountAmount;
                this.isRisk = data.isRisk;
                this.batchMaxmum = data.batchMaxmum
            })
        this.Post('/api/invest/v1/reserveList.json', { page: this.page, pageSize: this.pageSize })
            .then(data => {
                this.pageData = data.pageData;
                this.records = data.result
            })
    }

    submitHandler = () => {
         this.Post('/api/invest/v1/entryReserve.json',{applyAmt:this.reserveMoney,applyInvestClaimId:this.context.id})
            .then(data => {
                
            })
        }
    setFormData = (field, value) => {
        this[field] = value
    }

}
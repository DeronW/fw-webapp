import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class Reserve {
    constructor(Post) {
        this.Post = Post
        extendObservable(this, {
            context: {
                avgLoanPeriod: '',//平均起息时间
                bookValidPeriod: null,//预约有效期
                id: null,//预约标id
                loadRate: '',//利率
                minAmt: '',//最小预约额
                repayPeriod: '',//期限
            },
            records: [],//记录的列表
            records_page_no: 1,
            accountAmount: 88888,//可用余额
            isRisk: 0,//是不是进行风险评估：0-为评估 1-已评估
            batchMaxmum: 0,//批量投资限额
            reserveMoney: '',//用户输入的预约金额
            isChecked: true
        })
    }

    getDataHandler = () => {
        this.Post('/api/invest/v1/entryReserve.json', {applyInvestClaimId: Utils.hashQuery.applyInvestClaimId})
            .then(data => {
                this.context = data.appointClaim;
                this.accountAmount = data.accountAmount;
                this.isRisk = data.isRisk;
                this.batchMaxmum = data.batchMaxmum
                this.minAmt = data.appointClaim.minAmt
                this.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            })
    }
    getReserveList = (done) => {
        if (this.records_page_no === 0) return done && done();

        const PAGE_SIZE = 10

        this.Post('/api/invest/v1/reserveList.json', {
            page: this.records_page_no,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.records.push(...data.result)
            this.records_page_no++

            if(this.records.length >= data.pageData.totalCount)
                this.records_page_no = 0

            done && done();
        })
    }

    submitReserveHandler = () => {
        return this.Post('/api/invest/v1/reserveApply.json', {
            applyAmt: this.reserveMoney,
            applyInvestClaimId: this.context.id
        })
    }

    cancelHandler = (id) => {
        return this.Post('/api/invest/v1/cancleReserve.json', {
            applyId: id
        })
    }

    setFormData = (field, value) => {
        this[field] = value
    }
}
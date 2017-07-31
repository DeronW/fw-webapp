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
            isChecked: true,
            applyInvestClaimId: Utils.hashQuery.applyInvestClaimId
        })
    }

    getDataHandler = () => {
        this.Post('/api/v1/intoAppointPage.shtml', {applyInvestClaimId: this.applyInvestClaimId})
            .then(data => {
                console.log(data)
                this.context = data.appointClaim;
                this.accountAmount = data.accountAmount;
                this.isRisk = data.isRisk;
                this.batchMaxmum = data.batchMaxmum
                this.minAmt = data.appointClaim.minAmt
                this.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            })
    }

    getReserveList = (done, reset) => {
        if (reset) {
            this.records_page_no = 1
            this.records = []
        }
        console.log(this.records_page_no)
        if (this.records_page_no === 0) return done && done();

        const PAGE_SIZE = 10

        this.Post('/api/v1/appointRecordList.shtml', {
            page: this.records_page_no,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.records.push(...data.pageData.result)
            this.records_page_no++

            if (this.records.length >= data.pageData.pagination.totalCount)
                this.records_page_no = 0

            done && done();
        })
    }

    submitReserveHandler = () => {
        return this.Post('/api/v1/investAppoint.shtml', {
            applyAmt: this.reserveMoney,
            applyInvestClaimId: this.context.id
        })
    }

    cancelHandler = (id) => {
        return this.Post('/api/v1/cancelAppoint.shtml', {
            applyId: id
        })
    }

    setFormData = (field, value) => {
        this[field] = value
    }
}
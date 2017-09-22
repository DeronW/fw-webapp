import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class Reserve {
    constructor(Post) {
        this.Post = Post

        this.data = {}

        extendObservable(this.data, {
            records: {
                type:'0',
                tab:{
                    '0':{name:'预约中',page_no:1,list:[]},
                    '1':{name:'预约结束',page_no:1,list:[]},
                    '2':{name:'已取消',page_no:1,list:[]},
                }
            }

        })

        extendObservable(this, {
            context: {
                avgLoanPeriod: '',//平均起息时间
                bookValidPeriod: null,//预约有效期
                id: null,//预约标id
                loadRate: '',//利率
                minAmt: '',//最小预约额
                repayPeriod: '',//期限
            },
            accountAmount: null,//可用余额
            isRisk: 0,//是不是进行风险评估：0-为评估 1-已评估
            batchMaxmum: 0,//批量投资限额
            reserveMoney: '',//用户输入的预约金额
            isChecked: true,
            contractMsg: '',
            isCompany: null
        })
    }

    @computed get applyInvestClaimId() {
        return Utils.hashQuery.applyInvestClaimId
    }

    fetchProduct = () => {
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            this.context = data.appointClaim;
            this.accountAmount = data.accountAmount;
            this.isRisk = data.isRisk;
            this.batchMaxmum = data.batchMaxmum
            this.minAmt = data.appointClaim.minAmt
            this.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            this.isCompany = data.isCompany
            return {
                isRisk: this.isRisk,
                batchMaxmum: this.batchMaxmum,
                isCompany: this.isCompany
            }
        })
    }
    setCurrentStatus = status => {
        this.data.records.type = status;
        this.getReserveList()
    }
    getReserveList = (done) => {
        let { tab,type } = this.data.records,current_tab = tab[type]
        if (current_tab.page_no === 0) return done && done();
        const PAGE_SIZE = 10

        this.Post('/api/v1/appointRecordList.shtml', {
            page: current_tab.page_no,
            pageSize: PAGE_SIZE,
            status: type
        }).then(data => {
            current_tab.list.push(...data.pageData.result)

            current_tab.page_no < data.pageData.pagination.totalCount ?
            current_tab.page_no++ :
            current_tab.page_no = 0;

            done && done();
        })

    }

    submitReserveHandler = () => {
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then((data) => {
            return this.Post('/api/v1/investAppoint.shtml', {
                applyAmt: this.reserveMoney,
                applyInvestClaimId: this.context.id,
                bookInvestToken: data.bookInvestToken
            })
        })
    }

    cancelHandler = (id) => {
        return this.Post('/api/v1/cancelAppoint.shtml', {
            applyId: id
        })
    }

    getContractHandler = () => {
        return this.Post('/api/v1/appointContractMess.shtml').then(data => {
            this.contractMsg = data.contractMsg
            return {
                contractMsg: this.contractMsg
            }
        })
    }

    setFormData = (field, value) => {
        this[field] = value
    }
}
import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class Reserve {
    constructor(Post) {
        this.Post = Post
        this.novice_bid_data = {}
        this.others_bid_data = {}
        extendObservable(this.others_bid_data, {
            records: {
                type: '0',
                tab: {
                    '0': {name: '预约中', page_no: 1, list: []},
                    '1': {name: '预约结束', page_no: 1, list: []},
                    '2': {name: '已取消', page_no: 1, list: []},
                }
            },
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

        extendObservable(this.novice_bid_data, {
            context: {
                avgLoanPeriod: '',
                bookValidPeriod: null,
                id: null,
                loadRate: '',
                minAmt: '',
                repayPeriod: '',
            },
            accountAmount: null,
            isRisk: 0,
            batchMaxmum: 0,
            reserveMoney: '',
            isChecked: true,
            contractMsg: '',
            isCompany: null
        })
    }

    @computed
    get applyInvestClaimId() {
        return Utils.hashQuery.applyInvestClaimId
    }

    fetchProduct = () => {
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.applyInvestClaimId
        }).then(data => {
            this.others_bid_data.context = data.appointClaim;
            this.others_bid_data.accountAmount = data.accountAmount;
            this.others_bid_data.isRisk = data.isRisk;
            this.others_bid_data.batchMaxmum = data.batchMaxmum
            this.others_bid_data.minAmt = data.appointClaim.minAmt
            this.others_bid_data.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            this.others_bid_data.isCompany = data.isCompany
            return {
                isRisk: this.others_bid_data.isRisk,
                batchMaxmum: this.others_bid_data.batchMaxmum,
                isCompany: this.others_bid_data.isCompany
            }
        })
    }

    resetPageNo = () => {
        let {tab, type} = this.others_bid_data.records, current_tab = tab[type]
        current_tab.page_no = 1
    }
    setRecordsCurrentStatus = status => {
        this.others_bid_data.records.type = status;
        this.getReserveList()
    }

    getReserveList = (done) => {
        let {tab, type} = this.others_bid_data.records, current_tab = tab[type]
        if (current_tab.page_no === 0) return done && done();
        const PAGE_SIZE = 10

        if (current_tab.page_no == 1) current_tab.list.splice(0, current_tab.list.length)
        this.Post('/api/v1/appointRecordList.shtml', {
            page: current_tab.page_no,
            pageSize: PAGE_SIZE,
            status: type
        }, {loading: false}).then(data => {
            current_tab.list.push(...data.pageData.result)

            current_tab.page_no < data.pageData.pagination.totalPage ?
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
                applyAmt: this.others_bid_data.reserveMoney,
                applyInvestClaimId: this.others_bid_data.context.id,
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
            this.others_bid_data.contractMsg = data.contractMsg
            return {
                contractMsg: this.others_bid_data.contractMsg
            }
        })
    }

    setFormData = (field, value) => {
        this[field] = value
    }
}
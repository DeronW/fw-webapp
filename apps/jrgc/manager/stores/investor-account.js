import { extendObservable, computed } from 'mobx'
import { Utils, Components } from 'fw-javascripts'

export default class InvestorAccount {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}
        this.data_zx = {}
        this.data_p2p = {}
        this.data_hj = {}

        extendObservable(this.data_p2p, {
            detail: {
                info: {},
                totalCount: 0,
                type: '0',
                payments: {
                    '0': { pageNo: 1, list: [] },
                    '1': { pageNo: 1, list: [] }
                }
            },
            project: {
                info: {},
                tab: 'Ta的项目',
                totalCount: 0,
                category: '100',
                pageNo: 1,
                records: []
            },
            batch: {
                info: {},
                totalCount: 0,
                pageNo: 1,
                records: [],
            }
        })

        extendObservable(this.data_zx, {
            detail: {
                info: {},
                type: '0',
                totalCount: 0,
                payments: {
                    '0': { pageNo: 1, list: [] },
                    '1': { pageNo: 1, list: [] }
                }
            },
            project: {
                info: {},
                totalCount: 0,
                tab: '100',
                type: 'Ta的项目',
                record: {
                    '100': { name: '未起息', pageNo: 1, records: [] },
                    '3': { name: '回款中', pageNo: 1, records: [] },
                    '4': { name: '已回款', pageNo: 1, records: [] },
                    '': { name: '全部', pageNo: 1, records: [] },
                    '5': { name: '回款中', pageNo: 1, records: [] },
                    '6': { name: '已回款', pageNo: 1, records: [] },
                }
            }
        })
        extendObservable(this.data_hj, {
            info: {},
            type: '0',
            records: {
                '0': { name: "全部", page_no: 1, list: [] },
                '1': { name: '持有中', page_no: 1, list: [] },
                '2': { name: '已到期', page_no: 2, list: [] }
            },
            goldPrice: '',
            amount: {},
            totalCount: 0
        })
        extendObservable(this.data, {
            overview: {},//尊享和微金的款项总览
            detail: {
                info: {},
                totalCount: 0,
                type: '0',
                payments: {
                    '0': { pageNo: 1, list: [] },
                    '1': { pageNo: 1, list: [] }
                }
            },
        })
    }
    //获取客户id
    @computed get custId() {
        return Utils.hashQuery.custId
    }
    //款项总览 尊享和微金
    fetchOverview = (type) => {
        if (type == 'zx') {
            this.Get('/api/finManager/cust/v2/zxOverview.shtml', {
                custId: this.custId
            }).then(data => {
                this.data.overview = data.result
            })
        } else if (type == 'p2p') {
            this.Get('/api/finManager/cust/v2/wjOverview.shtml', {
                custId: this.custId
            }).then(data => {
                this.data.overview = data.result
            })
        }
    }
    //尊享、微金设置回款明细的状态
    setPaymentType = (t) => {
        let { type, payments } = this.data.detail, current_payment = payments[type]
        current_payment.pageNo = 1
        this.data.detail.type = t
        this.fetchPayment()
    }

    //尊享、微金重置回款明细的页码
    resetPaymentPageNo = () => {
        let { type, payments } = this.data.detail, current_payment = payments[type]
        current_payment.pageNo = 1
        this.data.detail.type = '0'
    }
    //尊享、微金他的回款明细
    fetchPayment = (done) => {
        let url = '/api/finManager/cust/v2/zxPayment.shtml'//zx
        if (Utils.hashQuery.type == "p2p") {
            url = '/api/finManager/cust/v2/wjPayment.shtml'
        }
        let { type, payments } = this.data.detail, current_payment = payments[type]
        const PAGE_SIZE = 10
        if (current_payment.pageNo == 0) return done && done()
        if (current_payment.pageNo == 1) current_payment.list.splice(0, current_payment.list.length)
        this.Get(url, {
            custId: this.custId,
            pageNo: current_payment.pageNo,
            pageSize: PAGE_SIZE,
            status: type
        }).then(data => {
            this.data.detail.totalCount = data.pageData.pagination.totalCount
            current_payment.list.push(...data.pageData.result)
            current_payment.pageNo < data.pageData.pagination.totalPage
                ? current_payment.pageNo++
                : current_payment.pageNo = 0
            done && done()
        })
    }

    //TA的尊享-投资(项目)头部信息
    fetchInvestInfoZX = () => {
        this.Get('/api/finManager/cust/v2/zxPrdInvestInfo.shtml', {
            custId: this.custId
        }).then(data => {
            this.data_zx.project.info = data.result
        })
    }

    resetPageNoZX = () => {
        let pro = this.data_zx.project
        pro.record[pro.tab].pageNO = 1
    }
    setTabZX = (t) => {
        let { tab, record, type } = this.data_zx.project
        record[tab].pageNo = 1
        this.data_zx.project.tab = t
        this.fetchProjectZX()
    }
    setTypeZX = (type) => {
        this.data_zx.project.type = type
    }
    //TA的尊享-投资-TA的项目列表
    fetchProjectZX = (done) => {
        let url
        let { tab, record, type } = this.data_zx.project
        if (record[tab].pageNo == 0) return done && done()
        if (record[tab].pageNo == 1) record[tab].records.splice(0, record[tab].records.length)

        if (type == "Ta的项目") {
            url = '/api/finManager/cust/v2/zxPrdInvest.shtml'
        } else if (type == "转入项目") {
            url = '/api/finManager/cust/v2/zxSwitchPrdInvest.shtml'
        }
        this.Get(url, {
            custId: this.custId,
            callStatus: tab,
            flag: tab,
            pageNo: record[tab].pageNo,
            pageSize: 10
        }).then(data => {
            this.data_zx.project.totalCount = data.pageData.pagination.totalCount
            record[tab].records.push(...data.pageData.result)
            record[tab].pageNO > data.pageData.pagination.totalPage ? record[tab].pageNO++ : record[tab].pageNO = 0

            done && done()
        })
    }
    //尊享账户信息页
    fetchAccountZX = () => {
        this.Get('/api/finManager/cust/v2/zxAccount.shtml', {
            custId: this.custId
        }).then(data => {
            this.data_zx.detail.info = data.result
        })
    }



    //TA的微金账户首页
    fetchAccountP2P = () => {
        this.Get('/api/finManager/cust/v2/wjAccount.shtml', {
            custId: this.custId
        }).then(data => {
            this.data_p2p.detail.info = data.result
        })
    }
    //TA的微金-出借（项目）信息
    fetchInvestInfoP2P = () => {
        this.Get('/api/finManager/cust/v2/wjPrdInvestInfo.shtml', {
            custId: this.custId
        }).then(data => {
            this.data_p2p.project.info = data.result
        })
    }
    resetCategoryPageNo = () => {
        this.data_p2p.project.pageNo = 1
    }
    setProjectTabP2P = (tab) => {
        this.data_p2p.project.tab = tab
        this.resetCategoryPageNo()
    }
    setProjectCategoryP2P = (type) => {
        this.data_p2p.project.category = type
        this.resetCategoryPageNo()
    }
    initTabAndCategory = () => {
        this.resetCategoryPageNo()
        this.data_p2p.project.tab = 'Ta的项目'
        this.data_p2p.project.category = '100'
        return this.fetchPrdInvestP2P()
    }
    //TA的微金-TA的项目列表
    fetchPrdInvestP2P = (done) => {
        let { tab, pageNo, category, records } = this.data_p2p.project
        let url
        if (tab == 'Ta的项目') {
            url = '/api/finManager/cust/v2/wjPrdInvest.shtml'
        } else if (tab == '批量项目') {
            url = '/api/finManager/cust/v2/wjBatchPrdInvest.shtml'
        } else {
            url = '/api/finManager/cust/v2/wjSwitchPrdInvest.shtml'
        }
        console.log(url)
        if (pageNo == 0) return done && done()
        if (pageNo == 1) records.splice(0, records.length)
        return this.Get(url, {
            custId: this.custId,
            flag: category,
            callStatus: category,
            pageNo: pageNo,
            pageSize: 10
        }).then(data => {
            this.data_p2p.project.totalCount = data.pageData.pagination.totalCount

            records.push(...data.pageData.result)
            this.data_p2p.project.pageNo < data.pageData.pagination.totalPage
                ? this.data_p2p.project.pageNo++
                : this.data_p2p.project.pageNo = 0
            done && done()
        })
    }
    @computed get colPrdClaimId() {
        return Utils.hashQuery.colPrdClaimId //集合标id
    }
    @computed get batchOrderId() {
        return Utils.hashQuery.batchOrderId //集合订单id
    }
    //TA的微金-批量标详情
    fetchBatchInfo = () => {
        this.Get('/api/finManager/cust/v2/wjBatchInvest.shtml', {
            custId: this.custId,
            colPrdClaimId: this.colPrdClaimId
        }).then(data => {
            this.data_p2p.batch.info = data
        })
    }
    //批量标子标列表
    fetchBatchList = (done) => {
        let { pageNo, records } = this.data_p2p.batch

        if (pageNo == 0) return done && done()
        if (pageNo == 1) records.splice(0, records.length)
        this.Get('/api/finManager/cust/v2/wjChildBatchPrdList.shtml', {
            custId: this.custId,
            batchOrderId: this.batchOrderId,
            colPrdClaimsId: this.colPrdClaimId,
            pageNo: pageNo,
            pageSize: 10
        }).then(data => {
            this.data_p2p.batch.totalCount = data.pageData.pagination.totalCount
            records.push(...data.pageData.result)
            this.data_p2p.batch.pageNo < data.pageData.pagination.totalPage
                ? this.data_p2p.batch.pageNo++
                : this.data_p2p.batch.pageNo = 0
            done && done()
        })
    }
    //黄金账户信息页
    fetchAccountHj = () => {
        this.Get('/api/finManager/cust/v2/goldAccount.shtml', {
            custId: this.custId
        }).then(data => {
            this.data_hj.info = data.result
        })
    }
    //实时金价
    fetchGoldPrice = () => {
        this.Get('/api/finManager/cust/v2/goldPrice.shtml')
            .then(data => {
                this.data_hj.goldPrice = data.goldPrice
            })
    }
    //黄金记录列表和累计黄金
    fetchGoldList = (done) => {
        const PAGE_SIZE = 10
        let { type, records } = this.data_hj, current_record = records[type]
        if (current_record.page_no === 0) return done && done()
        if (current_record.page_no === 1) current_record.list.splice(0, current_record.list.length)
        this.Get('/api/finManager/cust/v2/enjoyGold.shtml', {
            custId: this.custId,
            orderStatusCode: type,
            pageNo: current_record.page_no,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.data_hj.amount = data.userDataInfo
            this.data_hj.totalCount = data.pageData.pagination.totalCount
            current_record.list.push(...data.pageData.result)
            current_record.page_no < data.pageData.pagination.totalPage
                ? current_record.page_no++
                : current_record.page_no = 0
            done && done()
        })
    }

    //重置type
    resetGoldListType = (status) => {
        this.data_hj.type = status
        this.resetGoldListPageNo()
        this.fetchGoldList()
    }
    //重置页码
    resetGoldListPageNo = () => {
        let { type, records } = this.data_hj, current_record = records[type]
        current_record.page_no = 1
    }
}
import {extendObservable} from 'mobx'

export default class InvestorAccount {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}
        extendObservable(this.data, {
            zx: {
                info: {},
                type: '0',
                payments: {
                    '0': {name: '未回', page_no: 1, list: []},
                    '1': {name: '已回', page_no: 1, list: []}
                }
            },
            p2p: {
                info: {}
            },
            hj: {
                info: {},
                type: '0',
                records: {
                    '0': {name: "全部", page_no: 1, list: []},
                    '1': {name: '持有中', page_no: 1, list: []},
                    '2': {name: '已到期', page_no: 2, list: []}
                },
                goldPrice: '',
                amount: {},
                id: null,
                totalCount: null
            }
        })
    }

    //黄金账户信息页
    fetchAccountHj = (custId) => {
        this.Get('/api/finManager/cust/v2/goldAccount.shtml', {
            custId: custId
        }).then(data => {
            this.data.hj.info = data.result
        })
    }
    //实时金价
    fetchGoldPrice = () => {
        this.Get('/api/finManager/cust/v2/goldPrice.shtml')
            .then(data => {
                this.data.hj.goldPrice = data.goldPrice
            })
    }
    //黄金记录列表和累计黄金
    fetchGoldList = (done) => {
        const PAGE_SIZE = 10
        let {type, records, id} = this.data.hj, current_record = records[type]
        if (current_record.page_no === 0) return done && done()
        if (current_record.page_no === 1) current_record.list.splice(0, current_record.list.length)
        this.Get('/api/finManager/cust/v2/enjoyGold.shtml', {
            custId: id,
            orderStatusCode: type,
            pageNo: current_record.page_no,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.data.hj.amount = data.userDataInfo
            this.data.hj.totalCount = data.pageData.pagination.totalCount
            current_record.list.push(...data.pageData.result)
            current_record.page_no < data.pageData.pagination.totalPage
                ? current_record.page_no++
                : current_record.page_no = 0
            done && done()
        })
    }
    //获取客户id
    getCustId = (id) => {
        this.data.hj.id = id
    }
    //重置type
    resetGoldListType = (status) => {
        this.data.hj.type = status
        this.fetchGoldList()
    }
    //重置页码
    resetGoldListPageNo = () => {
        let {type, records} = this.data.hj, current_record = records[type]
        current_record.page_no = 1
    }
    //获取微金账户信息页
    fetchAccountP2P = (custId) => {
        this.Get('/api/finManager/cust/v2/wjAccount.shtml', {
            custId: custId
        }).then(data => {
            this.data.p2p.info = data.result
        })

    }

    //尊享账户信息页
    fetchAccountZX = (custId) => {
        this.Get('/api/finManager/cust/v2/zxAccount.shtml', {
            custId: custId
        }).then(data => {
            this.data.zx.info = data.result
        })
    }
}
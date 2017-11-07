import { extendObservable, computed } from 'mobx'
import { Utils, Components } from 'fw-javascripts'

export default class InvestorCoupon {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}
        this._data = {}

        extendObservable(this._data, {
            category: 'a',
            type: 'f',
            records: [],
            pageNo: ''
        })

        extendObservable(this.data, {
            tab: '1',
            totalCount: 0,
            coupon: {
                '1': {
                    tabName: 'TA的优惠券',
                    type: '0',
                    record: {
                        '0': { name: '返现券', pageNo: 1, records: [] },
                        '1': { name: '返息券', pageNo: 1, records: [] },
                        '2': { name: '返金券', pageNo: 1, records: [] }
                    }
                },
                '2': {
                    tabName: '使用记录',
                    type: '0',
                    record: {
                        '0': { name: '返现券', pageNo: 1, records: [] },
                        '1': { name: '返息券', pageNo: 1, records: [] },
                        '2': { name: '返金券', pageNo: 1, records: [] }
                    }
                },
                '3': {
                    tabName: '过期记录',
                    type: '0',
                    record: {
                        '0': { name: '返现券', pageNo: 1, records: [] },
                        '1': { name: '返息券', pageNo: 1, records: [] },
                        '2': { name: '返金券', pageNo: 1, records: [] }
                    }
                }

            }
        })
    }
    @computed get custId() {
        return Utils.hashQuery.custId
    }
    //TA的优惠券列表 ： 可用优惠券，使用记录，过期记录
    resetPageNo = () => {
        let { tab, coupon } = this.data
        let { type, record } = coupon[tab]
        coupon[tab].record[type].pageNo = 1
    }
    initTabAndType = () => {
        this.data.tab = '1'
        this.data.coupon['1'].type = '0'
        this.resetPageNo()
        return this.fetchCustCoupon()
    }
    setTab = (tab) => {
        this.data.tab = tab
        this.data.coupon[tab].type = '0'
    }
    setType = (type) => {
        let { tab, coupon } = this.data
        coupon[tab].type = type
    }
    fetchCustCoupon = (done) => {
        let { totalCount, tab, coupon } = this.data
        let { type, record } = coupon[tab]
        let { pageNo, records } = record[type]

        if (pageNo == 0) return done && done()
        if (pageNo == 1) record[type].records.splice(0, record[type].records.length)
        return this.Get('/api/finManager/coupon/v2/custCouponList.shtml', {
            couponStatus: tab,
            couponType: type,
            custId: this.custId,
            pageNo: record[type].pageNo,
            pageSize: 10,
        }).then(data => {
            this.data.totalCount = data.pageData.pagination.totalCount
            records.push(...data.pageData.result)
            record[type].pageNo < data.pageData.pagination.totalPage ? record[type].pageNo++ : record[type].pageNo = 0

            done && done()
        })
    }
}
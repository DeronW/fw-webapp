import { extendObservable, computed } from 'mobx'
import { Utils, Components } from 'fw-javascripts'

export default class InvestorCoupon {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}
        extendObservable(this.data, {
            tab: '1',
            totalCount:0,
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
    @computed get custId(){
        return Utils.hashQuery.id
    }
    //TA的优惠券列表 ： 可用优惠券，使用记录，过期记录
    resetPageNo = () => {
        let { tab, coupon } = this.data
        let { ttype, record } = coupon[tab]
        coupon[status].record[type].pageNO = 1
    }
    setTab = (tab) => {
        this.data.tab = tab
    }
    setType = (type) => {
        let { tab, coupon } = this.data
        coupon[tab].type = type
    }
    fetchCustCoupon = (done) => {
        let { totalCount,tab, coupon } = this.data
        let { type, record } = coupon[tab]
        let { pageNO,records } = record

        if( pageNO == 0) return done && done()
        if( pageNO == 1) list = []
        this.Get('/api/finManager/coupon/v2/custCouponList.shtml', {
            couponStatus: tab,
            couponType: type,
            custId:this.custId,
            pageNo:pageNO,
            pageSize:10,
        }).then(data => {
            totalCount = data.pageData.pagination.totalCount
            records.push(...data.pageData.result)
            pageNO > data.pageData.pagination.totalPage ? pageNO++ : pageNO = 0

            done()
        })
    }
}
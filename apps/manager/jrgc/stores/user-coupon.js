import { extendObservable } from 'mobx'

export default class UserCoupon {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}

        extendObservable(this.data, {
            coupon: {
                sum: null,
                type: '1',
                list: {
                    '1': { name: '返现券', pageNo: 1, list: [] },
                    '0': { name: '返息券', pageNo: 1, list: [] },
                    '2': { name: '返金券', pageNo: 1, list: [] },
                },
                status: 1
            },
            friends:{

            }
        })
    }
    //获取优惠券列表,可用优惠券，赠送记录（转赠优惠券）
    fetchCouponList = (done) => {
        let { type, sum, list, status } = this.data.coupon
        let current_tab = list[type]
        if (current_tab.pageNo == 0) return done && done()
        if (current_tab.pageNo == 1) current_tab.list = []

        this.Post('/api/finManager/coupon/v2/myCouponList.shtml', {
            couponStatus: status,
            couponType: type,
            pageNo: current_tab.pageNo,
            pageSize: 10
        }).then(data => {
            sum = data.moneySum
            current_tab.list.push(...data.pageData.result)

            current_tab.pageNo < data.pageData.pagination.totalPage ?
                current_tab.pageNo++ : current_tab.pageNo = 0

            done&&done()
        })
    }

    resetCouponPageNo = () => {
        let { type, list } = this.data.coupon
        list[type].pageNo = 1
    }
    setCouponType = (type) => {
        this.data.coupon.type = type
    }
    setCouponStatus = (status) => {
        this.data.coupon.status = status
    }
}
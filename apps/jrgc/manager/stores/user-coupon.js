import { extendObservable, computed } from 'mobx'
import { Utils, Components } from 'fw-javascripts'

export default class UserCoupon {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}
        this.coupon_data = {}
        this.friends_data = {}

        extendObservable(this.coupon_data, {
            totalCount: 0,
            status: 1,
            type: '1',
            pageNo: 1,
            records: []
        })
        extendObservable(this.friends_data, {
            pageNo: 1,
            list: [],
            keyword: ''
        })
    }
    //获取优惠券列表,可用优惠券，赠送记录（转赠优惠券）
    resetCouponPageNo = () => {
        this.coupon_data.pageNo = 1
        this.coupon_data.records = []
    }
    setCouponType = (type) => {
        this.coupon_data.type = type
        this.fetchCouponList()
    }
    setCouponStatus = (status) => {
        this.coupon_data.status = status
    }
    fetchCouponList = (done) => {
        let {records} = this.coupon_data

        if (this.coupon_data.pageNo == 0) return done && done()
        if (this.coupon_data.pageNo == 1) records.splice(0,records.length)
        this.Get('/api/finManager/coupon/v2/myCouponList.shtml', {
            couponStatus: this.coupon_data.status,
            couponType: this.coupon_data.type,
            pageNo: this.coupon_data.pageNo,
            pageSize: 10
        }).then(data => {
            this.coupon_data.totalCount = data.pageData.pagination.totalCount

            records.push(...data.pageData.result)
            this.coupon_data.pageNo < data.pageData.pagination.totalPage ?
                 this.coupon_data.pageNo++ : this.coupon_data.pageNo = 0

            done && done()
        })
    }

    //获取赠送好友列表
    @computed get couponId() {
        return Utils.hashQuery.couponId
    }
    @computed get couponType() {
        let t = Number(Utils.hashQuery.couponType)+1
        return t
    }
    setKeyword = (keyword) => {
        this.friends_data.keyword = keyword
    }
    resetFriendsPageNo = () => {
        this.friends_data.pageNo = 1
    }
    fetchFriendsList = (done) => {
        let { type, list, keyword } = this.friends_data
        if ( this.friends_data.pageNo == 0) return done && done()
        if (this.friends_data.pageNo == 1) list.splice(0,list.length)

        this.Post('/api/finManager/coupon/v2/custList.shtml', {
            couponId: this.couponId,
            couponType: this.couponType,
            keyword: keyword,
            pageNo: this.friends_data.pageNo,
            pageSize: 10
        }).then(data => {
            list.push(...data.pageData.result)

            this.friends_data.pageNo < data.pageData.pagination.totalPage ?
            this.friends_data.pageNo++ :
            this.friends_data.pageNo = 0

            done && done()
        })
    }
    //转增优惠券
    presentCoupon = (couponId, couponType, custId) => {
        return this.Get('/api/finManager/coupon/v2/presentCoupon.shtml', {
            couponId: couponId,
            couponType: couponType,
            custId: custId
        })
    }
}
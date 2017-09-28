import { extendObservable } from 'mobx'

export default class Investor {
    constructor(Get) {
        this.Get = Get
        this.data = {}
        extendObservable(this.data, {
            coupon:{
                couponList:[]
            }
        })
    }
    fetchCouponList = () => {
        this.data.coupon.couponList = [
            {
                id:1
            },
            {
                id:2
            },
            {
                id:3
            },
            {
                id:2
            },
            {
                id:3
            },
        ]
    }
}
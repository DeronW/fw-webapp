import {extendObservable} from 'mobx'

export default class User {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}
        extendObservable(this.data, {
            user: {
                notice: [],
                banners: [],
                info: {}
            },
            coupon: {
                totalCount: null,
                couponList: [],
            },
            graph: {
                totalList: [],

            }
        })
    }

    fetchNotice = () => {
        this.data.user.notice = [{
            des: '第三方发',
            url: 'https://www.baidu.com/?tn=78040160_5_pg&ch=1'
        }, {
            des: '电话号给的图',
            url: 'https://www.360.cn/'
        }, {
            des: '阿森松岛',
            url: 'https://www.baidu.com/'
        }]

        this.data.user.banners = [
            {
                img: ''
            }
        ]
    }

    fetchInfo = () => {
        this.Get('/api/finManager/user/v2/home.shtml').then(data => {
            this.data.user.info = data.result
        })
    }

    fetchCouponList = (couponStatus, couponType) => {
        this.Post('/api/finManager/coupon/v2/myCouponList.shtml', {
            couponStatus: couponStatus,
            couponType: couponType,
            pageNo: 1,
            pageSize: 10
        }).then(data => {
            this.data.coupon.totalCount = data.moneySum
            this.data.coupon.couponList = data.pageData.result
        })
    }
}

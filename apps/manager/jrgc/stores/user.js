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
                updateTime: '',
                timeDimensionList: [],
                rebateAmtList: []
            },
            cust: {
                cust_page_no: 1,//值为0的时候表示数据加载完毕
                custList: []//返利客户列表
            }

        })
    }

    //获取公告数据
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

    //获取我的页面基本信息
    fetchInfo = () => {
        this.Get('/api/finManager/user/v2/home.shtml').then(data => {
            this.data.user.info = data.result
        })
    }

    //获取优惠券列表（转赠优惠券）
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

    //获取返利额数据
    fetGraphData = (type) => {
        this.Get('/api/finManager/user/v2/stat.shtml', {
            statType: type
        }).then(data => {
            this.data.graph.updateTime = data.result.updateTime
            this.data.graph.timeDimensionList = data.result.timeDimensionList
            this.data.graph.rebateAmtList = data.result.rebateAmtList
        })
    }

    //获取返利客户列表
    fetchCustList = (done) => {
        const PAGE_SIZE = 10
        let {cust_page_no, custList} = this.data.cust
        if (cust_page_no === 0) return done && done();
        this.Get('/api/finManager/user/v2/rebateCustList.shtml', {
            pageNo: cust_page_no,
            pageSize: PAGE_SIZE
        }).then(data => {
            custList.push(...data.pageData.result)
            cust_page_no < data.result.pageData.pagination.totalPage ? cust_page_no++ : cust_page_no = 0
            done&&done()
        })
    }
}

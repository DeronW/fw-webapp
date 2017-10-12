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
            rebate_graph: {
                updateTime: '',
                timeDimensionList: [],
                rebateAmtList: []
            },
            rebate_cust: {
                type: '0',
                list: {
                    '0': {name: '全部', page_no: 1, custList: []},
                    '1': {name: '微金', page_no: 1, custList: []},
                    '2': {name: '尊享', page_no: 1, custList: []},
                    '3': {name: '黄金', page_no: 1, custList: []}
                }
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
    //获取返利图标的sort_no
    fetchGraphSortNo = (tab_num, chart_num) => {
        if (tab_num == 0 && chart_num == 0) return '11'
        if (tab_num == 0 && chart_num == 1) return '12'
        if (tab_num == 0 && chart_num == 2) return '13'
        if (tab_num == 0 && chart_num == 3) return '14'
        if (tab_num == 1 && chart_num == 0) return '21'
        if (tab_num == 1 && chart_num == 1) return '22'
        if (tab_num == 1 && chart_num == 2) return '23'
        if (tab_num == 1 && chart_num == 3) return '24'
        if (tab_num == 2 && chart_num == 0) return '31'
        if (tab_num == 2 && chart_num == 1) return '32'
        if (tab_num == 2 && chart_num == 2) return '33'
        if (tab_num == 2 && chart_num == 3) return '34'
        if (tab_num == 3 && chart_num == 0) return '41'
        if (tab_num == 3 && chart_num == 1) return '42'
        if (tab_num == 3 && chart_num == 2) return '43'
        if (tab_num == 3 && chart_num == 3) return '44'
    }

    //获取返利额数据
    fetGraphData = (type) => {
        this.Get('/api/finManager/user/v2/stat.shtml', {
            statType: type
        }).then(data => {
            this.data.rebate_graph.updateTime = data.result.updateTime
            this.data.rebate_graph.timeDimensionList = data.result.timeDimensionList
            this.data.rebate_graph.rebateAmtList = data.result.rebateAmtList
        })
    }
    //重置页码
    resetPageNo = () => {
        let {type, list} = this.data.rebate_cust, current_list = list[type]
        current_list.page_no = 1
    }

    //
    resetType = (type) => {
        this.data.rebate_cust.type = type
        this.fetchCustList()
    }

    //获取返利客户列表
    fetchCustList = (done) => {
        const PAGE_SIZE = 10
        let {type, list} = this.data.rebate_cust, current_list = list[type]
        if (current_list.page_no === 0) return done && done();
        if (current_list.page_no == 1) current_list.custList.splice(0, current_list.custList.length)
        this.Get('/api/finManager/user/v2/rebateCustList.shtml', {
            pageNo: current_list.page_no,
            pageSize: PAGE_SIZE,
            type: type
        }).then(data => {
            current_list.custList.push(...data.pageData.result)
            current_list.page_no < data.result.pageData.pagination.totalPage
                ? current_list.page_no++
                : current_list.page_no = 0
            done && done()
        })
    }
}

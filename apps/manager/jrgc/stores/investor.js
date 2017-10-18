import { extendObservable } from 'mobx'

export default class Investor {
    constructor(Get,Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}

        extendObservable(this.data, {
            coupon: {
                couponList: []
            },
            custmor: {
                list: [],
                pageNo: 1,
                tab: '全部客户',
                type: '可用余额最高排序',
                value:1,//1-全部-余额 2-全部-返利 3-全部-回款 4-在投-余额 5-在投-返利 6-在投-回款 7-空仓-余额 8-空仓-返利 9-未投-注册时间 10-未投-余额
                sort: {
                    '全部客户': [
                        {
                            '可用余额最高排序': 1
                        },
                        {
                            '返利最多排序': 2
                        },
                        {
                            '最近回款时间排序': 3
                        }
                    ],
                    '在投': [
                        {
                            '可用余额最高排序': 4
                        },
                        {
                            '返利最多排序': 5
                        },
                        {
                            '最近回款时间排序': 6
                        }
                    ],
                    '空仓': [
                        {
                            '可用余额最高排序': 7
                        },
                        {
                            '返利最多排序': 8
                        }
                    ],
                    '未投资': [
                        {
                            '可用余额最高排序': 10
                        },
                        {
                            '最近回款时间排序': 9
                        }
                    ]
                },
            },
            calendar: {//回款日历
                overview: {
                    principal: 100,
                    interest: 23,
                    goldAmt: 4.5
                },//总回款信息
                calendarList: [],//月份回款日历
                monthInfo: {},//月度回款信息
                monthDueList: [],//月份 即将到期列表/已到期列表
                dayDueList: [],//当天 即将到期列表/已到期列表
            },
            birthday: {
                list: []
            },
            search: {
                pageNo: 1,
                records: [],
                keyword: ''
            },
            info: {//客户详情
                detail: {},
                analysis: {}
            },
            bean: {
                id: null,
                info: {},
                pageNo: 1,
                records: []
            },
            score: {
                id: null,
                info: {},
                pageNo: 1,
                records: []
            }
        })
    }
    //我的客户列表，包含全部、在投、空仓未投资四种类型，以及余额最高，返利最多，最近回款时间三种排序方式
    resetCustPageNo = () => {
        this.data.custmor.pageNo = 1
    }
    setCustTab = (tab) => {
        this.data.custmor.tab = tab
        this.data.custmor.type = '可用余额最高排序'
    }
    setCustType = (type) => {
        this.data.custmor.type = type
    }
    setCustValue = (value) => {
        this.data.custmor.value = value
    }
    fetchCustList = (done) => {
        let { value,list,pageNo } = this.data.custmor
        if (pageNo == 0) return done && done()
        if (pageNo == 1) list.splice(0,list.length)

        this.Get('/api/finManager/cust/v2/myCustList.shtml', {
            type: value,
            pageNo: pageNo,
            pageSize: 10
        }).then(data => {
            list.push(...data.pageData.result)
            console.log(list)
            this.data.custmor.pageNo < data.pageData.pagination.totalPage ? this.data.custmor.pageNo++ : this.data.custmor.pageNo = 0

            done && done()
        })
    }

    //回款日历-总回款信息接口
    fetchOverview = () => {
        this.Get('/api/finManager/cust/v2/paymentOverview.shtml').then(data => {
            this.data.calendar.overview = data.result
        })
    }
    //回款日历-月份回款日历
    fetchMonthCal = (month) => {
        this.Get("/api/finManager/payment/v2/paymentMonthCal.shtml", {
            month: month
        }).then(data => {
            this.data.calendar.calendarList = data.result
        })
    }
    //回款日历-月度回款信息
    fetchMonthInfo = (month) => {
        this.Get("/api/finManager/payment/v2/paymentMonthInfo.shtml", {
            month: month
        }).then(data => {
            this.data.calendar.monthInfo = data.result
        })
    }
    //回款日历-到期列表-回款月份
    fetchDueMonth = (tab, month) => {
        let { monthDueList } = this.data.calendar
        if (tab == '即将到期') {
            this.Get("/api/finManager/payment/v2/dueList.shtml", {
                month: month
            }).then(data => {
                monthDueList = data.result
            })
        } else {
            this.Get("/api/finManager/payment/v2/expiredList.shtml", {
                month: month
            }).then(data => {
                monthDueList = data.result
            })
        }
    }
    //回款日历-到期列表-回款日期
    fetchDueDay = (tab, day) => {
        let { dayDueList } = this.data.calendar
        if (tab == '即将到期') {
            this.Get("/api/finManager/payment/v2/dueList.shtml", {
                day: day
            }).then(data => {
                dayDueList = data.result
            })
        } else {
            this.Get("/api/finManager/payment/v2/expiredList.shtml", {
                day: day
            }).then(data => {
                dayDueList = data.result
            })
        }
    }
    //生日提醒
    fetchBirthday = () => {
        this.Get("/api/finManager/cust/v2/birthCustList.shtml").then(data => {
            this.data.birthday.list = data.result
        })
    }
    //搜索
    resetSearchPageNo = () => {
        this.data.search.pageNo = 1
    }
    fetchSearch = (done) => {
        let { keyword, records } = this.data.search
        const PAGE_SIZE = 10
        if (this.data.search.pageNo == 0) return done && done()
        if (this.data.search.pageNo == 1) records.splice(0,records.length)

        this.Get("/api/finManager/cust/v2/search.shtml", {
            keyword: keyword,
            pageNo: this.data.search.pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            records.push(...data.pageData.result)
            this.data.search.pageNo < data.pageData.totalPage ?
            this.data.search.pageNo++ :
            this.data.search.pageNo = 0
            done && done()
        })
    }
    setKeyword = (keyword) => {
        this.data.search.keyword = keyword
    }
    //客户详情
    fetchInfo = (cust_id) => {
        this.Get('/api/finManager/cust/v2/custDetail.shtml', {
            custId: cust_id
        }).then(data => {
            this.data.info.detail = data.result
        })
    }
    //客户整体投资期限分析-饼图
    fetchInvestAnalysis = (id) => {
        this.Get('/api/finManager/cust/v2/investAnalysis.shtml', {
            custId: id
        }).then(data => {
            this.data.info.analysis = data.result
        })
    }

    //查询客户工豆列表
    fetchBean = (done) => {
        let { pageNo, records, id, info } = this.data.bean
        const PAGE_SIZE = 10
        if (this.data.bean.pageNo == 0) return done && done()
        if (pageNo == 1) records.splice(0,records.length)
        this.Get('/api/finManager/cust/v2/beanList.shtml', {
            custId: id,
            pageNo: pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            info = data
            records.push(...data.pageData.result)
            this.data.bean.pageNo < data.pageData.pagination.totalPage ? this.data.bean.pageNo++ : this.data.bean.pageNo = 0

            done && done()
        })
    }
    setBeanId = (id) => {
        this.data.bean.id = id
    }
    resetBeanPageNo = () => {
        this.data.bean.pageNo = 1
    }

    //查询客户工分列表
    fetchScore = (done) => {
        let { pageNo, records, id, info } = this.data.score
        const PAGE_SIZE = 10
        if (pageNo == 0) return done && done()
        if (pageNo == 1) records.splice(0,records.length)
        this.Get('/api/finManager/cust/v2/scoreList.shtml', {
            custId: id,
            pageNo: pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            info = data
            records.push(...data.pageData.result)
            this.data.score.pageNo < data.pageData.pagination.totalPage ?
            this.data.score.pageNo++ :
            this.data.score.pageNo = 0

            done && done()
        })
    }
    setScoreId = (id) => {
        this.data.score.id = id
    }
    resetScorePageNo = () => {
        this.data.score.pageNo = 1
    }

    fetchCouponList = () => {
        this.data.coupon.couponList = [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 2
            },
            {
                id: 3
            },
        ]
    }
}
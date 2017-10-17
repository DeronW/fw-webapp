import { extendObservable } from 'mobx'

export default class Investor {
    constructor(Get) {
        this.Get = Get
        this.data = {}
        extendObservable(this.data, {
            coupon: {
                couponList: []
            },
            custmor: {
                pageNo: 1,
                type: 1,//1-全部-余额 2-全部-返利 3-全部-回款 4-在投-余额 5-在投-返利 6-在投-回款 7-空仓-余额 8-空仓-返利 9-未投-注册时间 10-未投-余额
                list: []
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
    setCustType = (type) => {
        this.data.custmor.type = type
    }
    fetchCustList = (done) => {
        let { type, pageNo, list } = this.data.custmor
        if (pageNo == 0) return done && done()
        if (pageNo == 1) list = []
        this.Get('/api/finManager/cust/v2/myCustList.shtml', {
            type: type,
            pageNo: pageNo,
            pageSize: 10
        }).then(data => {
            list.push(...data.pageData.result)
            pageNo < data.pageData.pagination.totalPage ? pageNo++ : pageNo = 0

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
        let { keyword, pageNo, records } = this.data.search
        const PAGE_SIZE = 10
        if (pageNo == 0) return done && done()
        if (pageNo == 1) records = []

        this.Get("/api/finManager/cust/v2/search.shtml", {
            keyword: keyword,
            pageNo: pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            records.push(...data.pageData.result)
            pageNo < data.pageData.totalPage ? pageNo++ : pageNo = 0
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
        if (pageNo == 0) return done && done()
        if (pageNo == 1) records = []
        this.Get('/api/finManager/cust/v2/beanList.shtml', {
            custId: id,
            pageNo: pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            info = data
            records.push(...data.pageData.result)
            pageNo < data.pageData.pagination.totalPage ? pageNo++ : pageNo = 0

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
        if (pageNo == 1) records = []
        this.Get('/api/finManager/cust/v2/scoreList.shtml', {
            custId: id,
            pageNo: pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            info = data
            records.push(...data.pageData.result)
            pageNo < data.pageData.pagination.totalPage ? pageNo++ : pageNo = 0

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
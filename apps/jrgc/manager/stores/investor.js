import { extendObservable, computed } from 'mobx'
import { Utils, Components } from 'fw-javascripts'

export default class Investor {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}

        this.MENU = {
            '全部客户': [
                { '可用余额最高排序': 1 },
                { '返利最多排序': 2 },
                { '最近回款时间排序': 3 }
            ],
            '在投': [
                { '可用余额最高排序': 4 },
                { '返利最多排序': 5 },
                { '最近回款时间排序': 6 }
            ],
            '空仓': [
                { '可用余额最高排序': 7 },
                { '返利最多排序': 8 }
            ],
            '未投资': [
                { '可用余额最高排序': 10 }
            ]
        }
        extendObservable(this.data, {
            // custmor: {
            //     list: [],
            //     pageNo: 1,
            //     tab: '全部客户',
            //     type: '可用余额最高排序',
            //     value: 1,//1-全部-余额 2-全部-返利 3-全部-回款 4-在投-余额 5-在投-返利 6-在投-回款 7-空仓-余额 8-空仓-返利 9-未投-注册时间 10-未投-余额
            //     sort: {
            //         '全部客户': [
            //             { '可用余额最高排序': 1 },
            //             { '返利最多排序': 2 },
            //             { '最近回款时间排序': 3 }
            //         ],
            //         '在投': [
            //             { '可用余额最高排序': 4 },
            //             { '返利最多排序': 5 },
            //             { '最近回款时间排序': 6 }
            //         ],
            //         '空仓': [
            //             { '可用余额最高排序': 7 },
            //             { '返利最多排序': 8 }
            //         ],
            //         '未投资': [
            //             { '可用余额最高排序': 10 }
            //         ]
            //     },
            // },
            calendar: {//回款日历
                overview: {},//总回款信息
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
                remarkToken: '',//修改备注的token
                detail: {},
                analysis: {},
            },
            bean: {
                cashBalance: 0,
                overbeancount: 0,
                pageNo: 1,
                records: []
            },
            score: {
                frozenAmount: 0,
                iintegralNum: 0,
                willExpireAmount: 0,
                pageNo: 1,
                records: []
            },
        })

        this.fellow = {}
        extendObservable(this.fellow, {
            pageNo: 1,
            value: 1,
            records: []
        })
    }

    /* *************************************/
    /* *************************************/
    /* *************************************/
    // new 2017/11/01

    resetFellowRecords(value = 1) {
        this.fellow.pageNo = 1
        this.fellow.value = value
        this.fellow.records = []
    }

    appendFellowRecords(value, totalPage, records) {
        let { pageNo } = this.fellow

        if (this.fellow.value === value) {
            this.fellow.pageNo = pageNo < totalPage ? pageNo + 1 : 0
            this.fellow.records.push(...records)
        }
    }

    fetchFellowRecords = (done) => {
        let { value, pageNo } = this.fellow
        if (pageNo == 0) return done && done()
        this.Get('/api/finManager/cust/v2/myCustList.shtml', {
            type: value,
            pageNo: pageNo,
            pageSize: 10
        }).then(data => {
            this.appendFellowRecords(
                value,
                data.pageData.pagination.totalPage,
                data.pageData.result)
            done && done()
        })
    }

    switchSortType = (type) => {
        this.resetFellowRecords(type)
        this.fetchFellowRecords()
    }

    /* *************************************/
    /* *************************************/
    /* *************************************/

    @computed get custId() {
        return Utils.hashQuery.custId
    }
    //回款日历-总回款信息接口
    fetchOverview = () => {
        this.Get('/api/finManager/cust/v2/paymentOverview.shtml').then(data => {
            this.data.calendar.overview = data.result
        })
    }
    //回款日历-月份回款日历
    fetchMonthCal = (month) => {
        this.Get("/api/finManager/cust/v2/paymentMonthCal.shtml", {
            month: month
        }).then(data => {
            this.data.calendar.calendarList = data.result
        })
    }
    //回款日历-月度回款信息
    fetchMonthInfo = (month) => {
        this.Get("/api/finManager/cust/v2/paymentMonthInfo.shtml", {
            month: month
        }).then(data => {
            this.data.calendar.monthInfo = data.result
        })
    }
    //回款日历-到期列表-回款月份
    fetchDueMonth = (tab, month) => {
        if (tab == '即将到期') {
            this.Get("/api/finManager/cust/v2/dueList.shtml", {
                month: month
            }).then(data => {
                this.data.calendar.monthDueList = data.result
            })
        } else {
            this.Get("/api/finManager/cust/v2/expiredList.shtml", {
                month: month
            }).then(data => {
                this.data.calendar.monthDueList = data.result
            })
        }
    }
    //回款日历-到期列表-回款日期
    fetchDueDay = (tab, day) => {
        let { dayDueList } = this.data.calendar
        if (tab == '即将到期') {
            this.Get("/api/finManager/cust/v2/dueList.shtml", {
                day: day
            }).then(data => {
                this.data.calendar.dayDueList = data.result
            })
        } else {
            this.Get("/api/finManager/cust/v2/expiredList.shtml", {
                day: day
            }).then(data => {
                this.data.calendar.dayDueList = data.result
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
        let {type,sortNo,timeType} = Utils.hashQuery
        let url = '/api/finManager/cust/v2/search.shtml'
        console.log(type=='stats')
        if(type == "stats"){
            url = '/api/finManager/achievement/v2/custList.shtml'
        }

        const PAGE_SIZE = 10
        if (this.data.search.pageNo == 0) return done && done()
        if (this.data.search.pageNo == 1) records.splice(0, records.length)

        return this.Post(url, {
            keyword: keyword,
            orderType:sortNo,
            timeType:timeType,
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
    fetchInfo = () => {
        this.Get('/api/finManager/cust/v2/custDetail.shtml', {
            custId: this.custId
        }).then(data => {
            this.data.info.remarkToken = data.remarkToken
            this.data.info.detail = data.result
        })
    }
    //客户整体投资期限分析-饼图
    fetchInvestAnalysis = () => {
        this.Get('/api/finManager/cust/v2/investAnalysis.shtml', {
            custId: this.custId
        }).then(data => {
            this.data.info.analysis = data.result
        })
    }

    //查询客户工豆列表
    fetchBean = (done) => {
        let { pageNo, records } = this.data.bean
        const PAGE_SIZE = 10
        if (this.data.bean.pageNo == 0) return done && done()
        if (pageNo == 1) records.splice(0, records.length)
        this.Get('/api/finManager/cust/v2/beanList.shtml', {
            custId: this.custId,
            pageNo: pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.data.bean.cashBalance = data.cashBalance
            this.data.bean.overbeancount = data.overbeancount

            records.push(...data.pageData.result)
            this.data.bean.pageNo < data.pageData.pagination.totalPage ? this.data.bean.pageNo++ : this.data.bean.pageNo = 0

            done && done()
        })
    }
    resetBeanPageNo = () => {
        this.data.bean.pageNo = 1
    }

    //查询客户工分列表
    fetchScore = (done) => {
        let { pageNo, records, frozenAmount, iintegralNum, willExpireAmount } = this.data.score
        const PAGE_SIZE = 10
        if (pageNo == 0) return done && done()
        if (pageNo == 1) records.splice(0, records.length)
        this.Get('/api/finManager/cust/v2/scoreList.shtml', {
            custId: this.custId,
            pageNo: pageNo,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.data.score.frozenAmount = data.frozenAmount
            this.data.score.iintegralNum = data.iintegralNum
            this.data.score.willExpireAmount = data.willExpireAmount
            records.push(...data.pageData.result)
            this.data.score.pageNo < data.pageData.pagination.totalPage ?
                this.data.score.pageNo++ :
                this.data.score.pageNo = 0

            done && done()
        })
    }
    resetScorePageNo = () => {
        this.data.score.pageNo = 1
    }
    //客户备注修改
    editRemark = (remark) => {
        this.Post('/api/finManager/cust/v2/custRemarkEdit.shtml', {
            custId: this.custId,
            remark: remark,
            remarkToken: this.data.info.remarkToken
        }).then(() => Components.showToast('保存成功'))
    }
}
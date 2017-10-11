import {extendObservable} from 'mobx'

export default class Investor {
    constructor(Get) {
        this.Get = Get
        this.data = {}
        extendObservable(this.data, {
            coupon: {
                couponList: []
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
            custDetail: {//客户详情

            }
        })
    }

    //回款日历-总回款信息接口
    fetchOverview = () => {
        this.Get('/api/finManager/cust/v2/paymentOverview.shtml').then(data=>{
            this.data.calendar.overview = data.data.result
        })
    }
    //回款日历-月份回款日历
    fetchMonthCal = (month) => {
        this.Get("/api/finManager/payment/v2/paymentMonthCal.shtml",{
            month:month
        }).then(data=>{
            this.data.calendar.calendarList = data.data.result
        })
    }
    //回款日历-月度回款信息
    fetchMonthInfo = (month) => {
        this.Get("/api/finManager/payment/v2/paymentMonthInfo.shtml",{
            month:month
        }).then(data=>{
            this.data.calendar.monthInfo = data.data.result
        })
    }
    //回款日历-到期列表-回款月份
    fetchDueMonth = (tab,month) => {
        if(tab == '即将到期'){
            this.Get("/api/finManager/payment/v2/dueList.shtml",{
                month:month
            }).then(data=>{
                this.data.calendar.monthDueList = data.data.result
            })
        }else{
            this.Get("/api/finManager/payment/v2/expiredList.shtml",{
                month:month
            }).then(data=>{
                this.data.calendar.monthDueList = data.data.result
            })
        }
    }
    //回款日历-到期列表-回款日期
    fetchDueDay = (tab,day) => {
        if(tab == '即将到期'){
            this.Get("/api/finManager/payment/v2/dueList.shtml",{
                day:day
            }).then(data=>{
                this.data.calendar.dayDueList = data.data.result
            })
        }else{
            this.Get("/api/finManager/payment/v2/expiredList.shtml",{
                day:day
            }).then(data=>{
                this.data.calendar.dayDueList = data.data.result
            })
        }
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
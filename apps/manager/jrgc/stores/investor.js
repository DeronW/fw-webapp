import { extendObservable } from 'mobx'

export default class Investor {
    constructor(Get) {
        this.Get = Get
        this.data = {}
        extendObservable(this.data, {
            coupon:{
                couponList:[]
            },
            calendar:{//回款日历
                overview:{
                    principal:100,
                    interest:23,
                    goldAmt:4.5
                },//总回款信息
                calendarList:[],//月份回款日历
                monthInfo:{},//月度回款信息
                monthDueList:[],//月份即将到期列表/已到期列表
                dayDueList:[],//当天即将到期列表/已到期列表
            }
        })
    }
    //回款日历-总回款信息接口
    fetchPaymentOverview = () => {
        this.Get('/api/finManager/cust/v2/paymentOverview.shtml').then(data=>{
            this.data.calendar.overview = data.data.result
        })
    }
    //回款日历-月份回款日历
    fetchPaymentMonthCal = (month) => {
        console.log(month)
        this.Get("/api/finManager/payment/v2/paymentMonthCal.shtml",{
            month:month
        }).then(data=>{
            this.data.calendar.calendarList = data.data.result
        })
    }
    //回款日历-月度回款信息
    fetchPaymentMonthInfo = (month) => {
        this.Get("/api/finManager/payment/v2/paymentMonthInfo.shtml",{
            month:month
        }).then(data=>{
            this.data.calendar.monthInfo = data.data.result
        })
    }
    //回款日历-即将到期列表-回款月份
    fetchPaymentMonthInfo = (month) => {
        this.Get("/api/finManager/payment/v2/dueList.shtml",{
            month:month
        }).then(data=>{
            this.data.calendar.monthDueList = data.data.result
        })
    }
    //回款日历-即将到期列表-回款日期
    fetchPaymentMonthInfo = (day) => {
        this.Get("/api/finManager/payment/v2/dueList.shtml",{
            day:day
        }).then(data=>{
            this.data.calendar.dayDueList = data.data.result
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
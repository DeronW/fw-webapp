import {extendObservable} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'
import { NativeBridge }  from '../helpers'
export default class User {
    constructor(Ajax,Get, Post) {
        this.Ajax = Ajax
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
                type: '1',
                list: {
                    '1': {name: '全部', page_no: 1, custList: []},
                    '2': {name: '微金', page_no: 1, custList: []},
                    '3': {name: '尊享', page_no: 1, custList: []},
                    '4': {name: '黄金', page_no: 1, custList: []}
                }
            },
            rebate_info:{

            }
        })
    }
    getBannersHandler = () => {
        let q = Utils.urlQuery
        this.Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e', id: q.banner_id || '30'},
            silence: true
        }).catch(data => {
            this.data.user.banners = data.map(i => ({url: i.url, img: i.thumb}))
        })
    }
    getNoticeHandler = () => {
        return this.Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e', id: '33'},
            silence: true
        }).catch(data => {
            this.data.user.notice = data
        })
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
    setType = (type) => {
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
            current_list.page_no < data.pageData.pagination.totalPage
                ? current_list.page_no++
                : current_list.page_no = 0
            done && done()
        })
    }
    //返利信息
    fetchRebateInfo = ()=>{
        this.Get('/api/finManager/user/v2/rebateInfo.shtml').then(data=>{
            this.data.rebate_info = data.result
        })
    }
    //分享
    nativeShare = () => {
        let inviteCode = Utils.hashQuery.yqm;
        NativeBridge.command.share({
            title: '掌上钱包，随用随取',
            image: 'https://static.9888.cn/images/loan/invitation.jpg',
            link: `https://m.easyloan888.com/static/loan/outside-register/index.html?channelCode=OFFICIAL&invitationCode=${inviteCode}&jumpType=wx`,
            desc: '缺钱不用愁，注册放心花，借款神器，急速到账'
        })
    }
}

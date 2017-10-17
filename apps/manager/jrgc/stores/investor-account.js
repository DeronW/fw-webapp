import {extendObservable,computed} from 'mobx'
import { Utils, Components } from 'fw-javascripts'

export default class InvestorAccount {
    constructor(Get, Post) {
        this.Get = Get
        this.Post = Post
        this.data = {}
        this.data_zx = {}
        extendObservable(this.data_zx,{
            detail:{
                info: {},
                type: '0',
                payments: {
                    '0': {name: '未回', pageNo: 1, list: []},
                    '1': {name: '已回', pageNo: 1, list: []}
                }
            },
            payments_count: null,
            project:{
                info:{},
                tab:'100',
                type:'Ta的项目',
                record:{
                    '100':{name:'未起息',pageNo:1,records:[]},
                    '3':{name:'回款中',pageNo:1,records:[]},
                    '4':{name:'已回款',pageNo:1,records:[]},
                    '':{name:'全部',pageNo:1,records:[]},
                    '5':{name:'回款中',pageNo:1,records:[]},
                    '6':{name:'已回款',pageNo:1,records:[]},
                }
            }
        })
        extendObservable(this.data, {
            p2p: {
                info: {}
            },
            hj: {
                info: {},
                type: '0',
                records: {
                    '0': {name: "全部", page_no: 1, list: []},
                    '1': {name: '持有中', page_no: 1, list: []},
                    '2': {name: '已到期', page_no: 2, list: []}
                },
                goldPrice: '',
                amount: {},
                totalCount: null
            },
            overview:{}//尊享和微金的款项总览
        })
    }
    //获取客户id
    @computed get custId(){
        return Utils.hashQuery.custId
    }
    //款项总览 尊享和微金
    fetchOverview = (type)=>{
        if(type == 'zx'){
            this.Get('/api/finManager/cust/v2/zxOverview.shtml',{
                custId:this.custId
            }).then(data=>{
                this.data.overview = data.result
            })
        }else if(type == 'wj'){
            this.Get('/api/finManager/cust/v2/wjOverview.shtml',{
                custId:this.custId
            }).then(data=>{
                this.data.overview = data.result
            })
        }
    }
    //TA的尊享-投资(项目)头部信息
    fetchInvestInfoZX = ()=>{
        this.Get('/api/finManager/cust/v2/zxPrdInvestInfo.shtml',{
            custId:this.custId
        }).then(data=>{
            this.data_zx.project.info = data.result
        })
    }

    resetPageNoZX = () => {
        let pro = this.data_zx.project

        pro.record[pro.tab].pageNO = 1
    }
    setTabZX = (tab) => {
        this.data_zx.project.tab = tab
    }
    setTypeZX = (type) => {
        this.data_zx.project.type = type
    }
    //TA的尊享-投资-TA的项目列表
    fetchProjectZX = (done) => {
        let url
        let { tab,record,type } = this.data_zx.project
        if( record[tab].pageNO == 0) return done && done()
        if( record[tab].pageNO == 1) record[tab].records = []

        if(type=="Ta的项目"){
            url='/api/finManager/cust/v2/zxPrdInvest.shtml'
        }else if(type=="转入项目"){
            url='/api/finManager/cust/v2/zxPrdInvest.shtml'
        }
        this.Get(url,{
            custId:this.custId,
            flag:tab,
            pageNo:record[tab].pageNo,
            pageSize:10
        }).then(data=>{
            record[tab].records.push(...data.pageData.result)
            record[tab].pageNO > data.pageData.pagination.totalPage ? record[tab].pageNO++ : record[tab].pageNO = 0

            done()
        })
    }


    //黄金账户信息页
    fetchAccountHj = () => {
        this.Get('/api/finManager/cust/v2/goldAccount.shtml', {
            custId: this.custId
        }).then(data => {
            this.data.hj.info = data.result
        })
    }
    //实时金价
    fetchGoldPrice = () => {
        this.Get('/api/finManager/cust/v2/goldPrice.shtml')
            .then(data => {
                this.data.hj.goldPrice = data.goldPrice
            })
    }
    //黄金记录列表和累计黄金
    fetchGoldList = (done) => {
        const PAGE_SIZE = 10
        let {type, records} = this.data.hj, current_record = records[type]
        if (current_record.page_no === 0) return done && done()
        if (current_record.page_no === 1) current_record.list.splice(0, current_record.list.length)
        this.Get('/api/finManager/cust/v2/enjoyGold.shtml', {
            custId: this.data.id,
            orderStatusCode: type,
            pageNo: current_record.page_no,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.data.hj.amount = data.userDataInfo
            this.data.hj.totalCount = data.pageData.pagination.totalCount
            current_record.list.push(...data.pageData.result)
            current_record.page_no < data.pageData.pagination.totalPage
                ? current_record.page_no++
                : current_record.page_no = 0
            done && done()
        })
    }

    //重置type
    resetGoldListType = (status) => {
        this.data.hj.type = status
        this.fetchGoldList()
    }
    //重置页码
    resetGoldListPageNo = () => {
        let {type, records} = this.data.hj, current_record = records[type]
        current_record.page_no = 1
    }
    //获取微金账户信息页
    fetchAccountP2P = (custId) => {
        this.Get('/api/finManager/cust/v2/wjAccount.shtml', {
            custId: this.custId
        }).then(data => {
            this.data.p2p.info = data.result
        })

    }

    //尊享账户信息页
    fetchAccountZX = () => {
        this.Get('/api/finManager/cust/v2/zxAccount.shtml', {
            custId: this.custId
        }).then(data => {
            this.data_zx.detail.info = data.result
        })
    }

    //尊享  他的回款明细
    fetchZXPayment = (done) => {
        let {type, payments} = this.data_zx.detail, current_payment = payments[type]
        const PAGE_SIZE = 10
        if (current_payment.pageNo === 0) return done && done()
        if (current_payment.pageNo == 1) current_payment.list.splice(0, current_payment.list.length)
        this.Get('/api/finManager/cust/v2/zxPayment.shtml', {
            custId: this.data.id,
            pageNo: current_payment.pageNo,
            pageSize: PAGE_SIZE,
            status: type
        }).then(data => {
            this.data_zx.payments_count = data.pageData.pagination.totalCount
            current_payment.list.push(...data.result)
            current_payment.pageNo < data.pageData.pagination.totalPage
                ? current_payment.pageNo++
                : current_payment.pageNo = 0
            done && done()
        })
    }

    //重置尊享回款明细的状态
    resetZXPaymentType = (type) => {
        this.data_zx.type = type
        this.fetchZXPayment()
    }

    //充值尊享回款明细的页码
    resetZXPaymentPageNo = () => {
        let {type, payments} = this.data_zx.detail, current_payment = payments[type]
        current_payment.pageNo = 1
    }
}
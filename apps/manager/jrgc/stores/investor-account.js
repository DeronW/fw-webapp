import {extendObservable} from 'mobx'

export default class InvestorAccount {
    constructor(Get,Post){
        this.Get = Get
        this.Post = Post
        this.data = {}
        extendObservable(this.data, {
            p2p: {

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
                amount: {}
            }
        })
    }
    //黄金账户信息页
    fetchAccountHj = (custId) => {
        this.Get('/api/finManager/cust/v2/goldAccount.shtml', {
            custId: custId
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
}
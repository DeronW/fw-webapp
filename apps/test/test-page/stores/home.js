import {extendObservable} from 'mobx'

export default class Home{
    constructor(request,state={}){
        this.request = request
        // extendObservable(this,{
        //     resultList:[],
        //     extList:[]
        // })
        extendObservable(this,{
            resultList:[],
            extList:[]
        },state)
    }

    getProductList(params){
        return this.request('api/product/v1/productList.json',params).then( data => {
            // this.resultList = data.resultList;
            // this.extList = data.extList;
            extendObservable(this, data);
        })
    }

    getRecommendList(params){
        return this.request('api/product/v1/productList.json',params).then(data =>{
            extendObservable(this,data)
        })
    }

    getNotice(params){
        return this.request('api/product/v1/noticeList.json',params).then(data =>{
            extendObservable(this,data)
        })
    }
}

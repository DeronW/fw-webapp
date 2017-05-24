import {extendObservable} from 'mobx'

export default class Home{
    constructor(request){
        this.request = request
        extendObservable(this,{
            resultList:[],
            extList:[]
        })
    }

    getProductList(params){
        return this.request('http://localhost/fake-api/api/product/v1/productList.json',params).then( data => {
            this.resultList = data.resultList;
            this.extList = data.extList;
        })
    }
}

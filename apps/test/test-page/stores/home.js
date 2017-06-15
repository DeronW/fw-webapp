import {extendObservable} from 'mobx'

export default class Home{
    constructor(request,state={}){
        this.request = request;
        this.API_PATH = 'http://localhost/fake-api';
        extendObservable(this,{
            resultList:[],
            recommendList:[]
        },state)
    }

    getProductList(params){
        return this.request(`${this.API_PATH}/api/product/v1/productList.json`,params).then( data => {
            this.resultList = data.resultList
        })
    }

    getRecommendList(params){
        return this.request(`${this.API_PATH}/api/product/v1/recommendedList.json`,params).then( data => {
           this.recommendList = data.resultList
        })
    }

}

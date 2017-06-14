import {extendObservable} from 'mobx'

export default class Home{
    constructor(request,state={}){
        this.request = request;
        extendObservable(this,{
            resultList:[],
            recommendList:[]
        },state)
    }

    getProductList(params){
        let API_PATH = 'http://localhost/fake-api'
        return this.request(`${API_PATH}/api/product/v1/productList.json`,params).then( data => {
            this.resultList = data.resultList
        })
    }

    getRecommendList(params){
        let API_PATH = 'http://localhost/fake-api'
        return this.request(`${API_PATH}/api/product/v1/recommendedList.json`,params).then( data => {
           this.recommendList = data.resultList
        })
    }

}

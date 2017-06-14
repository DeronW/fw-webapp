import {extendObservable} from 'mobx'

export default class Home{
    constructor(request,state={}){
        this.request = request;
        extendObservable(this,{
            resultList:[]
        },state)
    }

    getProductList(params){
        let API_PATH = 'http://localhost/fake-api'
        return this.request(`${API_PATH}/api/product/v1/productList.json`,params).then( data => {
            extendObservable(this, data);
        })
    }

}

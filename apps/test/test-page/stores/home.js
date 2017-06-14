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
        return this.request(`${API_PATH}/api/product/v1/productList.json`,params).then( data => {
            // this.resultList = data.resultList;
            // this.extList = data.extList;
            extendObservable(this, data);
        })
    }

}

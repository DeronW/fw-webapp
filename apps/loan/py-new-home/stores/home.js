import {extendObservable} from 'mobx'

export default class Home{
    constructor(request,state={}){
        this.request = request
    }

    getProductList(params){
        params = {}
        return this.request('api/product/productList',params).then( data => {
            ReactDOM.render(<Home products={data.resultList} otherProducts={data.extList}/>, CONTENT_NODE)
        })
    }

}

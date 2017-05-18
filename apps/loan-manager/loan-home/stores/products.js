import { extendObservable } from 'mobx'

export default class Products {

    constructor(request) {
        this.request = request;
        extendObservable(this, {
            loanProducts: [],
            otherProducts: []
        })
    }

    fetchProductList = () => {
        let API_PATH = document.getElementById('api-path').value;
        return this.request({
            url: `${API_PATH}/api/product/v1/productList.json`,
            method: 'post',
            data: { }
        }).then(data => {
            this.loanProducts = data.resultList;
            this.otherProducts = data.extList;
        })
    }

}

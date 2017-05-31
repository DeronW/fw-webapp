import { extendObservable } from 'mobx'

export default class Products {

    constructor(authPost) {
        this.authPost = authPost;
        extendObservable(this, {
            loanProducts: [],
            otherProducts: []
        })
    }

    fetchProductList = () => {
        let API_PATH = document.getElementById('api-path').value;
        return this.authPost(`/api/product/v1/productList.json`)
            .then(data => {
                this.loanProducts = data.resultList;
                this.otherProducts = data.extList;
            })
    }

}

import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class Home {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            loanProductList: [],
            subProductList: [],
            showBulletin: false,
            bulletinCnt: ''
        })
    }

    getDataHandler = () => {
        this.Post(`/api/product/v1/productList.json`)
            .then(data => {
                this.loanProductList = data.resultList
            }, e => Components.showToast(e))
    }
}
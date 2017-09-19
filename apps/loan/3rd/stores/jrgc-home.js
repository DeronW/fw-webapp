import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage, NativeBridge } from '../../lib/helpers'

import { Browser } from '../../lib/helpers'
export default class Home {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            loanProductList: [],
            subProductList: [],
        })
    }

    getDataHandler = () => {
        this.Post(`/api/product/v1/productList.json`)
            .then(data => {
                this.loanProductList = data.resultList
            })
            .then(() => this.Post(`/api/product/v1/recommendedList.json`))
            .then(data => {
                this.subProductList = data.resultList
            })
    }

    gotoHandler = (link, toNative, need_login) => {
        if (Browser.inFXHApp && toNative) return NativeBridge.toNative(toNative);

        if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;

        Browser.inApp ? NativeBridge.trigger('goto', link, need_login) : location.href = encodeURI(link);
    }

}
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
            showBulletin: false,
            bulletinCnt: ''
        })
    }

    getDataHandler = () => {
        this.Post(`/api/product/v1/noticeList.json`, null, true)
            .then(data => {
                let newBulletinCnt = data.noticeContent;
                let token = Storage.getUserDict().token;

                // if bulettin is secondary and it's read within the valid token, we just ignore that bulletin
                this.showBulletin = true;
                this.bulletinCnt = newBulletinCnt;

                if (data.gradeType == '2' && Storage.isBulletinRead(token, newBulletinCnt)) return
                Storage.setBulletin(token, newBulletinCnt);

            })
        this.Post(`/api/product/v1/productList.json`)
            .then(data => {
                this.loanProductList = data.resultList
            })

        this.Post(`/api/product/v1/recommendedList.json`)
            .then(data => {
                this.subProductList = data.resultList
            })
    }

    closeBulletin = () => {
        this.showBulletin = false;
    }

    gotoHandler = (link, toNative, need_login) => {
        if (Browser.inFXHApp && toNative) return NativeBridge.toNative(toNative);

        if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;

        Browser.inApp ? NativeBridge.trigger('goto', link, need_login) : location.href = encodeURI(link);
    }

}
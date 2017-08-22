import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class FaXian {
    constructor(Post) {
        this.Post = Post

        this.data = {}
        extendObservable(this, {
            giftList: [],
            limitList: [],
            endList: []
        })
    }

    requestGiftList = () => {
        return this.Post('/api/v2/getCouponList.shtml')
            .then(data => {
                this.giftList = data.packageList
                this.limitList = data.couponAvailableList
                this.endList = data.couponEndList
                return {
                    giftList: this.giftList,
                    limitList: this.limitList,
                    endList: this.endList
                }
            })
        // this.Post({
        //     url: `${API_PATH}/mpwap`,
        //     method: 'post',
        // }).then(data => {
        //     if ((data.packageList.length == 0 &&
        //         data.couponAvailableList.length == 0 &&
        //         data.couponEndList.length == 0))
        //         this.setState({ isEmpty: true })
        //
        //     this.setState({
        //         requestToken: data.couponToken,
        //         giftList: data.packageList,
        //         limitList: data.couponAvailableList,
        //         endList: data.couponEndList
        //     })
        // })
    }


}
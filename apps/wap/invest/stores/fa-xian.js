import { extendObservable } from 'mobx'
import { Components, Utils, Event } from 'fw-javascripts'

export default class FaXian {

    constructor(Ajax) {
        this.Ajax = Ajax

    //     this.data = {}
    //     extendObservable(this.data, {
    //         notice: [],
    //         banners: [],
    //         topics: [],
    //         position_index: 0,
    //         position: 0,
    //         coupon_count: "",
    //         service_phone: '010-65255966',
    //     })
    //     extendObservable(this,{
    //         giftList: [],
    //         limitList: [],
    //         endList: []
    //     })
    // }
}
    // getBannersHandler = () => {
    //     let q = Utils.urlQuery.banner_id;
    //     this.Ajax({
    //         fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
    //         method: 'get',
    //         data: {key: '0ca175b9c0f726a831d895e',id: q || '30'},//'30'},
    //         silence: true
    //     }).catch(data => {
    //         this.data.banners = data.map(i => ({ url: i.url, img: i.thumb }))

    getBannersHandler = () => {
        let q = Utils.urlQuery.banner_id

        this.Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: { key: '0ca175b9c0f726a831d895e', id: q || '30' },//'30'},
            silence: true
        }).catch(data => {
            this.data.banners = data.map(i => ({ url: i.url, img: i.thumb }))


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

        })
    }
}

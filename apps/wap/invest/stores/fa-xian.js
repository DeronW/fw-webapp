import { extendObservable } from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class FaXian{
    constructor(Ajax){
        this.Ajax = Ajax

        this.data = {}
        extendObservable(this.data, {
            notice: [],
            banners: [],
            topics: [],
            position_index: 0,
            position: 0,
            coupon_count: "",
            service_phone: '010-65255966'
        })
    }

    getBannersHandler = () => {
        let q = Utils.urlQuery.banner_id;
        this.Ajax({
            fullUrl: 'https://fore.9888.cn/cms/api/appbanner.php',
            method: 'get',
            data: {key: '0ca175b9c0f726a831d895e',id: q || '30'},//'30'},
            silence: true
        }).catch(data => {
            this.data.banners = data.map(i => ({ url: i.url, img: i.thumb }))
        })
    }
}
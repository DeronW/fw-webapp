import { extendObservable} from 'mobx'
import { Utils } from 'fw-javascripts'

export default class Fxh{
    constructor(Post){
        this.Post = Post
        extendObservable(this, {
            data:[],
            sliderNum:''
        })
    }

    watchSliderNum = (num) => {
        this.sliderNum = num;
    }


    getBaseInfo = () => {
        this.Post(`/api/loan/v1/baseinfo.json`,{
            productId: Utils.urlQuery.pid || 1
        }).then((data)=>{
            this.data = data
        })
    }






}




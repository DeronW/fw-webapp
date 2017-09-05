import { extendObservable} from 'mobx'
import { Utils } from 'fw-javascripts'

export default class Fxh{
    constructor(request,state={}){
        this.request = request;
        this.API_PATH = 'http://localhost/fake-api';
        extendObservable(this,{
            data:[]
        },state)
    }

    getBaseInfo(){
        this.request(`${this.API_PATH}/api/loan/v1/baseinfo.json`,{
            productId: Utils.urlQuery.pid || 1
        }).then((data)=>{
            this.data = data
        })
    }

}




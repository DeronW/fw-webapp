import {extendObservable} from 'mobx'
import { Utils } from 'fw-javascripts'

export default class Fxh{
   constructor(request){
       this.request = request
       extendObservable(this,{
           availableLoan: '',
           present_availableLoan:'',
           orioleOrderGid:'',
           creditLine:'',
           present_creditLine: '',
           show_tip: "最高"
       })
   }

    getFxhData(params){
       let q = Utils.urlQuery;
       params={
           productId: q.pid || 1
       }
        return this.request('http://localhost/fake-api/api/loan/v1/baseinfo.json',params).then( data => {
            this.availableLoan = data.availableLoan;
            this.present_availableLoan = data.availableLoan;
            this.availableLoan = data.availableLoan;
            this.availableLoan = data.availableLoan;
            this.availableLoan = data.availableLoan;
            this.availableLoan = data.availableLoan;
        })
    }

}



import { observable, extendObservable, computed } from 'mobx'

export default class Common {

    @observable language = "zh_CN";
    @observable temporaryPolicyId = '';

    constructor(Get) {
        this.Get = Get
    }

    refresh_tid = () => {
        this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
            .then(data => this.temporaryPolicyId = data.temporaryPolicyId)
    }

    set_tid = tid => {
        this.temporaryPolicyId = tid
    }

}
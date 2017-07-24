import {extendObservable, computed} from 'mobx'

export default class SubmitReserve {
    constructor(Post) {
        this.Post = Post;
        extendObservable(this, {
            currentMoney: '45214',//用户账户的现有金额
            reserveMoney: '',//用户输入的预约金额
            isChecked: true
        })
    }

    setFormData = (field, value) => {
        this[field] = value
        console.log(this.reserveMoney)
    }
}
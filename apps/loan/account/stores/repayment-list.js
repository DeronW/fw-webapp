import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'

export default class RepaymentList {
    constructor(Post) {
        this.Post = Post;
        extendObservable(this, {})
    }
}
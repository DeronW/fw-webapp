import { extendObservable, computed } from 'mobx'

export default class LoopLoan {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
        })
    }
}

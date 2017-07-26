import { extendObservable, computed } from 'mobx'


export default class Home {

    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
        })
    }
}
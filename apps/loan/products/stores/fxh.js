import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'


export default class Fxh {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
        })

    }

}


import {extendObservable, computed} from 'mobx'
import * as $FW from 'fw-components'

export default class MyReserve {
    constructor(Post) {
        this.Post = Post
        extendObservable(this, {})
    }
}
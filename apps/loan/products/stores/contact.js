import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'


export default class Contact {
    constructor(Post) {
        this.Post = Post
        this.data = {}
        extendObservable(this.data, {

            })
        }
    }

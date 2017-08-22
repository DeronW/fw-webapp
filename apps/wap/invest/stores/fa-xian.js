import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class FaXian{
    constructor(Post){
        this.Post = Post

        this.data = {}
        extendObservable(this.data, {
            
        })
    }
}
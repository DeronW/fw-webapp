import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class Home{
    constructor(Post){
        this.Post = Post

        extendObservable(this,{
            
        })
    }
}
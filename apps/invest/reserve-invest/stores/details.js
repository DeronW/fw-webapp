import { extendObservable, computed } from 'mobx'
import * as $FW from 'fw-components'

export default class Details{
    constructor(Post){
        this.Post = Post
        extendObservable(this,{
            
        })
    }
}
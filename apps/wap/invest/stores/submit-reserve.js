import { extendObservable,computed } from 'mobx'

export default class SubmitReserve{
    constructor(Post){
        this.Post = Post;
        extendObservable(this,{

        })
    }
}
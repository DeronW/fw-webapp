import { extendObservable } from 'mobx'

export default class Quotation {

    constructor(post) {
        this.post = post;
        extendObservable(this, {
            options: [
                {
                    name: '平安车险',
                    type: '0',
                    detail: {}
                }, {
                    name: '太平洋车险',
                    type: '1',
                    detail: {}
                }, {
                    name: '人保车险',
                    type: '2',
                    detail: {}
                }
            ],
            selected: ''
        })
    }

}

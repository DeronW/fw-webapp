import { extendObservable, computed } from 'mobx'
import { Storage } from '../../lib/helpers'
import { Components } from 'fw-javascripts'

export default class InviteActivity {

    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            shareLink: ""
        })
    }
    getShareLink = () => {
        this.Post("/api/shareTemplate/v1/getContent.json", {
            channelCode: "OFFICIAL",
            templateType: 1
        }).then((data) => {
            this.shareLink = data.shareTemplate.templateUrl;
        }, err => {

        })
    }

}

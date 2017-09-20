import { extendObservable, computed } from 'mobx'
import { Storage } from '../../lib/helpers'
import { Components } from 'fw-javascripts'

export default class WeixinInvite {
    constructor(Post){
        this.Post = Post;
        extendObservable(this, {
            shareLink :"",
            text:"",
            invitationRecord:[]
        })
    }
    getContent = () => {
        return this.Post(`/api/shareTemplate/v1/getContent.json`,{
            channelCode: "OFFICIAL",
            templateType: 1
        }).then( data => {
            this.shareLink = data.shareTemplate.templateUrl;
        })
    }
    loadMore  = (done) => {
        return this.Post(`/api/userBase/v1/invitationRecord.json`,{
            pageIndex: 1,
            pageSize: 20
        }).then( data => {
            this.invitationRecord = this.invitationRecord.concat(data.invitationRecord);
            this.pageIndex ++;
            this.hasData = data.totalPage > this.pageIndex
            done && done()
        })
    }

}

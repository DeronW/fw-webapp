import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'
import * as $FW from 'fw-javascripts'

export default class RedBagRecords {

    constructor(Post) {
        this.Post = Post;
        // this.API_PATH = 'http://localhost/fake-api';

        extendObservable(this, {
            page: 1,
            rows: [],
            hasData: true
        })
    }
    loadMore = (done) => {
        if (!this.hasData) return done && done();
        // let user = $FW.Store.getUserDict();

        return this.Post(`/api/redbag/v1/list.json`, {
            pageSize: 20,
            pageIndex: this.page
        }).then(data => {
            let RedPacketDetailList = data.resultList;
            this.rows = RedPacketDetailList;
            this.page = this.page < data.totalPage ? this.page + 1 : this.page = 0;
            this.hasData = !!RedPacketDetailList.length;
            done && done()
        })
    }
}
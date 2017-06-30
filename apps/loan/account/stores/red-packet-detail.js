import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class RedPacketDetail {

    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            page: 1,
            rows: [],
            hasData: true
        })
    }
    @computed get loadMore(done) {
        if (!this.state.hasData) return done && done();
        let user = $FW.Store.getUserDict();

        return this.Post(`${API_PATH}/api/redbag/v1/list.json`, {
            pageSize: 20,
            pageIndex: this.page
        }).then(data => {
            let RedPacketDetailList = data.resultList;
            this.rows: RedPacketDetailList;
            this.page: this.state.page < data.totalPage ? this.page + 1 : this.page = 0;
            this.hasData: !!RedPacketDetailList.length
            done && done()
        })
    }
}
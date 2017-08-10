import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'
import { Event, Utils } from 'fw-javascripts'

import { Post } from '../../lib/helpers'
import { Header } from '../../lib/components'
import styles from '../css/repayment-fangxin-records.css'


@inject('repayment_fangxin')
@observer
@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class RepaymentFangxinRecords extends React.Component {

    state = {
        list: [],
        curPage: 1
    }

    componentDidMount() {
        this.loadMore(null)
        Event.touchBottom(this.loadMore)
    }

    formatTime = (ms) => {
        let jsonDate = new Date(Number(ms)).toJSON();
        let YMD = jsonDate.slice(0, 10)
        let HMS = jsonDate.slice(11, 19)
        return `${YMD} ${HMS}`
    }

    loadMore = (done) => {
        if (this.state.curPage === 0) return done && done()

        Post(`/api/repayment/v1/repaymentrecordlist.json`, {
            repaymentid: Utils.hashQuery.repaymentUuid,
            page: this.state.curPage,
            pageSize: 20
        }).then((data) => {

            let list_temp = [...this.state.list],
                curPage_temp = this.state.curPage;
            list_temp.push(...data.resultList)

            curPage_temp === data.totalPage ?
                curPage_temp = 0 :
                curPage_temp++;
            this.setState({ list: list_temp, curPage: curPage_temp })

            done && done()
        })
    }

    render() {

        let generate_list_item = (item, index) => (
            <div styleName="record-list-item" key={item.createTime + index}>
                <div styleName="left-els">
                    <div styleName="amount">{item.repaymentAmtStr}</div>
                    <div styleName="time">{item.createTimeStr}</div>
                </div>
                <div styleName="right-els">
                    <span>{item.bankShortName}</span>
                    <span>{`(尾号${item.cardNo.slice(-4)})`}</span>
                </div>
            </div>
        )

        return <div>
            <Header title="还款记录" history={this.props.history} />
            <img styleName="banner" src={require('../images/repayment-fangxin-records/banner.png')} />
            <div styleName="records-panel">
                {this.state.list.map(generate_list_item)}
            </div>
        </div>
    }
}

export default RepaymentFangxinRecords
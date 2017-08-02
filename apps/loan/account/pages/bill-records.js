import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import { Post } from '../../lib/helpers'
import { Event, Utils } from 'fw-javascripts'

import styles from '../css/bill-records.css'

@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BillRecords extends React.Component {
    state = {
        current_type: Utils.hashQuery.type || '1',
        tab: {
            '1': { name: '申请中', page_no: 1, records: [] },
            '2': { name: '还款中', page_no: 1, records: [] },
            '3': { name: '未通过', page_no: 1, records: [] },
            '4': { name: '已还款', page_no: 1, records: [] }
        }
    }

    loadMoreHandler = (done) => {
        let { current_type, tab } = this.state, current_tab = tab[current_type];
        if (current_tab.page_no === 0) return done && done();

        Post(`/api/order/v1/orderList.json`, {
            pageSize: 10,
            pageIndex: current_tab.page_no,
            loanStatus: current_type
        }).then(data => {
            tab[current_type].records.push(...data.resultList)
            current_tab.page_no < data.totalPage ?
                tab[current_type].page_no++ :
                tab[current_type].page_no = 0;
            this.setState({ tab: tab });

            done && done()
        })
    }
    componentDidMount() {
        this.loadMoreHandler(null);
        Event.touchBottom(this.loadMoreHandler);
    }
    switchTabHandler = (type) => {
        this.setState({ current_type: type }, this.loadMoreHandler);
    }
    render() {
        let { current_type, tab } = this.state;

        let btn_tab = (type, index) => {
            let cn = `ui-tab-li ${type === current_type && 'ui-select-li'}`
            return <a key={index} styleName={cn}
                onClick={() => this.switchTabHandler(type)}>
                <span styleName="text">{tab[type].name}</span>
            </a>
        }

        let order_item = (order, index) => {
            let link = order.productId == 1 ?
                `/static/loan/fxh-bill/index.html?uuid=${order.loanGid}` :
                `/static/loan/dumiao-bill/index.html?uuid=${order.uuid}&baseStatus=${order.baseStatus}`;

            return <a styleName="list_li" key={`${order.orderGid}${index}`} href={link}>
                <div styleName="list-img"><img src={order.productLogo} /></div>
                <div styleName="list-content">
                    <div styleName="apply-num">借款金额:{order.loanAmtStr}元</div>
                    <div styleName="apply-duration">借款期限:{order.termNumStr}</div>
                </div>
                <div styleName="right-arrow">
                    <img src={require("../images/bill-records/right-arrow.png")} /></div>
                <div styleName="apply-status-wrap">
                    <div styleName="apply-status">
                        <span styleName={`bill-${current_type}-color`}>{current_type == 2 ? "立即还款" : tab[current_type].name}</span>
                    </div>
                    <div styleName="apply-time">{order.loanSuccessTime}</div>
                </div>
            </a>
        }

        let payback_item = (i, index) => {
            return <div styleName="payback-item" key={`${i.orderGid}${index}`}>
                <div styleName="pi-title">{i.productName}</div>
                <div styleName="pi-overdate">已逾期</div>
                <div styleName="pi-money">&yen;{i.loanAmt}</div>
                <a styleName="pi-payback">还款</a>
                <div styleName="pi-date-limit">{i.termNumStr}</div>
                <div styleName="pi-date-release">{i.loanTimeStr}</div>
                <div styleName="pi-date-payback">{i.repaymentTimeStr}</div>
                <div styleName="pi-txt-limit">期限</div>
                <div styleName="pi-txt-release">放款日</div>
                <div styleName="pi-txt-payback">还款日</div>

                <div styleName="pi-line-a"></div>
                <div styleName="pi-line-b"></div>
                <div styleName="pi-line-c"></div>
            </div>
        }

        let empty = <span styleName="no-data"></span>
        let records = this.state.tab[this.state.current_type].records

        return <div styleName="bg">
            <Header title="订单记录" />

            <div styleName="bill-header">
                {['1', '2', '3', '4'].map(btn_tab)}</div>

            <div styleName="billContainer">
                {current_type != 2 && records.map(order_item)}</div>

            {current_type == 2 && records.map(payback_item)}
            {records.length === 0 && empty}
        </div>
    }
}

export default BillRecords
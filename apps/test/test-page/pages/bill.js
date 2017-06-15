import React from 'react'
import {render} from 'react-dom'
import { Redirect, Link } from 'react-router-dom'
import BottomNav from '../components/bottom-nav'
import CSSModules from 'react-css-modules'
import styles from '../css/bill.css'
import { observer, inject } from 'mobx-react'

@inject('bill') @observer @CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
export default class Bill extends React.Component {
    componentDidMount() {
        document.title = '借款账单'
    }
    render() {
        let { bill } = this.props;

        let tab = (type, title) => {
            return <a styleName={
                bill.current_type == type ? "nav-bar-item active" : 'nav-bar-item'}
                      onClick={() => bill.switch_type(type)}> {title} </a>
        }

        let order_item = bill => {
            let status_title;
            if(bill.baseStatus == 1) status_title = "申请中"
            if(bill.baseStatus == 2) status_title = "还款中"
            if(bill.baseStatus == 3) status_title = "未通过"
            if(bill.baseStatus == 4) status_title = "已还款"
            return <div styleName="list_li" key={bill.orderGid}>
                <div styleName="list-img"><img src={bill.productLogo} /></div>
                <div styleName="list-content">
                    <div styleName="apply-num">借款金额:{bill.loanAmtStr}元</div>
                    <div styleName="apply-duration">借款期限:{bill.termNumStr}</div>
                </div>
                <div styleName="apply-status-wrap">
                    <div styleName="apply-status">
                        <span styleName={`bill-${bill.baseStatus}-color`}>
                            {status_title}
                        </span>
                    </div>
                    <div styleName="apply-time">{bill.loanTimeStr}</div>
                </div>
            </div>
        }

        let Empty = <div styleName="no-data-img">
            <img src={require("../images/bill/no-data.png")}/>
        </div>


        return <div>
            <div styleName="header">借款账单</div>
            <div styleName="nav-bar">
                {tab('apply', '申请中')}
                {tab('returning', '还款中')}
                {tab('failed', '未通过')}
                {tab('paid', '已还款')}
                <div styleName="bottom-line"></div>
            </div>
            <div styleName="list-container">
                {bill.current_list.map(order_item)}
            </div>
            {bill.current_list.length === 0 && Empty}
            <BottomNav/>
        </div>
    }

}

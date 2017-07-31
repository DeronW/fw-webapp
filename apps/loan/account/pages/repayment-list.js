import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Header } from '../../lib/components'

import styles from '../css/repayment-list.css'

@inject("repayment_list")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class RepaymentList extends React.Component {
   
        // state = {
        //     current_type: window.location.hash.slice(1) || '1',
        //     tab: {
        //         '1': { name: '申请中', page_no: 1, order_list: [] },
        //         '2': { name: '还款中', page_no: 1, order_list: [] },
        //         '3': { name: '未通过', page_no: 1, order_list: [] },
        //         '4': { name: '已还款', page_no: 1, order_list: [] }
        //     }
        // }
  
        componentDidMount(){
            let {repayment_list} = this.props;
            // let {current_type} = this.state;
            repayment_list.getRepaymentList();
        }
        toRepaymentDetail = () => {
            let {repayment_list,history} = this.props;
            history.push('/repayment-youyi', {query: { loanUuid: repayment_list.loopLoanUuid }} )
        }
    render(){
        let {repayment_list, history} = this.props;
        let resultList = repayment_list.resultList;
        let repayment_item = (item,index) => {
            return <div styleName="item-self" key={index}>
                <div styleName="top">
                        <div styleName="top-left">
                            <span styleName="logo-text">放心花</span>
                            <span styleName="status">已逾期</span>
                        </div>
                        <div styleName="top-right">
                            <span styleName="repay-num">&yen;2898</span>
                            <span styleName="repay-btn" onClick = {this.toRepaymentDetail}>还款</span>
                        </div>
                    </div>
                    <div styleName="line"></div>
                    <div styleName="bottom">
                        <div styleName="time-limit">
                            <p styleName="time-detail">21天</p>
                            <p styleName="desc">期限</p>
                        </div>
                        <b styleName="gap-line"></b>
                        <div styleName="put-day">
                            <p styleName="time-detail">2017-7-28</p>
                            <p styleName="desc">放款日</p>
                        </div>
                        <b styleName="gap-line"></b>
                        <div styleName="deadline">
                            <p styleName="time-detail">2017-7-28</p>
                            <p styleName="desc">还款日</p>
                        </div>
                    </div>
            </div>
        }
        return <div>
            <Header title="还款" history={history} enable={'force'}/>
            {/*内容部分*/}
            <div styleName="repayment-content">
                {resultList.map(repayment_item)}
            </div>
        </div>
    }
}
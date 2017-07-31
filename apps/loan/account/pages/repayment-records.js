import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Header } from '../../lib/components'
import { Browser, Post } from '../../lib/helpers'

import styles from '../css/repayment-records.css'

@inject("repayment_youyi")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class RepaymentRecords extends React.Component {
        state = {
            loanUuid:"",
            productId:"",
            resultList: [],
            curPage: 1,
            uid: ""
        }
        componentDidMount(){
            let {repayment_youyi} = this.props;
            console.log(111);
            console.log(this.state.loanUuid);
            console.log(222);
            repayment_youyi.setLoanId(this.state.loanUuid);
            Post(`/api/order/v1/orderList.json`, {
            page: this.state.curPage,
            pageSize: 10,
            loanStatus: 2
        }).then(data => {
            this.setState({ resultList:  data.resultList })
        })

        }
        toRepaymentDetail = () => {
            let {repayment_list,history} = this.props;
            let {loanUuid, productId} = this.state;
            // 根据返回的productId跳转到不同的还款页面
            productId == '1' && (location.href = `/static/loan/repayment-record/index.html`);
            productId == '21' && history.push('/repayment-youyi');
            productId == '11' && history.push('/repayment-youyi');
            
        }
    render(){
        let {history} = this.props;
        let {resultList} = this.state;
        let repayment_item = (item,index) => {
            this.state.productId = item.productId;
            this.state.loanUuid = item.uuid;
            return <div styleName="item-self" key={index}>
                <div styleName="top">
                        <div styleName="top-left">
                            <span styleName="logo-text">{item.productName}</span>
                            {item.overdueStatus && <span styleName="status">已逾期</span>}
                        </div>
                        <div styleName="top-right">
                            <span styleName="repay-num">&yen;{item.loanLeftAmtStr}</span>
                            <span styleName="repay-btn" onClick = {this.toRepaymentDetail}>还款</span>
                        </div>
                    </div>
                    <div styleName="line"></div>
                    <div styleName="bottom">
                        <div styleName="time-limit">
                            <p styleName="time-detail">{item.termNumStr}</p>
                            <p styleName="desc">期限</p>
                        </div>
                        <b styleName="gap-line"></b>
                        <div styleName="put-day">
                            <p styleName="time-detail">{item.loanTimeStr}</p>
                            <p styleName="desc">放款日</p>
                        </div>
                        <b styleName="gap-line"></b>
                        <div styleName="deadline">
                            <p styleName="time-detail">{item.repaymentTimeStr}</p>
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
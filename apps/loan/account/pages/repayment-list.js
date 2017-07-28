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
    render(){
        // let repayment_item = (item,index) => {
        //     return <div styleNme="item-self">
        //         <div styleName="top">
        //             <div styleName="top-left">
        //                 <span styleName="logo-text">放心花</span>
        //                 <span styleName="status">已逾期</span>
        //             </div>
        //             <div styleName="top-right">
        //                 <span styleName="repay-num">&yen;2898</span>
        //                 <span styleName="repay-btn">还款</span>
        //             </div>
        //         </div>
        //         <div styleName="line"></div>
        //         <div styleName="bottom"></div>
        //     </div>
        // }
        return <div>
            <Header title="还款" history={history} enable={'force'}/>
            {/*内容部分*/}
            <div styleName="repayment-content">
                <div styleName="item-self">
                    <div styleName="top">
                        <div styleName="top-left">
                            <span styleName="logo-text">放心花</span>
                            <span styleName="status">已逾期</span>
                        </div>
                        <div styleName="top-right">
                            <span styleName="repay-num">&yen;2898</span>
                            <span styleName="repay-btn">还款</span>
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
            </div>
        </div>
    }
}
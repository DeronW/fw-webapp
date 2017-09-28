import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/coupon.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Coupon extends React.Component {

    state = {
        tab: 'TA的优惠券',
        type:'返现券'
    }

    switchTab = tab => {
        if (tab == this.state.tab) return
        this.setState({ tab: tab })
    }

    switchType = type => {
        if (type == this.state.type) return
        this.setState({ type: type })
    }
    render() {
        let { history } = this.props
        let { tab,type } = this.state

        let tabs = ['TA的优惠券', '使用记录', '过期记录']
        let coupons = ['返现券', '返息券', '返金券']

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                onClick={() => this.switchTab(item)}>
                {item}
            </div>
        }
        let couponFn = (item,index) => {
            return <div key={item+index} styleName={item == type ? "type typeActive" : "type"}
                onClick={() => this.switchType(item)}>
                {item}
            </div>
        }
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tabFn)}
                </div>
            </div>
            <div styleName="coupons">
                {coupons.map(couponFn)}
            </div>
            <div styleName="couponBox">
                <div styleName="title">{`可用${type}`}</div>
                <div styleName="num"><span>1</span>张</div>
                <div styleName="text"><span>送TA优惠券</span><img src={require('../../images/investor/coupon/right.png')}/></div>
            </div>
            <div styleName="couponList">
                <div styleName="couponMoney">
                    <div styleName="money">￥<span>10</span></div>
                    <div styleName="explain">满福金秋</div>
                    <div styleName="time">有效期 2017-09-18</div>
                    <div styleName="limit">投资 <span>¥18,000</span> 可用</div>
                    <div styleName="day">投资期限 <span>≥90天</span> 可用</div>
                </div>
            </div>
        </div>
    }
}
export default Coupon

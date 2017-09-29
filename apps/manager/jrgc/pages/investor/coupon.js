import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/coupon.css'

@inject("investor")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Coupon extends React.Component {

    state = {
        tab: 'TA的优惠券',
        type: '返现券'
    }
    componentDidMount() {
        this.props.investor.fetchCouponList()
    }
    gotoCoupon = () => {
        let { history } = this.props
        history.push("/user-transfer-coupon")
    }
    switchTab = tab => {
        if (tab == this.state.tab) return
        this.setState({ tab: tab, type: '返现券' })
    }

    switchType = type => {
        if (type == this.state.type) return
        this.setState({ type: type })
    }
    render() {
        let { history, investor } = this.props, { couponList } = investor.data.coupon
        let { tab, type } = this.state

        let tabs = ['TA的优惠券', '使用记录', '过期记录']
        let coupons = ['返现券', '返息券', '返金券']

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                onClick={() => this.switchTab(item)}>
                {item}
            </div>
        }

        let typeFn = (item, index) => {
            return <div key={item + index} styleName={item == type ? "type typeActive" : "type"}
                onClick={() => this.switchType(item)}>
                {item}
            </div>
        }
        let t = (id) => {
            if (id == 1) {
                return <div styleName="money">￥<span>10</span></div>
            } else if (id == 2) {
                return <div styleName="money">+<span>0.8</span>%</div>
            } else {
                return <div styleName="money"><span>1</span>克</div>
            }
        }
        let limit = (id) => {
            if (id == 1 || id == 2) {
                return <div styleName="limit">投资 <span>¥18,000</span> 可用</div>
            } else {
                return <div styleName="limit">购买<span>10</span>克可用</div>
            }
        }
        let couponFn = (item, index) => {
            let id = item.id
            let s = id == 1 ? 'couponBg couponMoney' : (id == 2 ? 'couponBg couponInterest' : 'couponBg couponGold')
            return <div styleName={s} key={index}>
                {t(id)}
                <div styleName="explain">满福金秋</div>
                <div styleName="time">有效期 2017-09-18</div>
                {limit(id)}
                <div styleName="day">投资期限 <span>≥90天</span> 可用</div>
                <div styleName="expire"></div>
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
                {coupons.map(typeFn)}
            </div>
            <div styleName="couponBox" onClick={this.gotoCoupon}>
                <div styleName="title">{`可用${type}`}</div>
                <div styleName="num"><span>1</span>张</div>
                <div styleName="text"><span>送TA优惠券</span><img src={require('../../images/investor/coupon/right.png')} /></div>
            </div>
            <div styleName="couponList">
                {couponList.map(couponFn)}
            </div>
            <div styleName="load">已经全部加载完毕</div>
        </div>
    }
}
export default Coupon

import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/coupon.css'

@inject("investor","investor_coupon")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Coupon extends React.Component {

    componentDidMount() {
        let { resetPageNo, fetchCustCoupon } = this.props.investor_coupon
        resetPageNo()
        fetchCustCoupon()
    }
    gotoCoupon = () => {
        let { history } = this.props
        let { detail } = this.props.investor.data.info

        history.push(`/user-transfer-coupon?custId=${detail.custId}&realName=${detail.realName}`)
    }
    switchTab = tab => {
        if (tab == this.props.investor_coupon.data.tab) return
        this.props.investor_coupon.resetPageNo()
        this.props.investor_coupon.setTab(tab)
        this.props.investor_coupon.fetchCustCoupon()
    }

    switchType = type => {
        let { tab, coupon } = this.props.investor_coupon.data
        if (type == coupon[tab].type) return
        this.props.investor_coupon.resetPageNo()
        this.props.investor_coupon.setType(type)
        this.props.investor_coupon.fetchCustCoupon()
    }
    render() {
        let { history, investor_coupon } = this.props
        let { tab,totalCount, coupon } = investor_coupon.data
        let { tabName, type, record } = coupon[tab]
        let remark = (item)=>{
            return item.oldUserId ? '好友赠送':item.remark
        }

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                onClick={() => this.switchTab(item)}>{coupon[item].tabName}</div>
        }

        let typeFn = (item, index) => {
            return <div key={item + index} styleName={item == type ? "type typeActive" : "type"}
                onClick={() => this.switchType(item)}>{record[item].name}</div>
        }
        let t = (conponType, beanCount) => {
            if (conponType == 0) {
                return <div styleName="money">￥<span>{beanCount}</span></div>
            } else if (conponType == 1) {
                return <div styleName="money">+<span>{beanCount}</span>%</div>
            } else {
                return <div styleName="money"><span>{beanCount}</span>克</div>
            }
        }
        let limit = (conponType, investMultip) => {
            if (conponType == 0 || conponType == 1) {
                return <div styleName="limit">投资 <span>¥{investMultip}</span> 可用</div>
            } else {
                return <div styleName="limit">购买<span>{investMultip}</span>克可用</div>
            }
        }
        let day = (item) => {
            if(item.inverstPeriod == 0){
                return <div styleName="day">任意标可用</div>
            }else{
                return <div styleName="day">投资期限>= <span>{item.inverstPeriod}天</span> 可用</div>
            }
        }
        let couponFn = (item, index) => {
            let conponType = item.conponType

            let s = conponType == 0 ? 'couponBg couponMoney' : (conponType == 1 ? 'couponBg couponInterest' : 'couponBg couponGold')
            let outBg = {
                background: "url('data:image/png;base64,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')"
            }
            let usedBg = {
                background: "url('data:image/png;base64,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')"
            }
            let b = tabName == '过期记录' ? outBg : (tabName == '使用记录' ? usedBg : {})

            return <div styleName={s} style={b} key={index}>
                {t(conponType, item.beanCount)}
                <div styleName="explain">{remark(item)}</div>
                <div styleName="time">有效期 {item.overdueTime}</div>
                {limit(conponType, item.investMultip)}
                <div styleName="day">{}投资期限 <span>{item.inverstPeriod}天</span> 可用</div>
                {item.isOver == '1' && <div styleName="expire"></div>}
            </div>
        }
        let name = ()=>{
            let n
            if(tabName=='TA的优惠券'){
                n = `可用${record[type].name}`
            }else if(tabName=='使用记录'){
                n = `已使用${record[type].name}`
            }else{
                n = `已过期${record[type].name}`
            }
            return n
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {['1', '2'].map(tabFn)}
                </div>
            </div>
            <div styleName="coupons">
                {['0', '1', '2'].map(typeFn)}
            </div>
            <div styleName="couponBox" onClick={this.gotoCoupon}>
                <div styleName="title">{name()}</div>
                <div styleName="num"><span>{totalCount}</span>张</div>
                <div styleName="text"><span>送TA优惠券</span><img src={require('../../images/investor/coupon/right.png')} /></div>
            </div>
            <div styleName="couponList">
                {record[type].records && record[type].records.length > 0 ? record[type].records.map(couponFn) : empty}
            </div>
            {record[type].records.length > 0 && <div styleName="load">已经全部加载完毕</div>}

        </div>
    }
}
export default Coupon

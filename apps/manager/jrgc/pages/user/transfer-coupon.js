import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event, Components, Utils } from 'fw-javascripts'
import { Header, BottomNavBar } from '../../components'
import styles from '../../css/user/transfer-coupon.css'

@inject('user_coupon')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class TransferCoupon extends React.Component {

    componentDidMount() {
        let { resetCouponPageNo, fetchCouponList } = this.props.user_coupon
        resetCouponPageNo()
        fetchCouponList()
        Event.touchBottom(fetchCouponList)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    tabHanlder = (tab) => {
        let { setCouponType, fetchCouponList } = this.props.user_coupon
        let { type } = this.props.user_coupon.data.coupon
        if (type == tab) return
        setCouponType(tab)
        fetchCouponList()
    }

    transferHandler = (couponId,conponType,beanCount,remark,overdueTime,investMultip,inverstPeriod) => {
        let { history } = this.props
        let {custId,realName} =Utils.hashQuery
        if(custId !== undefined){
            this.presentHandler(beanCount,conponType,realName,custId)
        }else{
            history.push(`/user-transfer-friends?couponId=${couponId}&conponType=${conponType}&beanCount=${beanCount}&remark=${remark}&overdueTime=${overdueTime}&investMultip=${investMultip}&inverstPeriod=${inverstPeriod}`)
        }
    }
    presentHandler = (beanCount,type,name, custId) => {
        //弹层
        let unit = type == '返金券' ? '克' : '元'

        let v = confirm(`确认将${beanCount}${unit}${type},赠送给${name}吗？`)
        if (v == true) {
            this.props.user_coupon.presentCoupon(couponId, type, custId)
        }
    }
    render() {
        let { history } = this.props
        let { sum,type, list } = this.props.user_coupon.data.coupon
        let current_tab = list[type]
        let coupon_func = (item, index) => {
            return <div styleName={item == type ? "couponTabItem tabOn" : "couponTabItem"} key={index}
                onClick={() => this.tabHanlder(item)}>{list[item].name}</div>
        }
        let coupon_detail = (item, index) => {
            let coutent_style = item == '1' ? "contentItem contentBlue" : item == '0' ? "contentItem contentRed" : "contentItem contentYellow"
            let btn_style = item == '1' ? "giveBtn giveBtnBlue" : item == '0' ? "giveBtn giveBtnRed" : "giveBtn giveBtnYellow"
            let unit = item == '2' ?'克':'元'

            return <div styleName={coutent_style}
                        key={index}
                        onClick={() => this.transferHandler(item.couponId,item.conponType,item.beanCount,item.remark,item.overdueTime,item.investMultip,item.inverstPeriod)}>
                <div styleName="itemLine itemUp">
                    <div styleName="lineLeft"><span styleName="rmb">￥</span>{item.beanCount}{unit}</div>
                    <div styleName={btn_style}>转赠</div>
                </div>
                <div styleName="itemLine itemDown">
                    <div styleName="lineLeft">{item.remark}</div>
                    <div styleName="lineRight">有效期 {item.overdueTime}</div>
                </div>
                <div styleName="itemLine itemDes">
                    <div styleName="lineLeft desLeft">投资 ¥{item.investMultip} 可用</div>
                    <div styleName="lineRight desRight">投资期限 {item.inverstPeriod}天 可用</div>
                </div>
                {item.isOver && <div styleName="labelOverdate"></div>}
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div styleName="coupons">
            <Header title="转赠优惠券" history={history} sub_title="转赠记录" sub_link="/user-transfer-record" />
            <div styleName="couponTab">
                {['1', '0', '2'].map(coupon_func)}
            </div>
            <div styleName="couponCount">
                <div styleName="countLeft">
                    <div>可转赠{current_tab.name}</div>
                    <div><span styleName="totalNum">{sum}</span>张</div>
                </div>
                <div styleName="countRight">
                    不可转赠的券请至金融工场app查看
                </div>
            </div>
            <div styleName="tabContent">
                {current_tab.list && current_tab.list.length>0 ?current_tab.list.map(coupon_detail):empty}
            </div>
        </div>
    }
}


export default TransferCoupon
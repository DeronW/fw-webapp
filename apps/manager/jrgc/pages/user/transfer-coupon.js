import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/user/transfer-coupon.css'


const couponData = [{count: 100, data: '2017-09-22', des: '返现券'}, {count: 200, data: '2017-09-22', des: '返现券'}]

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class TransferCoupon extends React.Component {
    state = {
        coupon_num: 1
    }

    tabHanlder = (index) => {
        this.setState({coupon_num: index})
    }

    render() {
        let {history} = this.props
        let {coupon_num} = this.state
        let coupon_func = (item, index) => {
            return <div styleName={index == coupon_num ? "couponTabItem tabOn" : "couponTabItem"} key={index}
                        onClick={() => this.tabHanlder(index)}>
                {item}
            </div>
        }
        let coupon_detail = (item, index) => {
            let coutent_style = coupon_num == 0 ? "contentItem contentBlue" : coupon_num == 1 ? "contentItem contentRed" : coupon_num == 2 ? "contentItem contentYellow" : null
            let btn_style = coupon_num == 0 ? "giveBtn giveBtnBlue" : coupon_num == 1 ? "giveBtn giveBtnRed" : coupon_num == 2 ? "giveBtn giveBtnYellow" : null
            return <div styleName={coutent_style} key={index}>
                <div styleName="itemLine itemUp">
                    <div styleName="lineLeft"><span styleName="rmb">￥</span>10</div>
                    <div styleName={btn_style}>满赠</div>
                </div>
                <div styleName="itemLine itemDown">
                    <div styleName="lineLeft">满福金秋</div>
                    <div styleName="lineRight">有效期 2017-09-18</div>
                </div>
                <div styleName="itemLine itemDes">
                    <div styleName="lineLeft desLeft">投资 ¥18,000 可用</div>
                    <div styleName="lineRight desRight">投资期限 ≥90天 可用</div>
                </div>
            </div>
        }
        let count_type = () => {
            if (coupon_num == 0) {
                return "返现券"
            } else if (coupon_num == 1) {
                return "返息券"
            } else if (coupon_num == 2) {
                return "返金券"
            }
        }
        return <div styleName="coupons">
            <Header title="转赠优惠券" history={history} sub_title="转赠记录" sub_link="/user-transfer-records"/>
            <div styleName="couponTab">
                {['返现券', '返息券', '返金券'].map(coupon_func)}
            </div>
            <div styleName="couponCount">
                <div styleName="countLeft">
                    <div>可转赠{count_type()}</div>
                    <div><span styleName="totalNum">1</span>张</div>
                </div>
                <div styleName="countRight">
                    不可转赠的券请至金融工场app查看
                </div>
            </div>
            <div styleName="tabContent">
                {coupon_num == 0 && couponData.map(coupon_detail)}
                {coupon_num == 1 && couponData.map(coupon_detail)}
                {coupon_num == 2 && couponData.map(coupon_detail)}
            </div>
        </div>
    }
}


export default TransferCoupon
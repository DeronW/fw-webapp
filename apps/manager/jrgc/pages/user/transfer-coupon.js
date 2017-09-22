import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/user/transfer-coupon.css'


const couponData = [{count: 100, data: '2017-09-22', des: '返现券'}, {count: 200, data: '2017-09-22', des: '返现券'}]

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class TransferCoupon extends React.Component {
    state = {
        coupon_num: 0
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
            return <div styleName="contentItem" key={index}>
                
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
                {/*{coupon_num == 1 && coupon_detail()}*/}
                {/*{coupon_num == 2 && coupon_detail()}*/}
            </div>
        </div>
    }
}


export default TransferCoupon
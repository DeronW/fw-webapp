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
    state = {
        type:'返现券'
    }
    componentDidMount() {
        let { resetCouponPageNo,setCouponType,setCouponStatus, fetchCouponList } = this.props.user_coupon
        resetCouponPageNo()
        setCouponStatus(1)
        setCouponType('0')
        Event.touchBottom(fetchCouponList)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    typeHanlder = (type) => {
        let { resetCouponPageNo,setCouponType } = this.props.user_coupon
        if (type == this.state.type) return
        this.setState({type:type})
        let t
        if(type == "返现券"){
            t = '0'
        }else if(type == "返息券"){
            t = '1'
        }else{
            t = '2'
        }
        resetCouponPageNo()
        setCouponType(t)
    }

    transferHandler = (couponId,couponType,beanCount,remark,overdueTime,investMultip,inverstPeriod) => {
        let { history } = this.props
        let {custId,realName} =Utils.hashQuery
        if(custId !== undefined){
            this.presentHandler(couponId,beanCount,couponType,realName,custId)
        }else{
            history.push(`/user-transfer-friends?couponId=${couponId}&couponType=${couponType}&beanCount=${beanCount}&remark=${decodeURLComponent(remark)}&overdueTime=${overdueTime}&investMultip=${investMultip}&inverstPeriod=${inverstPeriod}`)
        }
    }
    presentHandler = (couponId,beanCount,type,name,custId) => {
        //弹层
        let unit = type == '返金券' ? '克' : '元'
        let t
        if(type=='0'){
            t = "返现券"
        }else if(type=='1'){
            t = '返息券'
        }else{
            t = '返金券'
        }
        let v = confirm(`确认将${beanCount}${unit}${t},赠送给${name}吗？`)
        if (v == true) {
            this.props.user_coupon.presentCoupon(couponId, type, custId)
                                  .then(() => Components.showAlert("赠送成功"))
                                  .then(() =>{
                                    this.props.user_coupon.resetCouponPageNo()
                                    this.props.user_coupon.fetchCouponList()
                                  })
        }
    }
    render() {
        let { history } = this.props
        let { totalCount, records } = this.props.user_coupon.coupon_data
        let { type } = this.state

        if(this.props.user_coupon.coupon_data !== 'undefined'){
            console.log(this.props.user_coupon.coupon_data)
        }
        let coupon_func = (item, index) => {
            return <div styleName={item == type ? "couponTabItem tabOn" : "couponTabItem"} key={index}
                onClick={() => this.typeHanlder(item)}>{item}</div>
        }
        let coupon_detail = (item, index) => {
            let coutent_style = item.conponType == '0' ? "contentItem contentBlue" : item.conponType == '1' ? "contentItem contentRed" : "contentItem contentYellow"
            let btn_style = item.conponType == '0' ? "giveBtn giveBtnBlue" : item.conponType == '1' ? "giveBtn giveBtnRed" : "giveBtn giveBtnYellow"
            let u = item.conponType == '2' ?'克':''
            let m = item.conponType == '0' ?'￥':''
            let remark = (item)=>{
                return item.oldUserId ? '好友赠送':item.remark
            }
            return <div styleName={coutent_style}
                        key={index}
                        onClick={() => this.transferHandler(item.couponId,item.conponType,item.beanCount,item.remark,item.overdueTime,item.investMultip,item.inverstPeriod)}>
                <div styleName="itemLine itemUp">
                    <div styleName="lineLeft"><span styleName="rmb">{m}</span>{item.beanCount}<span styleName="rmb">{u}</span></div>
                    <div styleName={btn_style}>转赠</div>
                </div>
                <div styleName="itemLine itemDown">
                    <div styleName="lineLeft">{remark(item)}</div>
                    <div styleName="lineRight">有效期 {item.overdueTime}</div>
                </div>
                <div styleName="itemLine itemDes">
                    <div styleName="lineLeft desLeft">{item.conponType=='2'?'购买':'投资' }{m}{item.investMultip}{u} 可用</div>
                    <div styleName="lineRight desRight">投资期限 {item.inverstPeriod}天 可用</div>
                </div>
                {item.isOver == '1' && <div styleName="labelOverdate"></div>}
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div styleName="coupons">
            <Header title="转赠优惠券" history={history} sub_title="转赠记录" sub_link="/user-transfer-record" />
            <div styleName="couponTab">
                {['返现券', '返息券', '返金券'].map(coupon_func)}
            </div>
            <div styleName="couponCount">
                <div styleName="countLeft">
                    <div>可转赠{type}</div>
                    <div><span styleName="totalNum">{totalCount}</span>张</div>
                </div>
                <div styleName="countRight">
                    不可转赠的券请至金融工场app查看
                </div>
            </div>
            <div styleName="tabContent">
                {records && records.length>0 ?records.map(coupon_detail):empty}
            </div>
        </div>
    }
}


export default TransferCoupon
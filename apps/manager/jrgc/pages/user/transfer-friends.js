import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event, Components, Utils } from 'fw-javascripts'
import { Header, BottomNavBar } from '../../components'
import styles from '../../css/user/transfer-friends.css'

@inject('user_coupon')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class TransferFriends extends React.Component {
    state = {
        coupon_type: 0,
        is_empty: false,
        input_value: ''
    }
    componentDidMount() {
        let { resetFriendsPageNo, fetchFriendsList } = this.props.user_coupon
        resetFriendsPageNo()
    }
    searchFriendsHandler = () => {
        // if(this.props.user_coupon.friends_data.keyword == '') return Components.showToast('请输入关键字')
        this.props.user_coupon.resetFriendsPageNo()
        this.props.user_coupon.fetchFriendsList()
    }
    inputHandler = (e) => {
        this.props.user_coupon.setKeyword(e.target.value)
    }
    emptyHandler = () => {
        this.props.user_coupon.setKeyword('')
    }
    presentHandler = (name, custId) => {
        //弹层
        let { history } = this.props
        let { beanCount, couponId, couponType } = Utils.hashQuery
        let unit = couponType == '2' ? '克' : '元'
        let t
        if(couponType=='0'){
            t = "返现券"
        }else if(couponType=='1'){
            t = '返息券'
        }else{
            t = '返金券'
        }
        let v = confirm(`确认将${beanCount}${unit}${t},赠送给${name}吗？`)
        if (v == true) {
            this.props.user_coupon.presentCoupon(couponId, couponType, custId)
            .then(() => Components.showAlert("赠送成功"))
            .then(()=>{
                history.push('/user-transfer-coupon')
            })
        }
    }
    render() {
        let { history } = this.props
        let { pageNo, list, keyword } = this.props.user_coupon.friends_data
        let { beanCount, remark, overdueTime, investMultip, inverstPeriod,couponType } = Utils.hashQuery
        let u = couponType == '2' ? '克' : '元'

        let coupon = () => {
            let coupon_style = couponType == '0' ? "couponItem typeBlue" : couponType == '1' ? "couponItem typeRed" : "couponItem typeYellow"
            return <div styleName={coupon_style}>
                <div styleName="couponValue"><span styleName="rmb">¥</span>{beanCount}<span styleName="rmb">{u}</span></div>
                <div styleName="couponDes">
                    <div styleName="lineLeft desLeft">{remark}</div>
                    <div styleName="lineRight desRight">有效期 {overdueTime}</div>
                </div>
                <div styleName="couponAddtion">
                    <div styleName="lineLeft addLeft">投资 ¥{investMultip} 可用</div>
                    <div styleName="lineRight addRight">投资期限 ≥{inverstPeriod}天 可用</div>
                </div>
            </div>
        }

        let empty = <div styleName="emptyWrapper">
            <div>该用户不存在</div>
            <div styleName="emptyLine">请检查筛选条件，只可通过汉字与数字筛选</div>
        </div>

        let friends_record = (item, index) => {
            return <div styleName="recordItem" key={index}>
                <div styleName="itemText">
                    <div styleName="textLine line1">{item.realName}</div>
                    <div styleName="textLine">{item.mobile}</div>
                    <div styleName="textLine line3" onClick={() => this.presentHandler(item.realName, item.custId)}>赠送</div>
                </div>
            </div>
        }
        return <div>
            <Header title="转赠好友" history={history} />
            <div styleName="bg">
                <div styleName="couponWrapper">
                    {coupon()}
                </div>
                <div styleName="searchWrapper">
                    <input type="text" styleName="inputBox" placeholder="请输入关键字" onChange={this.inputHandler}
                        value={keyword} />
                    <span styleName="searchBtn" onClick={this.searchFriendsHandler}>搜索</span>
                    <div styleName="emptyBtn" onClick={this.emptyHandler}></div>
                </div>
                {list && list.length > 0 ? list.map(friends_record) : empty}
            </div>
        </div>
    }
}


export default TransferFriends
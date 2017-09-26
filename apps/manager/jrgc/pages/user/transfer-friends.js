import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/user/transfer-friends.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class TransferFriends extends React.Component {
    state = {
        coupon_type: 0,
        is_empty: false,
        input_value: ''
    }

    inputHandler = (e) => {
        this.setState({input_value: e.target.value})
    }
    emptyHandler = () => {
        this.setState({input_value: ''})
    }

    render() {
        let {history} = this.props
        let {coupon_type, is_empty, input_value} = this.state
        let coupon = () => {
            let coupon_style = coupon_type == 0 ? "couponItem typeBlue" : coupon_type == 1 ? "couponItem typeRed" : coupon_type == 2 ? "couponItem typeYellow" : null
            return <div styleName={coupon_style}>
                <div styleName="couponValue"><span styleName="rmb">¥</span>80</div>
                <div styleName="couponDes">
                    <div styleName="lineLeft desLeft">王者尊享</div>
                    <div styleName="lineRight desRight">有效期 2017-11-18</div>
                </div>
                <div styleName="couponAddtion">
                    <div styleName="lineLeft addLeft">投资 ¥36,000 可用</div>
                    <div styleName="lineRight addRight">投资期限 ≥180天 可用</div>
                </div>
            </div>
        }

        let empty = () => {
            return <div styleName="emptyWrapper">
                <div>该用户不存在</div>
                <div styleName="emptyLine">请检查筛选条件，只可通过汉字与数字筛选</div>
            </div>
        }

        let friends_record = () => {
            return <div styleName="recordItem">
                <div styleName="itemText">
                    <div styleName="textLine line1">未认证</div>
                    <div styleName="textLine">18911392598</div>
                    <div styleName="textLine line3">赠送</div>
                </div>
            </div>
        }
        return <div>
            <Header title="转赠好友" history={history}/>
            <div styleName="bg">
                <div styleName="couponWrapper">
                    {coupon()}
                </div>
                <div styleName="searchWrapper">
                    <input type="text" styleName="inputBox" placeholder="请输入关键字" onChange={this.inputHandler}
                           value={input_value}/>
                    <span styleName="searchBtn">搜索</span>
                    <div styleName="emptyBtn" onClick={this.emptyHandler}></div>
                </div>
                {friends_record()}
                {is_empty && empty()}
            </div>
        </div>
    }
}


export default TransferFriends
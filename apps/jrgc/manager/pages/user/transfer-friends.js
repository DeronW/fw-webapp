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
        isSearch:false,
        input_value: '',
        pending:false
    }
    componentDidMount() {
        let { resetFriendsPageNo, fetchFriendsList,getCoupon } = this.props.user_coupon
        resetFriendsPageNo()
        getCoupon()
        Event.touchBottom(fetchFriendsList)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    searchFriendsHandler = () => {
        this.setState({isSearch:true})
        if(this.state.pending) return
        this.setState({pending:true})

        this.props.user_coupon.resetFriendsPageNo()
        this.props.user_coupon.fetchFriendsList().then(()=>{
            this.setState({pending:false})
        })
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
        let { coupon } = this.props.user_coupon.friends_data
        let unit = coupon.couponType == '2' ? '克' : '元'
        let t
        if(coupon.couponType=='0'){
            t = "返现券"
        }else if(coupon.couponType=='1'){
            t = '返息券'
        }else{
            t = '返金券'
        }
        let v = confirm(`确认将${coupon.beanCount}${unit}${t},赠送给${name}吗？`)
        if (v == true) {
            this.props.user_coupon.presentCoupon(custId)
            .then(() => Components.showAlert("赠送成功"))
            .then(()=>{
                history.goBack()
            })
        }
    }
    render() {
        let { history } = this.props
        let { isSearch } =this.state
        let { pageNo, list, keyword,coupon } = this.props.user_coupon.friends_data
        let u = coupon.conponType == '2' ? '克' : ''
        let m = coupon.conponType == '0' ?'￥':''

        let day = () => {
            if(coupon.inverstPeriod == 0){
                return <div styleName="lineRight addRight">任意标可用</div>
            }else{
                return <div styleName="lineRight addRight">投资期限>= <span>{coupon.inverstPeriod}天</span> 可用</div>
            }
        }
        let couponFn = () => {
            let coupon_style = coupon.conponType == '0' ? "couponItem typeBlue" : coupon.conponType == '1' ? "couponItem typeRed" : "couponItem typeYellow"
            return <div styleName={coupon_style}>
                <div styleName="couponValue"><span styleName="rmb">{m}</span>{coupon.beanCount}<span styleName="rmb">{u}</span></div>
                <div styleName="couponDes">
                    <div styleName="lineLeft desLeft">{decodeURIComponent(coupon.remark)}</div>
                    <div styleName="lineRight desRight">有效期 {coupon.overdueTime}</div>
                </div>
                <div styleName="couponAddtion">
                    <div styleName="lineLeft addLeft">{coupon.conponType=='2'?'购买':'投资' }{m}{coupon.investMultip}{u}可用</div>
                    {day()}
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
                    {couponFn()}
                </div>
                <div styleName="searchWrapper">
                    <input type="text" styleName="inputBox" placeholder="请输入关键字" onChange={this.inputHandler}
                        value={keyword} />
                    <span styleName="searchBtn" onClick={this.searchFriendsHandler}>搜索</span>
                    <div styleName="emptyBtn" onClick={this.emptyHandler}></div>
                </div>
                {isSearch ? (list && list.length>0 ? list.map(friends_record):empty):''}
            </div>
        </div>
    }
}


export default TransferFriends
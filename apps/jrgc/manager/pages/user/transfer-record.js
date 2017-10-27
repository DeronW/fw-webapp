import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import { Event, Components, Utils } from 'fw-javascripts'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/user/transfer-record.css'

@inject('user_coupon')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class TransferRecord extends React.Component {
    state = {
        type:'返现券'
    }
    componentDidMount() {
        let { resetCouponPageNo,setCouponStatus, fetchCouponList } = this.props.user_coupon
        setCouponStatus(4)
        resetCouponPageNo()
        fetchCouponList()
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

    render() {
        let { history } = this.props
        let { totalCount, records } = this.props.user_coupon.coupon_data
        let { type } = this.state

        let u = type == '返金券' ? '克' : ''
        let m = type == '返现券' ?'￥':''

        let tab_func = (item, index) => {
            return <div styleName={item == type ? "tabItem tabItemOn" : "tabItem"} key={index}
                        onClick={() => this.typeHanlder(item)}>{item} </div>
        }

        let record_item = (item, index) => {
            return <div styleName={item.status>0 ? "recordItem itemUsed" : "recordItem"} key={index}>
                <div styleName="itemLineUp">
                    <div styleName="upLineLeft money"><span styleName="rmb">{m}</span>{item.beanCount}{u}</div>
                    <div styleName="upLineLeft reason">
                        <div>{item.remark}</div>
                        <div>{type == '返金券' ?'投资':'购买'}{m}{item.investMultip}{u}可用</div>
                    </div>
                    <div styleName="upLineLeft date">
                        <div styleName="dateLeft">有效期 {item.overdueTime}</div>
                        <div styleName="dateRight">投资期限 {item.inverstPeriod}天 可用</div>
                    </div>
                </div>
                <div styleName="itemLineDown">
                    <div styleName="downLeft">赠给 {item.realName}</div>
                    <div styleName="downRight">赠送时间 {item.createTime}</div>
                </div>
                {item.status == 1 && <div styleName="labelDued"></div>}
                {item.status == 2 && <div styleName="labelUsed"></div>}
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div>
            <Header title="转赠记录" history={history}/>
            <div styleName="tabWrapper">
                {['返现券', '返息券', '返金券'].map(tab_func)}
            </div>
            <div styleName="recordCount">
                <div styleName="recordLeft">
                    <div>已赠送{type}</div>
                    <div><span styleName="totalNumber">{totalCount}</span>张</div>
                </div>
            </div>
            {records && records.length>0?records.map(record_item):empty}
        </div>
    }
}


export default TransferRecord
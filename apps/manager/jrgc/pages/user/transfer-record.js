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
        tab_n: 0,
        is_used: true
    }
    componentDidMount() {
        let { resetCouponPageNo, fetchCouponList } = this.props.user_coupon
        resetCouponPageNo()
        fetchCouponList()
        Event.touchBottom(fetchCouponList)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    tabHandler = (i) => {
        this.setState({tab_n: i})
    }

    render() {
        let { history } = this.props
        let { type, list,number } = this.props.user_coupon.data.coupon
        let current_tab = list[type]

        let tab_func = (item, index) => {
            return <div styleName={item == type ? "tabItem tabItemOn" : "tabItem"} key={index}
                        onClick={() => this.tabHandler(item)}>{list[item].name} </div>
        }

        let record_item = (item, index) => {
            return <div styleName={item.status>0 ? "recordItem itemUsed" : "recordItem"} key={index}>
                <div styleName="itemLineUp">
                    <div styleName="upLineLeft money"><span styleName="rmb">¥</span>{item.beanCount}</div>
                    <div styleName="upLineLeft reason">
                        <div>{item.remark}</div>
                        <div>投资 ¥{item.investMultip} 可用</div>
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
                {['1', '0', '2'].map(tab_func)}
            </div>
            <div styleName="recordCount">
                <div styleName="recordLeft">
                    <div>已赠送{current_tab.name}</div>
                    <div><span styleName="totalNumber">{number}</span>张</div>
                </div>
            </div>
            {list && list.length>0?list.map(record_item):empty}
        </div>
    }
}


export default TransferRecord
import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/user/transfer-record.css'

const couponData = [{count: 100, data: '2017-09-22', des: '返现券'}, {count: 200, data: '2017-09-22', des: '返现券'}]

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class TransferRecord extends React.Component {
    state = {
        tab_n: 0,
        is_used: true
    }

    tabHandler = (i) => {
        this.setState({tab_n: i})
    }

    render() {
        let {history} = this.props
        let {tab_n, is_used} = this.state
        let tab_records = () => {
            let tab_func = (item, index) => {
                return <div styleName={index == tab_n ? "tabItem tabItemOn" : "tabItem"} key={index}
                            onClick={() => this.tabHandler(index)}>
                    {item}
                </div>
            }
            return <div styleName="tabWrapper">
                {['返现券', '返息券', '返金券'].map(tab_func)}
            </div>
        }
        let count_all = () => {
            let type = () => {
                if (tab_n == 0) {
                    return "返现券"
                } else if (tab_n == 1) {
                    return "返息券"
                } else if (tab_n == 2) {
                    return "返金券"
                }
            }
            return <div styleName="recordCount">
                <div styleName="recordLeft">
                    <div>已赠送{type()}</div>
                    <div><span styleName="totalNumber">1</span>张</div>
                </div>
            </div>
        }

        let record_item = (item, index) => {
            return <div styleName={is_used ? "recordItem itemUsed" : "recordItem"} key={index}>
                <div styleName="itemLineUp">
                    <div styleName="upLineLeft money"><span styleName="rmb">¥</span>10</div>
                    <div styleName="upLineLeft reason">
                        <div>圣诞节赠送</div>
                        <div>投资 ¥3,200,000 可用</div>
                    </div>
                    <div styleName="upLineLeft date">
                        <div styleName="dateLeft">有效期 2017-09-12</div>
                        <div styleName="dateRight">投资期限 ≥90天 可用</div>
                    </div>
                </div>
                <div styleName="itemLineDown">
                    <div styleName="downLeft">赠给 萌小希</div>
                    <div styleName="downRight">赠送时间 2017-09-12</div>
                </div>
                {is_used && <div styleName="labelUsed"></div>}
            </div>
        }
        return <div>
            <Header title="转赠记录" history={history}/>
            {tab_records()}
            {count_all()}
            {tab_n == 0 && couponData.map(record_item)}
            {tab_n == 1 && couponData.map(record_item)}
            {tab_n == 2 && couponData.map(record_item)}
        </div>
    }
}


export default TransferRecord
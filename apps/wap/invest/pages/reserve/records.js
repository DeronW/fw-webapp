import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Event, Components} from 'fw-javascripts'

import styles from '../../css/reserve/records.css'
import Header from '../../components/header'
import showConfirm from '../../components/confirm'
import {NativeBridge} from '../../helpers'
import {Browser} from '../../helpers'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveRecords extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.resetPageNo();
        this.props.reserve.getReserveList()
        Event.touchBottom(this.props.reserve.getReserveList)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    cancelReserveHandler = (bookTime, id) => {
        let {reserve, history} = this.props;
        let cb = () => {
            reserve.cancelHandler(id).then((data) => {
                if (data.cancelResult == '1') {

                } else if (data.cancelResult == '0') {
                    Components.showToast("取消成功")
                    reserve.getReserveList()
                }
            })
        };
        showConfirm('确定取消？', cb)
    }

    lookProtocolHandler = (type, id) => {
        NativeBridge.trigger('reserve_contract', `${type},${id}`)
    }

    tabHandler = (status) => {
        let {type} = this.props.reserve.records
        let {setRecordsCurrentStatus, getReserveList} = this.props.reserve
        if (status == type) return
        setRecordsCurrentStatus(status)
    }

    render() {
        let {reserve, history} = this.props
        let {type, tab} = this.props.reserve.records
        let {list} = reserve.records.tab[type]

        let no_records = <div styleName="emptyPanel">
            <img src={require('../../images/reserve/records/norecords.png')}/>
            <div styleName="norecords-text">暂无预约</div>
        </div>

        let tab_func = (item, index) => {
            let tab_item_style = item == type ? `tab_item tab_item_${index} tab_on` : `tab_item tab_item_${index}`
            return <div styleName={tab_item_style} key={index} onClick={() => this.tabHandler(item)}>
                {tab[item].name}
            </div>
        }

        let records_func = (item, index) => {
            let status;
            if (item.status == 0) {
                status = '预约中'
            } else if (item.status == 1) {
                status = '预约结束 '
            } else if (item.status == 2) {
                status = '已取消'
            }

            let cancelstyle = item.status == 2 ? styles['cancelstyle'] : styles['reserveItem']

            return <div className={cancelstyle} key={index}>
                {item.status == 0 &&
                <div styleName="itemHeader headerOn">
                    {status}
                    <div styleName="itemHeaderRight cancelBtn"
                         onClick={() => this.cancelReserveHandler(item.bookTime, item.id)}>
                        取消预约
                    </div>
                </div>}
                {item.status == 1 && <div styleName="itemHeader headerOver">{status}</div>}
                {item.status == 2 && <div styleName="itemHeader headerCancel">{status}</div>}
                <div styleName="infoContainer">
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">实际投资金额</div>
                        <div styleName="itemHeaderRight colorRed">￥{item.investAmt}元</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约冻结金额</div>
                        <div styleName="itemHeaderRight colorRed">￥{item.bookInvestAmt}元</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">期限/预期年化利率</div>
                        <div styleName="itemHeaderRight">{item.repayPeriod}天/{item.loanRate}%</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约时间</div>
                        <div styleName="itemHeaderRight">
                            {new Date(parseInt(item.bookTime)).toLocaleDateString().replace(/\//g, "-") + " " + new Date(parseInt(item.bookTime)).toTimeString().substr(0, 8)}
                        </div>
                    </div>
                    {(item.status == 0 || item.status == 1) && <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约协议</div>
                        <div styleName="itemHeaderRight"
                             onClick={() => this.lookProtocolHandler(item.contractType, item.id)}>
                            已签署<span styleName="arrow"></span>
                        </div>
                    </div>}
                </div>
            </div>
        }

        let tab_style = Browser.inIOSApp ? 'tabWrapperIos' : 'tabWrapper'

        return <div styleName="recordsPanel">
            <Header title="我的预约" history={history}/>
            <div styleName={tab_style}>
                {['0', '1', '2'].map(tab_func)}
            </div>
            <div styleName="textWrapper">
                {list.map(records_func)}
                {list.length == 0 && tab[type].page_no == 0 && no_records}
            </div>
        </div>
    }
}

export default ReserveRecords
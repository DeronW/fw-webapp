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
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.getReserveList(null, true)
        Event.touchBottom(this.props.reserve.getReserveList);
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
                    reserve.getReserveList(null, true)
                }
            })
        };
        showConfirm('确定取消？', cb)
    }


    lookProtocolHandler = () => {
        let {history} = this.props
        history.push(`/reserve/protocol`)
    }

    reloadHandler = () => {
        this.props.reserve.getReserveList(null, true)
    }

    render() {
        let {reserve, history} = this.props
        let {records} = reserve
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
                <div styleName="itemHeader">
                    <div
                        styleName="itemHeaderLeft">{new Date(parseInt(item.bookTime)).toLocaleDateString().replace(/\//g, "-") + " " + new Date(parseInt(item.bookTime)).toTimeString().substr(0, 8)}</div>
                    <div styleName="itemHeaderRight">{status}</div>
                </div>
                <div styleName="infoContainer">
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">实际投资金额</div>
                        <div styleName="itemHeaderRight colorRed">
                            {item.investAmt}元
                        </div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约冻结金额</div>
                        <div styleName="itemHeaderRight colorRed">
                            {item.bookInvestAmt}元
                        </div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">期限/预期年化利率</div>
                        <div styleName="itemHeaderRight">
                            {item.repayPeriod}天/{item.loanRate}%
                        </div>
                    </div>
                    {item.status == 0 && <div styleName="infoItem">
                        <div styleName="infoItemLeft protocolLook" onClick={this.lookProtocolHandler}>查看预约协议</div>
                        <div styleName="itemHeaderRight cancelBtn"
                             onClick={() => this.cancelReserveHandler(item.bookTime, item.id)}>
                            取消预约
                        </div>
                    </div>}
                </div>
            </div>
        }
        let no_records = <div styleName="emptyPanel">
            <img src={require('../../images/reserve/records/norecords.png')}/>
            <div styleName="norecords-text">暂无预约</div>
        </div>
        let reload_style = Browser.inIOS ? styles['reloadBtnIos'] : styles['reloadBtn']
        let reload_btn = <div className={reload_style} onClick={this.reloadHandler}></div>
        return <div styleName="recordsPanel">
            <Header title="我的预约" history={history}/>
            {reload_btn}
            {records.length == 0 ? no_records : records.map(records_func)}
        </div>
    }
}

export default ReserveRecords
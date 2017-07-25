import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../css/my-reserve.css'
import Header from '../components/header'
import {Event} from 'fw-javascripts'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class MyReserve extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.reserve.getReserveList(null)
        Event.touchBottom(this.props.reserve.getReserveList(null));
    }

    render() {
        let {reserve, history}= this.props
        let {records} = reserve
        let records_func = (item, index) => {
            let status;
            if (item.status == 0) {
                status = '预约中'
            } else if (item.status == 1) {
                status = '预约结束 '
            } else if (item.status == 2) {
                status = '预约取消'
            }
            return <div styleName="reserveItem" key={index}>
                <div styleName="itemHeader">
                    <div
                        styleName="itemHeaderLeft">{new Date(parseInt(item.bookTime / 1000) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, "")}</div>
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
                            {item.frozenAmt}元
                        </div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">期限/预期年化利率</div>
                        <div styleName="itemHeaderRight">
                            {item.repayPeriod}天/{item.loanRate}%
                        </div>
                    </div>
                    {item.status == 0 && <div styleName="infoItem">
                        <div styleName="infoItemLeft protocolLook">查看预约协议</div>
                        <div styleName="itemHeaderRight cancelBtn">取消预约</div>
                    </div>}
                </div>
            </div>
        }
        return <div>
            <Header title="我的预约" history={history} show_close={false}/>
            {records.map(records_func)}
        </div>
    }
}

export default MyReserve
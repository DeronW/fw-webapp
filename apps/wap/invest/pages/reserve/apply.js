import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve/apply.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveApply extends React.Component {
    state = {
        pending: false,
    }

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.fetchProduct()
    }

    inputChangeHandler = name => e => {
        this.props.reserve.setFormData(name, e.target.value)
    }

    allMadeHandler = () => {
        let {reserve} = this.props
        this.props.reserve.setFormData('reserveMoney', reserve.accountAmount)
    }

    applyHandler = () => {
        let {reserve, history} = this.props
        reserve.fetchProduct().then(data => {
            if (reserve.reserveMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (reserve.reserveMoney < reserve.context.minAmt) {
                Components.showToast("预约金额不足100")
            } else if (reserve.reserveMoney > reserve.accountAmount) {
                Components.showToast("可用金额不足，请充值后重试")
            } else if (reserve.reserveMoney > data.batchMaxmum) {
                Components.showToast("自动投标金额不足").then(() => {
                    NativeBridge.toNative('auto_bid_second')
                })
            } else {
                if (this.state.pending)  return
                this.setState({pending: true})
                reserve.submitReserveHandler()
                    .then(() => {
                            Components.showToast('预约成功')
                        },
                        () => {
                            this.setState({pending: false})
                        })
                    .then(() => {
                        history.push(`/reserve/records`)
                    })
            }
        })
    }

    jumpToProtocol = () => {
        let {history} = this.props
        history.push(`/reserve/protocol`)
    }

    render() {
        let {reserve, history} = this.props
        return <div styleName='applyPanel'>
            <Header title="提交预约" history={history}/>
            <div styleName="submitPanel">
                <div styleName="reserveMoney">预约金额</div>
                <div styleName="userMoney">
                    <div styleName="money">可用余额
                        <span>&yen;{reserve.accountAmount}</span>
                    </div>
                    <div styleName="inputMoney">
                        <input type="number" placeholder="100元起预约" value={reserve.reserveMoney}
                               onChange={this.inputChangeHandler('reserveMoney')}/>
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>
                            全投
                        </span>
                    </div>
                </div>
            </div>
            <div styleName="interval"></div>
            <div styleName="submitInfo">
                <div styleName="infoContent">
                    <div styleName="infoItem">
                        <div styleName="itemLeft">期限</div>
                        <div styleName="itemRight">{reserve.context.repayPeriod}天</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="itemLeft">预期年化</div>
                        <div styleName="itemRight">{reserve.context.loadRate}%</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="itemLeft">预约有效期</div>
                        <div styleName="itemRight">{reserve.context.bookValidPeriod}天</div>
                    </div>
                    <div styleName="infoItem itemLast">
                        <div styleName="itemLeft">预计起息时间</div>
                        <div styleName="itemRight">预计今日起息</div>
                    </div>
                </div>
            </div>
            <div styleName="submitProtocol">
                <span styleName="protocolText">本人已阅读并同意签署
                    <span styleName="applyProtocol" onClick={this.jumpToProtocol}>
                        《预约协议》
                    </span>
                </span>
            </div>
            <div styleName="submitBtnContainer">
                <div styleName="submitBtn" onClick={this.applyHandler}>立即预约</div>
            </div>
        </div>
    }
}
export default ReserveApply

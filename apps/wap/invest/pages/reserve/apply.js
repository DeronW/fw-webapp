import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/reserve/apply.css'
import { Components } from 'fw-javascripts'
import { NativeBridge } from '../../helpers/'

@inject('reserve')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class ReserveApply extends React.Component {
    state = {
        pending: false,
    }

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.fetchProduct()
    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")

        if (v[1]&&v[1].length > 2) {
            v[1] = v[1].substr(0,2)
            this.props.reserve.setFormData(name, `${v[0]}.${v[1]}`)
        }else{
            this.props.reserve.setFormData(name, e.target.value)
        }

    }

    allMadeHandler = () => {
        let { reserve } = this.props
        this.props.reserve.setFormData('reserveMoney', reserve.accountAmount)
    }

    applyHandler = () => {
        let { reserve, history } = this.props
        let sussessHandler = () => {
            if (this.state.pending) return
            this.setState({ pending: true })
            reserve.submitReserveHandler()
                .then(() => {
                    Components.showToast('预约成功')
                },
                () => {
                    this.setState({ pending: false })
                })
                .then(() => {
                    history.push(`/reserve/records`)
                })
        }
        reserve.fetchProduct().then(data => {
            if (reserve.reserveMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (reserve.reserveMoney < reserve.context.minAmt) {
                Components.showToast("预约金额不足100")
            } else if (reserve.reserveMoney > reserve.accountAmount) {
                Components.showToast("可用金额不足，请充值后重试")
            } else if (!reserve.isCompany) {
                if (reserve.reserveMoney > data.batchMaxmum) {
                    Components.showToast("自动投标金额不足").then(() => {
                        NativeBridge.toNative('auto_bid_second')
                    })
                } else {
                    sussessHandler()
                }
            } else {
                sussessHandler()
            }
        })
    }

    jumpToProtocol = () => {
        let { history } = this.props
        history.push(`/reserve/protocol`)
    }

    rechargeHandler = () => {
        //跳到充值页面
        NativeBridge.toNative('app_recharge')
    }

    render() {
        let { reserve, history } = this.props
        let { context } = reserve

        let infoItem = (name, value) => {
            return <div styleName="infoItem">
                <div styleName="itemLeft">{name}</div>
                <div styleName={name == "预期年化" ? "itemRight rightRed" : "itemRight"}>{value}</div>
            </div>
        }
        return <div styleName='applyPanel'>
            <Header title="提交预约" history={history} />
            <div styleName="submitPanel">
                <div styleName="reserveMoney">预约金额</div>
                <div styleName="userMoney">
                    <div styleName="money">可用余额
                        <span styleName="remain">&yen;{reserve.accountAmount}</span>
                        <span styleName="recharge" onClick={this.rechargeHandler}>充值</span>
                    </div>
                    <div styleName="inputMoney">
                        <input type="number" placeholder="100元起预约" value={reserve.reserveMoney}
                            onChange={this.inputChangeHandler('reserveMoney')} />
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>
                            全投
                        </span>
                    </div>
                </div>
            </div>
            <div styleName="interval"></div>
            <div styleName="submitInfo">
                <div styleName="infoContent">
                    {infoItem("预期年化", `${context.loadRate}%`)}
                    {infoItem("期限", `${context.repayPeriod}天`)}
                    {infoItem("预约有效期", `${context.bookValidPeriod}天`)}
                    <div styleName="infoItem itemLast">
                        <div styleName="itemLeft">预计起息时间</div>
                        <div styleName="itemRight">预计今日起息</div>
                    </div>
                </div>
            </div>
            <div styleName="submitProtocol">
                <span styleName="protocolText">本人已阅读并签署
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

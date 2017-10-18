import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve-bid/apply.css'
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
        let v = e.target.value.toString().split(".")

        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.reserve.setFormData(name, `${v[0]}.${v[1]}`, 'bid_data')
        } else {
            this.props.reserve.setFormData(name, e.target.value, 'bid_data')
        }

    }

    allMadeHandler = () => {
        let {reserve} = this.props
        this.props.reserve.setFormData('reserveMoney', reserve.bid_data.accountAmount, 'bid_data')
    }

    applyHandler = () => {
        let {reserve, history} = this.props
        let sussessHandler = () => {
            if (this.state.pending) return
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
        reserve.fetchProduct().then(data => {
            if (reserve.bid_data.reserveMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (reserve.bid_data.reserveMoney < reserve.bid_data.context.minAmt) {
                Components.showToast("预约金额不足100")
            } else if (reserve.bid_data.reserveMoney > reserve.bid_data.accountAmount) {
                Components.showToast("可用金额不足，请充值后重试")
            } else if (!reserve.bid_data.isCompany) {
                if (reserve.bid_data.reserveMoney > data.batchMaxmum) {
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
        let {history} = this.props
        history.push(`/reserve/protocol`)
    }

    rechargeHandler = () => {
        //跳到充值页面
        NativeBridge.toNative('app_recharge')
    }

    render() {
        let {reserve, history} = this.props
        let {context} = reserve.bid_data

        let infoItem = (name, value) => {
            return <div styleName={name == '预约有效期' ? "infoItem itemLast" : "infoItem"}>
                <div styleName="itemLeft">{name}</div>
                <div styleName={name == "预期年化利率" ? "itemRight rightRed" : "itemRight"}>{value}</div>
            </div>
        }
        return <div styleName='applyPanel'>
            <Header title="预约抢购" history={history}/>
            <div styleName="submitPanel">
                <div styleName="reserveMoney">抢购金额</div>
                <div styleName="userMoney">
                    <div styleName="inputMoney">
                        <input type="number" placeholder="100元起预约" value={reserve.bid_data.reserveMoney}
                               onChange={this.inputChangeHandler('reserveMoney')}/>
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>
                            全投
                        </span>
                    </div>
                    <div styleName="money">
                        <div styleName="balance">
                            可用余额<span styleName="remain">&yen;{reserve.bid_data.accountAmount}</span>
                        </div>
                        <div styleName="recharge" onClick={this.rechargeHandler}>充值</div>
                    </div>
                </div>
            </div>
            <div styleName="interval"></div>
            <div styleName="submitInfo">
                <div styleName="infoContent">
                    <div styleName="infoAmount">
                        <div styleName="amountLeft">预计收益</div>
                        <div styleName="amountRight">
                            &yen;{reserve.bid_data.reserveMoney * (context.loadRate / 100)}
                        </div>
                    </div>
                    <div styleName="itemWrapper">
                        {infoItem("预期年化利率", `${context.loadRate}%`)}
                        {infoItem("期限", `${context.repayPeriod}天`)}
                        {infoItem("预计起息时间", "预计今日起息")}
                        {infoItem("预约有效期", `${context.bookValidPeriod}天`)}
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
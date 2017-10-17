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
class ReserveApplyNovice extends React.Component {
    componentDidMount() {

        NativeBridge.trigger('hide_header')
        this.props.reserve.fetchNoviceProduct()
    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")

        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.reserve.setFormData(name, `${v[0]}.${v[1]}`, 'novice_bid_data')
        } else {
            this.props.reserve.setFormData(name, e.target.value, 'novice_bid_data')
        }

    }
    allMadeHandler = () => {
        let {reserve} = this.props
        this.props.reserve.setFormData('reserveMoney', reserve.novice_bid_data.accountAmount, 'novice_bid_data')
    }

    render() {
        let {history, reserve} = this.props
        let {context} = reserve.novice_bid_data
        let submit_panel = () => {
            return <div styleName="submitPanel">
                <div styleName="reserveMoney">抢购金额</div>
                <div styleName="userMoney">
                    <div styleName="inputMoney">
                        <input type="number" placeholder="100元起预约" value={reserve.novice_bid_data.reserveMoney}
                               onChange={this.inputChangeHandler('reserveMoney')}/>
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>
                            全投
                        </span>
                    </div>
                    <div styleName="money">
                        <div styleName="balance">
                            可用余额<span styleName="remain">&yen;{reserve.novice_bid_data.accountAmount}</span>
                        </div>
                        <div styleName="recharge" onClick={this.rechargeHandler}>充值</div>
                    </div>
                </div>
            </div>
        }
        let amount_panel = () => {
            let infoItem = (name, value) => {
                return <div styleName={name == '预计起息时间' ? "infoItem itemLast" : "infoItem"}>
                    <div styleName="itemLeft">{name}</div>
                    <div styleName={name == "预期年化利率" ? "itemRight rightRed" : "itemRight"}>{value}</div>
                </div>
            }
            return <div styleName="submitInfo">
                <div styleName="infoContent">
                    <div styleName="infoAmount">
                        <div styleName="amountLeft">预计收益</div>
                        <div styleName="amountRight">
                            &yen;{reserve.novice_bid_data.reserveMoney * (context.loadRate / 100)}
                        </div>
                    </div>
                    <div styleName="itemWrapper">
                        {infoItem("预期年化利率", `${context.loadRate}%`)}
                        {infoItem("期限", `${context.repayPeriod}天`)}
                        {infoItem("预计起息时间", "预计今日起息")}
                    </div>
                </div>
            </div>
        }

        let coupon_panel = () => {
            return <div styleName="couponPanel">
                <div styleName="couponLeft">
                    <span styleName="iconChecked"></span>
                    使用优惠券
                </div>
                <div styleName="couponRight"></div>
            </div>
        }
        return <div>
            <Header title="新手标抢购" history={history}/>
            {submit_panel()}
            <div styleName="interval"></div>
            {amount_panel()}
            <div styleName="interval"></div>
            {}
        </div>
    }
}

export default ReserveApplyNovice
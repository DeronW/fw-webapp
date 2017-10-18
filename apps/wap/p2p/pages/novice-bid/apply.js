import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/novice-bid/apply.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveApplyNovice extends React.Component {
    state = {
        pending: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
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

    protocolHandler = () => {
        let {history} = this.props
        history.push(`/novice-bid/protocol`)
    }

    rechargeHandler = () => {
        //跳到充值页面
        NativeBridge.toNative('app_recharge')
    }

    applyHandler = () => {
        let {reserve, history} = this.props
        let sussessHandler = () => {
            if (this.state.pending) return
            this.setState({pending: true})
            reserve.submitNoviceHandler()
                .then(() => {
                        Components.showToast('预约成功')
                    },
                    () => {
                        this.setState({pending: false})
                    })
                .then(() => {
                    history.push(`/novice-bid/success`)
                })
        }
        reserve.fetchNoviceProduct().then(data => {
            if (reserve.novice_bid_data.reserveMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (reserve.novice_bid_data.reserveMoney < reserve.novice_bid_data.context.minAmt) {
                Components.showToast("预约金额不足100")
            } else if (reserve.novice_bid_data.reserveMoney > reserve.novice_bid_data.accountAmount) {
                Components.showToast("可用金额不足，请充值后重试")
            } else if (!reserve.novice_bid_data.isCompany) {
                if (reserve.novice_bid_data.reserveMoney > data.batchMaxmum) {
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
                    <span styleName="couponLeftText">使用优惠券</span>
                </div>
                <div styleName="couponRight">
                    <span styleName="rightRed">&yen;20</span>返现券，满<span styleName="rightRed">&yen;2000</span>可用
                </div>
            </div>
        }

        let procotol_panel = () => {
            return <div styleName="submitProtocol protocolNovice">
                <span styleName="protocolText">本人已阅读并签署
                    <span styleName="applyProtocol" onClick={this.protocolHandler}>
                        《预约协议》
                    </span>
                </span>
            </div>
        }

        let novice_intro = () => {
            return <div styleName="introPanel">
                新手标简介
                <br/>1、您投的新手标所匹配的资产是期限为21天消费贷，即工场微金预约宝产品。
                <br/>2、结果可在金融工场app-我的-点击预约宝(非预约按钮)预约记录中查看。
                <br/>3、2%奖励将以工豆形式在标的起息后发到您的工豆账户中。
                <br/>4、奖励工豆可在您再次出借时抵现（100个工豆=1元）。
                5、工豆是平台对新用户的奖励，不可提现。
            </div>
        }

        let bottom_panel = () => {
            return <div styleName="submitBtnContainer">
                <div styleName="submitBtn" onClick={this.applyHandler}>立即预约</div>
            </div>
        }
        return <div styleName="applyPanel">
            <Header title="新手标抢购" history={history}/>
            {submit_panel()}
            <div styleName="interval"></div>
            {amount_panel()}
            <div styleName="interval"></div>
            {coupon_panel()}
            {procotol_panel()}
            {novice_intro()}
            {bottom_panel()}
        </div>
    }
}

export default ReserveApplyNovice
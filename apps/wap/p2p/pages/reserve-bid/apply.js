import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve-bid/apply.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

@inject('reserve_bid')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveApply extends React.Component {
    state = {
        pending: false,
        type_tab: -1
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.reserve_bid.fetchProduct()
        console.log(this.props.reserve_bid.bid_data.bids)
    }

    inputChangeHandler = name => e => {
        let v = e.target.value.toString().split(".")

        if (v[1] && v[1].length > 2) {
            v[1] = v[1].substr(0, 2)
            this.props.reserve_bid.setFormData(name, `${v[0]}.${v[1]}`, 'bid_data')
        } else {
            this.props.reserve_bid.setFormData(name, e.target.value, 'bid_data')
        }

    }

    allMadeHandler = () => {
        let {reserve_bid} = this.props
        this.props.reserve_bid.setFormData('reserveMoney', reserve_bid.bid_data.accountAmount, 'bid_data')
    }

    applyHandler = () => {
        let {reserve_bid, history} = this.props
        let {type_tab} = this.state
        let current_type
        if (reserve_bid.bid_data.bids.length == 1) {
            current_type = 0
        } else {
            current_type = type_tab
        }
        let current_bid = reserve_bid.bid_data.bids[current_type]
        let sussessHandler = () => {
            if (this.state.pending) return
            this.setState({pending: true})
            reserve_bid.submitReserveHandler(current_bid.id, current_bid.couponId)
                .then(() => {
                        return Components.showToast('预约成功')
                    },
                    () => {
                        this.setState({pending: false})
                    })
                .then(() => {
                    history.push(`/reserve-bid/records`)
                })
        }

        reserve_bid.fetchProduct().then(data => {
            if (type_tab == -1 && (!this.props.reserve_bid.applyInvestClaimId)) {
                Components.showToast("请选择预约产品")
            } else if (reserve_bid.bid_data.reserveMoney === '') {
                Components.showToast("预约金额不能为空")
            } else if (reserve_bid.bid_data.reserveMoney < current_bid.minAmt) {
                Components.showToast("预约金额不足100")
            } else if (reserve_bid.bid_data.reserveMoney > current_bid.accountAmount) {
                Components.showToast("可用金额不足，请充值后重试")
            } else if (!current_bid.isCompany) {
                if (reserve_bid.bid_data.reserveMoney > data.batchMaxmum) {
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

    switchTypeHandler = (index) => {
        this.setState({type_tab: index})
    }

    render() {
        let {reserve_bid, history} = this.props
        let {context} = reserve_bid.bid_data
        let {type_tab} = this.state
        let infoItem = (name, value) => {
            return <div styleName={name == '预约有效期' ? "infoItem itemLast" : "infoItem"}>
                <div styleName="itemLeft">{name}</div>
                <div styleName={name == "预期年化利率" ? "itemRight rightRed" : "itemRight"}>{value}</div>
            </div>
        }
        let type_list_func = (item, index) => {
            if (!item) return;
            return <div
                styleName={(item.id == reserve_bid.applyInvestClaimId || type_tab == index) ? "typeItem typeItemChecked" : "typeItem"}
                key={index}
                onClick={() => this.switchTypeHandler(index)}>
                {item.loadRate}%<span
                styleName="color9">/</span>{item.repayPeriod}天
            </div>
        }

        let single_info = <div styleName="infoContent">
            <div styleName="infoAmount">
                <div styleName="amountLeft">预计收益</div>
                <div styleName="amountRight">
                    &yen;{reserve_bid.bid_data.reserveMoney * (context.loadRate / 100)}
                </div>
            </div>
            <div styleName="itemWrapper">
                {infoItem("预期年化利率", `${context.loadRate}%`)}
                {infoItem("期限", `${context.repayPeriod}天`)}
                {infoItem("预计起息时间", "预计今日起息")}
                {infoItem("预约有效期", `${context.bookValidPeriod}天`)}
            </div>
        </div>

        let all_info = (bids) => {
            let bid = bids[this.state.type_tab]
            let item = {
                goals: '0',
                rate: '--%',
                term: '--天',
                indate: '--天'
            }

            if (bid) item = {
                goals: (reserve_bid.bid_data.reserveMoney * (bid.loadRate / 100) * bid.repayPeriod) / 360,
                rate: bid.loadRate + '%',
                term: bid.repayPeriod + '天',
                indate: bid.bookValidPeriod + '天'
            }

            return <div styleName="infoContent">
                <div styleName="infoAmount">
                    <div styleName="amountLeft">预计收益</div>
                    <div styleName="amountRight">
                        &yen;{item.goals}
                    </div>
                </div>
                <div styleName="itemWrapper">
                    {infoItem("预期年化利率", item.rate)}
                    {infoItem("期限", item.term)}
                    {infoItem("预计起息时间", "预计今日起息")}
                    {infoItem("预约有效期", item.indate)}
                </div>
            </div>
        }
        return <div styleName='applyPanel'>
            <Header title="预约抢购" history={history}/>
            <div styleName="submitPanel">
                <div styleName="reserveType">
                    <div styleName="typeTitle">抢购</div>
                    <div styleName="typeSubtitle">选择类型</div>
                    <div styleName="typeText">
                        {reserve_bid.bid_data.bids.map(type_list_func)}
                    </div>
                </div>
                <div styleName="reserveMoney">抢购金额</div>
                <div styleName="userMoney">
                    <div styleName="inputMoney">
                        <input type="number" placeholder="100元起预约" value={reserve_bid.bid_data.reserveMoney}
                               onChange={this.inputChangeHandler('reserveMoney')}/>
                        <span styleName="allmadeBtn" onClick={this.allMadeHandler}>
                            全投
                        </span>
                    </div>
                    <div styleName="money">
                        <div styleName="balance">
                            可用余额<span styleName="remain">&yen;{reserve_bid.bid_data.accountAmount}</span>
                        </div>
                        <div styleName="recharge" onClick={() => NativeBridge.toNative('app_recharge')}>充值</div>
                    </div>
                </div>
            </div>
            <div styleName="interval"></div>
            <div styleName="submitInfo">
                {reserve_bid.applyInvestClaimId ?
                    single_info :
                    reserve_bid.bid_data.bids.length > 0 && all_info(reserve_bid.bid_data.bids)}
            </div>
            <div styleName="submitProtocol">
                <span styleName="protocolText">本人已阅读并签署
                    <span styleName="applyProtocol" onClick={() => history.push(`/reserve-bid/protocol`)}>
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

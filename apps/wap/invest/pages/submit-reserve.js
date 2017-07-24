import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'

import Header from '../components/header.js'
import styles from '../css/submit-reserve.css'

@inject('submitReserve')
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class SubmitReserve extends React.Component {
    componentDidMount() {

    }

    inputChangeHandler = name => e => {
        console.log(111)
        this.props.submitReserve.setFormData(name, e.target.value)
    }

    allMadeHandler = () => {
        console.log(2222)
        let {submitReserve} = this.props
        this.props.submitReserve.setFormData('reserveMoney', submitReserve.currentMoney)
    }

    render() {
        let {submitReserve} = this.props
        return <div>
            <Header title="提交预约" history={history} show_close={false}/>
            <div styleName="submitPanel">
                <div styleName="reserveMoney">预约金额</div>
                <div styleName="userMoney">
                    <div styleName="money">可用余额
                        <span>{`￥${submitReserve.currentMoney}`}</span>
                    </div>
                    <div styleName="inputMoney">
                        <input type="text" placeholder="50元起投" value={submitReserve.reserveMoney} onChange={this.inputChangeHandler('reserveMoney')}/>
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
                        <div styleName="itemRight">21天</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="itemLeft">预期年化</div>
                        <div styleName="itemRight">6%</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="itemLeft">预约有效期</div>
                        <div styleName="itemRight">3天</div>
                    </div>
                    <div styleName="infoItem itemLast">
                        <div styleName="itemLeft">预计起息时间</div>
                        <div styleName="itemRight">平均6小时起息</div>
                    </div>
                </div>
            </div>
            <div styleName="submitProtocol">
                <span styleName="protocolChecked"></span>
                <span styleName="protocolText">《预约协议》</span>
            </div>
            <div styleName="submitBtnContainer">
                <div styleName="submitBtn">立即预约</div>
            </div>
        </div>
    }
}
export default SubmitReserve

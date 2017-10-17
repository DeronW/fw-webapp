import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve/info.css'
import {NativeBridge} from '../../helpers'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveInfoNovice extends React.Component {
    componentDidMount() {
        // NativeBridge.trigger('hide_header')
        this.props.reserve.fetchProduct()
    }

    render() {
        let {reserve, history} = this.props
        let {context} = reserve.noviceBid_data
        return <div>
            <Header noClose title="新手标详情" history={history}/>
            <div styleName="topInfo">
                <div styleName="infoRate">
                    <div styleName="rateUp">
                        <span>{context.loadRate}</span>
                        <span styleName="percent">%</span>
                    </div>
                    <div styleName="rateDown">
                        年化借款利率
                    </div>
                </div>
                <div styleName="garyGap"></div>
                <div styleName="infoDate">
                    <div styleName="dateUp">
                        <span>{context.repayPeriod}</span>
                        <span styleName="percent">天</span>
                    </div>
                    <div styleName="dateDown">
                        期限
                    </div>
                </div>
                <div styleName="tipsBox">
                    <span styleName="tipsItem">{context.minAmt}元起投</span>
                </div>
                <div styleName="flag"></div>
            </div>
            <div styleName="timeLine">
                <div styleName="fLine">
                    <div styleName="fLineItem fLineItem1">抢购</div>
                    <div styleName="fLineItem fLineItem2">预计起息</div>
                    <div styleName="fLineItem fLineItem3">预计到期</div>
                </div>
                <div styleName="sLine"></div>
                <div styleName="tLine">
                    <div styleName="fLineItem fLineItem1">2017-09-01</div>
                    <div styleName="fLineItem fLineItem2">2017-09-12</div>
                    <div styleName="fLineItem fLineItem3">2017-09-22</div>
                </div>
            </div>
        </div>
    }
}

export default ReserveInfoNovice
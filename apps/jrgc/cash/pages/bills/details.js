import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, NavBar} from '../../components'
import styles from '../../css/bills/details.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Details extends React.Component {
    render() {
        let {history} = this.props
        let details_item = (text1, data1, text2, data2) => {
            return <div styleName="itemWrapper">
                <div styleName="item">
                    <div styleName="itemLeft">{text1}</div>
                    <div styleName="itemRight">{data1}</div>
                </div>
                <div styleName="item">
                    <div styleName="itemLeft">{text2}</div>
                    <div styleName="itemRight">{data2}</div>
                </div>
            </div>
        }
        return <div styleName="detailsPanel">
            <Header title="详情" history={history}/>
            <div styleName="topPanel">
                <div styleName="topCount">3000</div>
                <div styleName="topDes">待还金额(元)</div>
            </div>
            {details_item('借入金额(元)', '500.00', '到账金额(元)', '498.00')}
            {details_item('已还金额(元)', '500.00', '到期时间', '2017-08-24  20:34:43')}
            {details_item('提现卡', '招商银行(8412)', '借款时间', '2017-08-24  20:34:43')}
        </div>
    }
}

export default Details
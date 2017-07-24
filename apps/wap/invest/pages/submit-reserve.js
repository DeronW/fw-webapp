import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header.js'
import styles from '../css/submit-reserve.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class SubmitReserve extends React.Component{
    render() {
        return <div>
            <Header title="提交预约" history={history} show_close={false}/>
            <div styleName="submitPanel">
                <div styleName="reserveMoney">预约金额</div>
                <div styleName="userMoney">
                    <div styleName="money">可用余额 <span>{`￥${45214}`}</span></div>
                    <div styleName="inputMoney">
                        <input type="text" placeholder="50元起投" value=""/>
                        <span onClick={}>全投</span>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default SubmitReserve

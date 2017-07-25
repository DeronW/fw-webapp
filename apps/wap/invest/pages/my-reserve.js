import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../css/my-reserve.css'
import Header from '../components/header'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class MyReserve extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {reserve, history}= this.props
        return <div>
            <Header title="我的预约" history={history} show_close={false}/>
            <div styleName="reserveItem">
                <div styleName="itemHeader">
                    <div styleName="itemHeaderLeft">2017-07-12 14:01:39</div>
                    <div styleName="itemHeaderRight">预约中</div>
                </div>
                <div styleName="infoContainer">
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">实际投资金额</div>
                        <div styleName="itemHeaderRight colorRed">0元</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约冻结金额</div>
                        <div styleName="itemHeaderRight colorRed">100元</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">期限/预期年化利率</div>
                        <div styleName="itemHeaderRight">21天/5.5%</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft protocolLook">查看预约协议</div>
                        <div styleName="itemHeaderRight cancelBtn">取消预约</div>
                    </div>
                </div>
            </div>
            <div styleName="reserveItem">
                <div styleName="itemHeader">
                    <div styleName="itemHeaderLeft">2017-07-12 14:01:39</div>
                    <div styleName="itemHeaderRight">已结束</div>
                </div>
                <div styleName="infoContainer">
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">实际投资金额</div>
                        <div styleName="itemHeaderRight colorRed">0元</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">预约冻结金额</div>
                        <div styleName="itemHeaderRight colorRed">100元</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoItemLeft">期限/预期年化利率</div>
                        <div styleName="itemHeaderRight">21天/5.5%</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default MyReserve
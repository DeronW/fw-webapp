import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/novice-bid/success.css'
import Header from '../../components/header'
import {NativeBridge} from '../../helpers'


@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveSuccess extends React.Component {
    toRecordsHandler = () => {
        let {history} = this.props
        history.push('/novice-bid/records')
    }

    toHomeHandler = () => {
        let {history} = this.props
    }

    render() {
        let {history, reserve} = this.props
        return <div styleName="successPanel">
            <Header noClose title="抢购成功" history={history}/>
            <div styleName="content">
                <div styleName="icon"></div>
                <div styleName="tips">新手标抢购成功</div>
                <div><span styleName="colorRed">20元</span>现金奖励已经发放至您的账户，请查收</div>
            </div>
            <div styleName="toRecords" onClick={this.toRecordsHandler}>查看记录</div>
            <div styleName="toHome" onClick={this.toHomeHandler}>返回首页</div>
        </div>

    }
}

export default ReserveSuccess
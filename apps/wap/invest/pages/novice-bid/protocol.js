import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/novice-bid/protocol.css'
import Header from '../../components/header'
import {NativeBridge} from '../../helpers'


@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveProtocolNovice extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.getContractHandler().then(data => {
            this.props.reserve.novice_bid_data.contractMsg = data.contractMsg
        })
    }

    render() {
        let {history, reserve} = this.props

        return <div styleName="protocol-box">
            <Header noClose title="预约出借服务协议" history={history}/>
            <div styleName="contractText" dangerouslySetInnerHTML={{__html: reserve.novice_bid_data.contractMsg}}>
            </div>
        </div>
    }
}

export default ReserveProtocolNovice
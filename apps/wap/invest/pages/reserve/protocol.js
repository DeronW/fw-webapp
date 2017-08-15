import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import styles from '../../css/reserve/protocol.css'
import Header from '../../components/header'
import { NativeBridge } from '../../helpers'


@inject('reserve')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class ReserveProtocol extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.getContractHandler().then(data => {
            this.props.reserve.contractMsg = data.contractMsg
        })
    }

    render() {
        let { history, reserve } = this.props

        return <div styleName="protocol-box">
            <Header noClose title="预约出借服务协议" history={history} />
            <div styleName="contractText" dangerouslySetInnerHTML={{ __html: reserve.contractMsg }}>
            </div>
        </div>
    }
}

export default ReserveProtocol
import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/reserve/protocol.css'
import Header from '../../components/header'


@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveProtocol extends React.Component {
    componentDidMount() {
        this.props.reserve.getContractHandler().then(data=>{
            console.log(data)
            console.log(data.contractMsg)
            this.props.reserve.contractMsg = data.contractMsg
        })
    }

    render() {
        let {history,reserve} = this.props
        return <div styleName="protocol-box">
            <Header title="预约出借服务协议" history={history} show_close={false}/>
            <div styleName="contractText" dangerouslySetInnerHTML = {{__html:reserve.contractMsg}}>
            </div>
        </div>
    }
}

export default ReserveProtocol
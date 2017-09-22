import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/user/transfer-records.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class TransferRecords extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="转赠记录" history={history}/>
        </div>
    }
}


export default TransferRecords
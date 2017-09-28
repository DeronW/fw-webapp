import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components'
import styles from '../../css/investor/remark.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Remark extends React.Component {
    render(){
        let {history} = this.props
        return <div>
            <Header title="客户备注" history={history}/>
        </div>
    }
}
export default Remark
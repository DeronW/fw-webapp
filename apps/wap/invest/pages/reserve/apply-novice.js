import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve/apply.css'
import {Components} from 'fw-javascripts'
import {NativeBridge} from '../../helpers/'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveApplyNovice extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="新手标抢购" history={history}/>
        </div>
    }
}

export default ReserveApplyNovice
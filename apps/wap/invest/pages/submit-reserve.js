import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header.js'
import styles from '../css/submit-reserve.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class SubmitReserve extends React.Component{
    render() {
        return <div>
            <Header title="提交预约" history={history}/>
        </div>
    }
}
export default SubmitReserve

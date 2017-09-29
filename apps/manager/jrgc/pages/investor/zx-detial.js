import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/zx-detial.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class zxDetial extends React.Component {
    render(){
        return <div>
            detial
        </div>
    }
}
export default zxDetial
import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/fa-xian/coupon-center.css'
import { NativeBridge } from '../../helpers'
import { Browser } from '../../helpers'

@inject('faxian')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class CouponCenter extends React.Component {
    render(){
        return <div>

        </div>
    }
}
export default CouponCenter
import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'
import {Utils} from 'fw-javascripts'

import gotoPage from '../../lib/helpers/goto-page.js'
import MobileHeader from '../../lib/components/mobile-header.js'
import {Browser, NativeBridge} from '../../lib/helpers'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Mobile extends React.Component {
    render() {
        return <div>
            <MobileHeader bgColor="rgba(8,11,22,0.6)"/>
            <div>this is mobile box</div>
        </div>
    }
}

export default Mobile
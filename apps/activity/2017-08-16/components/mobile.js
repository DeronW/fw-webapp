import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'
import gotoPage from '../../lib/helpers/goto-page.js'
import MobileHeader from '../../lib/components/mobile-header.js'
import Browser from '../../lib/helpers/browser.js'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Mobile extends React.Component {
    render() {
        return <div styleName="mobile">
            {Browser.inApp ? null : <MobileHeader bgColor="rgba(0,0,0,0.5)" />}
        </div>
    }
}
export default Mobile
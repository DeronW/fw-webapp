import React from 'react'
import CSSModules from 'react-css-modules'
import { Browser, NativeBridge } from '../helpers'

import InvestGiftPanel from './pop-panel.js'
import styles from '../css/mobile-header.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class MobileHeader extends React.Component {
    state = {
        show_gift: false
    }

    toggleGift = () => {
        this.setState({ show_gift: !this.state.show_gift })
    }

    backHandler = () => {
        Browser.inApp ?
            NativeBridge.close() :
            location.back()
    }

    render() {
        return <div styleName="placeholder">
            <div styleName="fixed">
                <a styleName="btn-back" onClick={this.backHandler}></a>
                <a styleName="btn-invest" onClick={this.toggleGift}>邀请有礼</a>
            </div>
            {this.state.show_gift &&
                <InvestGiftPanel closeHandler={this.toggleGift} />}
        </div>
    }
}


export default MobileHeader
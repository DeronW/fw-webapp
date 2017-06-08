import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/header.css'
import NativeBridge from '../helpers/native-bridge.js'

/*
 parameters
 <Header title={} history={history prop from router} />
 */

const Header = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})((props) => (
    <div styleName="header">
        <a styleName="btn-back" onClick={() => window.history.goBack}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAvCAMAAADKIyriAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAXVBMVEUAAABTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5UAAADt3LwOAAAAHXRSTlMAHofKYTZiyzQ3KpMz9K2WEURUElNSBW7MZUOs8IRJRR4AAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAXElEQVQ4y+3JyQ5AUBAEwPbs+76b//9NwtH0iYSIuhagsYztqAFXNh4d8emIoSMWneCFE/6DiA7iY5LzIKWDbK+8UKoUftVDV994zQeuvXgdvx70BtAb1cI0LwYrVNwl2vWPSWoAAAAASUVORK5CYII=" />
        </a>
        <a onClick={() => null} styleName="btn-close">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAMAAABKKxPSAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAYFBMVEUAAABTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5VTb5UAAAApLADtAAAAHnRSTlMAIGlLATv0sQZCq6g6rrYHVvwhsnBEV1C3ystDak1AkkaTAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAANZJREFUOMuN1WkPgjAMBuCqHAoCwrzR/v+fCcQ5dvRgX2DpE5Kl7wrAbn/IQF95gVgeJXGq6jNAg/NqO55desRiAIMyXBjiFW69CO+/8sO90dAWTQYitKVn5+9SGDIWxoyBKSMhxQhIswRyLII8C6DEPCgzB18Kc1BjPhTZChXmXLvtcwr0z9Gqx33LV2HtgngV/GZJMGgWD6OecjBpPQ2JhFCQDFIKmbzFkI1lCIX0+lAMuS2WGYxyyN1cM0os/3Oy0dJr5+4yx40Y3rGq8/kxfL4b/gsTau460bwH9cgAAAAASUVORK5CYII=" />
        </a>
        {props.title}
    </div>
))

export default Header

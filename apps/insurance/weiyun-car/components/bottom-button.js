import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/components/bottom-button.css'

const BottomButton = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})((props) => (
    <div styleName="bottom-button">
        <div styleName="fixed-btn">
            <a styleName={props.active ? 'fixed-btn-active' : 'fixed-btn-disabled'}
                onClick={() => props.active && props.onClick && props.onClick()}
            >{props.title}</a>
        </div>
    </div>
))

export default BottomButton

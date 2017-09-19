import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/bulletin.css'


export default CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})(props => {
    return <div styleName="bg">
        <div styleName="panel">
            <div styleName="head"></div>
            <div styleName="text">{props.text}</div>
            <div styleName="close" onClick={props.closeHandler}></div>
            <div styleName="btn" onClick={props.closeHandler}>知道了</div>
        </div>
    </div>
})
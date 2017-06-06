import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/select.css'

/*
 parameters
 <Select placeholder="" value="" options="" handleChange={}/>
 */

const Select = CSSModules(styles)((props) => {
    let gen_options = opt => <option value={opt} onClick={props.handleChange} />
    return (
        <div styleName="select-widget">
            <div styleName="select-mask">
                {props.value ? props.value : props.placeholder}
                <div styleName="expand-btn"></div>
            </div>
            <select styleName="native-select">
                { props.options.map(gen_options) }
            </select>
        </div>
    )
})

export default Select

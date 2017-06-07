import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/select.css'

/*
 parameters
 <Select placeholder="" value="" options="" handleChange={}/>
 */

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Select extends React.Component {
    render() {
        let gen_options = opt => <option styleName="native-option" key={opt.name} value={opt.value}>{opt.name}</option>
        return (
            <div styleName="select-widget">
                <select styleName="native-select" style={{color: this.props.value === '' ? '#999' : '#666'}} onChange={this.props.handleChange}>
                    <option styleName="native-option" key="placeholder" value="">{this.props.placeholder}</option>
                    { this.props.options.map(gen_options) }
                </select>
                <div styleName="expand-btn" />
            </div>
        )
    }
}

export default Select

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
        let hasValidData = this.props.value || this.props.value == '0';
        let maskText = hasValidData ? this.props.options.find((opt) => opt.value === this.props.value).name : this.props.placeholder;
        let gen_options = opt => <option styleName="native-option" key={opt.name} value={opt.value}>{ opt.name }</option>
        return (
            <div styleName="select-widget">
                <div styleName="select-mask" style={{ color: hasValidData ? "#666" : "#999" }}>{ maskText }</div>
                <select styleName="native-select" onChange={this.props.handleChange}>
                    { this.props.options.map(gen_options) }
                </select>
            </div>
        )
    }
}

export default Select

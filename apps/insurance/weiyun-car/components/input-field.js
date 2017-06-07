import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'

import Select from './select.js'

import styles from '../css/input-field.css'

/*
 parameters
 <InputField name="" placeholder="" value="" options="" />
 */

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class InputField extends React.Component {

    handleChange = (e) => {
        this.props.value = e.target.value
        console.log(this.props.value);
    }

    render() {
        return (
            <div styleName="input-field">
                <div styleName="input-field-name">{this.props.name}</div>
                <div styleName="float-right-els">
                    { this.props.options ?
                        <Select placeholder={this.props.placeholder} value={this.props.value} options={this.props.options} handleChange={this.handleChange} /> :
                        <input styleName="input-area" placeholder={this.props.placeholder} value={this.props.value} handleChange={this.handleChange} />
                    }
                </div>
            </div>
        )
    }

}

export default InputField

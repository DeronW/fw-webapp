import React from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/input-field.css'

/*
 parameters
 <InputField name="" placeholder="" value="" options="" />
 */

@CSSModules(styles)
class InputField extends React.Component {

    handleChange = (e) => {
        if (!this.props.options) {
            return this.props.value = e.target.value
        }
        this.props.value = this.props.options.find(opt => opt.name === e.target.value).value;
    }

    render() {
        return (
            <div styleName="input-field">
                <div styleName="input-field-name">{this.props.name}</div>
                { this.props.options ?
                    <Select placeholder={this.props.placeholder} value={this.props.value} options={this.props.options} handleChange={this.handleChange} /> :
                    <input styleName="input-area" placeholder={this.props.placeholder} value={this.props.value} handleChange={this.handleChange} />
                }
            </div>
        )
    }

}

export default InputField

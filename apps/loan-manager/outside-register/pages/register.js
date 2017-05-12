import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/register.css'
import { observer, inject } from 'mobx-react'

@inject('registerInfo', 'uiStores') @observer @CSSModules(styles)
export default class Register extends React.Component {

    render() {
        return (
            <div>
                <input
                    value={this.props.registerInfo.phone}
                    onChange={ this.handleChange('phone') }/>
                <input
                    value={this.props.registerInfo.code}
                    onChange={ this.handleChange('code') }/>
            </div>
        )
    }

    handleChange = (type) => (e) => {
        this.props.registerInfo.handleInput(type, e.target.value);
        this.props.uiStores.switchActiveType(type);
    }

}

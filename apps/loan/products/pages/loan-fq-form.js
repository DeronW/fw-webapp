import React from 'react'
import { render } from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/loan-fq-form.css'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import { Components } from 'fw-javascripts'
import { NativeBridge, Browser, Storage } from '../../lib/helpers'


@inject('fq') @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class FqForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div>
                123
            </div>
        )
    }
}

import React from 'react'
import { render } from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/loan-fq-index.css'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import { Components } from 'fw-javascripts'
import { NativeBridge, Browser, Storage } from '../../lib/helpers'


@inject('fq') @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class FqIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popShow: false,
            start: 0,
            end: 580,
            defaultValue: 580,
            loanNum: 0,
            loanShow: false,
            improveShow: false
        }
    }
    render(){
        return (
            <div>
                456
            </div>
        )
    }
}

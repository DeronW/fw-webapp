import React from 'react'
import {render} from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/fxh.css'
import mobx from 'mobx'
import { observer, inject } from 'mobx-react'
import * as $FW from 'fw-components'
import { BrowserFactory } from 'fw-javascripts'
import { NativeBridgeFactory } from 'fw-javascripts'

@inject('fxh') @observer @CSSModules(styles)
export default class Fxh extends React.Component {
    componentDidMount(){
        this.props.fxh.getFxhData()
    }
}

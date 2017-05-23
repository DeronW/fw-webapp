import React from 'react'
import {render} from 'react-dom'
import BottomNav from './components/bottom-nav'
import CSSModules from 'react-css-modules'
import styles from '../css/mine.css'
import mobx from 'mobx'
import { observer, inject } from 'mobx-react'
import * as $FW from 'fw-components'
import { BrowserFactory } from 'fw-javascripts'
import { NativeBridgeFactory } from 'fw-javascripts'

@inject('mine') @observer @CSSModules(styles)
export default class Mine extends React.Component {
    render(){
        return (
            <div>
                <BottomNav />
            </div>
        )
    }
}

import React from 'react'
import {render} from 'react-dom'
import BottomNav from './components/bottom-nav'
import CSSModules from 'react-css-modules'
import styles from '../css/home.css'
import { observer, inject } from 'mobx-react'
import * as $FW from 'fw-components'

@inject('home') @observer @CSSModules(styles)
export default class Home extends React.Component {
    render(){
        return (
            <div>

                <BottomNav />
            </div>
        )
    }
}

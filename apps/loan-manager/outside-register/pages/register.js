import { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/register.css'
import { observer, inject } from 'mobx-react'

@inject('registerInfo', 'uiStores') @observer @CSSModules(styles)
export default class Register extends Component {

}

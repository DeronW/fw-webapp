import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loan-fxh-result.css'
import { NativeBridge, Browser } from '../../lib/helpers'


@inject('fxh')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class FxhResult extends React.Component {

}




import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import { Header } from '../../lib/components'
import { Browser, Post } from '../../lib/helpers'

import * as $FW from 'fw-javascripts'

import styles from '../css/invite-activity.css'
@inject('apply')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class InviteActivity extends React.Component {
    state = {
        popShow:false
    }
}

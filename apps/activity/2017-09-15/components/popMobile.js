import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/popMobile.css'
import {Get, Post} from '../../lib/helpers'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopPriceMobile extends React.Component {
    state = {
        userName: null,
        userPhone: null,
        userAddress: null,
        btn: false
    }

    componentDidMount() {
        Get('')
            .then(data => {
            })
    }

    render() {
        return <div>

        </div>
    }
}

export default PopPriceMobile

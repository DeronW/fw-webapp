import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/mobile.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Mobile extends React.Component {
    render() {
        return <div></div>
    }
}

export default Mobile

import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/pc.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class PC extends React.Component {
    render() {
        return <div></div>
    }
}

export default PC
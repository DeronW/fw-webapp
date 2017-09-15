import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../../css/topic/novice.css'

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Novice extends React.Component {
    render() {
        return <div>
            sss
        </div>
    }
}

export default Novice
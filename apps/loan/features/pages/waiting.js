import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/waiting.css'
import { Header } from '../../lib/components'


@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class Waiting extends React.Component {

    componentDidMount() {
    }

    render() {
        return <div styleName="bg">
            <Header title="敬请期待" />
            <img styleName="img" src={require('../images/waiting/working.png')} />
            <div styleName="txt">正在建设中</div>
            <div styleName="txt">敬请期待</div>
        </div>
    }
}


export default Waiting
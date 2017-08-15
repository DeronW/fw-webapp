import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../components'
import styles from '../../css/features/about-us.css'


@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class AboutUs extends React.Component {

    render() {
        return <div styleName="bg">
            <Header noClose title="关于我们" history={this.props.history} />
        </div>
    }
}

export default AboutUs
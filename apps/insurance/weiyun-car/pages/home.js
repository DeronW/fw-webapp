import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect, Link } from 'react-router-dom'


@observer @CSSModules(styles)
class Home extends React.Component {
    componentDidMount() {
        document.title = 'HOME'
    }
    render() {
        return <div styleName="bg">
            <img styleName="banner" src={require('../images/home/banner.jpg')} />
            <div>

            </div>
        </div>
    }
}

export default Home

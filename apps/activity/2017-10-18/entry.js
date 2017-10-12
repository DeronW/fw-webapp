import React from 'react'
import { render } from 'react-dom'

import { Browser, UserReady } from '../lib/helpers'

import PC from './components/pc.js'
import Mobile from './components/mobile.js'


class October extends React.Component {

    state = {
        inMobile: false,
        isLoggedIn: false
    }

    componentDidMount() {
        this.setState({ inMobile: Browser.inMobile })
        UserReady((isLoggedIn, user) => this.setState({ isLoggedIn: isLoggedIn }))
    }

    render() {
        const { inMobile, isLoggedIn } = this.state;
        return <div>
            { inMobile ? (
                <Mobile isLoggedIn={isLoggedIn} />
            ) : (
                <PC isLoggedIn={isLoggedIn} />
            )}
        </div>
    }

}

render(<October />, document.getElementById('cnt'))
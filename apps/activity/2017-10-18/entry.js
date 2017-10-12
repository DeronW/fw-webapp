import React from 'react'
import { render } from 'react-dom'

import { Browser, UserReady, gotoPage } from '../lib/helpers'

import PC from './components/pc.js'
import Mobile from './components/mobile.js'


class October extends React.Component {

    state = {
        inMobile: false,
        isLoggedIn: false,
        gcm: '',
    }

    componentDidMount() {
        this.setState({ inMobile: Browser.inMobile })
        UserReady((isLoggedIn, user) => this.setState({
            isLoggedIn: isLoggedIn,
            gcm: user.gcm
        }))
    }

    render() {
        const { inMobile, isLoggedIn, gcm } = this.state;
        return <div>
            { inMobile ? (
                <Mobile isLoggedIn={isLoggedIn} gcm={gcm} gotoHandler={gotoPage} />
            ) : (
                <PC isLoggedIn={isLoggedIn} gcm={gcm} gotoHandler={gotoPage} />
            )}
        </div>
    }

}

render(<October />, document.getElementById('cnt'))
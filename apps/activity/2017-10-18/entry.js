import React from 'react'
import { render } from 'react-dom'

import { Browser, UserReady, gotoPage, Post } from '../lib/helpers'

import PC from './components/pc.js'
import Mobile from './components/mobile.js'


class October extends React.Component {

    state = {
        inMobile: false,
        isLoggedIn: false,
        gcm: '',
        userData: {
            isCompany: false,
            inviteCnt: '',
            inviteReward: '',
            invested: '',
        },
    }

    fetchUserData = () => {
        Post('/api/octNovActivity/v1/getSelfInvestInfo.json').then(({ data }) => {
            this.setState({
                userData: {
                    isCompany: data.isPerson == 0,
                    inviteCnt: data.inviteCount,
                    inviteReward: data.reward,
                    invested: data.selfInvestAmt
                }
            })
        })
    }

    componentDidMount() {
        this.setState({ inMobile: Browser.inMobile })
        UserReady((isLoggedIn, user) => this.setState({
            isLoggedIn: isLoggedIn,
            gcm: user.gcm
        }, () => {
            if (this.state.isLoggedIn) this.fetchUserData();
        }))
    }

    render() {
        const { inMobile, isLoggedIn, gcm, userData } = this.state;
        return <div>
            {inMobile ? (
                <Mobile isLoggedIn={isLoggedIn} gcm={gcm} {...userData} gotoHandler={gotoPage} />
            ) : (
                    <PC isLoggedIn={isLoggedIn} gcm={gcm} {...userData} gotoHandler={gotoPage} />
                )}
        </div>
    }

}

render(<October />, document.getElementById('cnt'))
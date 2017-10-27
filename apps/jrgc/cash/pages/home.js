import React from 'react'
import CSSModules from 'react-css-modules'

import { NavBar, Turntable } from '../components'


class Home extends React.Component {

    state = { loanAmount: 500 }

    handleAmountChange = amount => this.setState({ loanAmount: amount })

    render() {
        return <div>
            <Turntable amountMax='3000' amountMin='500' changeHandler={this.handleAmountChange} />
            <NavBar />
        </div>
    }
}

export default Home
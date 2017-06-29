import "babel-polyfill";

import React from 'react'
import { render } from 'react-dom'

import '../lib/css/common.css'

import PCHeader from '../lib/components/pc-header.js'
import MobileHeader from '../lib/components/mobile-header.js'

class Content extends React.Component {

    state = {

    }

    componentDidMount() {

    }

    render() {
        return <div>
            {/*<PCHeader bgColor={'black'} />*/}
            <MobileHeader bgColor={'red'} />
        </div>
    }
}

render(<Content />, document.getElementById('cnt'))

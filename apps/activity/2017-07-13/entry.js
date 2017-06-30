import "babel-polyfill";

import React from 'react'
import {render} from 'react-dom'

import '../lib/css/common.css'

import PCHeader from '../lib/components/pc-header.js'
import MobileHeader from '../lib/components/mobile-header.js'
import JulyMobile from './components/mobile.js'
import {Get} from '../lib/helpers/request.js'

class Content extends React.Component {

    state = {
        isLogin: null,
        timestamp: null
    }

    componentDidMount() {
        Get('/activity/v1/userState.json', {}).then(data => {
            console.log(data)
            this.setState({isLogin: data.isLogin})
        })

        Get('/activity/v1/timestamp.json')
            .then(data => {
                console.log(data)
                this.setState({timestamp: data.timestamp})
            })

    }

    render() {
        let {isLogin, timestamp} = this.state;
        let isMobile = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i);
        let props = {isLogin: isLogin, timestamp: timestamp}
        let Content = isMobile ? <JulyMobile {...props} /> : <JulyPC/>
        return <div>
            {/*<PCHeader bgColor={'black'} />*/}
            {/*<MobileHeader bgColor={'red'}/>*/}
            {Content}
        </div>
    }
}

render(<Content />, document.getElementById('cnt'))

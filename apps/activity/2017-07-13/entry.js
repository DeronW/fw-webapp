import "babel-polyfill";
import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import '../lib/css/common.css'
import JulyMobile from './components/mobile.js'
import JulyPC from './components/pc.js'
import {Get} from '../lib/helpers/request.js'
import UserReady from '../lib/helpers/user-ready.js'
class Content extends React.Component {

    state = {
        isLogin: null,
        timestamp: null,
        username: null
    }

    componentDidMount() {
        UserReady((isLogin, user) => {
            this.setState({isLogin: isLogin, username: user.userName})
        })
        Get('/activity/v1/timestamp.json')
            .then(data => {
                this.setState({timestamp: data.timestamp})
            })
    }

    closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }

    render() {
        let isMobile = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i);
        let props = {
            isLogin: this.state.isLogin,
            closePopHandler: this.closePopHandler,
            timestamp: this.state.timestamp,
            username: this.state.username
        }
        let Content = isMobile ? <JulyMobile {...props} /> : <JulyPC {...props}/>
        return <div>
            {Content}
        </div>
    }
}

render(<Content />, document.getElementById('cnt'))

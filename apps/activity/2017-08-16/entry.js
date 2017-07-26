import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import '../lib/css/common.css'
import Mobile from './components/mobile.js'
import PC from './components/pc.js'
import { Get } from '../lib/helpers/request.js'
import UserReady from '../lib/helpers/user-ready.js'

class C extends React.Component {
    state = {
        isLogin: null,
        timestamp: null,
    }

    componentDidMount() {
        UserReady((isLogin, user) => {
            this.setState({isLogin: isLogin, username: user.userName})
        });

        Get('/api/userState/v1/timestamp.json')
            .then(data => {
                this.setState({timestamp: data.timestamp})
            });
    }
    closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }
    render() {
        let props = {
            isLogin: this.state.isLogin,
            closePopHandler: this.closePopHandler,
            timestamp: this.state.timestamp,
        }
        return <div>
            {navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
                <Mobile {...props} /> : <PC {...props} />}
        </div>
    }
}
render(<C />, document.getElementById('cnt'))
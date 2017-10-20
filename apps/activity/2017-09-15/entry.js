import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import '../lib/css/common.css'
import Mobile from './components/mobile.js'
import PC from './components/pc.js'
import { Get, UserReady, gotoPage, NativeBridge } from '../lib/helpers'

class Activity extends React.Component {
    state = {
        isLogin: null,
        timestamp: null,
        total: null,
    }

    componentDidMount() {

        UserReady((isLogin, user) => {
            this.setState({ isLogin: isLogin, username: user.userName })
            isLogin && Get('/api/augSepActivity/v1/getSelfInvestInfo.json')
                .then(data => {
                    this.setState({ personData: data.data })
                })

        });

        Get('/api/userState/v1/timestamp.json')
            .then(data => {
                this.setState({ timestamp: data.timestamp })
            });

    }

    closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }

    loginHandler = () => {
        gotoPage('登录')
    }

    render() {
        let { isLogin, total } = this.state;
        let props = {
            isLogin: isLogin,
            closePopHandler: this.closePopHandler,
            timestamp: this.state.timestamp,
            loginHandler: this.loginHandler,
            total: total
        }

        return <div>
            {navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
                <Mobile {...props} /> : <PC {...props} />}
        </div>
    }
}

NativeBridge.setTitle("寻宝大作战")
render(<Activity />, document.getElementById('cnt'))

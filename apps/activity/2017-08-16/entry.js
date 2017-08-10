import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import '../lib/css/common.css'
import Mobile from './components/mobile.js'
import PC from './components/pc.js'
import { Get } from '../lib/helpers/request.js'
import UserReady from '../lib/helpers/user-ready.js'
import gotoPage from '../lib/helpers/goto-page.js'

class C extends React.Component {
    state = {
        isLogin: null,
        timestamp: null,
        ladderData: [],
        total: null,
        personData: {}
    }

    componentDidMount() {
        UserReady((isLogin, user) => {
            this.setState({ isLogin: isLogin, username: user.userName })
        });

        Get('/api/userState/v1/timestamp.json')
            .then(data => {
                this.setState({ timestamp: data.timestamp })
            });

        Get('/api/augSepActivity/v1/getAugSepInvestList.json')
            .then(data => {
                this.setState({ ladderData: data.teamdata, total: data.total })
            })

        Get('/api/augSepActivity/v1/getSelfInvestInfo.json')
            .then(data => {
                this.setState({ personData: data.data })
            })
    }

    closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }

    loginHandler = () => {
        gotoPage('登录', 'http://www.gongchangp2p.com/api/activityPullNew/ActivityControl.shtml?code=BJLTHD')
    }
    render() {
        let { isLogin, ladderData, personData,total } = this.state;
        let props = {
            isLogin: isLogin,
            closePopHandler: this.closePopHandler,
            timestamp: this.state.timestamp,
            loginHandler: this.loginHandler,
            ladderData: ladderData,
            personData: personData,
            total:total
        }

        return <div>
            {navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ?
                <Mobile {...props} /> : <PC {...props} />}
        </div>
    }
}
render(<C />, document.getElementById('cnt'))
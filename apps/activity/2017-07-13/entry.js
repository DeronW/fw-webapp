
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
        rankdata: [],
        singledata: {},
        fightdata: []
    }

    componentDidMount() {
        UserReady((isLogin, user) => {
            this.setState({isLogin: isLogin, username: user.userName})
            this.state.isLogin && this.getSelfData()
        });

        Get('/api/userState/v1/timestamp.json')
            .then(data => {
                this.setState({timestamp: data.timestamp})
            });
        Get('/api/fiveYearsActivity/v1/getTeamAndSelfYearAmt.do')
            .then(data => {
                this.setState({rankdata: data.data})
            }, () => true);
        Get('/api/fiveYearsActivity/v1/getTeamYam.do')
            .then(data => {
                this.setState({fightdata: data.data})
            })
    }

    getSelfData = () => {
        Get('/api/fiveYearsActivity/v1/getSelfYearAmt.do')
            .then(data => {
                this.setState({singledata: data.data})
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
            rankdata: this.state.rankdata,
            singledata: this.state.singledata,
            fightdata: this.state.fightdata
        }
        let Content = isMobile ? <JulyMobile {...props} /> : <JulyPC {...props}/>
        return <div>
            {Content}
        </div>
    }
}

render(<Content />, document.getElementById('cnt'))

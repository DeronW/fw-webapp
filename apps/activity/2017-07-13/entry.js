import "babel-polyfill";
import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom'
import '../lib/css/common.css'
import JulyMobile from './components/mobile.js'
import JulyPC from './components/pc.js'
import {Get} from '../lib/helpers/request.js'

class Content extends React.Component {

    state = {
        isLogin: null,
    }

    componentDidMount() {
        Get('/activity/v1/userState.json', {}).then(data => {
            console.log(data)
            this.setState({isLogin: data.isLogin})
        })
    }

    closePopHandler = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    }

    render() {
        let {isLogin} = this.state;
        let isMobile = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i);
        let props = {isLogin: isLogin, closePopHandler: this.closePopHandler}
        let Content = isMobile ? <JulyMobile {...props} /> : <JulyPC/>
        return <div>
            {/*<PCHeader bgColor={'black'} />*/}
            {/*<MobileHeader bgColor={'red'}/>*/}
            {Content}
        </div>
    }
}

render(<Content />, document.getElementById('cnt'))

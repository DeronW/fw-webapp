import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/pop-start.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PopStartPC extends React.Component {
    state = {
        start: false
    }
    componentDidMount() {
        let timestamp = this.props.timestamp;//当前时间
        let now = 1502848800000 ;//活动开启时间2017年8月16日10:00 1502848800000
        if (timestamp > now) {
            this.setState({ start: false })
        } else {
            this.setState({ start: true })
        }
    }
    closeHandler = () =>{
        this.setState({start:false})
    }
    render() {
        let { start } = this.state;
        return <div styleName="popStartPC" style={{ display: start ? 'block' : 'none' }}>
            <div styleName="popStartPanelPC">
                <div styleName="titlePC">活动暂未开启</div>
                <div styleName="text">活动时间：2017.8.16 10:00 - 2017.9.14</div>
                <div styleName="text">客服电话：</div>
                <div styleName="text">400-0322-988</div>
                <div styleName="text">010-65255966</div>
            </div>
        </div>
    }
}

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PopStartMobile extends React.Component {
    state = {
        start: false
    }
    closeHandler = () =>{
        this.setState({start:false})
    }
    componentDidMount() {
        let timestamp = this.props.timestamp;//当前时间
        let now = 1502848800000;//活动开启时间2017年8月16日10:00 1502848800000
        
        if (timestamp > now) {
            this.setState({ start: false })
        } else {
            this.setState({ start: true })
        }
    }
    render() {
        let { start } = this.state;
        return <div styleName="popStartMobile" style={{ display: start ? 'block' : 'none' }}>
            <div styleName="popStartPanelMobile">
                <div styleName="titleMobile">活动暂未开启</div>
                <div styleName="text">活动时间：2017.8.16 10:00 - 2017.9.14</div>
                <div styleName="text">客服电话：</div>
                <div styleName="text">400-0322-988</div>
                <div styleName="text">010-65255966</div>
            </div>
        </div>
    }
}
export {PopStartPC,PopStartMobile} 
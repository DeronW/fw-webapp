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
        let now = +new Date("2017-07-06 23:59:59");//活动开启时间
        if (timestamp > now) {
            this.setState({ start: false })
        } else {
            this.setState({ start: true })
        }
    }
    render() {
        let { start } = this.state;
        return <div styleName="popStartPC" style={{ display: start ? 'block' : 'none' }}>
            <div styleName="popStartPanelPC">
                活动未开始
            </div>
        </div>
    }
}

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class PopStartMobile extends React.Component {
    state = {
        start: false
    }
    componentDidMount() {
        let timestamp = this.props.timestamp;//当前时间
        let now = +new Date("2017-07-06 23:59:59");//活动开启时间
        
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
                活动未开始
            </div>
        </div>
    }
}
export {PopStartPC,PopStartMobile} 
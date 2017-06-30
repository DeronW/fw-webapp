import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'
import MobileHeader from '../../lib/components/mobile-header.js'
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class JulyMobile extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.popStatusHandler()
    }

    popStatusHandler = () => {
        let {isLogin, timestamp} = this.props
        let july_start_time = 1499875200000;//2017-07-13 00:00:00  时间戳
        let july_end_time = 1502726400000;//2017-08-15 00:00:00 时间戳
        console.log(timestamp)
        console.log(`mobile:${july_start_time}`)
        console.log(`mobile:${july_end_time}`)
        if (timestamp < july_start_time) {
            console.log("notstart")
            // ReactDOM.render(<PopStartPanel/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            // ReactDOM.render(<PopEndPanel/>, document.getElementById("pop"))
            console.log("aleadyend")
        }
    }

    startmove = (x, y) => {
        window.scrollTo(x, y)
    }

    render() {
        return <div styleName="july-mobile-box">
            <MobileHeader/>
            <div styleName="m-banner">
                <img src={require("../images/mobile/m-anchor-1.png")} styleName="banner-item m-anchor-one" onClick={() => this.startmove(0, 700)}/>
                <img src={require("../images/mobile/m-anchor-2.png")} styleName="banner-item m-anchor-two" onClick={() => this.startmove(0, 3200)}/>
                <img src={require("../images/mobile/m-anchor-3.png")} styleName="banner-item m-anchor-three" onClick={() => this.startmove(0, 2540)}/>
                <img src={require("../images/mobile/m-anchor-4.png")} styleName="banner-item m-anchor-four" onClick={() => this.startmove(0, 2000)}/>
                <img src={require("../images/mobile/m-anchor-5.png")} styleName="banner-item m-anchor-five" onClick={() => this.startmove(0, 5750)}/>
            </div>
        </div>
    }
}

export default JulyMobile
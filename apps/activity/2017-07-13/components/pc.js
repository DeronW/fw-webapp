import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import {Get} from '../../lib/helpers/request.js'
import PCHeader from '../../lib/components/pc-header.js'
import {PopStartPanel, PopTeamTips} from './popall.js'
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class JulyPC extends React.Component {
    state = {
        timestamp: null
    }

    componentDidMount() {
        Get('/activity/v1/timestamp.json')
            .then(data => {
                console.log(`data.timestamp_pc:${data.timestamp}`)
                this.setState({timestamp: data.timestamp})
                this.popStatusHandler()
            })
    }

    popStatusHandler = () => {
        let july_start_time = 1499875200000;//2017-07-13 00:00:00  时间戳
        let july_end_time = 1502726400000;//2017-08-15 00:00:00 时间戳
        let {timestamp} = this.state
        console.log(timestamp)
        console.log(`pc_start_time:${july_start_time}`)
        console.log(`pc_end_time:${july_end_time}`)
        if (timestamp < july_start_time) {
            // ReactDOM.render(<PopStartPanel/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            // ReactDOM.render(<PopEndPanel/>, document.getElementById("pop"))
        }
    }


    scroll = (x, y) => {
        window.scrollTo(x, y)
    }

    render() {
        return <div styleName="july-pc-box">
            <PCHeader/>
            <div styleName="pc-banner">
                <img src={require("../images/pc/banner.jpg")} width="100%" height="100%"/>
                <img src={require("../images/pc/anchor-1.png")} styleName="anchor-item anchor-one"
                     onClick={() => this.scroll(0, 750)}/>
                <img src={require("../images/pc/anchor-2.png")} styleName="anchor-item anchor-two"
                     onClick={() => this.scroll(0, 3170)}/>
                <img src={require("../images/pc/anchor-3.png")} styleName="anchor-item anchor-three"
                     onClick={() => this.scroll(0, 2450)}/>
                <img src={require("../images/pc/anchor-4.png")} styleName="anchor-item anchor-four"
                     onClick={() => this.scroll(0, 1950)}/>
                <img src={require("../images/pc/anchor-5.png")} styleName="anchor-item anchor-five"
                     onClick={() => this.scroll(0, 4600)}/>
            </div>
        </div>
    }


}
export default JulyPC
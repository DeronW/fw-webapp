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
        let {isLogin,timestamp} = this.props
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

    render() {
        return <div>
            <MobileHeader/>
            <div className="m-banner">
            </div>
        </div>
    }
}

export default JulyMobile
import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import PCHeader from '../../lib/components/pc-header.js'
import PopGetPricePC from './popPC.js'


@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PC extends React.Component {

    state = {
        userName: null,
        userPhone: null,
        userAdress: null
    }

    popPriceHandler = () => {
        console.log(111)
        let {closePopHandler, isLogin} =this.props;
        ReactDOM.render(<PopGetPricePC isLogin={isLogin}
                                       closePopHandler={closePopHandler}/>, document.getElementById("pop"))
    }

    render() {
        return <div>
            <PCHeader bgColor="rgba(8,11,22,0.6)"/>
            <div styleName="pop-price" onClick={this.popPriceHandler}>领取奖品</div>
        </div>
    }
}

export default PC
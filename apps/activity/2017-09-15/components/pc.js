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
        userAdress: null,
        userMoney: 1200
    }

    componentDidMount() {
        // if(this.state.userMoney <1000){
        //
        // }
    }

    popPriceHandler = () => {
        console.log(111)
        let {closePopHandler, isLogin} = this.props;
        ReactDOM.render(<PopGetPricePC isLogin={isLogin}
                                       closePopHandler={closePopHandler}/>, document.getElementById("pop"))
    }

    render() {
        let {userMoney} = this.state
        let gift1_on = <div styleName="wrapper-on">
            <div styleName="des">150元话费券</div>
            <div styleName="gift1_on"></div>
            <div styleName="price1_tips"></div>
        </div>
        let gift1_close = <div styleName="wrapper-close">
            <div styleName="gift1_close"></div>
        </div>
        return <div>
            <PCHeader bgColor="rgba(8,11,22,0.6)"/>
            <div styleName="bg">
                <div styleName="goInvest">
                    <div styleName="btn_invest"></div>
                </div>
                <div styleName="roadbg">
                    <div styleName="gift1">
                        {userMoney > 1000 && gift1_on}
                        {userMoney <= 1000 && gift1_close}
                    </div>
                    <div styleName="gift2">

                    </div>
                    <div styleName="gift34"></div>
                    <div styleName="gift5"></div>
                    <div styleName="gift6"></div>
                    <div styleName="gift7"></div>
                </div>
            </div>
            <div styleName="pop-price" onClick={this.popPriceHandler}>领取奖品</div>
        </div>
    }
}

export default PC
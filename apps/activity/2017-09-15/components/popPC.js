import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/popPC.css'
import {Get, Post} from '../../lib/helpers'


@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopGetPricePC extends React.Component {
    state = {
        userName: '',
        userPhone: '',
        userAddress: '',
        btn: false
    }

    componentDidMount() {
        Get('')
            .then(data => {})
    }

    nameHandler = (e) => {
        this.setState({userName: e.target.value})

    }

    phoneHandler = e => {
        if (e.target.value.length > 11) {
            this.setState({userPhone: e.target.value.slice(0, 11)})
        } else {
            this.setState({userPhone: e.target.value})
        }
    }

    adressHandler = (e) => {
        this.setState({userAddress: e.target.value})
    }

    keepHandler = () => {
        let {userName, userPhone, userAddress} = this.state
        if (userName && userPhone && userAddress) {
            this.setState({btn: true})
        }

    }

    reviseHandler = () => {
        this.setState({btn: false})
    }

    render() {
        let {userName, userPhone, userAddress, btn} = this.state;
        let name_on = <div styleName="name-on">
            <span>姓名：</span>
            <input type="text" maxLength="4" onChange={this.nameHandler} value={userName}/>
        </div>
        let phone_on = <div styleName="phone-on">
            <span>联系方式：</span>
            <input type="number" onChange={this.phoneHandler} value={userPhone}/>
        </div>
        let address_on = <div styleName="address-on">
            <span>收货地址：</span>
            <textarea onChange={this.adressHandler} value={userAddress} placeholder="请输入收货地址" maxLength="10"></textarea>
        </div>

        let name = <div>
            <span>姓名：</span><span>{userName}</span>
        </div>

        let phone = <div>
            <span>联系方式：</span><span>{userPhone}</span>
        </div>

        let address = <div>
            <span>收货地址：</span><span>{userAddress}</span>
        </div>

        return <div styleName="price-pc">
            <div styleName="text-wrapper">
                {btn ? name : name_on}
                {btn ? phone : phone_on}
                {btn ? address : address_on}
                <div styleName="btn" onClick={btn ? this.reviseHandler : this.keepHandler}>
                    {btn ? "修改" : "保存"}
                </div>
            </div>
        </div>
    }
}

export default PopGetPricePC
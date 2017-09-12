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
            .then(data => {
            })
    }

    nameHandler = (e) => {
        this.setState({userName: e.target.value})

    }

    phoneHandler = e => {
        if (e.target.value.length > 15) {
            this.setState({userPhone: e.target.value.slice(0, 15)})
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

    closeHandler = () => {
        this.props.closePopHandler()
    }

    render() {
        let {userName, userPhone, userAddress, btn} = this.state;
        let name_on = <div styleName="textline name-on">
            <span styleName="text-left">收货人姓名：</span>
            <input type="text" maxLength="10" onChange={this.nameHandler} value={userName} styleName="name-write"
                   placeholder="仅可输入汉字，不能输入数字，限10字以内"/>
        </div>
        let phone_on = <div styleName="textline phone-on">
            <span styleName="text-left">收货人联系电话：</span>
            <input type="number" onChange={this.phoneHandler} value={userPhone} styleName="phone-write"
                   placeholder="仅可输入数字，且限制15个数字以内"/>
        </div>
        let address_on = <div styleName="textline address-on">
            <span styleName="text-left">详细地址：</span>
            <textarea onChange={this.adressHandler} value={userAddress} placeholder="100字以内" maxLength="100"
                      styleName="address-write">

            </textarea>
        </div>

        let name = <div styleName="textline">
            <span styleName="text-left">收货人姓名：</span><span styleName="name-write saveline">{userName}</span>
        </div>

        let phone = <div styleName="textline">
            <span styleName="text-left">收货人联系电话：</span><span styleName="phone-write saveline">{userPhone}</span>
        </div>

        let address = <div styleName="textline">
            <span styleName="text-left">详细地址：</span><span styleName="address-write">{userAddress}</span>
        </div>

        return <div styleName="price-pc">
            <div styleName="text-wrapper">
                <div styleName="info">
                    <div styleName="info-title">收货地址</div>
                    {btn ? name : name_on}
                    {btn ? phone : phone_on}
                    {btn ? address : address_on}
                    <div styleName="btn">
                        {btn ? <div styleName="change-btn" onClick={this.reviseHandler}>修改</div>
                            : <div styleName="save-btn" onClick={this.keepHandler}>保存</div>}
                    </div>
                    <div styleName="info-tips">
                        提示：请准确填写收货地址，以便您能收到奖品。<br/>
                        如有疑问，请联系客服：400-0322-988
                    </div>
                </div>
                <div styleName="close-btn" onClick={this.closeHandler}></div>
            </div>
        </div>
    }
}

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PopGroupPC extends React.Component {
    closeHandler = () => {
        this.props.closePopHandler()
    }

    render() {
        return <div styleName="group-pc-wrapper">
            <div styleName="group-pc">
                <div styleName="group-text">很遗憾，企业用户不参与本次活动！</div>
                <div styleName="close-btn" onClick={this.closeHandler}></div>
            </div>
        </div>
    }
}

export {PopGetPricePC, PopGroupPC}
import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Components} from 'fw-javascripts'
import {Header} from '../../lib/components'
import {Storage, NativeBridge, Browser} from '../../lib/helpers'

import styles from '../css/loan-youyi-address.css'

@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class LoopLoanAddress extends React.Component {

    state = {
        deleteAddressShow:false,
        inputAddressValue:""
    }

    componentDidMount() {}
    inputAddressHandler = e => {
        this.setState({inputAddressValue:e.target.value})
        if(this.state.inputNameValue1){
            this.setState({inputAddressValue:true})
        }
    }
    clearAddress = () => {
        this.setState({deleteAddressShow:false,inputAddressValue:""});
    }
    render() {
        let {history} = this.props;
        let {deleteAddressShow,inputAddressValue} = this.state;
        return <div styleName="bg">
            <Header title="现住址" history={history}/>
            <div styleName="content">
                <div styleName="district-item">
                    <span styleName="title">请输入您的现居地址</span>
                    <div styleName="sub-cover">
                        <div styleName="item-select">
                            <div styleName="text">所在地区</div>
                            <span styleName="s-text">选择地区</span>
                            <img styleName="arrow" src={require("../images/loan-youyi-contact/entry.png")} alt=""/>
                        </div>
                        <div styleName="item-detail">
                            <div styleName="text">详细住址</div>
                        <input type="text" placeholder="输入街道楼牌号等" styleName="input" onChange = {this.inputAddressHandler } value = {inputAddressValue}/>
                    {inputAddressValue && <b styleName = "delete" onClick = {this.clearAddress}>&times;</b>}
                        </div>
                    </div>

                </div>

            </div>

            <div styleName="submit-btn-container">
                <a styleName="submit-btn">确定</a>
            </div>
        </div>
    }
}

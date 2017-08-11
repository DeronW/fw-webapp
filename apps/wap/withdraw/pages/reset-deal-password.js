import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

@inject("reset_deal_password") @observer @CSSModules(styles, { "allowMultiple": true,"errorWhenNotFound": false })
export default class ResetDealPassword extends React.Component {
    static onEnter() {
        document.title = "重设交易密码";
    }
    constructor(props){
        super(props);
        this.state = {
            title:"验证身份",
            phone:"",
            IDcardNum:""
        }
    }
    backwards(){
        history.go(-1);
    }
    render(){
        return <div>
            <div styleName="reset-deal-password-wrapper">
                {/*头部*/}
                <div styleName="head">
                    <div styleName="return-btn" onClick={this.backwards}>
                        <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                    </div>
                    <div styleName="title" >{this.state.title}</div>
                    <a styleName="to-cash-records">关闭</a>
                </div>
               {/*内容*/}
               <div>
                    <div styleName="identity-cover">
                        {/*验证身份*/}
                        <div styleName="identity">
                            {/*姓名*/}
                            <div styleName="input-block">
                                <span styleName="icon name-icon"></span>
                                <div styleName="text-block">李建光</div>
                            </div>
                            {/*身份证号*/}
                            <div styleName="input-block">
                                <span styleName="icon id-icon"></span>
                                <div styleName="text-block">
                                    <input type="text" styleName="id-input" placeholder="请输入身份证" value="" />
                                </div>
                            </div>
                            {/*手机号*/}
                            <div styleName="input-block">
                                <span styleName="icon phone-icon"></span>
                                <div styleName="text-block">137****9362</div>
                            </div>
                            {/*验证码*/}
                            <div styleName="input-block code-block">
                                <span styleName="code">
                                    <input type="text" styleName="code-input" placeholder="请输入验证码" />
                                </span>
                                <span styleName="btn-code">
                                    <span styleName="timing-text">获取验证码</span>
                                </span>
                            </div>
                        </div>
                        {/*phone-code-prompt*/}
                        <div styleName="phone-code-prompt"></div>
                        {/*设置交易密码*/}
                        <div styleName="btn-area">
                            <div styleName="ui-btn ui-red-btn">设置交易密码</div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    }
}
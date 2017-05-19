import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

@inject("cash_records") @observer @CSSModules(styles)
export default class CashRecords extends React.Component {
    static onEnter() {
        document.title = "提现记录";
    }
    backwards(){
        // let path = location.href.replace(/#.*$/, '') + '#/cash';
        // history.pushState({})
        history.go(-1);
    }
    render() {
        return <div>
            <div styleName="cash-records-wrapper">
                {/*头部*/}
                <div styleName="head">
                    <div styleName="return-btn" onClick={this.backwards}>
                        <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                    </div>
                    <div styleName="title" >提现记录</div>
                </div>
               {/*内容*/}
            </div>
        </div>
    }
}
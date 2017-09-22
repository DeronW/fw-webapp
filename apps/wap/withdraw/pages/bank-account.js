import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import * as $FWC from 'fw-components'
// import * as $FW from 'fw-javascripts'

@inject("bank_account") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class BankAccount extends React.Component {
    static onEnter() {
        document.title = "开户支行";
    }
    constructor(props){
        super(props);
        // this.request = request;
        // console.log(this.request);
        this.state = {
            title:"开户支行",
            selectBank:false,
            value:"",
            bankList: [],
            promptBankNoShow: false,
            data:{}
        }
        this.callbackOpenBankBtn=this.callbackOpenBankBtn.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.bankHandler=this.bankHandler.bind(this);
        this.bankListClear=this.bankListClear.bind(this);
        // this.refreshBankList=this.refreshBankList.bind(this);
    }
     callbackOpenBankBtn () {
        this.props.callbackOpenBank(false);
    }
    handleChange(e){
        var val = e.target.value;
        this.setState({ value: val });
        this.refreshBankList(this.state.value);
        if(this.state.value == ""){
            this.state.bankList = [];
        }
    }
    bankHandler(index) {
        this.props.callbackSelectBankInfo(false, this.state.bankList[index]);
    }
    bankListClear(){
        this.setState({value:"",bankList:[]});
    }

 refreshBankList = (value) => {
        let fn = () => {
            this.props.bank_account.getBankList(this.state.value)
            .then(() => {
                    this.setState({ bankList: this.props.bank_account.bankList })

                    if (this.props.bank_account.bankList.length === 0) {
                        this.setState({
                            promptBankNoShow: true
                        });
                    } else {
                        this.setState({
                            promptBankNoShow: false
                        });
                    }
                })
        }
        clearTimeout(this._timer);
        if (value) this._timer = setTimeout(fn, 500);
    }
    componentDidMount(){
    }
    render(){
        let list = () => {
            var li = (d, index) => <li key={index} onClick={this.bankHandler.bind(this, index)}><span
                >{d.bankName}</span> <img src={require("../images/card-c.png")} /></li>;

            return <ul styleName="list">{this.state.bankList.map(li)}</ul>;
        };
        return <div>
            <div styleName="cash-search-wrapper open-bank">
                {/*头部*/}
                <div styleName="head top-nav">
                    <div styleName="return-btn" onClick={this.callbackOpenBankBtn}>
                        <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                    </div>
                    <div styleName="title" >{this.state.title}</div>
                </div>
               {/*内容*/}
               {/*请输入开户支行的关键词*/},
               <div styleName="select-bank">
                    <div styleName="search">
                        <img src={require("../images/search.png")} styleName="search-logo" alt=""/>
                        <input type="text" styleName="search-text" placeholder="请输入开户支行的关键词" value={this.state.value} onChange={this.handleChange}/>
                        <img src={require("../images/false.jpg")} styleName="close" alt="" onClick={this.bankListClear}/>
                    </div>
                    {(this.state.bankList.length == 0 ? null : this.state.bankList.length) && list()}
               </div>
               </div>
        </div>
    }
}
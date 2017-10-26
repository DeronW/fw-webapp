import React from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import {Header} from '../../lib/components'

import styles from '../css/bank-card.css'

@inject('bank_card')
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
class BankCard extends React.Component {


    state = {
        tab: 'yyj',
        fxhList:[],
        yyjList:[]
    }
    gotoHandler = link => {
        location.href = encodeURI(link);
    }
    componentDidMount() {
        let {bank_card} = this.props;
        bank_card.fetch_card_list().then(() => {
            bank_card.all.map(this.filter);
            this.setState({fxhList:this.state.fxhList,yyjList:this.state.yyjList})
        });

    }
    filter = (item) => {
        let cardLabel = item.authPlatform || '',
            cardLabelArray = cardLabel === '' ? [] : cardLabel.split(',');
        if(cardLabelArray.indexOf("1")!= "-1"){
            this.state.fxhList.push(item);
        }
        if(cardLabelArray.indexOf("2")!= "-1"){
            this.state.yyjList.push(item);
        }
    }

    switchTab = tab => {
        if (tab != this.state.tab) {
            this.setState({
                tab: tab
            });
        }
    }
    // toAddCard = () => {
    //     this.state.tab == 'yyj' ? this.gotoHandler(`/static/loan/products/index.html#/loan-youyi-card-add`)
    //     : this.state.tab == 'fxh' ? this.gotoHandler(`/static/loan/user-card-set/index.html`) : "";
    // }
    render() {
        let {history,bank_card} = this.props;
        let bank_item = (item, index) => {
            return <div styleName="card" key={item.cardNo}>
                <div styleName="bank-info">
                    <div styleName="bank-logo">
                        <img src={item.logoUrl} />
                    </div>
                    <div styleName="bank-name">{item.bankShortName}</div>
                </div>
                <div styleName="card-info">
                    <span styleName="card-no">{item.cardNo}</span>
                    {/* { cardLabelArray.map(gen_card_labels) } */}
                </div>
            </div>
        }
        return <div styleName="bg">
            <Header title="银行卡管理" history={history}/>
            <div styleName="content">
                <div styleName="tabs">
                    <div styleName="tab" onClick= {() => this.switchTab('yyj')}>
                        <span styleName= {`text ${this.state.tab == "yyj" && "active"}`}>优易借</span>
                    </div>
                    <div styleName="tab" onClick= {() => this.switchTab('fxh')}>
                        <span styleName= {`text ${this.state.tab == "fxh" && "active"}`}>放心花</span>
                    </div>
                    <span styleName="line"></span>
                </div>

                {this.state.tab == 'yyj' && this.state.yyjList.length == 0 && <div styleName="add" onClick = {() => {this.gotoHandler(`/static/loan/products/index.html#/loan-youyi-card-add`)}}>
                    <img styleName="logo" src={require("../images/add-bank.png")}/>
                    <span>添加银行卡</span>
                </div>}
                {this.state.tab == 'fxh' && this.state.fxhList.length == 0 && <div styleName="add" onClick = {() => {this.gotoHandler(`/static/loan/user-card-set/index.html`)}}>
                    <img styleName="logo" src={require("../images/add-bank.png")}/>
                    <span>添加银行卡</span>
                </div>}
                {this.state.tab == 'yyj' && <div styleName="list-container">
                           { this.state.yyjList.map(bank_item) }
                       </div>}
                {this.state.tab == 'fxh' && <div styleName="list-container">
                                  { this.state.fxhList.map(bank_item) }
                              </div>}
            </div>
            {this.state.tab == 'fxh' && <div styleName="add-bank-cover">
                <div styleName="add-bank-btn" onClick = {() => {history.push('/bank-card-add')}}>添加银行卡</div>
            </div>}
        </div>
    }
}

export default BankCard

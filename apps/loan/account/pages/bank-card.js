import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'

import styles from '../css/bank-card.css'

@inject('bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCard extends React.Component {

    // componentDidMount() {
    //     document.title = '银行卡管理';
    //     this.props.bank_card.fetch_card_list();
    // }

    // render() {
    //     // 从银行卡管理入口进来：
    //     // *1 显示卡片label
    //     // *2 显示tips
    //     // *3 不允许绑卡
    //     let { bank_card, history } = this.props;
    //
    //     let bank_item = (item, index) => {
    //         let cardLabelStr = item.authPlatform || '',
    //             cardLabelArray = cardLabelStr === '' ? [] : cardLabelStr.split(','),
    //             gen_card_labels = labelNo => {
    //                 let cardLabel;
    //                 if (labelNo == 1) {
    //                     cardLabel = '放心花';
    //                 } else if (labelNo == 2) {
    //                     cardLabel = '优易借';
    //                 }
    //                 return <div styleName="card-label" key={labelNo}>
    //                     <span>{cardLabel}</span>
    //                 </div>
    //
    //             };
    //
    //         return <div styleName="card" key={item.cardNo}>
    //             <div styleName="bank-info">
    //                 <div styleName="bank-logo">
    //                     <img src={item.logoUrl} />
    //                 </div>
    //                 <div styleName="bank-name">{item.bankShortName}</div>
    //             </div>
    //             <div styleName="card-info">
    //                 <span styleName="card-no">{item.cardNo}</span>
    //                 { cardLabelArray.map(gen_card_labels) }
    //             </div>
    //         </div>
    //     }
    //
    //     return <div styleName="cnt-container">
    //         <Header title="银行卡管理" history={history} />
    //
    //         <div styleName="tips">
    //             1.在这里您可以看到使用不同借款产品时绑定过的银行卡；
    //             <br/>
    //             2.在实际使用中我们会自动为您筛选当前可用的银行卡。
    //         </div>
    //
    //         <div styleName="list-container">
    //             { bank_card.all.map(bank_item) }
    //         </div>
    //     </div>
    // }
    state = {
        tab: 'yyj',
        link: '',
        records: [],
        page: 1
    }
    componentDidMount() {
        // document.title = '银行卡管理';
    }
    switchTab = tab => {
        if(tab != this.state.tab){
            this.setState({tab:tab});
        }
    }
    render(){
        return <div styleName = "bg">
            <Header title="银行卡管理" history={history} />
            <div styleName = "content">
                <div styleName = "tabs">
                    <div styleName = "tab"  onClick = {() => this.switchTab('yyj')}><span styleName = {`text ${this.state.tab == "yyj" && "active"}`}>优易借</span></div>
                <div styleName = "tab"  onClick = {() => this.switchTab('fxh')}> <span styleName = {`text ${this.state.tab == "fxh" && "active"}`}>放心花</span></div>
                <span styleName = "line"></span>
                </div>
                <div styleName = "add">
                    <img styleName = "logo" src={require("../images/add-bank.png")}/>
                    <span>添加银行卡</span>
                </div>
            </div>
        </div>
    }
}

export default BankCard

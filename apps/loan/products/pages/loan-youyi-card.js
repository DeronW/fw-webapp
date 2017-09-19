import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loan-youyi-card.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //checked:null
            checked:[],
            selectedBankUuid:null
        }
    }
    componentDidMount(){
        document.title = '选择银行卡';
        this.props.loopLoan.get_cardlist();
    }

    selectHandler = (index, selectedBankUuid) => {
        let t = this.state.checked;
        t = [];
        //t[index] = !t[index]
        t[index] = true;
        this.setState({ checked: t, selectedBankUuid: selectedBankUuid});
        //this.setState({checked:index});
    }

    confirmHandler = () => {
        if(Object.keys(this.state.checked).length === 0){
            Components.showToast('请选择银行卡')
        }else{
            this.props.loopLoan.submit_bankinfo(this.state.selectedBankUuid);
        }
    }


    render(){
        let { history, loopLoan } = this.props;

        let card_item = (item,index) => {

            let handler = () => this.selectHandler(index, item.uuid),
                checked = this.state.checked[index];
            //let {checked} =this.state;
            return <div styleName="card-item" key={index} onClick={handler}>
                <div styleName="checkbox-wrap">
                    <span styleName={ checked ? "checked-box" : "unchecked-box"}></span>
                </div>
                <div styleName="card">
                    <div styleName="logo-wrap">
                        <img styleName="card-logo" src={item.logoUrl}/>
                    </div>
                    <div styleName="card-info">
                        <div styleName="bank-name">{item.bankShortName}</div>
                        <div styleName="card-no">{item.cardNo}</div>
                    </div>
                </div>
            </div>
        }

        return (
            <div styleName="cnt-container">
                <Header title="选择银行卡" history={history}/>
                <div styleName="card-tip">首次使用优易借产品时，您需要重新绑定一张银行卡。</div>
                <div styleName="card-list">
                    {loopLoan.cardList.map(card_item)}
                </div>
                <div styleName="btn-container">
                    <div styleName="btn" onClick={this.confirmHandler}>确认</div>
                </div>
            </div>
        )

    }
}


import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loop-loan-card.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            checked:false
        }
    }
    componentDidMount(){
        document.title = '选择银行卡';
        this.props.loopLoan.get_cardlist();
    }

    selectHandler = () => {
        this.setState({checked:!this.state.checked})
    }

    render(){
        let { history, loopLoan } = this.props;

        let card_item = (item,index) => {
            return <div styleName="card-item" key={index}>
                <span styleName={this.state.checked ? "checked-box" : "unchecked-box"} onClick={this.selectHandler}></span>
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
                <Header title="选择银行卡" history={history} />
                <div styleName="card-tip">首次使用优易借产品时，您需要重新绑定一张银行卡。</div>
                <div styleName="card-list">
                    {loopLoan.loopLoan_card.map(card_item)}
                </div>
                <div styleName="btn-container">
                    <div styleName="btn">确认</div>
                </div>
            </div>
        )

    }
}


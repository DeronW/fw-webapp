import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Utils } from 'fw-javascripts'

import { Header } from '../../lib/components'
import styles from '../css/repayment-fangxin.css'

@inject()
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class RepaymentFangXin extends React.Component {

    componentDidMount() {
        document.title = "还款明细"
    }
    inputAmountHandler = () => {
        
    }
    render() {
        let { history } = this.props;
        return <div styleName="repayment">
            <Header title="还款明细" history={history} />
            <div styleName="banner">
                <img src={require("../images/repayment-fxh/ue.png")} alt=""/>
                <span>优易借</span>
            </div>
            <div styleName="amount">
                <div styleName="money amountMoney">
                    <div styleName="amountNum">10000</div>
                    <div styleName="amountName">待还金额(元)</div>
                </div>
                <div styleName="money amoutLate">
                    <div styleName="amountNum">23.2</div>
                    <div styleName="amountName">逾期费(元)</div>
                </div>
            </div>
            <div styleName="amountPanel">
                <div styleName="amountItem">
                    <div styleName="itemName">还款日</div>
                    <div styleName="itemTime">2017-04-26</div>
                </div>
                <div styleName="amountItem">
                    <div styleName="itemName">已还金额</div>
                    <div styleName="itemAlready">1002.00
                        <img src={require("../images/repayment-fxh/entry.png")} alt=""/>
                    </div>
                </div>
                
            </div>
            <div styleName="amountPanel">
                <div styleName="amountItem">
                    <div styleName="itemName">选择银行卡</div>
                    <div styleName="itemAlready">工商银行(2333)
                        <img src={require("../images/repayment-fxh/entry.png")} alt=""/>
                    </div>
                </div>
                <div styleName="amountItem">
                    <input styleName="itemInput" type="text" placeholder="输入还款金额" value="" onChange={this.inputAmountHandler()}/>
                    <div styleName="itemAll">全部还清</div>
                </div>
            </div>
            <div styleName="amountBottom">
                <div styleName="submitBtn">立即还款</div>
            </div>
        </div>
    }
}
export default RepaymentFangXin
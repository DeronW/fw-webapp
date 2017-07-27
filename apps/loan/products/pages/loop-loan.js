import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loop-loan.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoan extends React.Component {
    componentDidMount(){
        document.title = '优易借';
    }
    render(){
        let { history } = this.props;
        return (
            <div styleName="cnt-container">
                <Header title="优易借" history={history} />
                <div styleName="loan-box">
                    <div styleName="available-loan-num">10000</div>
                    <div styleName="loan-title">可借额度(元)</div>
                    <div styleName="loan-tip"><span styleName="icon"></span>日利率最低0.24%起（1千元用1天仅需2.4元）</div>
                </div>
                <div styleName="loan-info-container">
                    <div styleName="loan-info">
                        <div styleName="loan-info-left">
                            <div styleName="loan-info-num">80000</div>
                            <div styleName="loan-info-title">总额度(元)</div>
                        </div>
                        <div styleName="loan-info-right">
                            <div styleName="loan-info-num">21</div>
                            <div styleName="loan-info-title">借款期限</div>
                        </div>
                    </div>
                    <div styleName="vertical-line"></div>
                </div>
                <div styleName="btn-container">
                    <div styleName="btn">去借款</div>
                </div>
                <div styleName="mask">
                    <div styleName="popup">
                        <div styleName="popup-tip">您离成功借钱只差一步请先完成必填认证！</div>
                        <div styleName="popup-btn">知道了</div>
                    </div>
                </div>
            </div>
       )

    }
}

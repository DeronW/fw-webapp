import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import Header from '../../components/header'
import styles from '../../css/bills/bills.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Bills extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="账单" history={history} noBack={true}/>
            <div styleName="totalCount">
                <div styleName="totalNum">2600.99</div>
                <div styleName="totalTips">待还总金额(元)</div>
            </div>
            <div styleName="bg"></div>
            <div styleName="totalInfo">
                <div styleName="totalInfoLeft">
                    <div>6</div>
                    <div styleName="infoDes">待还总笔数</div>
                </div>
                <div styleName="totalInfoRight">
                    <div>1</div>
                    <div styleName="infoDes">逾期笔数</div>
                </div>
            </div>

            <div styleName="billItem">
                <div styleName="itemTitle">
                    <span styleName="itemIcon itemIcon0"></span>
                    <span styleName="titleTime">到期时间 2017-09-24 08:21:45</span>
                </div>
                <div styleName="itemText">
                    <div styleName="textLeft">
                        <div><span styleName="number">900</span><span styleName="warn">已逾期</span></div>
                        <div styleName="leftDes">待还金额(元)</div>
                    </div>
                    <div styleName="textRight">
                        立即还款
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Bills

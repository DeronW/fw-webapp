import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import styles from '../../css/investor/account-p2p.css'

@inject('investor_account')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class AccountP2p extends React.Component {

    state = {
        eye: true
    }

    componentDidMount() {
        this.props.investor_account.fetchAccountP2P()
    }

    changeEyeHandler = () => {
        this.setState({eye: !this.state.eye})
    }
    gotoHandler = (link) => {
        let {history} = this.props
        history.push(link)
    }

    render() {
        let {info} = this.props.investor_account.data_p2p.detail
        let { custId } = this.props.investor_account
        let {history} = this.props
        let {eye} = this.state
        let path = eye ? require("../../images/investor/account-zx/icon-visible.png") : require("../../images/investor/account-zx/icon-hidden.png")
        return <div>
            <Header title="TA的微金账户" history={history}/>
            <div styleName="totalIncome">
                <div styleName="incomeLeft">
                    <div styleName="incomeName">累计收益</div>
                    <div styleName="incomeCount">{eye ? `¥${info.totalAmount}` : '*******'}</div>
                </div>
                <img src={path} styleName="incomeRight" onClick={this.changeEyeHandler}/>
            </div>

            <div styleName="incomeInfo">
                <div styleName="inIofoItem inIofoLeft" onClick={() => this.gotoHandler(`/investor-overview?custId=${custId}&type=p2p`)}>
                    <div>微金总资产</div>
                    <div styleName="incomeNum">¥{info.totalInvest}</div>
                </div>
                <div styleName="inIofoItem inIofoRight" onClick={() => this.gotoHandler(`/investor-overview?custId=${custId}&type=p2p`)}>
                    <div>可用金额</div>
                    <div styleName="incomeNum">¥{info.bankBalance}</div>
                </div>
            </div>
            <div styleName="incomeItem">
                <div styleName="itemDes" onClick={() => this.gotoHandler(`/investor-p2p-item?custId=${custId}`)}>
                    <div styleName="desLeft">Ta的投资</div>
                    <div styleName="desRight">
                        <span styleName="rightText">{info.refCount}笔</span>
                        <span styleName="icon-arrow"></span>
                    </div>
                </div>
            </div>
            <div styleName="incomeItem">
                <div styleName="itemDes" onClick={() => this.gotoHandler(`/investor-item-detial?custId=${custId}&type=p2p`)}>
                    <div styleName="desLeft">Ta的回款明细</div>
                    <div styleName="desRight">
                        <span styleName="rightText">最近还款日{info.repayPerDate}</span>
                        <span styleName="icon-arrow"></span>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default AccountP2p
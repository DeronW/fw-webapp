import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'

import styles from '../../css/protocols/dumiao.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Dumiao extends React.Component {

    componentDidMount() {
        document.title = '读秒开户授权书'
    }
    render() {
        let { history } = this.props;
        return <div styleName="bg">
            <Header title="读秒开户授权书" history={history} />
            <div styleName="protocol-article">
                <div styleName="weight">委 托 人： </div>
                <div styleName="weight">身份证号： </div>
                <div styleName="weight">受 托 人： </div>
                <div styleName="weight">地    址： </div>
                <div styleName="weight"> 鉴于： </div>
                <div>1、受托人与存管银行签署了相关“交易资金存管合作协议”，委托人在受托人平台完成注册并进行投、融资业务时需开通存管银行交易结算资金存管账户，以通过存管银行的“网络交易资金存管系统”（即银行针对网络借贷交易资金存管业务开发的系统，主要功能包括账户开立、绑卡、解绑卡、查询、充值、转账、提现、清算对账、资金存管等）进行交易结算资金明细核对和总分核对。 </div>
                <div>2、受托人因自身原因未能实际操作特授权委托人运营与维护的“积木盒子”平台代为完成在存管银行开立交易结算资金存管账户、交易结算资金管理等账户。 </div>
                <div styleName="weight">授权内容、风险声明如下： </div>
                <div>1、授权受托人根据委托人或其指定的第三人提供的本人信息、银行账户信息等代为完成委托人在存管银行的虚拟账户开户事宜，包括但不限于交易结算资金存管账户、交易结算资金管理等账户。 </div>
                <div>2、委托人声明向受托人提供的所有证件、资料均合法、真实、准确、完整和有效，并保证在上述资料发生变化时及时通知受托人且对于上述资料真实性、准确性等承担保证责任。 </div>
                <div>3、委托人声明具有合法的投资或融资等资格，不存在法律、法规、规章、其他规范性文件和其他交易规则禁止或限制其在受托方进行网络借贷交易的情形，委托人的角色包括但不限于投资人、融资人、担保人、渠道方及其他与借贷项目相关的主体等。 </div>
                <div>4、委托人声明其资金来源合法合规且允许进行投资性交易且委托人已明确知晓并愿意承担网络借贷交易的风险。 </div>
                <div>5、委托人声明已明确知晓存管银行仅负责网络借贷交易资金存管（即按照委托人申请或指令办理账户开立、绑卡、解绑卡、充值、转账、提现等业务）。 </div>
                <div>6、委托人声明完成账户开立之后妥善保管其交易账户信息及个人银行借记账户等信息，自愿承担由此引起的任何责任。 </div>
                <div>7、委托人声明已详细阅读本授权的所有条款，准确理解其含义并同意本授权书所有条款。 </div>
                <div styleName="styleName"> 委托人（签署）：____________________ </div>
                <div styleName="styleName"> 授权日期：_______年___月___日 </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>
        </div>
    }
}
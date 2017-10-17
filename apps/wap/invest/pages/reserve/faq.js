import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve/faq.css'
import {NativeBridge} from '../../helpers'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveFaq extends React.Component {
    render() {
        let {history} = this.props
        return <div styleName="faqPanel">
            <Header noClose title="常见问题" history={history}/>
            <div styleName="faqItem">
                <div styleName="faqTitle">
                    1、预约宝写着42天，但是21天提示我有回款，到底期限为多久？
                </div>
                <div styleName="faqText">
                    预约投资的期限为42天，即第一期21天产品到期后本息复投一次，到期后的本息和会自动复投到下一期21天产品。
                </div>
            </div>
            <div styleName="faqItem">
                <div styleName="faqTitle">
                    2、本息复投的收益是否比本金复投多？
                </div>
                <div styleName="faqText">
                    本息复投的收益会比本金复投到期的一次性回款的产品收益多，因为第一期21天回款的利息复投后会再次产生利息。
                </div>
            </div>
            <div styleName="faqItem">
                <div styleName="faqTitle">
                    3、投资预约宝都需要签署什么合同？
                </div>
                <div styleName="faqText">
                    （1）《预约出借服务协议》：出借人VS平台方
                    <br/>（2）《借款合同》：出借人VS借款人
                    <br/>（3）《出借人咨询服务协议》：出借人VS平台方
                    <br/>（4）《保证合同》：出借人VS担保方
                    <br/>（5）《出借人承诺书》
                    <br/>（6）《网络借贷出借风险提示》
                    （7）《履行反洗钱业务的承诺书》
                </div>
            </div>
            <div styleName="faqItem">
                <div styleName="faqTitle">
                    4、项目收益起算日如何确定？
                </div>
                <div styleName="faqText">
                    预约宝项目通常都是当日或次日为收益起算日，具体收益起算时间以平台网站公示为准。
                </div>
            </div>
            <div styleName="faqItem">
                <div styleName="faqTitle">
                    5、如果投资63天产品，第二期21天回款后，未再次匹配第三期资产？未完成63天期限投资，我的收益是否受损？
                </div>
                <div styleName="faqText">
                    一般情况下回款当日起息，如因特殊情况导致的回款当日无法起息，匹配时间不计息（最长不超3个工作日）。如未再次匹配新一期资产，则按照实际投资期限发放加息返利。
                </div>
            </div>
            <div styleName="faqItem">
                <div styleName="faqTitle">
                    6、投资的42天产品收益显示是6%+0.3%，42天回款时收益只有6%，加息收益0.3%在哪能看到？
                </div>
                <div styleName="faqText">
                    加息部分的收益在预约项目到期后以工豆形式发放到出借人账户中，可登陆官网查看我的工豆明细。加息收益=原始本金*42/360*0.3%，如果出借人将资金中途退出或者提现，不补发加息部分收益。
                </div>
            </div>
        </div>
    }
}

export default ReserveFaq
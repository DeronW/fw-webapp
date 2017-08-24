import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'
import {NativeBridge, Browser} from '../../../lib/helpers'
import styles from '../../css/protocols/youyi-loan-service.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class YouyiRepayment extends React.Component {

    componentDidMount() {
        document.title = '委托扣款授权书'
    }
    render() {
        let { history } = this.props;
        return <div styleName="bg">
            <Header title="委托扣款授权书" history={history}/>
            <div styleName="protocol-article">
                <div>
<div>                                             编号：【】
                </div><div>
                </div><div>委托人：【】
                </div><div>身份证号码：【】
                </div><div>
                </div><div>受托人：深圳大象互联网开发有限公司
                </div><div>地址：深圳市前海深港合作区前湾一路1号A栋201室
                </div><div>
                </div><div>委托人与放心花平台（网址：www.easyloan888.com）运营方于【】年【】月【】 日签订了《借款服务协议》（编号为【】），同时与出借人通过放心花平台签署了《借款合同》（编号为：【】），根据《借款服务协议》及《借款合同》的约定，委托人应当向放心花平台支付服务费、向出借人支付借款本息及其他应付款项（如有），放心花平台运营方及出借人均同意并授权受托人通过其合作的第三方支付机构代收代付委托人应付款项。
                </div><div>委托人在此不可撤销地同意并授权受托人指示其合作的第三方支付机构于约定还款日从委托人的付款/还款账户中，划转委托人应向各相关方支付的费用并代付给相关方。
                </div><div>委托人付款/还款账户之一信息如下：
                </div><div>开户名：【】
                </div><div>开户行：【】
                </div><div>账  号：【】
                </div><div>如上述还款账户金额不足，委托人同意并授权受托人指示其合作第三方支付机构从本人在放心花平台绑定的任一银行卡中进行划扣，直至付款/还款成功。
                </div><div>委托人确保上述银行账户在约定还款日账户状态正常（即非冻结、销户、挂失等）且账户内余额充足，受托人合作的第三方支付机构可实现成功扣款。因还款日委托人银行账户状态不正常或者账户内余额不足导致扣款不成功的，由此产生的违约金及其他费用均由委托人承担。
                </div><div>本授权书项下的委托期限自本授权书生效之日起至委托人在《借款服务协议》及《借款合同》下全部义务履行完毕之日止。委托人在此特别声明：委托人对于受托人及其合作的第三方支付机构在本授权书项下对委托人指定银行账户中款项的划扣，不提出任何异议。
                </div><div>委托人知悉并同意，本授权书由委托人通过放心花平台系统以电子签章的方式进行签署，自签署之日起生效，委托人对此签约方式不持任何异议，认可该签约方式的法律效力。
                </div><div>
                </div><div>                                                    委托人（签章）：
                </div><div>                                                    日期：
                </div>
                </div>
            </div>
        </div>
    }
}

import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'
import {NativeBridge, Browser} from '../../../lib/helpers'
import styles from '../../css/protocols/partner.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class YouyiRepayment extends React.Component {

    componentDidMount() {
        document.title = '委托扣款授权书（还款）'
    }
    render() {
        let { history } = this.props;
        let goBack = () => {
            Browser.inApp ? NativeBridge.close() : history.goBack()
        }
        return <div styleName="bg">
            <Header title="委托扣款授权书（还款）" goBack={goBack}/>
            <div styleName="protocol-article">


                <div>本协议即构成用户与“放心花”平台的经营者深圳市众利财富管理有限公司（下简称"众利财富公司"或“放心花”平台）就众利财富公司所提供的“放心花”借款服务协议及相关功能使用许可所达成的协议（以下简称"本协议"）。一旦用户通过页面点击确定或以其他方式选择同意本协议，即表示用户同意接受本协议的全部内容，同意受本协议约束。本协议内容包括协议正文及所有“放心花”平台已经发布的或将来可能发布的有关各类规则（包括但不限于相关通告和隐私权政策等）。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。众利财富公司有权根据需要不时地制定、修改本协议及各类规则。用户有义务及时查阅、了解“放心花”平台公布的协议及各类规则的修订信息。经修订的协议、规则一经公布后，将自动生效。如用户不同意相关变更、修改的，可停止使用“放心花”平台提供的全部服务。但如用户继续使用“放心花”平台提供的任何服务的，将表示用户已接受经更改、修订后的协议。
                </div><div>1.用户自愿成为“放心花”平台的借款人。用户应依照“放心花”平台规则完成注册流程，经放心花或包括但不限于北京掌众金融信息服务有限公司（以下简称“掌众金融”）等合作的第三方平台（以下简称“第三方平台”）审核通过后，即可获得“放心花”平台借款账号。注册成功后，用户可以在“放心花”平台或第三方平台发布借款信息，并由“放心花”平台或第三方平台推荐给出借人。用户知晓并同意其借款信息可能由“放心花”平台单独作为居间方推荐给出借人，也可能由“放心花”平台与第三方居间服务商包括但不限于掌众金融合作将借款信息推荐给出借人；此时借款人不可撤销的授权“放心花”平台或“掌众金融”可以为借款人在资金端提供平台上开户以及授权“放心花”平台或“掌众金融”对借款人个人信息进行查询及授信、代为签署相关借款协议、进行资金划扣、贷后管理等相关事宜。
            </div><div>2.用户在使用放心花进行借款前，应确保移动电话正常在网并且信号畅通。在发生由于移动网络信号原因造成用户无法使用放心花时，用户应直接与移动服务供应商联系处理，“放心花”平台不负责为用户解决与通信信号有关的任何问题，也不承担由此导致的任何责任。
            </div><div>3.用户同意授权“放心花”平台向其他信用机构获取用户的个人资料和信用记录。“放心花”平台将合理使用用户的个人资料和信用记录，并根据该等资料评定用户的信用等级，然后将用户的信用状况登记在众利财富公司“放心花”平台内。用户同意授权众利财富公司向其他第三方核实该等资料和记录的真实性和准确性。当用户在放心花平台发布借款信息时，众利财富公司有权再次获取用户的信用记录。
            </div><div>4.用户可以在放心花平台指定区域发布借款信息。用户需提供信用卡并与用户放心花平台账户绑定，且在操作时必须严格遵守银行账户管理章程和相应业务规定，否则由此导致放心花不能使用或不能正常使用的，众利财富公司不承担任何责任。同时用户还应当提供用户的其他有助于出借人判断的信息，包括但不限于新浪微博、学信网、京东、淘宝、公司就职信息等。众利财富公司有权同时将用户的信用记录中的可能影响潜在出借人判断的信息以及信用等级（包括但不限于用户自行提交及众利财富公司自行获取的信息等）显示在用户的借款信息中。用户同意授权众利财富公司将用户提交的借款信息发布在放心花平台或其他第三方资金提供方平台上、发送给包括放心花以及第三方资金提供方注册用户在内的其他第三方。
            </div><div>5.用户承诺其向“放心花”平台所提供个人信息（包括但不限于用户的住址、收入、职业、联系人以及其他与借款信息或注册为放心花用户有关的资料）的真实性及准确性，并同意“放心花”平台有权验证相关信息。“放心花”平台可向相关征信机构、银行等交换本次申请授权银行卡信息，并同意相关征信机构、银行等查阅授权银行卡信息作为本次申请审查及贷后管理使用。用户确认“放心花”平台及众利财富公司有权向第三方征询用户的信息。用户同意授权“放心花”平台自行或通过第三方收集、保存、使用、管理、披露用户的个人资料、信息、档案，收集获取用户的资料、信息、档案数据来源包括但不限于电商平台、金融机构、通讯运营商、自媒体等。若用户的上述资料在用户发布借款信息的有效期内或使用放心花过程中发生变化的，则用户应即时通知“放心花”平台对相应信息做变更或者撤回借款信息，否则承担由此引发的全部责任及损失。“放心花”平台保留以自己独立判断限制用户发布或者试图发布借款信息的权利。
            </div><div>6.用户应妥善保管放心花相关信息（包括但不限于账号信息等）及银行账户密码信息，否则任何通过“放心花”平台或“掌众金融”发出的还款代扣等指令均被视为用户自行发出，“放心花”平台或“掌众金融”将根据本协议规定提供手机支付服务，用户应自行承担由此引发的责任及损失。
            </div><div>7.用户所发布的借款信息在法律上视为要约。用户承诺一旦用户发布的借款信息与出借人匹配后，则用户无条件接受该笔借款并按放心花平台系统提示标准支付利息。
            </div><div>8.用户确认，借款交易的达成是指由“放心花”平台或掌众金融审核通过后，代借款用户与出借人签署相关借款协议并成功获得借款。
            </div><div>9.由于不能或难以预见、控制、避免和克服等因素导致的移动网络、第三方支付机构、银行、银联系统中断故障，以至影响用户使用放心花及相关功能时，“放心花”平台和各合作方均不承担任何经济和法律责任。
            </div><div>10.用户承诺在涉及或者可能涉及放心花的借款信息及其他交易中不从事下列行为：
            </div><div>1)在用户的借款信息中进行虚假的、误导的、欺骗的陈述；
            </div><div>2)提供虚假的身份或者不符合事实的描述；
            </div><div>3)向他人表示用户是放心花的代表、雇员、代理人。
            </div><div>11.如用户违反本协议或放心花的有关规定，“放心花”平台有权取消用户的借款资格，并停止向出借人推荐用户发布的借款信息。
            </div><div>12.“放心花”平台有权核实注册用户提供的所有信息的准确性。为保障交易安全，“放心花”平台有权根据自身独立合理判断决定注册用户是否合法使用放心花、是否违反放心花的各类规则。“放心花”平台可以在任何时候对上述信息要求用户做出解释，用户同意将根据“放心花”平台的要求做出书面回复。在一个借款交易完成之前，如果众“放心花”平台认为借款列表中包含不正确信息（在借款发布到借款完成之间借款者信息等变化未即时告知众利财富公司、信用变化等等），可能违反任何法律的行为，或违反任何放心花的条款，“放心花”平台有权停止向出借人推荐，并不作任何解释。
            </div><div>13.为保障交易安全，“放心花”平台可以在必要情况下自行决定延迟借款交易的达成，并验证和该笔借款交易相关的出借人的必要信息。基于验证结果，“放心花”平台有权自行决定是否取消或继续当次借款交易。如果确认交易取消，“放心花”平台将停止通过放心花向出借人推荐该笔借款信息，所涉出借人的出借款项将予以返还。交易取消后，“放心花”平台有权根据实际情况决定是否继续向其他出借人推荐用户的借款信息。
            </div><div>14.“放心花”平台或“放心花”平台与第三方居间服务商“掌众金融”合作将用户借款信息推荐给出借人，但不保证用户可以借款成功。只有用户的借款信息全部匹配出借人，且通过了“放心花”平台最终审核才能获得出借款项。如果用户撤销了借款申请，或只有一部分金额可匹配出借人，用户借款将视为不成功，不能获得出借款项。
            </div><div>15.在用户注册放心花平台成功、用户成功获得借款、用户借款逾期未归还等情况下，“放心花”平台将收取一定的手续费，以保证“放心花”平台能更有效地提供一个良好的环境（具体费用标准详见放心花公告）。手续费是指因“放心花”平台或“掌众金融”为借款人提供放心花服务（包括借款信息咨询、信用咨询与评估、出借人推荐、还款提醒、账户管理等系列咨询及信用相关服务），而由借款人向“放心花”平台或“掌众金融”支付的报酬。众利财富公司或“掌众金融”有权从用户的任何账户或者款项中直接扣除手续费。
            </div><div>16.用户同意，在借款达成后，如果“放心花”平台独立判断认为用户存在高风险操作时、或存在其他违约行为时，“放心花”平台有权要求用户向出借人提前偿还借款本金及实际贷款天数的利息，并从用户的任何账户中直接扣除借款本息。若发生提前还款，“放心花”平台已经收取的平台手续费不予退还，尚未收取的平台手续费用户仍应当按原约定金额支付，“放心花”平台有权从用户的任何账户中直接扣除。
            </div><div>17.用户同意，当用户逾期未偿还借款时，众利财富公司或“掌众金融”有权从用户于放心花平台添加过的任一张银行卡中扣款(包括已删除的卡片信息)，扣除借款本金、利息、费用及逾期利息、平台服务费、违约金等。
            </div><div>18.用户同意，在用户逾期未偿还借款时，众利财富公司有权在放心花平台公开逾期用户个人信息，包括但不限于逾期用户姓名、身份证号码、逾期金额等借款信息，并将该逾期用户列入放心花失信人名单，且众利财富公司有权将逾期用户的欠款信息向第三方信用机构披露。
            </div><div>19.用户可能会得到超过一个以上出借人的借款，即用户可能会通过与多个出借人订立借款协议来满足其借款需求。
            </div><div>20.用户承诺并保证借款不得有以下行为：
            </div><div>1)将所借款项用于任何违法活动（包括但不限于赌博、吸毒、贩毒、卖淫嫖娼等），否则一经发现，“放心花”平台有权立即向公安等有关行政机关举报；
            </div><div>2)将所借款项用于生产经营和消费以外的范畴（包括但不限于股票，基金，期货等金融产品的投资，房地产及房地产信托投资，二次借贷，彩票），否则“放心花”平台有权立即终止借款交易，并要求用户立即清偿借款本息。
            </div><div>21.用户同意在规定的时间内向出借人还款。“放心花”平台或“掌众金融”将作为服务商，将用户的还款分发到各个出借人（如果有多个）。同时，用户同意支付任何由于逾期还款等其他原因导致的额外费用。
            </div><div>22.用户逾期还款的，“放心花”平台有权将用户的"逾期记录"记入公民征信系统，“放心花”平台不承担任何法律责任。用户在此对下列事项事先同意并知晓：
            </div><div>22.1当用户逾期还款时，出借人有权自行或者委托“放心花”平台或“掌众金融”向用户催收，催收方式包括但不限于以众利财富公司或“掌众金融”的名义向用户发出向指定帐户还款的通知、以众利财富公司或“掌众金融”的名义委托专业的商账追收公司催收、以众利财富公司或“掌众金融”的名义提起诉讼、以众利财富公司或“掌众金融”的名义申请仲裁、请求行业自律组织调解等。
            </div><div>22.2当用户逾期还款时，出借人有权自行或者委托众利财富公司或“掌众金融”将全部或者部分债权转让给任何第三方（包括但不限于专业的商账追收公司等）。因用户逾期而发生债权转让时，出借人将委托众利财富公司或“掌众金融”向用户发出向指定帐户还款的通知，而无需另行履行债权转让的通知义务。用户在此同意，众利财富公司或“掌众金融”根据本条款之规定催收或发出的还款通知时，用户将无条件履行还款义务。
            </div><div>23.用户逾期未还款的，众利财富公司或“掌众金融”有权通过用户提交信息中的联系人敦促其还款。
            </div><div>24.用户存在包括但不限于逾期还款、提供虚假信息、从事违法活动等行为的，“放心花”平台有权将其列为放心花平台黑名单用户，并有权将用户提交或放心花自行收集的用户的个人资料和信息与任何第三方进行数据共享，以便和第三方催收逾期借款及对用户的其他申请进行审核之用，由此因第三方的行为造成用户损失，众利财富公司不承担法律责任。
            </div><div>25.如发现用户的信息存在虚假或欺诈，“放心花”平台有权在无需事先通知的情况下随时中止或终止用户资格。如果这种情况出现，用户的借款申请将被停止。已经成功的借款，“放心花”平台有权要求用户立即清偿借款本息。
            </div><div>26.未经“放心花”平台事先书面许可，用户无权将本协议项下的权利转让给任何第三方，否则该转让行为无效。
            </div><div>27.用户了解并同意，“放心花”平台仅能依照"现状"及"现有"基础提供服务。经提前通知，“放心花”平台有权暂停或终止向用户提供本协议约定的全部或部分放心花服务，且无需承担违约责任。
            </div><div>28.用户确认，“放心花”平台对本协议所涉的全部审核、验证工作仅限于形式审核，相应审核、验证工作并不为“放心花”平台设置任何义务与责任。
            </div><div>29.本协议的成立、生效、履行、解释、争议解决均适用中华人民共和国法律。因签订和履行本协议所产生的纠纷，任一方均有权将其提交至深圳市前海深港合作区人民法院通过诉讼的方式解决。
            </div><div>30.本协议生效后，一方出现违反本协议条款的行为，致使本协议部分或全部无法履行时，违约方必须向守约方支付相当于守约方遭受到的直接经济损失数额的违约金。
            </div><div>31.众利财富公司是放心花的服务提供商，有权对本协议进行最终解释。
            </div><div>32.本协议内任何条款的部分或全部无效者，不影响其它条款的效力。
            </div>


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


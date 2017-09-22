import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'

import styles from '../../css/protocols/youyi-loan-service.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class YouyiLoan extends React.Component {

    render() {
        let { history } = this.props;
        return <div styleName="bg">
            <Header title="借款合同" history={history} />
            <div styleName="protocol-article">
                <div>
                    <div styleName="weight">客户签约须知
                    </div>
                    <div>1.	当您登录放心花APP/网站（下称“放心花平台”）（网址：www.easyloan888.com）通过点击“确认”（或其他类似意思表示，以平台页面展示为准），即表示您向出借方提出签订本合同的申请，当本合同进入出借方授权指定签约系统经该系统确认并由您和出借方通过电子签章方式签署本合同后，即表示您与出借方已达成协议并同意接受本合同的全部约定内容以及其他与本合同有关的各项规定，该签约方式与亲笔签名具有同等法律效力，合同双方无需重新补办书面文书及借款借据。
                    </div>
                    <div>2.	请您务必妥善保管重要个人信息，如因您的个人原因，无论是故意或过失，使得重要个人信息被他人所知悉或控制，由此可能带来的不利后果均由您承担。 届时您不得以账号等重要信息丢失、被盗用等任何理由否认签约的效力及履行本电子合同的义务。
                    </div>
                    <div>3.	放心花平台服务器及网站系统作为出借方授权指定的电子合同签约系统，您知悉并认可该电子数据的有效性和证据效力。前述电子数据包括但不限于放心花平台系统所生成和保留记载的相关电子合同、电子签章、电子单据、电子凭证、交易记录等相关资料均构成有效证明合同各方之间权利义务关系的确定证据。
                    </div>
                    <div>
                    </div>
                    <div styleName="weight">借款合同
                    </div>
                    <div>                                                      合同编号：【】
                    </div>
                    <div>
                    </div>
                    <div>甲方：
                    </div>
                    <div>身份证号码：
                    </div>
                    <div>联系电话：
                    </div>
                    <div>
                    </div>
                    <div>乙方（出借方）：海南先锋网信小额贷款有限公司
                    </div>
                    <div>公司地址：海南省海口市滨海大道103号财富广场写字楼16C
                    </div>
                    <div>
                    </div>
                    <div>鉴于甲方拟通过放心花平台向乙方提出借款申请，乙方同意向甲方出借款项，根据《中华人民共和国合同法》之规定，双方本着平等、友好协商一致原则，签订合同如下，以兹共同遵守：
                    </div>
                    <div>第一条	借款具体信息
                    </div>
                    <div>1.	借款用途：个人消费。
                    </div>
                    <div>2.	借款本金人民币￥【】，大写【】，借款年化利率【】%，借款利息人民币￥【】，大写【】。
                    </div>
                    <div>3.	借款期限【】天，还款方式为到期一次性还本付息，还款日为【】年【】月【】日。
                    </div>
                    <div>4.	甲方收款专用账户信息如下：
                    </div>
                    <div>户  名：【】
                    </div>
                    <div>账  号：【】
                    </div>
                    <div>开户行：【】
                    </div>
                    <div>第二条	借款发放
                    </div>
                    <div>5.	本合同项下借款起始日以借款本金到达甲方收款专用账户之日为准。甲方授权乙方委托第三方指示其合作的第三方支付机构将本合同项下的借款本金数额从乙方账户划付至甲方收款专用账户（详见本协议第一条），借款资金划付成功视为借款发放成功，本合同生效并开始计息。
                    </div>
                    <div>第三条	还款
                    </div>
                    <div>1.	甲方应按照本合同第一条确定的还款方式及还款期限按期偿还借款本息。甲方必须在还款日（当日24:00以前）或之前将到期应还款项存入甲方签署的《委托划扣授权书》约定还款银行账户（下称“甲方还款账户”）中或通过放心花平台其他还款渠道进行还款（具体以放心花平台还款规则约定为准）, 甲乙双方均同意乙方授权第三方通过其合作的支付机构代为收取还款，并将代收款项代付至乙方的账户中。
                    </div>
                    <div>本协议中乙方账户信息为:
                    </div>
                    <div>户  名：【】
                    </div>
                    <div>开户行：【】
                    </div>
                    <div>账  号：【】
                    </div>
                    <div>2.	乙方将以成功扣划甲方还款账户的还款金额时间为准记录甲方的还款时间。如果还款日遇到法定节假日或公休日，还款日不变。
                    </div>
                    <div>3.	对于甲方应还款项，甲方同意并授权乙方委托第三方通过其合作第三方支付机构从甲方在放心花平台绑定的任一银行卡中进行划扣，直至还款成功。甲方应确保还款账户有可供足额划扣的资金，因逾期还款产生的违约金由甲方承担。
                    </div>
                    <div>4.	借款存续期间，甲方可提前还款，提前还款金额及次数不限，甲方知悉并同意甲方提前还款的仍应按本协议约定向乙方支付全部借款利息。
                    </div>
                    <div>5.	无论由于任何原因导致发生错误还款(即将不应支付乙方账户内的款项支付至乙方账户),甲方均认可由乙方委托其合作的代收还款的第三方代为处理还款错误金额的退款相关事宜。
                    </div>
                    <div>第四条	双方的权利和义务
                    </div>
                    <div>1.	甲方的权利和义务
                    </div>
                    <div>1)	甲方按本合同约定的用途使用借款，未经乙方书面同意，甲方不得擅自改变借款用途。甲方申请的借款不得用于认购和买卖股票或其它权益性投资；借款用途不得违反法律、行政法规、规章、司法解释的禁止性规定。
                    </div>
                    <div>2)	甲方应按本合同的约定按期、足额偿还借款本息。
                    </div>
                    <div>3)	未经乙方书面同意，甲方不得将本合同项下的任何权利、义务转让给他人。
                    </div>
                    <div>4)	甲方在向乙方申请借款的过程中，应当按照乙方及其合作第三方要求提供相关的个人信息和材料并授权乙方及其合作第三方有权出于为更好履行本协议目的使用甲方上述个人信息和材料，甲方应保证该等信息和材料的真实、完整、准确和有效，不得隐瞒或夸大。
                    </div>
                    <div>5)	甲方有义务接受乙方及其合作第三方对甲方个人信息资料及借款使用情况的监督检查，甲方应当全力配合并按照要求提供相关的个人信息、材料。
                    </div>
                    <div>6)	借款期限内，甲方不得随意变更甲方收款和还款账户。若确需变更的，应当及时通知乙方及其委托的放心花平台。因未及时通知造成的全部损失，均由甲方负责进行赔偿。
                    </div>
                    <div>2.	乙方的权利和义务
                    </div>
                    <div>1)	乙方有权了解甲方对借款的使用情况，甲方应当无条件配合。
                    </div>
                    <div>2)	甲方未按照本合同规定还款的，乙方及其委托的第三方有权在法律法规约定的范围内采取相应措施进行催收和追讨。
                    </div>
                    <div>3)	乙方有权委托第三方通过其合作的支付机构代为收取甲方的还款并代付给乙方。
                    </div>
                    <div>4)	甲方未按照乙方的要求提供各项与本借款合同相关的信息、材料或者提供的信息、材料存在虚假、不准确、隐瞒有关事实等情况的，或者甲方逾期还款的，乙方及其委托的第三方有权公开甲方的违约失信情形。
                    </div>
                    <div>5)	乙方或其合作第三方有权要求甲方提供借款审查所需的全部资料，乙方除可将该资料用于评估甲方借款资格外，并可将该资料及征信信息提供给乙方合作方及征信机构。乙方或其合作的第三方有权主动收集甲方资料，对甲方进行信用调查，包括但不限于向征信机构、身份信息系统等合法机构查询甲方的信用信息。
                    </div>
                    <div>第五条	违约责任
                    </div>
                    <div>1.	发生如下情形时，视为甲方违约：
                    </div>
                    <div>1)	未能按期、足额偿还借款本息；
                    </div>
                    <div>2)	甲方提供的信息、材料虚假、不准确或故意隐瞒身份、联系方式、资产状况等重要事实；
                    </div>
                    <div>3)	甲方拒绝或不配合乙方及其委托第三方对甲方个人信息资料、借款使用情况进行监督检查；
                    </div>
                    <div>4)	甲方违反约定的借款用途的；
                    </div>
                    <div>5)	甲方存在可能无法正常还款的情况（包括但不限于甲方财务状况恶化、无法联系、注销还款账户、账户被冻结、拒绝承认欠款等情形）；
                    </div>
                    <div>6)	甲方违反本合同其他约定。
                    </div>
                    <div>2.	违约救济措施：
                    </div>
                    <div>1)	甲方出现本条第1款（1）项规定的违约情形的，乙方有权按照下列条款的约定行使权利：甲方未能按时、足额偿还借款本息的，除应继续履行偿付义务外，乙方还应按以下标准向甲方支付违约金：违约金=逾期本金* 0.08%*逾期天数。
                    </div>
                    <div>2)	若甲方逾期后进行还款的，如甲方银行账户中余额不足以清偿全部到期应付款项，则偿还顺序依次为：
                    </div>
                    <div>实现债权的费用、平台违约金、平台服务费、逾期还款违约金、应还利息、应还本金。
                    </div>
                    <div>3)	甲方逾期还款达15日（含）以上的，乙方有权宣布借款提前到期，甲方应当在乙方发出借款提前到期通知后3日内一次性偿还本合同项下全部借款本息、违约金及因此给乙方造成的全部损失，包括但不限于因实现债权而产生的各项费用，如律师费、诉讼费、仲裁费、交通费、差旅费等费用。
                    </div>
                    <div>4)	甲方连续逾期还款达到90日的，本合同项下的借款将被认定为坏账，乙方将启动相应的坏账处置程序。
                    </div>
                    <div>5)	甲方发生本条第1款除（1）项外其他违约情形的，乙方有权宣布借款提前到期，甲方应当在乙方向甲方发出借款提前到期的通知后3日内一次性偿还本合同项下全部借款本息、违约金及因此给乙方造成的全部损失，包括但不限于因收回债权而产生的律师费、诉讼费、仲裁费、交通费、差旅费等费用。
                    </div>
                    <div>6)	在乙方宣布借款提前到期后，甲方怠于履行其还款义务的，若借款存在担保人，则乙方有权要求担保人承担担保责任，担保人承担担保责任后，有权向甲方进行担保追偿。
                    </div>
                    <div>第六条	通知
                    </div>
                    <div>1.	甲方变更通知
                    </div>
                    <div>1)	本合同签订之日起至本合同项下借款本息全部得到清偿之日止，甲方下列信息发生变更后的3日内，应当通过放心花平台并根据平台规则进行相应变更：甲方本人、其家庭联系人及其紧急联系人的工作单位、居住地址、住址电话、手机号码、传真号码、电子邮箱等发生变更。因甲方未能及时向乙方变更上述信息而产生的相关费用及损失均由甲方负责承担。
                    </div>
                    <div>2.	乙方通知
                    </div>
                    <div>1)	乙方需将本合同项下有关借款确认、提前还款等内容通知甲方的，由其委托的放心花平台代为执行，有效通知方式包括但不限于电话、短信、传真、信件、电子邮件、微信、QQ、APP通知等。
                    </div>
                    <div>2)	乙方的通知由专人送达的，以签收之日视为送达，以快递形式发送的，以快递发出单据上所示时间后4个自然日视为送达；通过挂号信邮递的，以国内挂号函件收据所示日后7个自然日视为送达；以传真、电子邮件、短信、微信消息、QQ消息、APP消息等方式通知的，以发送之日视为送达日；一经送达乙方即完成通知义务，甲方不得以未收到通知为不履行合同义务的抗辩理由。
                    </div>
                    <div>3)	法院、仲裁机关、行政机关处理案件需要通知甲方的，适用上述通知条款。
                    </div>
                    <div>第七条	其他
                    </div>
                    <div>1.	双方同意并确认，双方通过自行或授权有关方根据放心花平台有关规则和说明，在平台通过点击确认及电子签章的方式签署本协议。任何一方对本协议进行点击确认，即视为该方接受本协议条款内容并受此内容之拘束；双方通过上述方式签署本协议时，本协议即生效。本协议有效期自生效之日起至甲方本协议项下的全部义务履行完毕之日止。
                    </div>
                    <div>2.	甲方应妥善保管自己在放心花平台的注册用户名和密码，自行承担因注册用户名和密码丢失、泄露或允许他人使用所产生的后果。通过甲方用户名和密码登陆的任何操作均视为该方本人的真实意思表示。
                    </div>
                    <div>3.	甲方在此特别声明：甲方知道、了解电子合同的概念、定义和作用效力，甲方同意本借款合同可以采用电子签约的方式进行签署，并对于采用电子签约方式签署的本合同效力不存在任何质疑，不对本合同的效力提出任何异议。
                    </div>
                    <div>4.	本合同的任何修改、补充均须以书面形式作出。本合同的补充合同与本合同具有同等的法律效力。
                    </div>
                    <div>5.	本合同签署地为签约系统服务器所在地，如果甲乙双方在本合同履行过程中发生任何争议，应友好协商解决；如协商不成，不论争议金额大小，均选择向合同签署地人民法院提起诉讼解决。
                    </div>
                    <div>6.	与本合同相关的《委托扣款授权书》 、放心花平台规则视为本合同不可分割之部分，与本合同具有同等的法律效力。（以下无正文）
                    </div>
                    <div>
                    </div>
                    <div styleName="styleName">甲方（签章）：</div>
                    <div styleName="styleName">日期：</div>
                    <div styleName="styleName">乙方（签章）：</div>
                    <div styleName="styleName">日期：</div>
                </div>
            </div>
        </div>
    }
}

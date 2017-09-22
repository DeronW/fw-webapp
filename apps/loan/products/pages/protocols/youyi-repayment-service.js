import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'
import { NativeBridge, Browser } from '../../../lib/helpers'
import styles from '../../css/protocols/youyi-loan-service.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class YouyiRepaymentService extends React.Component {

    render() {
        let { history } = this.props;
        return <div styleName="bg">
            <Header title="数字证书服务协议" history={history} />
            <div styleName="protocol-article">
                <div>
                    <div>提示
                    </div>
                    <div>1、您点击/勾选本《数字证书服务协议》，视为您已阅读、理解并同意本协议的相关所有内容，同意按本协议约定的程序通过放心花平台（网址：www.easyloan888.com）申请数字证书服务。
                    </div>
                    <div>2、您同意并委托将您已申请成功的上述数字证书托管于放心花平台，用于签署您通过放心花平台确认的相关协议文本，该协议文本包括但不限于《借款服务协议》、《借款合同》、《委托扣款授权书》及其他相关协议文本。具体协议文本将由平台向您单独展示和确认。
                    </div>
                    <div>您知悉、理解并认可上述安排，愿意接受放心花平台提供的相关服务。
                    </div>
                    <div>
                    </div>
                    <div>声明
                    </div>
                    <div>   在使用放心花平台服务之前，您应当认真阅读并遵守《数字证书服务协议》（以下简称“本协议”），请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、争议解决和法律适用条款，您应重点阅读。如您对协议有任何疑问的，应向杭州天谷信息科技有限公司咨询。当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，或您按照激活页面提示填写信息、阅读并同意本协议且完成全部激活程序后，或您以其他放心花平台允许的方式实际使用放心花平台服务时，即表示您已充分阅读、理解并接受本协议的全部内容，并与杭州天谷信息科技有限公司及放心花平台达成协议。您承诺接受并遵守本协议的约定，届时您不应以未阅读本协议的内容或者未获得放心花有限公司对您问询的解答等理由，主张本协议无效，或要求撤销本协议。
                    </div>
                    <div>
                    </div>
                    <div>数字证书服务协议
                    </div>
                    <div>甲方：
                    </div>
                    <div>证件类型：身份证 /营业执照
                    </div>
                    <div>证件号：
                    </div>
                    <div>乙方：杭州天谷信息科技有限公司
                    </div>
                    <div>地址：浙江省杭州市西湖区西斗门路3号天堂软件园E幢9层
                    </div>
                    <div>鉴于：
                    </div>
                    <div>1、乙方是为互联网企业或用户推出的基于实名身份，为企业和个人提供由信息产业部认可的电子认证中心颁发的数字证书、电子签章、时间戳、电子数据保全等服务的电子签名公司，专注于为企业、政府机构和个人提供全面的电子签名服务与电子数据保全解决方案。
                    </div>
                    <div>2、甲方通过深圳市众利财富管理有限公司（以下简称“深圳众利公司”）使用数字证书获得电子签名信任服务，成为乙方电子签名体系不可分割的部分。
                    </div>
                    <div>   为进一步明确双方的权利、义务，根据《中华人民共和国电子签名法》、《电子认证服务管理办法》的规定，签订如下协议，以兹共同遵守。
                    </div>
                    <div>第一条	名词解释
                    </div>
                    <div>订户： 指从委托乙方从数字认证中心获得证书的个人、组织机构。
                    </div>
                    <div>数字证书：是指一段信息，它至少包含了一个名字，标识特定的CA或标识特定的订户，包含了订户的公钥、证书有效期、证书序列号，及CA数字签名。
                    </div>
                    <div>证书私钥：数字证书包含证书本身和一个密钥对，密钥对的一部分是公钥，另一部分称为私钥。公钥公之于众，谁都可以使用。私钥只有自己知道，一般信息都是由公钥进行加密，相对应的私钥进行解密。
                    </div>
                    <div>第二条 本协议中的“证书”指：个人证书或企业证书。
                    </div>
                    <div>第三条 甲方应按照乙方规定的证书申请流程向放心花平台提供有关资料，并保证所填写的注册信息和所提供的资料的真实性、准确性和完整性，否则放心花平台或乙方有权拒绝甲方的申请请求。
                    </div>
                    <div>第四条 乙方接受甲方委托通过第三方认证中心提供的数字证书服务符合《中华人民共和国电子签名法》的相关规定。
                    </div>
                    <div>第五条 甲方的证书信息在证书有效期限内变更的，应当及时书面告知放心花平台和乙方，并终止使用该证书。
                    </div>
                    <div>第六条 甲方同意放心花平台及乙方向有关部门和个人核实甲方的信息。放心花平台及乙方应合法地收集、处理、传递及应用甲方的资料，按照国家有关规定及本协议的约定予以保密。
                    </div>
                    <div>第七条 甲方对证书享有独立的使用权。甲方使用证书产生的权利，由甲方享有；甲方使用证书产生的义务、责任，由甲方承担。
                    </div>
                    <div>第八条 本证书只能在数字证书有效期限内、在放心花平台上使用。
                    </div>
                    <div>第九条 证书有效期限届满，甲方需要继续使用的，应当及时办理证书更新手续。
                    </div>
                    <div>第十条 甲方应当妥善保管证书私钥。因甲方原因致使证书私钥泄露、损毁或者丢失的，损失由甲方承担。
                    </div>
                    <div>第十一条 证书私钥在证书有效期内损毁、丢失、泄露的，甲方应当及时申请办理吊销手续。吊销自手续办妥时起生效。吊销生效前发生的损失由甲方承担。
                    </div>
                    <div>第十二条 甲方知悉证书私钥已经丢失或者可能已经丢失时，应当及时告知放心花平台及乙方，协助完成吊销该证书的工作，并终止使用该证书。
                    </div>
                    <div>第十三条 甲方有下列情形之一，乙方有权向第三方认证机构申请吊销证书并不承担任何责任。由此给乙方造成损失的，甲方应当向乙方承担赔偿责任：
                    </div>
                    <div>1、甲方向放心花平台提供的资料或者信息不真实、不完整或者不准确的。
                    </div>
                    <div>2、甲方证书的信息有变更，未终止使用该证书并通知放心花平台及乙方的。
                    </div>
                    <div>3、甲方知悉证书私钥已经丢失或者可能已经丢失时，未终止使用该证书并通知放心花平台及乙方的。
                    </div>
                    <div>4、甲方超过证书的有效期限及应用范围使用证书的。
                    </div>
                    <div>5、甲方使用证书用于违法、犯罪活动的。
                    </div>
                    <div>第十四条 由于第三方电子认证中心的原因导致证书私钥被破译、窃取，致使甲方遭受损失的。第三方电子认证中心应向甲方承担赔偿责任。
                    </div>
                    <div>第十五条 因设备故障、电力故障及通讯故障或者电脑病毒、自然灾害等因素造成甲方损失的，乙方不承担任何责任。
                    </div>
                    <div>第十六条 乙方将根据国家有关法律的规定，依从严谨、安全的保密原则，妥善保管甲方提交的资料。除下列情形外，乙方不会向第三方泄露甲方的资料：
                    </div>
                    <div>1、经过甲方同意提供的。
                    </div>
                    <div>2、根据执法单位的要求或为公共目的向相关单位提供的。
                    </div>
                    <div>3、根据有关法律、法规、证券交易所规则等要求向政府、证券交易所或其他监管机构、乙方的法律、会计、商业及其他顾问、雇员提供的。
                    </div>
                    <div>4、其他乙方依法应当提供的。
                    </div>
                    <div>第十七条 有下列情形之一的，本协议终止：
                    </div>
                    <div>1、甲方证书期限届满。
                    </div>
                    <div>2、甲方证书被吊销。
                    </div>
                    <div>3、甲方向乙方申请终止本协议，乙方同意的。
                    </div>
                    <div>4、双方协商终止本协议的。
                    </div>
                    <div>5、依据法律、法规等规定，本协议应当终止的。
                    </div>
                    <div>第十八条 本协议的有效期限为证书的有效期限。证书期限届满，甲方更新证书的，本协议有效期限顺延至证书更新期限届满日。
                    </div>
                    <div>第十九条 甲乙双方约定，甲方通过在放心花网站（网址：www.easyloan888.com）上通过包括但不限于点击、勾选等方式之一确认本协议即视为甲方与乙方达成协议并同意接受本协议的全部约定内容，协议即生效。
                    </div>
                    <div>第二十条 因本协议产生的争议，不论争议金额大小，均提交杭州仲裁委员会适用杭州仲裁委员会仲裁规则项下的简易程序进行仲裁。仲裁裁决为终局的，对各方均有拘束力。
                    </div>
                </div>
            </div>
        </div>
    }
}


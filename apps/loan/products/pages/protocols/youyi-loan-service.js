import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'

import styles from '../../css/protocols/youyi-loan-service.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class YouyiLoanService extends React.Component {

    componentDidMount() {
        document.title = '借款服务协议'
    }

    render() {
        let { history } = this.props;
        return <div styleName="bg">
            <Header title="借款服务协议" history={history} />
            <div styleName="protocol-article">
                <div>
                    <div>协议编号：【】 </div>
                    <div>甲方（借款人）： </div>
                    <div>身份证号码： </div>
                    <div>联系电话： </div>
                    <div>居住地址： </div>
                    <div>
                    </div>
                    <div>乙方（服务方）：深圳市众利财富管理有限公司 </div>
                    <div>地址：【】 </div>
                    <div>
                    </div>
                    <div>鉴于:</div>
                    <div>  1. 甲方具有一定的资金需求； </div>
                    <div>2.乙方是一家依法设立并有效存续的有限责任公司，是放心花APP/网站（网址：www.easyloan888.com，下称“放心花平台”）的运营方。通过互联网技术手段为甲方提供办理借款/还款的信息咨询、技术支持和交易管理服务。
                    </div>
                    <div>
                    </div>
                    <div>现双方就以上服务达成一致，特订立本协议。 </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>第1条	借款信息 </div>
                    <div>1.1  借款用途：【资金周转需要】。
                    </div>
                    <div>1.2  借款本金人民币￥【】，大写【】，借款利息人民币￥【】，大写【】。
                    </div>
                    <div>1.3  借款期限【】，还款方式为【】，还款日为借款期限届满日次日。
                    </div>
                    <div>1.4  甲方收款专用银行账户信息如下：
                    </div>
                    <div>     户  名：【】
                    </div>
                    <div>     账  号：【】
                    </div>
                    <div>     开户行：【】
                    </div>
                    <div>
                    </div>
                    <div>第2条	服务及授权内容
                    </div>
                    <div>2.1	甲方注册成为放心花平台的会员，并授权乙方合作方根据甲方自行提供或授权收集的甲方个人信息为甲方提供综合信用评估服务，乙方根据甲方综合信用评估审核结果给予甲方相应的借款额度申请权利（即“授信额度”）。甲方在授信额度范围内通过放心花平台发布借款申请，乙方将甲方的借款申请推荐给乙方资金合作方，促成甲方成功借款。
                    </div>
                    <div>2.2	甲方知悉并同意乙方可根据甲方个人信用情况自行决定推荐的资金合作方，乙方的资金合作方包括但不限于银行、信托公司、小贷公司、消费金融公司、网络借贷信息中介机构及其他互联网金融服务平台等。
                    </div>
                    <div>2.3	甲方不可撤销地同意并授权乙方及乙方合作方基于履行本协议项下服务之目的收集并使用甲方的个人信用信息，包括但不限于甲方的个人基本信息、通讯信息、银行账户信息、个人征信信息、运营商信息、借贷信息、消费信息、财务信息及其他信用评估审核所需的相关信息。具体信息需求以放心花平台公布的为准。甲方不可撤销地同意并授权乙方及乙方合作的第三方服务机构依据法律法规就授权范围内对上述本人信息进行采集、获取、存储、处理、提供、传输、披露。
                    </div>
                    <div>2.4	甲方不可撤销地同意并授权乙方在资金合作方以甲方名义申请账号或注册，该账号或注册仅限用于本协议服务之目的。并根据资金合作方规则以甲方名义签署与借款相关的借款合同、服务合同等法律文本。签署方式包括但不限于系统自动生成、点击确认、电子签章等。甲方对此等自动签署相关协议文本的安排已充分知悉，并认可该等自动签署的协议文本内容为甲方真实意思表示，甲方对该等法律文件的效力均予以认可且无任何异议，并无条件接受该等法律文件的约束。
                    </div>
                    <div>2.5	如根据乙方资金合作方规则，甲方需为其借款项下款项收付设置相关交易密码，为便于甲方借款款项的收付，甲方不可撤销地同意并授权乙方及乙方合作方通过系统自动设置交易密码并将交易密码保存于系统中并为甲方自动开通免密支付功能。并在相关借款合同生效后即通过系统自动向资金存管银行或第三方支付机构发出付款指令，将指定款项支付至甲方收款专用银行账户中。
                    </div>
                    <div>2.6	甲方同意并授权乙方及乙方合作方指示其合作的第三方支付机构代为划扣甲方还款及以其他应付款项（如有），并代为支付至相关方。
                    </div>
                    <div>
                    </div>
                    <div>第3条	甲方权利与义务
                    </div>
                    <div>3.1	甲方同意在申请及实现借款的全过程中，如实向乙方提供所要求提供的个人信息。甲方同意乙方将其信息提供给多个出借方供出借参考。甲方同意并授权乙方有权使用甲方提供的个人信息及乙方自行收集的甲方的个人信用信息，如甲方未按要求提供的，乙方可拒绝为甲方提供本协议约定之服务。
                    </div>
                    <div>3.2	甲方同意乙方或其委托第三方有权主动收集甲方资料，对甲方进行信用评估，包括但不限于向征信机构、身份信息系统等合法机构查询甲方的信用信息。
                    </div>
                    <div>3.3	甲方在乙方建立个人信息档案，授权乙方基于甲方提供的信息及乙方或其委托第三方独立获取的信息来管理甲方的信用信息。
                    </div>
                    <div>3.4	就本协议项下乙方向甲方提供的服务,甲方同意乙方可以将部分服务外包,并同意乙方将按本协议获取的甲方个人信息向该等第三方服务外包机构提供，但仅用于本协议项下约定服务使用。
                    </div>
                    <div>3.5	甲方应按照本协议的规定向乙方支付服务费并按《借款合同》约定按时偿还借款本息及其他应付费用（如有）。
                    </div>
                    <div>3.6	甲方同意，甲方成功借款后，乙方可依据出借方的委托协调甲方按照约定期限及金额进行还款，甲方有义务无条件及时配合乙方工作。
                    </div>
                    <div>3.7	对于甲方应付但未付乙方之服务费，甲方同意并授权乙方及其合作方指示第三方支付机构从甲方在放心花平台绑定的任一银行卡中进行划扣，直至服务费全额划扣支付成功。甲方应确保服务费支付账户有可供足额划扣的资金，因未按时支付服务费所产生的违约金由甲方承担。
                    </div>
                    <div>3.8	借款期限内，甲方应在下列事实变更之日起三（3）日内通过放心花平台提供更新后的信息给乙方（包含但不限于）：甲方还款银行账户、甲方本人、甲方家庭联系人以及紧急联系人的工作单位、居住地址、通讯地址、住所电话、手机号码、电子邮箱，若因甲方不及时提供上述变更信息而带来的所有损失，均由甲方承担。
                    </div>
                    <div>
                    </div>
                    <div>第4条	乙方权利与义务
                    </div>
                    <div>4.1	乙方有权向甲方收取双方约定的服务费。
                    </div>
                    <div>4.2	乙方为甲方提供借款相关的全程信息咨询服务。
                    </div>
                    <div>4.3	对于甲方提供给乙方的个人证件及其他各类信息，乙方有义务在本协议约定下为甲方保密。
                    </div>
                    <div>4.4	乙方有权要求甲方提供借款审查所需的全部资料，有权通过甲方提供的个人信用信息及行为记录进行评估。
                    </div>
                    <div>4.5	乙方通过技术手段将甲方的借款需求信息提供给出借人，并为双方的借贷交易提供信息咨询、技术支持和交易管理服务。
                    </div>
                    <div>
                    </div>
                    <div>第5条	服务费及支付方式
                    </div>
                    <div>5.1	在本协议中，“服务费”是指因乙方通过互联网技术手段为甲方提供办理借款/还款的信息咨询、技术支持和交易管理服务而由甲方支付给乙方的报酬。服务费支付标准为人民币【】元，大写【】元。
                    </div>
                    <div>5.2	对于乙方向甲方提供的上述服务，甲方按第【】项约定方式向乙方支付：
                    </div>
                    <div>	    A. 前置收取：在出借方向甲方提供借款本金时从借款本金中直接划转并支付给乙方。
                    </div>
                    <div>	    B. 后置收取：在甲方向出借方还款时将服务费与借款本息一并存入甲方还款账户并授权乙方合作方指示第三方支付机构代为划转并支付乙方。
                    </div>
                    <div>5.3	提前还款：
                    </div>
                    <div>5.3.1	借款存续期间，甲方可提前还款，提前还款金额及次数不限，甲方知悉并同意甲方提前还款的仍应向出借方支付截止到借款期限届满日的全部借款利息。
                    </div>
                    <div>5.3.2	受《借款合同》出借方的委托，若甲方提前还款给《借款合同》下特定的出借方，甲方应提前三（3）个工作日与乙方联系，按照放心花平台提前还款规则提出申请，确定提前还款时间，并按照放心花平台还款规则在约定的时间前偿还应还款项。
                    </div>
                    <div>5.3.3	甲方知悉并同意，如甲方与出借方就提前还款事项达成一致，甲方仍应按本协议约定向乙方支付服务费。
                    </div>
                    <div>
                    </div>
                    <div>第6条	违约条款
                    </div>
                    <div>6.1	甲方保证，为本协议之目的所提供的所有资料与印鉴，包括但不限于个人信息、身份证、个人名章、公司印章等，均真实、合法、有效。若甲方违反本承诺，乙方有权立即解除本协议，要求甲方向乙方支付等于本协议项下应支付费用30%的违约金，并赔偿乙方因此遭受的所有损失。
                    </div>
                    <div>6.2	如甲方违反本协议约定未按时支付服务费，甲方应按放心花平台公示标准向乙方支付违约金。
                    </div>
                    <div>6.3	甲方逾期支付服务费时，如甲方银行账户中余额不足以清偿全部到期应付款项，则偿还顺序依次为：实现债权费用、违约金、服务费。
                    </div>
                    <div>
                    </div>
                    <div>第7条	特别声明
                    </div>
                    <div>7.1	甲方知悉、了解并同意，如甲方违反本协议的相关规定，乙方有权对甲方提供的及乙方自行收集的甲方个人信息和资料编辑入乙方及其委托第三方系统或网站黑名单，并将该黑名单对第三方披露，且乙方有权将甲方提交或乙方及其委托第三方自行收集的甲方个人资料和信息与任何第三方进行数据共享或公开，以便乙方合作方及其委托第三方催收逾期借款及对甲方的其他申请进行审核之用，由此可能导致的甲方任何损失，乙方、乙方合作方及其委托第三方不承担法律责任。
                    </div>
                    <div>7.2	甲方特此声明，除其他法定送达地址外，本协议首部记载的甲方地址为甲方指定送达地址，关于本协议的送达包括但不限于送达催收通知、债权转让通知、起诉书、传票均以此地址进行送达；如乙方合作方或其委托的第三方以快递方式向上述地址发出通知，该发出之日起第三日视为送达。
                    </div>
                    <div>7.3	甲方在此知悉并同意，如乙方或乙方合作方根据本协议甲方提供的信息无法联系到甲方，乙方或乙方合作方可委托第三方通过媒体、网络或其他公开渠道发布讯息联系甲方，乙方或乙方合作方以上述方式对甲方进行通知时，涉及通知事项视为送达甲方。
                    </div>
                    <div>7.4	甲方行为构成犯罪的，乙方或乙方合作方有权向相关国家机关报案，追究其刑事责任。
                    </div>
                    <div>
                    </div>
                    <div>第8条	其他
                    </div>
                    <div>8.1	双方同意并确认，双方通过自行或授权有关方根据放心花平台有关规则和说明，在平台通过点击确认及电子签章的方式签署本协议。任何一方对本协议进行点击确认，即视为该方接受本协议条款内容并受此内容之拘束；双方通过上述方式签署本协议时，本协议即生效。本协议有效期自生效之日起至甲方本协议项下的全部义务履行完毕之日止。
                    </div>
                    <div>8.2	甲方应妥善保管自己在放心花平台的注册用户名和密码，自行承担因注册用户名和密码丢失、泄露或允许他人使用所产生的后果。通过甲方用户名和密码登陆的任何操作均视为该方本人的真实意思表示。
                    </div>
                    <div>8.3	本协议的任何修改、补充均须以书面形式作出。本协议的补充协议与本协议具有同等的法律效力。
                    </div>
                    <div>8.4	本协议的签署、生效和履行以不违反中华人民共和国现行法律法规为前提。如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。
                    </div>
                    <div>8.5	本协议签署地为签约系统服务器所在地，本协议履行过程中发生任何争议，应友好协商解决；如协商不成，则应提交本协议签署地人民法院进行诉讼。
                    </div>
                    <div>8.6	与本协议相关的《委托扣款授权书》、放心花平台规则视为本合同不可分割之部分，与本合同具有同等的法律效力。（以下无正文）
                    </div>
                    <div>
                    </div><div styleName="styleName">甲方（签章）：</div><div styleName="styleName">日期：</div>
                    <div styleName="styleName">乙方（签章）：</div><div styleName="styleName">日期：</div>
                </div>
            </div>
        </div>
    }
}
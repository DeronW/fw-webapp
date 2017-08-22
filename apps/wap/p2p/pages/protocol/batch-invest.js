import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components/'
import styles from '../../css/protocol/batch-invest.css'
import { NativeBridge } from '../../helpers'

@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class ProtocolBatchInvest extends React.Component {
    render() {

        let { history } = this.props

        return <div styleName="bg">
            <Header title="批量出借协议" history={history} />

            <div styleName="content">
            
            尊敬的投资客户：投资有风险，为了维护您的自身权益、防范投资风险，请在投资前仔细阅读本协议各条款、以及与本产品相关的全部产品规则，以充分知悉、了解产品的运作规则、投资范围以及协议双方的权利、义务和责任。一旦加入本投资计划即视为对本协议全部条款及相关业务规则已充分理解并完全接受。出借人保证其所用于出借的资金来源合法，且是该资金的合法所有人，如果第三方对资金归属、合法性问题提出异议，由出借人自行解决。如未能解决，则出借人承诺放弃享有其所出借资金带来的利息等收益并自行承担全部损失。
            
            <br /><br />1.批量投资服务
            <br /><br />1.1出借人为了满足对于通过金融工场平台（即www.9888.cn 网站），由北京凤凰信用管理有限公司运营发布的批量投资项目（包含原始借款项目及债权转让项目，以下简称“借款项目”）的需求，出借人特此确认为其依法享有完整的所有权并完成身份认证的出借人账户（以下简称“出借人账户”）开通批量投资服务。
            <br /><br />1.2批量投资是指系统以出借人账户内可出借资金（其中包括初始本金、借款项目已偿还本金及利息收益，以下统称“可出借资金”）及自动投标最高授权金额为限，通过开通金融工场平台发布的批量投资，并自动完成可出借资金与符合出借人设定的出借条件的借款项目匹配及交易的服务功能。
            <br /><br />1.3金融工场仅此推出批量投资服务，为加入的出借人提供更加贴心，便捷的服务，并将尽最大努力维护出借人的资金安全。
            <br /><br />1.4出借人同意并自愿加入本服务，并自愿遵守www.9888.cn网站现有的相关协议及规则。
            <br /><br />2.批量投资的开通及支付
            <br /><br />2.1在符合本协议约定的前提下，出借人自主选择开通自动投标服务功能。
            <br /><br />2.2 在符合本协议约定的前提下，已同意并授权在本协议生效时将其于金融工场平台合作银行开通的银行存款电子账户内的资金直接划扣至相关借款人指定账户。
            <br /><br />3.批量投资的加入及退出
            <br /><br />3.1指由金融工场经审核通过后的各类借款项目集合。
            <br /><br />3.2除自然终止外，加入及退出均以出借人债权转让方式实现。出借人一旦加入即表示同意与更早加入的出借人一同对组成批量投资的所有借款项目按出借资金比例承担风险。
            <br /><br />4.收益分配
            <br /><br />4.1 出借人已经知悉、了解并同意：本项目的预期收益率不代表出借人最终实际收益。
            <br /><br />5.批量投资的费用
            <br /><br />5.1因通过计划匹配成功的借款项目所产生的居间费用及其他费用等（如有），收费标准将根据具体的借款项目涉及的《借款协议》/《债权转让协议》、《出借人咨询服务协议》、《受让方咨询服务协议》等约定收取。
            <br /><br />5.2出借人知悉和认可，因本协议项下的资金出借、债权转让过程中所产生的相关税费，由出借人自行向其主管的税务机关进行申报和缴纳，金融工场平台不负责处理该项事宜。
            <br /><br />6.批量投资服务的终止
            <br /><br />6.1批量投资项下的借款项目全部到期时自然终止。
            <br /><br />6.2全体出借人特此不可撤销的确认并授权金融工场平台有权决定是否向批量投资中新增符合借款人自主选择并决定的出借条件的借款项目。
            <br /><br />7.出借人承诺
            <br /><br />7.1出借人点击确认本协议前已仔细阅读本协议，已就本协议及金融工场平台的相关风险提示、规则、声明、协议等向出借人做出提示，出借人同意本协议的所有条款及条件，且对前述内容不存在任何疑问。
            <br /><br />7.2出借人承诺出借人账户资金为合法取的，且具有排他性的支配权。
            <br /><br />7.3出借人承诺其向金融工场平台提供的所有信息、资料等均真实、合法、有效。
            <br /><br />7.4金融工场有权追究出借人承诺内容不实导致金融工场平台所遭受全部损失的赔偿责任。
            <br /><br />8. 授权
            <br /><br />8.1 出借人在此无条件且不可撤销地同意并确认：自出借人开启自动投标功能并加入批量投资起，即可通过系统在本协议项下范围内进行批量投标（“投标”即出借或受让已有借款债权，下同），并通过www.9888.cn平台系统以出借人名义自动批量签署相关借款协议、债权转让协议；出借人对此等自动批量投标和自动签署相关借款协议、债权转让协议之安排已充分知悉并理解；该等自动批量签署的借款协议、债权转让协议均视为出借人真实意思的表示，出借人对该等法律文件的效力均予以认可且无任何异议，并无条件接受该等自动签署的借款协议、债权转让协议之约束。
            <br /><br />8.2 出借人在此无条件且不可撤销地同意并确认、授权：出借人通过系统自动投标而签署之借款协议、债权转让协议等法律文件或其中的相关条款生效后，系统平台即可根据该等协议和本协议相关约定，指示合作银行从出借人开立的银行电子账户中对相关款项进行划扣、支付、冻结以及行使其他权利，出借人对此均予以接受和认可。
            <br /><br />9．其他
            <br /><br />9.1如因相关国家机关对出资人采取强制措施而导致出资人账户内资金被全部或部分冻结、划扣、则本规则约定的服务提前终止。
            <br /><br />9.2由于地震、风暴、水灾或其他自然灾害、瘟疫、战争、政府或公共机关禁止、黑客攻击、计算机病毒发作、银行或电信部门技术调整等不可抗力导致的一方未能按照本协议的约定提供服务的，任何一方互不追究对方责任，当发生不可抗力的一方应采取必要的补救措施以减少不可抗力的损失。
            <br /><br />9.3若发生国家法律法规变更、政策调整、监管部门的相关规定或指令调整，或者批量投资功能性更新，金融工场平台有权单方面变更本协议内容，并有权宣布交易功能中止或终止。
            <br /><br />9.4金融工场平台对本规则有最终解释权，如本规则未涉及的其他内容应以金融工场平台公布的各批量投资描述中披露的具体信息为准。
            <br /><br />9.5因本协议项下的服务引发的任何争议，应友好协商解决；协商不成的，任何一方均有权起诉至北京市朝阳区人民法院。本协议的签订、履行、终止等相关争议均适用中华人民共和国法律法规。
            <br /><br />9.6若您对以上条款存有任何异议，请立即停止开通申请。若您不同意变更后协议内容，请在满足本协议约定前提下立即关闭自动投标功能。
            
            </div>

        </div>
    }
}

export default ProtocolBatchInvest
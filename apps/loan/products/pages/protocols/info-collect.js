import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'

import styles from '../../css/protocols/personinfo-collect.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class InfoCollect extends React.Component {

    componentDidMount() {
        document.title = '个人信息采集授权声明'
    }
    render() {
        let { history } = this.props;
        return <div styleName="bg">
            <Header title="个人信息采集授权声明" history={history} />
            <div styleName="protocol-article">
                <div style={{ textAlign: 'left', textIndent: '0' }}>本声明是一份独立、有效的文件，不因本人是否成功借款而影响本声明的效力。</div>
                <div>
                    1.本人知晓并同意本人委托/授权的第三方信息服务机构（包括但不限于中国人民银行征信中心、北京优分数据科技有限公司、芝麻信用管理有限公司、上海诚数信息科技有限公司、上海资信征信有限公司、银联智策顾问(上海)有限公司等）合法调查获得的本人信息（包括但不限于个人基本信息、借贷交易信息、银行卡交易信息、电商交易信息、公用事业信息、央行征信报告及在NFCS网络金融征信系统内记载的个人信用信息等）反馈至安趣盈（上海）投资咨询有限公司或其书面指定的合作机构（以下称“安趣盈及其合作机构”）。安趣盈及其合作机构应合理使用所获取的信息，对所获取的信息进行妥善保管，并可提供至为本人提供借款资金的合作方。安趣盈及其合作机构有权根据该资料审核本人的借款申请及评定本人的信用等级，并将本人的信用等级提供给相关贷款人。
                </div>
            </div>
            <div>
                2.本人知晓并同意安趣盈及其合作机构有权向任何第三方核实本人资料、信息和记录，包括但不限于住址、收入、职业、借款信息、信用信息以及其他与本人有关的资料、信息和记录。
            </div>
            <div>
                3.本人知晓并同意本声明以及与安趣盈及其合作机构签署的其他协议以电子形式签署。本人特授权安趣盈制作本人的电子签章（可委托的制作机构包括但不限于深圳法大大网络科技有限公司、杭州尚尚签网络科技有限公司），并调取用于本声明及相关协议的签署。
            </div>
            <div>
                4.本人知晓并同意安趣盈及其合作机构有权将本人提交的借款申请及本人资料中的内容、信息用于与本人借款申请有关的所有业务中。
            </div>
            <div>
                5.本人知晓并同意安趣盈及其合作机构有权将本人与安趣盈及其合作机构之间同借款有关的电话沟通、微信往来、网上咨询等内容进行记录，并作为证据留存或向相关机构提供。
            </div>
            <div>
                6.本人知晓并授权安趣盈及其合作机构有权依据本授权声明授权及相关法律法规规定，向第三方信息服务机构提交本人在与安趣盈及其合作机构发起的借款接贷后管理过程中产生的相关信息，包括但不限于个人基本信息、借款申请信息、借款合同信息以及还款行为信息，并记录在网络金融征信系统（NFCS）、金融信用信息基础数据库等征信中心和其他与安趣盈及其合作机构合作的信息服务机构（以下统称为“第三方信用信息服务机构”）的个人信用信息数据库。
            </div>
            <div>
                7.本人知晓并同意若本人出现不良还款行为安趣盈及其合作机构有权按合同所留联系方式对本人进行提醒并告知，本人若仍未履行还款义务，安趣盈及其合作机构可将本人的不良还款信息提交至前述的任意一个或多个第三方信用信息服务机构，记录在此等第三方信用信息服务机构的个人信用信息数据库中。
            </div>
            <div>
                8.本人已被明确告知不良还款信息一旦记录在第三方信用信息服务机构的个人信用信息数据库中，在日后的经济活动中对本人可能产生的不良影响。
            </div>
            <div>
                9.若本人所约定的联络方式产生变化，本人将及时通知安趣盈及其合作机构，若因未通知造成的相应损失，本人愿承担相应责任。
            </div>
            <div style={{ textAlign: "right" }}>声明人：【】</div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    }
}
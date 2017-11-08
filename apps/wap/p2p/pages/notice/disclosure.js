import React from 'react'
import CSSModules from 'react-css-modules'
import { getJSONP, Utils } from 'fw-javascripts'

import { Header } from '../../components'
import { NativeBridge } from '../../helpers'
import styles from '../../css/notice/disclosure.css'

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class LeftPanel extends React.Component {
    state = {
        data: {}
    }
    componentDidMount() {
        this.fetchDataHandler()
    }
    judgeCash = (value, n) => {
        n = n > 0 && n <= 20 ? n : 2;
        var len = value && value.toString().split(".")[0].length;
        value = Number(value && value.toString().substr(0, 11));
        var v = "";
        if (len > 8) {
            v = (value / 100000000).toFixed(n) + "亿";
        } else if (len > 3) {
            v = (value / 10000).toFixed(n) + "万";
        } else {
            return value + ".00"
        }
        return v
    }
    fetchDataHandler = () => {
        getJSONP('https://www.gongchangp2p.com/dataTopics/data.shtml')
            .then(data => {
                let d = data.data;
                this.setState({
                    data: d
                })
            })
    }
    render() {
        let { data } = this.state;
        let infoFn = (item, index) => {
            return <div styleName="infoCell" key={index}>
                <div styleName="text">{item.text}</div>
                <div styleName="cash"><span>{item.cash}</span>元</div>
            </div>
        }
        let accumulate = [
            {
                text: "累计投资总额",
                cash: this.judgeCash(data.total_invest)
            },
            {
                text: "累计赚取收益",
                cash: this.judgeCash(data.total_interest)
            },
            {
                text: "累计回款本金",
                cash: this.judgeCash(data.total_principal)
            },
            {
                text: "累计出借笔数",
                cash: this.judgeCash(data.total_orderCount)
            },
        ]

        let enduranceFn = (item, index) => {
            return <div styleName="enduranceCell" key={index}>
                <div styleName="text" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                <div styleName="cash"><span>{item.cash}</span></div>
            </div>
        }
        let endurance = [
            {
                text: "待偿金额<br/>（元）",
                cash: this.judgeCash(data.total_principalInvest, 2)
            },
            {
                text: "逾期金额<br/>（元）",
                cash: this.judgeCash(data.total_overdueSum, 2)
            },
            {
                text: "金额逾期率<br>（%）",
                cash: this.judgeCash(data.total_overdueSum / data.total_invest * 100)
            },
            {
                text: "项目逾期率<br/>（%）",
                cash: this.judgeCash(data.total_overdueCount / data.total_orderCount * 100)
            },
            {
                text: "出借人本息损失<br/>（元）",
                cash: this.judgeCash(data.total_lendSum, 2)
            },
        ]

        return <div>
            <div styleName="infoCon">
                {data && accumulate.map(infoFn)}
            </div>
            <div styleName="infoPromote"></div>
            <div styleName="pieCon">
                <iframe style={{
                    border: '0',
                    width: '720px',
                    height: '1200px'
                }} src="https://static.9888.cn/pages/wap/chart-a/index.html"></iframe>
            </div>
            <div styleName="enduranceMobile">
                <div styleName="enduranceTitle">平台风险承受能力</div>
                <div styleName="enduranceContent">
                    {data && endurance.map(enduranceFn)}
                </div>
            </div>
            <div styleName="reportTitle">经审计的年度报表</div>
            <a styleName="reportBtn" href="https://static.9888.cn/pdf/web/2016report.pdf" target="_blank">立即查看</a>
        </div>
    }
}

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class MiddlePanel extends React.Component {
    render() {
        let chairmanFn = (item, index) => {
            return <div styleName="person" key={index}>
                <div styleName="personUp">
                    <img src={item.img} styleName="personPic fl" />
                    <div styleName="personRTitle fl">
                        <span styleName="name">{item.name}</span>
                        <span styleName="position">{item.job}</span>
                    </div>
                </div>
                <div styleName="personRContent">{item.profile}</div>
            </div>
        }
        let chairman = [
            {
                img: require("../../images/notice/disclosure/men2.png"),
                name: '魏薇·董事长',
                job: '',
                profile: '毕业于中国人民大学。曾任北京联合开元投资担保有限公司副总经理和联合创业集团有限公司营运管理中心总经理。经过10余年金融行业管理岗位的历练，拥有丰富的网贷行业实战经验和全面而独到的行业视角及理念，是小微金融的领军人物，普惠金融体系的积极践行者。'
            },
            {
                img: require("../../images/notice/disclosure/men6.png"),
                name: '朱海涛',
                job: 'COO 首席运营官',
                profile: '毕业于天津大学，曾就职于IBM(NYSE:IBM)研发中心，并在Tom网，安博教育（NYSE:AMBO)有多年技术研发管理工作经验。对互联网技术与互联网产品相结合，实践经验丰富，同时对互联网技术与互联网运营高度紧密结合的相关工作有着丰富经验。现任工场微金COO，负责工场微金整体网站的运营管理。'
            },
            {
                img: require("../../images/notice/disclosure/men4.png"),
                name: '邹晓东',
                job: '首席风险官',
                profile: '毕业于东北财经大学，中国注册会计师（CICPA），英国特许公认会计师 （FCCA），曾任普华永道中天会计师事务所审计经理，联合创业担保集团辽宁公司首席风险官，拥有多年的风险管理经验。'
            },
            {
                img: require("../../images/notice/disclosure/men7.png"),
                name: '张锐',
                job: 'CTO 首席技术官',
                profile: '毕业于青岛理工大学，曾任人人(NYSE:RENN)高级技术经理，先锋支付技术基础架构负责人，去哪儿(NYSE: QUNR)国际机票(供应链)技术负责人。现任工场微金CTO，负责工场微金互联网产品与技术团队。对大规模复杂在线交易系统架构设计及互联网产品技术团队管理具备丰富经验。'
            },
            {
                img: require("../../images/notice/disclosure/men8.png"),
                name: '段炼',
                job: 'CMO 首席营销官',
                profile: '毕业于北京交通大学，曾就职于中信国安集团和北京锐安科技有限公司，从事综合管理及互联网信息安全监管等相关工作，具备多年跨行业跨职能相关管理工作经验。对于营销管理、成本管理、团队管理具有丰富的工作经验，现任工场微金CMO,负责工场微金用户运营营销工作。'
            }
        ]
        return <div styleName="basicInfo">
            <div styleName="basicInfoTitle">
                公司基本信息
                </div>
            <div styleName="basicInfoContent clearfix">
                <div styleName="basicInfoContentL fl">
                    <p styleName="site">公司全称及简称：</p>
                    <p styleName="site">统一社会信用代码：</p>
                    <p styleName="line">注册资本：</p>
                    <p styleName="line">实缴资本：</p>
                    <p styleName="adress">注册地址：</p>
                    <p styleName="line">成立时间：</p>
                    <p styleName="line">经营期限：</p>
                    <p styleName="line">法定代表人：</p>
                    <p styleName="range">经营范围：</p>
                    <p styleName="line">经营状态：</p>
                    <p styleName="line">收费标准：</p>
                    <p styleName="site newLine">经营场所：</p>
                    <p styleName="case">资金存管情况：</p>
                    <p styleName="site siteLook">注册协议模板：</p>
                    <p styleName="line">联系电话：</p>
                    <p styleName="line">电子邮箱：</p>
                </div>
                <div styleName="basicInfoContentR fl">
                    <p styleName="rsite">北京凤凰信用管理有限公司（简称：凤凰信用）</p>
                    <p styleName="rsite">91110000597734276G</p>
                    <p styleName="rline">5000万</p>
                    <p styleName="rline">5000万</p>
                    <p styleName="radress">北京市朝阳区朝阳门外大街18号11层1105内008号</p>
                    <p styleName="rline">2012年5月23日</p>
                    <p styleName="rline">2012-05-23至2062-05-22</p>
                    <p styleName="rline">魏薇</p>
                    <p styleName="rrange">
                        企业信用征集、评定；企业信用管理咨询；经济贸易咨询；投资咨询；企业管理咨询；市场调查；投资管理；资产管理；软件开发；设计、制作、代理、发布广告；技术咨询；技术服务；委托生产电子产品、照相器材、计算机、软件及辅助设备；航空机票票务代理；经营电信业务；互联网信息服务；销售化工产品。（企业依法自主选择经营项目，开展经营活动；销售化工产品、“经营电信业务”；“互联网信息服务”以及依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动；不得从事本市产业政策禁止和限制类项目的经营活动。）</p>
                    <p styleName="rline">开业</p>
                    <p styleName="rline">平台服务费，根据客户的借款本金、借款天数、年化收费利率计算。</p>
                    <p styleName="rsite newLine">北京朝阳区朝阳门外大街18号11层1105内008号</p>
                    <p styleName="rcase">
                        工场微金与徽商银行建立合作，由徽商银行提供资金存管服务，为平台、出借人、借款人和其他业务参与方分别开立独立的银行电子账户，每个主体各自资金存管在各自名下的账户中。可最大限度的保障出借人、借款人的资金安全。</p>
                    <p styleName="rline"><a styleName="rlineLook" target="_blank">点击查看</a></p>
                    <p styleName="rline rlineTop">400-0322-988</p>
                    <p styleName="rline">kefu@9888.cn</p>
                </div>
            </div>
            <div styleName="webInfoTitle">
                风险管理信息
            </div>
            <div styleName="webInfoContent riskInfoContent">
                <div styleName="webInfoContentL fl">
                    <p styleName="line">网贷机构风险管理架构：</p>
                    <p styleName="line riskLine">风险评估流程：</p>
                    <p styleName="line">风险预警管理情况：</p>
                    <p styleName="line riskWay">催收方式：</p>
                </div>

                <div styleName="webInfoContentR fl">
                    <p styleName="rline">风险管理部：首席风险官1名；高级风险经理1名；风险经理3名</p>
                    <img src={require("../../images/notice/disclosure/flow.jpg")} alt="" />
                    <p styleName="rline riskRline">资产端业务部门进行贷后管理检查前要制定检查计划。贷后检查分日常检查和重点检查。对合作授信的资产端需要提供每月的资产质量报表（主要包括：平均贷款余额、期末贷款余额、新增账户数、新增贷款、审批通过率、首次逾期率、核销金额、迁移率等），平台严格按《北京凤凰信用管理有限公司网络借贷信息中介平台贷后管理办法》与《北京凤凰信用管理有限公司网络借贷信息中介平台业务档案管理办法》执行。</p>
                    <p styleName="rline riskText">资产端推荐每个借款用户在平台借款时，到期未还采取的风险缓释措施：担保方连带责任保证担保。</p>
                </div>
            </div>
            <div styleName="webInfoTitle">
                公司网站平台信息
            </div>
            <div styleName="webInfoContent">
                <div styleName="webInfoContentL fl">
                    <p styleName="line">网站或互联网平台地址：</p>
                    <p styleName="line">平台名称：</p>
                    <p styleName="line">平台上线运营时间：</p>
                    <p styleName="line">ICP备案号：</p>
                    <p styleName="line">经营性ICP许可证号：</p>
                    <p styleName="line">移动APP应用：</p>
                    <p styleName="line">全国公安网监备案：</p>
                </div>
                <div styleName="webInfoContentR fl">
                    <p styleName="rline">www.gongchangp2p.com</p>
                    <p styleName="rline">工场微金</p>
                    <p styleName="rline">2012年7月1日</p>
                    <p styleName="rline">京ICP备14029254号-1</p>
                    <p styleName="rline">京ICP证140736号</p>
                    <p styleName="rline">工场微金</p>
                    <p styleName="rline">京公网安备11010502031615号</p>
                </div>
            </div>
            <div styleName="orgTitle">
                组织架构
                </div>
            <img src={require("../../images/notice/disclosure/org.jpg")} alt="" styleName="orgPic" />
            <div styleName="shareTitle">实际控股人</div>
            <div styleName="shareContent">
                {/*<img src={require("../../images/notice/disclosure/logo3.png")} alt="" styleName="sharePic" />*/}
                <p styleName="des">Decade Elite Global Limited</p>
            </div>
            <div styleName="chairmanRight">
                <div styleName="chairmanRightTitle">
                    高管团队
                    </div>
                <div styleName="chairmanRightTitleContent">
                    {chairman.map(chairmanFn)}
                </div>
            </div>
        </div>
    }
}

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class RightPanel extends React.Component {
    render() {
        return <div styleName="auditReportMobile">
            <div styleName="audioMobile">
                <span>会计师事务所审计报告 </span>
                <div styleName="auditBtn auditBtn1">立即查看</div>
            </div>
            <div styleName="audioMobile">
                <span>信息系统安全等级测评报告  </span>
                <div styleName="auditBtn auditBtn3">立即查看</div>
            </div>
            <div styleName="audioMobile">
                <span>律师事务所合规报告  </span>
                <div styleName="auditBtn auditBtn2">立即查看</div>
            </div>
        </div>
    }
}


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Disclosure extends React.Component {
    state = {
        tab: '平台运营信息'
    }
    componentDidMount() {
        NativeBridge.trigger("hide_header")
    }
    switchTabHandler = (t) => {
        this.setState({ tab: t })
    }
    render() {
        let { tab } = this.state;

        let tabFn = (item, index) => {
            return <div key={index}
                styleName={tab == item ? 'tab active' : 'tab'}
                onClick={() => this.switchTabHandler(item)}>{item}
            </div>
        }

        let showPanel = () => {
            let p
            if (tab == "平台运营信息") {
                p = <LeftPanel />
            } else if (tab == "企业信息") {
                p = <MiddlePanel />
            } else if (tab == "专项报告") {
                p = <RightPanel />
            }
            return p
        }

        return <div styleName="bg">
            <Header title='信息披露' history={this.props.history} />

            <div styleName="tabPanel">
                {["平台运营信息", "企业信息", "专项报告"].map(tabFn)}
            </div>

            {showPanel()}
        </div>
    }
}

export default Disclosure
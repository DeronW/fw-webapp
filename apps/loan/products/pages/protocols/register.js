import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'

import styles from '../../css/protocols/youyi.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Register extends React.Component {

    componentDidMount() {
        document.title = '“放心花”用户注册协议'
    }

    render() {

        let txt = `
        注册服务协议
        欢迎您注册成为“放心花”用户（下称为“您”或“用户”，即您本人），在注册前请您仔细阅读如下服务条款：
        本协议由您与“放心花”平台运营公司深圳市众利财富管理有限公司（以下简称为“放心花”）之间就“放心花”平台（网址：www.easyloan888.com，以下简称“平台”）服务等相关事宜所订立的契约，请您仔细阅读本注册协议， 如果同意本协议的条款，请按照页面上的提示完成全部的注册程序。如您终止并退出申请，则视为不接受本协议全部条款。
        1、总则
        1.1 “放心花”按照本协议的规定及其不定时发布的操作规则提供基于互联网和移动互联网的相关服务。
        1.2 为获得服务, 用户应当认真阅读、充分理解本协议中各条款, 包括免除或者限制“放心花”责任的免责条款及对用户的权利限制条款。 审慎阅读并选择接受或不接受本协议。
        1.3 “放心花”有权在必要时修改服务条款，服务条款一旦发生变动，将会以网站、APP公告等方式提示修改的内容， 不再另行通知， 一经“放心花”公布，则立即自动生效，另有约定的除外。 如果不同意所改动的内容，您可以主动取消获得的平台信息服务。如果您继续享用平台信息服务，则视为接受服务条款的变动。
        2、用户账号和密码的使用、保管
        2.1 用户完成注册申请手续后，获得“放心花”账号的使用权。用户应提供真实、准确、完整的个人资料，并不断更新注册信息，符合上述要求。所有原始键入的信息将引用为注册信息。如果因注册信息而引起的问题，并对问题发生所带来的后果，“放心花”不负任何责任。
        2.2 用户不应将其账号、密码转让、出售。 您确认：通过您的账号和密码进行一切操作均代表您本人，您对使用该账号和密码所进行的操作负完全责任。您的账号及密码由您自己自行保管，因黑客行为或用户违反本协议规定导致账号、密码遭他人非法使用的，由用户本人承担因此导致的损失和一切法律责任，“放心花”不承担任何责任。
        2.3 对于涉及用户注册信息、个人信息等隐私信息的，将对其中涉及个人隐私信息予以严格保密，除非得到您的授权、或法律另有规定外，“放心花”不会向外界披露您的隐私信息。
        2.4 由于法律法规的规定、“放心花”自身必要因素等原因，“放心花”有权对用户注册账户的相关信息，进行证据保全。 并且有权根据您在平台上申请账户时所填写的信息，向“放心花”合作的第三方（包括但不限于北京掌众金融信息服务有限公司、百融金融信息服务股份有限公司等）提取您的相关信息。
        3、您的资料及相关使用规则
        3.1 您的资料包括：您在注册、竞价、登录等使用本公司服务过程中、在任何公共信息区域（包括留言栏或反馈区）或通过任何电邮形式或手机短信等向本公司或其他用户提供的任何资料。您对您的资料负全责，而本公司、“放心花”平台仅作为您在网上分发及公布您的资料的渠道。
        3.2 您的资料不得：具有欺诈性、虚假、不准确或具误导性；侵犯任何第三方著作权、专利权、商标权、商业秘密或其他专有权利或发表权或隐私权；违反任何适用的法律或法规；有侮辱或者诽谤他人，侵害他人合法权益的内容；有淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的内容；包含可能破坏、改变、删除、不利影响、秘密截取、未经授权而接触或征用任何系统、数据或个人资料的任何病毒、特洛依木马、蠕虫、定时炸弹、删除蝇、复活节彩蛋、间谍软件或其他电脑程序；直接或间接链接至您无权链接或列入的任何网址或者内容。若您的资料具有上述情形之一的，本公司有权暂停或终止对您提供相关服务，由此导致的损失（包括直接和间接的）均由您本人承担。
        3.3 许可您为使本公司能够使用您向本公司提交的资料，使本公司不违反您可能在该资料中拥有的任何权利之目的，同意向本公司授予非独占、全球性、永久、不可撤消、免使用费、可分许可（通过多层许可的方式）的权利，以行使您在您的资料（在任何已知或目前为未知媒体中）享有的与您的资料有关的相关权利。
        3.4 您有义务维持并更新您的基本资料（特别是银行账户信息），因您未及时更新相关资料导致本公司无法提供服务或提供服务时发生任何错误的，本公司不承担任何责任。
        3.5 如您通过签署有关协议等方式获得其他用户的个人资料，您同意不将该等个人资料用于除追索债权以外的其他任何用途，除非该等信息根据适用的法律法规规定被政府部门或司法部门要求披露。
        3.6 除您提供的及“放心花”自行合法收集或经您自行输入或提供的有关您的用户信息外，您作为“放心花”的用户还授权“放心花”或“放心花”合作的第三方通过征信机构或经监管部门或行业自律组织认可的信息平台查询、采集并报送您的个人征信信息或其他相关信息（包括但不限于身份核验信息、联系方式核验信息、通讯设备信息、人脸信息比对、消费记录及行为信息、信用行为画像信息等）。“放心花”将对通过上述所有方式获取的用户信息按照行业标准惯例及信息安全标准予以保护。
        3.7 您同意，除法律另有规定之外，基于为用户提供更优质服务之目的，“放心花”有权在以下情况下合法合理使用您的用户信息及上述所获取的个人信息：
        3.7.1 用户授权“放心花”或“放心花”将合作的第三方根据用户所提供的信息（含个人征信信息或其他相关信息等）及“放心花”或合作第三方自行获得的信息评估用户的风险级别；
        3.7.2 用户同意，在不透露用户隐私的前提下，“放心花”或合作第三方有权对整个用户数据库进行分析并对用户数据库进行商业上的利用；用户同意并授权“放心花”或合作的第三方将用户个人信息推荐给相关的资金出借方。
        3.7.3其他基于履行协议、提供服务、解决争议、保障交易安全等目的使用用户个人信息等。
        3.8用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费及其他费用，用户应当赔偿。“放心花”有权视用户的行为性质，采取包括但不限于删除用户发布信息内容、暂停使用许可、终止服务、限制使用、追究法律责任等措施。
        4、服务和费用
        4.1 服务
        4.1.1放心花的服务内容包括但不限于：信息收集、信息公布、信息交互、电子合同等技术支持及交易管理服务，具体详情以放心花当时提供的服务内容为准。
        4.1.2 用户自行确认发布的信息，本网站对于信息情况不承担任何责任；对于本公司未参与的合同双方发生纠纷的，视为与本公司无任何关联，本公司不予以负责或赔偿任何损失。
        4.1.3在不违反适用法律的强制性规定的前提下，本公司向您提供的服务有可能会发生变更或者增加。
        4.2 费用
        4.2.1您使用放心花服务时，深圳市众利财富管理有限公司有权向您收取服务费用，具体服务费用收取标准以放心花公告或者深圳市众利财富管理有限公司与您另行签订的相关协议为准。您在此不可撤销地承诺，您将按照您签署的相关协议约定向深圳市众利财富管理有限公司支付服务费用。
        5、信用信息评估系统
        您不得采取可能破坏信用信息评估系统真实性、完整性的任何行为，否则，本公司有权按照中止或者终止您的用户资格，在这种情况下，您将无法登录或发布信息。
        5.1 您理解您的信用包含其他用户留下的意见和以此为依据所编制的综合信用评估数字。鉴于信用信息评估仅为促进用户之间的交易之目的而设计，您同意您不得将您的信用评估结果在“放心花”以外平台的任何场所推销出售或以其他方式输出。
        5.2 本公司不提供使您能够从其他网站向“放心花”平台输入信用评价的技术能力。
        6、进入和干扰
        6.1 未经本公司明示或者书面准许，您不能为了任何目的使用任何机器人、蜘蛛软件、刷屏软件或其他自动方式进入网站。
        6.2 此外，您同意您将不会：
        (i) 进行任何对本公司内部结构造成或可能造成（按本公司自行酌情确定）不合理或不合比例的重大负荷的行为；
        (ii) 未经本公司和适当第三方（如适用）事先明示书面准许，对网站的任何内容（除您的资料以外）制作拷贝、进行复制、修改、制作衍生作品、分发或公开展示；
        (iii) 干扰或试图干扰网站的正常工作或网站上进行的任何活动；
        (iv) 越过本公司可能用于防止或限制进入网站的机器人排除探头或其他形式。
        7、欺诈
        在不限制所使用法律规定的或本协议约定的本公司可取得的任何其它救济的前提下，如本公司通过任何方式，包括但不限于本公司自行酌情决定的方式，怀疑您参与了与本公司有关的欺诈活动，本公司可全权酌情决定中止或终止您的账户。
        8、违约
        在不限制其它救济的前提下，如发生以下情形，本公司可能限制您的活动并立即删除您的账户信息，并在“放心花”平台包括网站、APP等上发出有关您的行为的警告、发出警告通知、暂时中止、无限期地中止或终止您的用户资格及拒绝向您提供服务：
        8.1 您违反本协议或纳入本协议的文件；
        8.2 本公司无法核证或验证您向本公司提供的任何资料；
        8.3 本公司相信您的行为可能对您、本公司用户或本公司造成损失或法律责任。
        9、不保证
        9.1 本公司以“按现状”的方式提供本公司网站、APP和服务，而不带有任何保证或条件，无论该等保证或条件是明示、默示或法定的。
        9.2 本公司对本公司的服务商向用户提供的服务不提供任何形式的承诺或保证。
        10、特别声明
        10.1 本公司并不实质性介入您与其他用户之间的交易，对此，您充分理解并认可。
        10.2 您无任何附加条件的接受，本公司、本公司的关联公司和相关实体或本公司的服务商在任何情况下均不就因本公司的网站或APP、本公司的服务或本协议而产生或与之有关的利润损失或任何特别、间接或直接性的损害（无论以何种方式产生，包括疏忽）承担任何责任。
        10.3 您同意就您自身行为之合法性单独承担责任。您同意，本公司和本公司的所有关联公司和相关实体对本公司用户的行为的合法性及产生的任何结果不承担责任。
        10.4 您同意并接受本服务条款，视同您同意并接受“放心花”平台以短信、彩信、站内信和邮件等形式的营销行为。
        10.5 “放心花”网站上所有的内容，包括但不限于著作、图片、档案、资讯、资料、平台架构、平台画面的安排、网页设计均由本公司或其他权利人依法拥有知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。任何未经本公司或其他权利人书面授权，擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表“放心花”网站的程序或内容的行为均是违法行为，本公司保留追究相关使用人法律责任的权利。
        11、补偿及责任免除
        11.1 就任何第三方提出的，由于您违反本协议或纳入本协议的条款和规则或您违反任何法律或侵犯第三方的权利而产生或引起的任一种类和性质的任何索赔、要求、诉讼、损失和损害（包括直接或间接的），无论是已知或未知的，包括合理的律师费，您同意就此对本公司和（如适用）本公司的母公司、子公司、关联公司、合作伙伴、高级职员、董事、代理人和雇员进行补偿并使其免受损害。
        11.2 在任何情况下，对于您使用本公司服务过程中涉及由第三方提供相关服务的责任由该第三方承担，本公司不承担该等责任。本公司不承担责任的情形包括但不限于：
        (i) 因银行、第三方支付机构等第三方未按照用户和/或本公司指令进行操作引起的任何损失或责任；
        (ii) 因银行、第三方支付机构等第三方原因导致资金未能及时到账或未能到账引起的任何损失或责任；
        (iii) 因银行、第三方支付机构等第三方对交易限额或次数等方面的限制而引起的任何损失或责任；
        (iv) 因其他第三方的行为或原因导致的任何损失或责任。
        11.3 “放心花”平台出现下列任一状况而无法正常运作，致使无法向用户提供本协议项下的各项服务，“放心花”不承担任何违约或赔偿责任，该状况包括但不限于：
        (i) 在服务平台维护期间；电信设备出现故障不能进行数据传输的；
        (ii) 因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成系统障碍不能执行业务的；
        (iii) 由于黑客攻击、电信部门和企事业单位技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断或者延迟。
        (iv) 本协议有效期内，因国家相关主管部门颁布、变更的法令、政策导致“放心花”不能提供约定服务的，不视为其违约，双方可根据相关的法令、政策变更协议内容或提前终止本协议。
        (v) “放心花”有权根据风险及自身业务运营情况需要中止（终止）向用户提供服务，因此导致用户无法使用服务或服务受到限制的，不视为服务提供方违约。
        12、通知
        12.1 除非另行明示载明，任何通知将发往您在注册过程中向本公司提供的电邮地址。或者，本公司认为适当的其他方式。
        12.2 任何通知应视为于以下时间送达：
        (i) 如通过电邮发送，则电邮发送后24个小时，但发送方被告知电邮地址无效的，则属例外；
        (ii) 如以预付邮资的信件发送，则投邮之日后三个营业日；
        (iii) 如以挂号信发送，则在投邮后第七个营业日；
        (iv) 如通过传真发送，则传真发出的该个营业日（只要发送人收到载明以上传真号码、发送页数和发送日期的确认报告）。
        13、其他规定
        13.1 本协议在所有方面均受中华人民共和国法律管辖。
        13.2 任何争议，如协商不能解决，均应提交本公司注册地有管辖权的法院诉讼解决。
        13.3 本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规定可被删除而其余条款应予以执行。
        13.4 您同意，在发生并购时，本公司在本协议和所有纳入协议的条款和规则项下的所有或者部分权利和义务，可由本公司自行酌情决定向第三方自动转让。
        13.5 标题仅为参考之用，在任何方面均不界定、限制、解释或描述该条的范围或限度。
        13.6 本公司未就您或其他方的违约采取行动并不等于本公司放弃就随后或类似的违约采取行动的权利。
        13.7 您同意，本协议不得仅由于系本公司制订而以对本公司不利的方式予以解释。
        13.8 本协议和本协议所含条款和条件载明我们双方之间就本协议标注的全部予以理解和协议。
        13.9 本协议在您提交的注册为“放心花”用户的申请获得本公司审核通过时生效。自您注销您的用户账户的申请被本公司审核通过之日，或者本公司依据本协议及本协议所纳入或被提及的文件、条款和条件终止您的用户资格之日终止。



        `
        return <div styleName="bg">
            <Header title="“放心花”用户注册协议" history={this.props.history} />
            <div styleName="protocol">
                {txt.split('\n').map((t, index) => <div key={index}>{t}</div>)}
            </div>
        </div>
    }
}

export default Register

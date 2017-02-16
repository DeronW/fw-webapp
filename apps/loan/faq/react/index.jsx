const TITLE_TEXT = [
    "1.放心花是什么样的产品？",
    "2.如何借款？",
    "3.借款时多久到账？",
    "4.授信借款后如何还款？",
    "5.掌众金融是一家怎样的公司？放心花的背书是金融工场还是掌众金融？",
    "6.放心花安全么？",
    "7.放心花是怎么保密用户信息的？"
];

const DETAIL_TEXT = [
    [
        "放心花为大家提供的是用户与用户之间的资金借贷周转平台，放心花的主要功能就是提供快如闪电的 小额借款服务。在借款过程中，绕开了传统的审核的手续，采用社交化数据，是移动支付借贷安全、快速的保证。",
        "您有任何疑问都可以直接联系微信客服进行咨询。"
    ],
    [
        "点击微信菜单【放心花】进入首页，点击【我要借款】按提示一步步操作即可完成借款。（这里只说了微信借款，APP应该也是可以进行借款操作的吧） 初次使用时您需要先注册并进行实名绑卡，然后获取授信额度就能借款啦。获取授信额度时，信用卡认证和手机信息认证是基础项，完成后可进行淘宝、支付宝、新浪微博、邮箱等高级认证，授信额度和认证项相关。",
        "获取授信额度之后，即可使用此额度来借款，借款周期为21天。借款之后记得按时还款哦，否则将产生不必要的逾期费~"
    ],
    [
        "借款申请成功后56s到账，可能会由于个别银行接口原因，造成部分交易延迟到账，具体请以交易提示为准。"
    ],
    [
        "您使用授信额度借款成功后，可在【首页】点击“立即还款”或账单模块，也可在导航中点击【账单】进入账单页面，选择待还款记录点击“立即还款”（有待还款账单时显示）进行主动还款。"
    ],
    [
        "北京掌众金融信息服务有限公司成立于2014年，是一家专注于提供互联网信息服务技术开发、软件开发和解决方案的专业服务商，公司通过自主研发及与外部引进、合作，建立了完整的移动支付服务体系。会员邀请制借贷平台“闪电借款”，是掌众金融信息服务有限公司敏锐把握小额信贷市场的发展趋势，贴近小额贷款用户需求推出的新款移动支付产品。"
    ],
    [
        "您的银行卡信息、流动资金均通过国家认证的第三方支付机构管理，所有的资金流动都经过该机构在央行的备付金账户。根据中国人民银行制定的《支付机构客户备付金存管办法》任何单位和个人不得擅自挪用、占用、借用客户备付金，不得擅自以客户备付金为他人提供担保。所以放心花是很安全的哦~"
    ],
    [
        "小伙伴们在我们这里的所有信息都是加密存储的。我们通过国际通用的的RSA非对称加密算法（2048位密钥）对所有信息进行加密存储，该算法是目前为止世界公认的最安全的加密算法，能够抵抗目前为止已知的所有解密攻击。"
    ]

];

const UserAboutus = React.createClass({
    getInitialState() {
        return {
            showDetail: false,
            liArr: [],
            selectWhich: Number
        }
    },
    handleList(index) {
        this.setState({
            showDetail: !this.state.showDetail,
            selectWhich: index
        });
    },
    render() {
        let {selectWhich, showDetail} = this.state;
        let li = (todo, index) => {
            return <div key={index} className="li">
                <div className="title-li" onClick={() => this.handleList(index)}>
                    <div className="text">{todo}</div>
                    <span className={`icon ${this.state.selectWhich == index && showDetail && "arrow-d"}`}></span>
                </div>
                {selectWhich === index && showDetail && detailText(index)}
            </div>
        };

        let detailText = (index) => {
            return <div className="detail-text">
                {DETAIL_TEXT[index].map((todo, index) =>
                    <div key={index} className="text">{todo}</div>)}
            </div>
        };

        return (
            <div className="user-FAQ-cnt">
                <div className="user-FAQ-list">
                    {TITLE_TEXT.map((todo, index) => li(todo, index))}
                </div>
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"常见问题"} />, HEADER_NODE);
    ReactDOM.render(<UserAboutus />, CONTENT_NODE);
})

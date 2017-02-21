const TITLE_TEXT = [
    "1.关于放心花",
    "2.如何借款？",
    "3.借款时多久到账？",
    "4.授信借款后如何还款？",
    "5.放心花安全么？",
    "6.放心花是怎么保密用户信息的？"
];

const DETAIL_TEXT = [
    [
        "放心花是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股的金融工场全新推出的基于移动端的现金借贷平台，主要为用户提供短期的小额急借的现金借贷服务。用户通过授信认证获得授信额度，在额度内随时可进行借款，借款额度在500元-10000元之间。操作简单、方便快速、实时秒到账，做年轻人专属的手机钱包。"
    ],
    [
        "在【申请】页面，点击【我要借款】按提示一步步操作即可完成借款。初次使用时您需要先注册并进行实名绑卡，再完成必填信息认证，获取授信额度后就能借款啦。必填信息认证时，用户需要根据本身情况，可选择有、无信用卡认证。",
        "目前借款周期为21天，借款之后记得按时还款哦，否则将产生不必要的逾期费~"
    ],
    [
        "借款申请成功后56s到账，可能会由于个别银行接口原因，造成部分交易延迟到账，具体请以交易提示为准。"
    ],
    [
        "您使用授信额度借款成功后，在导航中点击【账单】进入账单页面，选择待还款记录点击“立即还款”（有待还款账单时显示）进行主动还款。"
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
            toggle_list: []
        }
    },
    handleList(index) {
        let t = this.state.toggle_list;
        t[index] = !t[index];
        this.setState({ toggle_list: t});
    },
    render() {
        let li = (todo, index) => {
            return <div key={index} className="li">
                <div className="title-li" onClick={() => this.handleList(index)}>
                    <div className="text">{todo}</div>
                    <span className={`icon arrow-d`}></span>
                </div>
                {this.state.toggle_list[index] && detailText(index)}
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

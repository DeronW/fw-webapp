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
        "放心花是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股的金融工场全新推出的基于移动端的线上贷款信息聚合平台，对接多家主流平台，满足您的各类贷款需求。"
    ],
    [
        "在【借钱】页面，选择借款产品，初次使用时您需要先注册并进行实名绑卡。不同类型的借贷产品需要您提供不同的信息资料，按提示一步步操作即可完成借款。"
    ],
    [
        "放心花中的众多贷款产品，从申请、审核、到最终放款，大约在1分钟-72小时内。借款申请成功后，可能会由于个别银行接口原因，造成部分交易延迟到账，具体请以交易提示为准。"
    ],
    [
        "借款成功后，在导航中点击【账单】进入账单页面，选择还款中的账单进行还款操作。不同贷款产品所属机构不同，还款方式也可能不同。有些机构会从您申请放款的银行卡中按期扣收，有些机构会要求您在该机构的注册账户中按期充值进行还款。机构放款前会与您确认，请关注确认信息；如果还有疑问，可以直接致电相应贷款机构。"
    ],
    [
        "您的银行卡信息、流动资金均通过国家认证的第三方支付机构管理，所有的资金流动都经过该机构在央行的备付金账户。根据中国人民银行制定的《支付机构客户备付金存管办法》任何单位和个人不得擅自挪用、占用、借用客户备付金，不得擅自以客户备付金为他人提供担保。所以放心花是很安全的哦~"
    ],
    [
        "小伙伴们在我们这里的所有信息都是加密存储的。我们通过国际通用的的RSA非对称加密算法（2048位密钥）对所有信息进行加密存储，该算法是目前为止世界公认的最安全的加密算法，能够抵抗目前为止已知的所有解密攻击。"
    ]

];

class UserAboutus extends React.Component{
    constructor(props){
        super(props)
        this.state={
            toggle_list: []
        }
        this.handleList = this.handleList.bind(this);
    }
    handleList(index) {
        let t = this.state.toggle_list;
        t[index] = !t[index];
        this.setState({ toggle_list: t});
    }
    render() {
        let li = (todo, index) => {
            return <div key={index} className="li">
                <div className="title-li" onClick={() => this.handleList(index)}>
                    <div className="text">{todo}</div>
                    <span className={this.state.toggle_list[index] ? 'icon' : 'icon arrow-d'}></span>
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
}

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"常见问题"} />, HEADER_NODE);
    ReactDOM.render(<UserAboutus />, CONTENT_NODE);
})

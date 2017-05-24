const TITLE_TEXT = [
    "1.填了很多认证没有额度？",
    "2.没有额度是什么原因？",
    "3.QQ、微博、简历等认证提示密码（验证码）错误怎么回事？",
    "4.如何申请借款？",
    "5.如何提升账户授信额度？",
    "6.无信用卡如何申请借款？",
    "7.借款手续费如何计算？"
];

const DETAIL_TEXT = [
    [
        "授信信息提交后，账户有1-3天的审核时间，建议过审核期之后再次查看，如审核期过后还是没有额度，可再次尝试，账户额度由系统自动判定。"
    ],
    [
        "授信信息审核期限为1-3天，如果在三天审核期后仍然无额度，说明提交的材料暂不符合系统批额度的标准。建议授权更多资料并耐心等待系统审核，这样对获取额度有帮助。"
    ],
    [
        "有些信息是非强制认证信息，如遇到以上提示错误问题，可以选择跳过，继续验证其他资料获得授信额度。"
    ],
    [
        "实名认证后，可以选择借款方式，如选择无信用卡借款，完成必填授权项获取授信额度后根据提示操作借款即可；如选择信用卡借款，需要完成必填授权项，所需认证以个人提交的必填信息为准，且决定授信额度大小；获取授信额度后，即可使用此额度借款，借款周期目前仅支持21天。"
    ],
    [
        "完成必填信息认证后，再次点击 “我要提额”按钮，进入全部授信项列表，包含“添加信用卡、手机信息认证、 身份认证、淘宝授权、京东商城授权、 支付宝授权、身份证照片授权、新浪微博授权、企业邮箱认证、学历认证、百度账号、工作信息授权、简历授权、 人行征信授权、QQ 认证、社保认证、芝麻信用、信用卡账单 授权、公积金授权”等，每完成一项理论上会增加授信额度。"
    ],
    [
        "实名认证之后选择无信用卡借款入口，完成推荐信息授权获取额度，按提示操作借款即可，如已添加过信用卡，无法选择此种借款方式。"
    ],
    [
        "借款费率由系统根据用户提交的信息判断，提交更多资料有机会降低费率。 在首页点击我要借款，输入借款金额后，会提示需要支付的手续费，具体以提示为准。"
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

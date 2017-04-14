class AvatarCard extends React.Component {
    render() {
        let avatarSrc = this.props.src || 'images/avatar_default.png';
        let maskedPhoneNum = maskInfo(this.props.phoneNum, 3, -5);
        return (
            <div className="avator-card">
                <div className="avatar-container">
                    <img src={avatarSrc} alt="user avatar"/>
                </div>
                <div className="masked-phone-num">
                    {maskedPhoneNum}
                </div>
            </div>
        )
    }
}

class FollowWXEntry extends React.Component {
    render() {
        return (
            <div className="follow-wx-entry-wrap">
                <div className="left-icon-container">
                    <img src="images/wx_icon.png" alt="wechat icon"></img>
                </div>
                <span>关注微信</span>
                <div className="right-align-container">
                    <div className="next-icon-container" onClick={() => {
                        window.location.href = '/static/loan/user-weixin/index.html';
                    }}>
                        <img src="images/next_arrow.png" alt="next arrow"></img>
                    </div>
                </div>
            </div>
        )
    }
}

class BillType extends React.Component {
    render() {
        return (
            <li className="bill-type" onClick={this.props.handleClick}>
                <img src={this.props.src}></img>
                <span>{this.props.billType}</span>
            </li>
        )
    }
}

class BillEntry extends React.Component {
    render() {
        let billTypesObj = [
            {
                typeNameCN: '申请中',
                iconImg: 'images/bill_applying_icon.png',
                jumpLink: '/static/loan/bill/index.html?tab=billApplying'
            }, {
                typeNameCN: '还款中',
                iconImg: 'images/bill_onloan_icon.png',
                jumpLink: '/static/loan/bill/index.html?tab=billReturning'
            }, {
                typeNameCN: '未通过',
                iconImg: 'images/bill_refused_icon.png',
                jumpLink: '/static/loan/bill/index.html?tab=billFailing'
            }, {
                typeNameCN: '已还款',
                iconImg: 'images/bill_finished_icon.png',
                jumpLink: '/static/loan/bill/index.html?tab=billPaid'
            }
        ];
        let billType = billTypesObj.map((type, index) => (<BillType billType={type.typeNameCN} src={type.iconImg} key={type.typeNameCN} handleClick={() => {
            window.location.href = type.jumpLink
        }}/>));
        return (
            <div className="bill-entry-wrap">
                <div className="bill-label">账单</div>
                <div className="bill-type-wrap">
                    <ul>
                        {billType}
                    </ul>
                </div>
            </div>
        )
    }
}

class UserInfoEnterWrap extends React.Component {
    constructor() {
        super();
        this.handleJump = this.handleJump.bind(this);
    }

    handleJump(infoID) {
        const USER = $FW.Store.getUserDict();
        $FW.Post(`${API_PATH}/api/loan/v1/baseinfo.json`, {
            sourceType: SOURCE_TYPE,
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            productId: 1
        }).then(data => {
            switch (data.borrowBtnStatus) {
                case 1: // 未实名
                    window.location.href = '/static/loan/user-card-set/index.html';
                    break;
                case 101: // 实名中
                    $FW.Component.Toast('设置提现卡处理中，请稍等');
                    break;
                default:
                    if (infoID === 'personal-info') {
                        window.location.href = '/static/loan/user-info/index.html';
                    }
                    if (infoID === 'card-info') {
                        window.location.href = '/static/loan/user-card-management/index.html';
                    }
            }
        })
    }

    render() {
        return (
            <div className="user-info-display-wrap" id={this.props.infoID} onClick={() => {
                this.handleJump(this.props.infoID)
            }}>
                {this.props.iconSrc !== null && <div className="info-icon-container">
                    <img src={this.props.iconSrc}></img>
                </div>}
                <span className="info-name">{this.props.infoNameCN}</span>
                <div className="right-align-container">
                    <div className="right-arrow-container">
                        <div className="fake-arrow"></div>
                    </div>
                </div>
            </div>
        )
    }
}

class MajorUserInfo extends React.Component {
    render() {

        // info items in this page
        let majorInfo = [
            {
                infoID: "personal-info",
                infoNameCN: "个人信息",
                iconSrc: "images/info_icon.png"
            }, {
                infoID: "card-info",
                infoNameCN: "银行卡",
                iconSrc: "images/bank_icon.png"
            }
        ];

        let infoItems = majorInfo.map((item, index) => (<UserInfoEnterWrap iconSrc={item.iconSrc} infoID={item.infoID} infoNameCN={item.infoNameCN} key={index}/>));
        return (
            <div className="info-display-block">
                {infoItems}
            </div>
        )
    }
}

class UserInfoWrap extends React.Component {
    render() {
        return (
            <div className="user-info-wrap">
                <AvatarCard phoneNum={this.props.phoneNum}/>
                <FollowWXEntry/>
                <BillEntry/>
                <MajorUserInfo/>
            </div>
        )
    }
}

function maskInfo(text, sIndex, eIndex) {
    let textLength = text.length,
        startIndex = Math.max(0, sIndex),
        endIndex = eIndex < 0
            ? (textLength + eIndex)
            : Math.max(eIndex, textLength - 1);
    return `${text.substr(0, startIndex)}${ '*'.repeat(endIndex - startIndex + 1)}${text.substr(endIndex + 1, textLength - 1)}`
}

const USER = $FW.Store.getUserDict();

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <BottomNavBar/>, BOTTOM_NAV_NODE);
    $FW.Post(`${API_PATH}/api/userBase/v1/userCenter.json`, {
        sourceType: SOURCE_TYPE,
        userGid: USER.gid,
        userId: USER.id,
        token: USER.token,
        uid: USER.uid
    }).then(data => {
        ReactDOM.render(
            <UserInfoWrap phoneNum={data.mobile}/>, CONTENT_NODE)
    }, e => {$FW.Component.Toast(e.message); console.log(e.code); console.log(e.message);});
})

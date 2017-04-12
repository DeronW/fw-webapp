class AvatarCard extends React.Component {
    render() {
        let avatarSrc = this.props.src || 'images/avatar_default.png';
        console.log(this.props.phoneNum);
        console.log(this.props.phoneNum.match(/\d{4}(?=^\d{3})/));
        let maskedPhoneNum = this.props.phoneNum.replace(/\d{4}(?=^\d{3})/, /\*\*\*\*/);
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
                    <div className="next-icon-container">
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
            <li className="bill-type">
                <img src={this.props.src}></img>
                <span>{this.props.billType}</span>
            </li>
        )
    }
}

class BillEntry extends React.Component {
    render() {
        let billTypesImg = {
            "申请中": "images/bill_applying_icon.png",
            "还款中": "images/bill_onloan_icon.png",
            "未通过": "images/bill_refused_icon.png",
            "已还款": "images/bill_finished_icon.png"
        }
        let billType = [];
        for (let k in billTypesImg) {
            billType.push(<BillType billType={k} src={billTypesImg[k]} key={k}/>);
        }
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
    render() {
        return (
            <div className="user-info-display-wrap" id={this.props.infoID}>
                { this.props.iconSrc !== null &&
                  <div className="info-icon-container">
                      <img src={this.props.iconSrc}></img>
                  </div>
                }
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

        let infoItems = majorInfo.map((item, index) => (
            <UserInfoEnterWrap
              iconSrc={item.iconSrc}
              infoNameCN={item.infoNameCN}
              key={index}/>
        ));
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
                <AvatarCard phoneNum="18900001234"/>
                <FollowWXEntry/>
                <BillEntry/>
                <MajorUserInfo/>
            </div>
        )
    }
}

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <UserInfoWrap/>, CONTENT_NODE);
    ReactDOM.render(
        <BottomNavBar/>, BOTTOM_NAV_NODE);
})

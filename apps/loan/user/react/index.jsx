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
            <div className="follow-wx-wrap">
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

class UserInfoWrap extends React.Component {
    render() {
        return (
            <div className="user-info-wrap">
                <AvatarCard phoneNum="18900001234"/>
                <FollowWXEntry />
            </div>
        )
    }
}

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <UserInfoWrap/>, CONTENT_NODE)
})

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

class UserInfoWrap extends React.Component {
    render() {
        return (
            <div className="user-info-wrap">
                <AvatarCard phoneNum="18900001234"/>
            </div>
        )
    }
}

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <UserInfoWrap/>, CONTENT_NODE)
})

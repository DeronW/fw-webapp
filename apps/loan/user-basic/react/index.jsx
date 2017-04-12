class MajorUserInfo extends React.Component {
    render() {
        let infoItems = majorInfo.map((item, index, itemArray) => (
            <UserInfoItemDisplay
              iconSrc={item.iconSrc}
              infoNameCN={item.infoNameCN}
              key={index}
              disableBorder={index === itemArray.length - 1 ? true : false}/>
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
            <UserInfoTab />
        )
    }
}

// info items in this page
let majorInfo = [
    {
        infoID: "personal-info__dis",
        infoNameCN: "个人信息",
        iconSrc: "images/info_icon.png"
    }, {
        infoID: "card-info__dis",
        infoNameCN: "银行卡",
        iconSrc: "images/bank_icon.png"
    }
];

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <UserInfoWrap/>, CONTENT_NODE);
})

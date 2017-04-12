class UserInfoTab extends React.Component {
    render() {
        let userInfoCat = [
            {
                "infoCatID": "basic",
                "infoCatNameCN": "基本信息"
            }, {
                "infoCatID": "eci",
                "infoCatNameCN": "紧急联系人"
            }, {
                "infoCatID": "job",
                "infoCatNameCN": "工作信息"
            }
        ];
        let selected = this.props.selectedTab;
        let infoTabGrp = userInfoCat.map((item, index) => {
            let borderStyle = "3px solid " + (item.infoCatID === selected ? "#649cfe" : "transparent");
            return (
                <li
                  className="info-tab-item"
                  key={item.infoCatID}
                  id={item.infoCatID}
                  style={{borderBottom: borderStyle}}>
                    {item.infoCatNameCN}
                </li>
            )
        });
        return (
            <ul className="info-tab">{infoTabGrp}</ul>
        )
    }
}

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
            <UserInfoTab selectedTab="basic"/>
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
        <Header title="个人信息"/>, HEADER_NODE);
    ReactDOM.render(
        <UserInfoWrap/>, CONTENT_NODE);
})

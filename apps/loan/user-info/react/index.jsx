class UserInfoTab extends React.Component {
    render() {
        let userInfoCat = [
            {
                "infoCatID": "basicInfo",
                "infoCatNameCN": "基本信息"
            }, {
                "infoCatID": "ecInfo",
                "infoCatNameCN": "紧急联系人"
            }, {
                "infoCatID": "workInfo",
                "infoCatNameCN": "工作信息"
            }
        ];

        let selected = this.props.selectedTab;
        let infoTabGrp = userInfoCat.map((item, index) => {
            let borderStyle = "3px solid " + (item.infoCatID === selected
                ? "#649cfe"
                : "transparent");
            return (
                <li className="info-tab-item" key={item.infoCatID} id={item.infoCatID} style={{
                    borderBottom: borderStyle
                }}>
                    {item.infoCatNameCN}
                </li>
            )
        });
        return (
            <ul className="info-tab">{infoTabGrp}</ul>
        )
    }
}

class InfoItemInputWrap extends React.Component {
    render() {
        return (
            <div className="user-info-input-wrap" id={this.props.infoID}>
                <span className="info-name">{this.props.infoNameCN}</span>
                <div className="right-align-container">
                    <input className="info-content" placeholder={this.props.placeholder}></input>
                    <div className="right-arrow-container">
                        <div className="fake-arrow"></div>
                    </div>
                </div>
            </div>
        )
    }
}

class InfoInputGrp extends React.Component {
    render() {
        let infoGrp = this.props.infoGrp;
        let infoItems = infoGrp.map((item, index) => {
            let subInfoItems = item.map((item, index) => (
              <InfoItemInputWrap
                infoNameCN={item.infoNameCN}
                key={index}
                placeholder={item.placeholder}/>
              ));
            return (
                <div className="info-display-block" key={index}>
                    {subInfoItems}
                </div>
            )
        });
        return (
            <div>
                {infoItems}
            </div>
        )
    }
}

class UserInfoWrap extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'workInfo',
            basicInfo: [
                [
                    {
                        infoID: 'name-info',
                        infoNameCN: '姓名',
                        cnt: '',
                        placeholder: '未实名'
                    }, {
                        infoID: 'indentity-info',
                        infoNameCN: '身份证号',
                        cnt: '',
                        placeholder: '未实名'
                    }, {
                        infoID: 'credict-card-info',
                        infoNameCN: '信用卡',
                        cnt: '',
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'city-info',
                        infoNameCN: '所在城市',
                        cnt: '',
                        placeholder: '请选择'
                    }, {
                        infoID: 'address-info',
                        infoNameCN: '现居住地',
                        cnt: '',
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'marriage-info',
                        infoNameCN: '婚姻',
                        cnt: '',
                        placeholder: '请选择'
                    }
                ]
            ],
            ecInfo: [
                [
                    {
                        infoID: 'ec-name-info',
                        infoNameCN: '紧急联系人',
                        cnt: '',
                        placeholder: '未填写'
                    }, {
                        infoID: 'ec-rel-info',
                        infoNameCN: '联系人关系',
                        cnt: '',
                        placeholder: '请选择'
                    }, {
                        infoID: 'ec-mobile-info',
                        infoNameCN: '联系人手机',
                        cnt: '',
                        placeholder: '请输入'
                    }
                ]
            ],
            workInfo: [
                [
                    {
                        infoID: 'salary-info',
                        infoNameCN: '税后月收入',
                        cnt: '',
                        placeholder: '请选择'
                    }, {
                        infoID: 'work-years-info',
                        infoNameCN: '工作年限',
                        cnt: '',
                        placeholder: '请选择'
                    }
                ]
            ]
        }
    }
    render() {
        let selected = this.state.selectedTab;
        return (
          <div>
            <UserInfoTab selectedTab={selected} />
            <InfoInputGrp selectedTab = {selected} infoGrp={this.state[selected]} />
          </div>
        )
    }
}

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <Header title="个人信息"/>, HEADER_NODE);
    ReactDOM.render(
        <UserInfoWrap/>, CONTENT_NODE);
})

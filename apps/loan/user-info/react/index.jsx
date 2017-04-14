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
            <ul className="info-tab" onClick={(e) => {
                if (!e.target.id) {
                    return
                }
                this.props.handleClick(e.target.id)
            }}>{infoTabGrp}</ul>
        )
    }
}

class InfoItemInputWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        if (this.props.options !== null) {
            this.state.expandOpts = false;
        }
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        this.setState({
            expandOpts: !this.state.expandOpts
        });
    }

    render() {
        let value = this.props.value;
        if (this.props.options !== null) {
            var selectOptions = this.props.options.map((option, index) => (
                <div className="select-option" key={index} onClick={() => {
                    this.toggleExpand();
                    this.props.handleInput(this.props.itemIndex, index);
                }}>
                    {option}
                    {value === option && <img className="selected-icon" src="images/selected.png"></img>}
                </div>
            ));
        }
        let selectLabelColor = value !== null
            ? '#333'
            : '#999';
        return (
            <div className="user-info-item-wrap">
                <div className="input-wrap" id={this.props.infoID}>
                    <span className="info-name">{this.props.infoNameCN}</span>
                    <div className="right-align-container">
                        {this.props.options === null
                            ? (
                                <input className="info-text-input" placeholder={this.props.placeholder} value={this.props.value} onChange={(e) => {
                                    this.props.handleInput(this.props.itemIndex, e.target.value)
                                }}></input>
                            )
                            : (
                                <span className="select-label" onClick={this.toggleExpand} style={{
                                    color: selectLabelColor
                                }}>{value !== null ? this.props.options[value] : this.props.placeholder}</span>
                            )}
                        { this.props.options !== null &&
                          <div className="right-arrow-container" onClick={this.toggleExpand}>
                            <div className="fake-arrow"></div>
                          </div>}
                    </div>
                </div>
                {this.state.expandOpts && (
                    <div className="select-option-wrap">
                        {selectOptions}
                    </div>
                )}
            </div>
        )
    }
}

class InfoInputGrp extends React.Component {
    render() {
        let infoGrp = this.props.infoGrp;
        let infoItems = infoGrp.map((item, index) => {
            let subInfoItems = item.map((item, subIndex) => (<InfoItemInputWrap infoNameCN={item.infoNameCN} key={item.infoID} placeholder={item.placeholder} options={item.options || null} value={item.value} itemIndex={[index, subIndex]} handleInput={this.props.handleInput}/>));
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

class SubmitBtn extends React.Component {
    render() {
        return (
            <div className="submit-btn" onClick={this.props.handleClick}>提交</div>
        )
    }
}

class UserInfoWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'basicInfo',
            showSubmitBtn: false,
            basicInfo: [
                [
                    {
                        infoID: 'name-info',
                        infoNameCN: '姓名',
                        value: this.props.userInfo.realName,
                        placeholder: '未实名'
                    }, {
                        infoID: 'indentity-info',
                        infoNameCN: '身份证号',
                        value: this.props.userInfo.idCard,
                        placeholder: '未实名'
                    }, {
                        infoID: 'credict-card-info',
                        infoNameCN: '信用卡',
                        value: this.props.userInfo.creditCard,
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'city-info',
                        infoNameCN: '所在城市',
                        value: this.props.userInfo.city,
                        options: [],
                        placeholder: '请选择'
                    }, {
                        infoID: 'address-info',
                        infoNameCN: '现居住地',
                        value: this.props.userInfo.address,
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'marriage-info',
                        infoNameCN: '婚姻',
                        value: this.props.userInfo.homeSituation,
                        options: [
                            '未婚', '已婚，无子女', '已婚，有子女'
                        ],
                        placeholder: '请选择'
                    }
                ]
            ],
            ecInfo: [
                [
                    {
                        infoID: 'ec-name-info',
                        infoNameCN: '紧急联系人',
                        value: this.props.userInfo.emContact,
                        placeholder: '未填写'
                    }, {
                        infoID: 'ec-rel-info',
                        infoNameCN: '联系人关系',
                        value: this.props.userInfo.emRelationship,
                        options: [
                            '父母',
                            '配偶',
                            '子女',
                            '兄弟姐妹',
                            '同事',
                            '同学',
                            '朋友'
                        ],
                        placeholder: '请选择'
                    }, {
                        infoID: 'ec-mobile-info',
                        infoNameCN: '联系人手机',
                        value: this.props.userInfo.emMobile,
                        placeholder: '请输入'
                    }
                ]
            ],
            workInfo: [
                [
                    {
                        infoID: 'salary-info',
                        infoNameCN: '税后月收入',
                        value: this.props.userInfo.income,
                        options: [
                            '3000元以下', '3001-5000元', '5001-10000元', '10001-20000元', '20000元以上'
                        ],
                        placeholder: '请选择'
                    }, {
                        infoID: 'work-years-info',
                        infoNameCN: '工作年限',
                        value: this.props.userInfo.workExperience,
                        options: [
                            '1年以下', '1-5年', '6-10年', '10年以上'
                        ],
                        placeholder: '请选择'
                    }
                ]
            ]
        }
        this.shiftTab = this.shiftTab.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    shiftTab(tabName) {
        this.setState({selectedTab: tabName});
        this.setState({showSubmitBtn: false});
    }

    handleInput(index, v) {
        this.setState({showSubmitBtn: true});
        let selected = this.state.selectedTab;
        let catInfo = JSON.parse(JSON.stringify(this.state[selected]));
        catInfo[index[0]][index[1]].value = v;
        this.setState({[selected]: catInfo});
    }

    handleSubmit() {
        $FW.Post(`${API_PATH}/api/userBase/v1/saveUserInfo.json`, {
            sourceType: SOURCE_TYPE,
            token: USER.token,
            uid: USER.uid,
            email: USER.email,
            creditCard: this.state.basicInfo[0][2].value,
            city: this.state.basicInfo[1][0].value,
            address: this.state.basicInfo[1][1].value,
            homeSituation: this.state.basicInfo[2][0].value,
            emContact: this.state.ecInfo[0][0].value,
            emMobile: this.state.ecInfo[0][1].value,
            emRelationship: this.state.ecInfo[0][2].value,
            income: this.state.workInfo[0][0].value,
            workExperience: this.state.workInfo[0][1].value
        }).then(data => {
            $FW.Component.Toast('信息已提交');
            this.setState({showSubmitBtn: false});
        }, e => $FW.Component.Toast(e.message));
    }

    render() {
        let selected = this.state.selectedTab;
        return (
            <div>
                <UserInfoTab selectedTab={selected} handleClick={this.shiftTab}/>
                <InfoInputGrp selectedTab={selected} infoGrp={this.state[selected]} handleInput={this.handleInput}/>
                {this.state.showSubmitBtn && <SubmitBtn handleClick={this.handleSubmit}/>}
            </div>
        )
    }
}

const USER = $FW.Store.getUserDict();

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <Header title="个人信息"/>, HEADER_NODE);
    $FW.Post(`${API_PATH}/api/userBase/v1/userInfoItem.json`, {
        sourceType: SOURCE_TYPE,
        token: USER.token,
        uid: USER.uid
    }).then(data => {
        ReactDOM.render(
            <UserInfoWrap userInfo={data}/>, CONTENT_NODE);
    }, e => $FW.Component.Toast(e.message));
})

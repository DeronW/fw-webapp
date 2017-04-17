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

class CitySelectWrap extends React.Component {
    constructor() {
        super();
        this.scrollList = this.scrollList.bind(this);
    }

    componentDidMount() {
        let labelHeight = 100;
        let cityWrapEl = ReactDOM.findDOMNode(this),
            devisionIndexEl = cityWrapEl.childNodes[1];
        let cityWrapHeight = window.innerHeight - labelHeight,
            devisionIndexHeight = devisionIndexEl.clientHeight;
        devisionIndexEl.style.top = (cityWrapHeight - devisionIndexHeight) / 2 + labelHeight + 'px';
    }

    scrollList(divs, sIndex) {
        let cityWrapEl = ReactDOM.findDOMNode(this);
        let devisionHeight = 40,
            optionHeight = 80,
            scrollTop = 0;
        for (var i = 0; i < sIndex; i++) {
            scrollTop += devisionHeight + optionHeight * divs[i][Object.keys(divs[i])[0]];
        }
        window.scrollTo(0, scrollTop);
    }

    render() {
        let sortedCityList = this.props.cityList.sort((c1, c2) => {
            if (c1.eng > c2.eng) {
                return 1;
            }
            if (c1.eng < c2.eng) {
                return -1;
            }
            return 0;
        });
        let divisions = [];
        let cityEls = sortedCityList.map((c, index, list) => {
            let newFirstLetter = (index === 0 || list[index - 1].eng[0] !== c.eng[0]) ? c.eng[0] : '';
            if (newFirstLetter) {
                divisions.push({[newFirstLetter]: 1});
            } else {
                divisions[divisions.length-1][c.eng[0]]++ ;
            }
            return (
                <div key={c.eng}>
                  { newFirstLetter &&
                      <div className="city-division">{newFirstLetter.toUpperCase()}</div>
                  }
                  <div className="city-option" onClick={() => {this.props.handleClick(this.props.itemIndex, c.cn);}}>{c.cn}</div>
                </div>
            );
        });
        let divisionEls = divisions.map((d, index) => (
            <li
              key={index}
              id={`city-division-${index}`}>
                {Object.keys(d)[0].toUpperCase()}
            </li>
        ))
        return (
            <div className="city-select-wrap">
                <div className="city-options-wrap">
                    {cityEls}
                </div>
                <ul className="city-divisions-wrap" onClick={(e) => {this.scrollList(divisions, e.target.id[e.target.id.length - 1]);}}>
                    {divisionEls}
                </ul>
            </div>
        )
    }
}

class InfoItemInputWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.isSelectItem = this.props.options !== null;
        if (this.isSelectItem) {
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
        let value = this.props.value,
            isSelectItem = this.isSelectItem,
            selectLabelColor = value !== null ? '#333' : '#999',
            inputItemDis = (
                <input
                    className="info-text-input"
                    placeholder={this.props.placeholder}
                    value={value}
                    onChange={(e) => {this.props.handleInput(this.props.itemIndex, e.target.value)}}>
                </input>
            ),
            selectItemDis;
        if (isSelectItem) {
            selectItemDis = (
                <span
                    className="select-label"
                    style={{color: selectLabelColor}}
                    onClick={this.toggleExpand}>
                    {value !== null ?
                      (this.props.infoNameCN === '所在城市' ? value : this.props.options[value])
                      : this.props.placeholder}
                </span>
            );
        }
        let selectOptions = [];
        if (isSelectItem && this.props.infoNameCN !== '所在城市') {
            selectOptions = this.props.options.map((option, index) => (
                <div
                    className="select-option"
                    key={index}
                    onClick={() => {
                        this.props.handleInput(this.props.itemIndex, index);
                }}>
                    {option}
                    {value === index && <img className="selected-icon" src="images/selected.png"></img>}
                </div>
            ));
        }
        let selectOptionsWrap = this.props.infoNameCN === '所在城市' ?
            (<div className="city-select-mask">
              <div className="city-select-label">
                  选择城市
                  <img src="images/close.png" onClick={this.toggleExpand}></img>
              </div>
              <CitySelectWrap
                itemIndex={this.props.itemIndex}
                handleClick={(index, v) => {this.toggleExpand(); this.props.handleInput(index, v);}}
                cityList={this.props.options}/>
            </div>) :
            (<div className="select-option-wrap">
                {selectOptions}
            </div>)
        ;
        return (
            <div className="user-info-item-wrap">
                <div className="input-wrap" id={this.props.infoID}>
                    <span className="info-name">{this.props.infoNameCN}</span>
                    <div className="item-display right-align-container">
                        { selectItemDis || inputItemDis }
                        { isSelectItem &&
                          <div className="right-arrow-container" onClick={this.toggleExpand}>
                            <div className="fake-arrow"></div>
                          </div>}
                    </div>
                </div>
                { this.state.expandOpts && selectOptionsWrap}
            </div>
        )
    }
}

class InfoInputGrp extends React.Component {
    render() {
        let infoGrp = this.props.infoGrp;
        let infoItems = infoGrp.map((item, index) => {
            let subInfoItems = item.map((item, subIndex) => (
              <InfoItemInputWrap
                infoNameCN={item.infoNameCN}
                key={item.infoID}
                placeholder={item.placeholder}
                options={item.options || null}
                value={item.value}
                itemIndex={[index, subIndex]}
                handleInput={this.props.handleInput} />));
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
                        options: this.props.cityList,
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
        $FXH.Post(`${API_PATH}/api/userBase/v1/saveUserInfo.json`, {
            email: email,
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
                <InfoInputGrp selectedTab={selected} infoGrp={this.state[selected]} handleInput={this.handleInput} />
                {this.state.showSubmitBtn && <SubmitBtn handleClick={this.handleSubmit}/>}
            </div>
        )
    }
}

// const USER = $FW.Store.getUserDict();
var cityList = [
  {
    eng: 'beijing',
    cn: '北京'
  }, {
    eng: 'shanghai',
    cn: '上海'
  }, {
    eng: 'guangzhou',
    cn: '广州'
  }, {
    eng: 'shenzhen',
    cn: '深圳'
  }, {
    eng: 'nanjing',
    cn: '南京'
  }, {
    eng: 'tianjin',
    cn: '天津'
  }, {
    eng: 'hangzhou',
    cn: '杭州'
  }, {
    eng: 'chengdu',
    cn: '成都'
  }, {
    eng: 'wuhan',
    cn: '武汉'
  }, {
    eng: 'xiamen',
    cn: '厦门'
  }, {
    eng: 'qingdao',
    cn: '青岛'
  }, {
    eng: 'xian',
    cn: '西安'
  }, {
    eng: 'chongqing',
    cn: '重庆'
  }, {
    eng: 'suzhou',
    cn: '苏州'
  }, {
    eng: 'changsha',
    cn: '长沙'
  }
];
var email;

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <Header title="个人信息"/>, HEADER_NODE);
    $FXH.Post(`${API_PATH}/api/userBase/v1/userInfoItem.json`).then(data => {
        email = data.email;
        ReactDOM.render(
            <UserInfoWrap userInfo={data} cityList={cityList}/>, CONTENT_NODE);
    }, e => $FW.Component.Toast(e.message));
})

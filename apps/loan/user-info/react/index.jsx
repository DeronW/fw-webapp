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
    constructor(props) {
        super(props);
        if (this.props.options !== null) {
            this.state = {
                expandOpts: false
            };
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
                    this.props.handleClick(this.props.itemIndex, option);
                }}>
                    {option}
                    {value === option && <img className="selected-icon" src="images/selected.png"></img>
}
                </div>
            ));
        }
        return (
            <div className="user-info-item-wrap">
                <div className="input-wrap" id={this.props.infoID}>
                    <span className="info-name">{this.props.infoNameCN}</span>
                    <div className="right-align-container">
                        {this.props.options === null
                            ? (
                                <input className="info-text-input" placeholder={this.props.placeholder}></input>
                            )
                            : (
                                <span className="select-label" onClick={this.toggleExpand}>{value || this.props.placeholder}</span>
                            )
}
                        <div className="right-arrow-container">
                            <div className="fake-arrow"></div>
                        </div>
                    </div>
                </div>
                {this.props.options !== null && (this.state.expandOpts && (<div className="select-option-wrap">
                    {selectOptions}
                </div>))
}
            </div>
        )
    }
}

class InfoInputGrp extends React.Component {
    render() {
        let infoGrp = this.props.infoGrp;
        let infoItems = infoGrp.map((item, index) => {
            let subInfoItems = item.map((item, subIndex) => (<InfoItemInputWrap infoNameCN={item.infoNameCN} key={subIndex} placeholder={item.placeholder} options={item.options || null} value={item.value} itemIndex={[index, subIndex]} handleClick={this.props.handleClick}/>));
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
            selectedTab: 'basicInfo',
            basicInfo: [
                [
                    {
                        infoID: 'name-info',
                        infoNameCN: '姓名',
                        value: '',
                        placeholder: '未实名'
                    }, {
                        infoID: 'indentity-info',
                        infoNameCN: '身份证号',
                        value: '',
                        placeholder: '未实名'
                    }, {
                        infoID: 'credict-card-info',
                        infoNameCN: '信用卡',
                        value: '',
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'city-info',
                        infoNameCN: '所在城市',
                        value: '',
                        options: [],
                        placeholder: '请选择'
                    }, {
                        infoID: 'address-info',
                        infoNameCN: '现居住地',
                        value: '',
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'marriage-info',
                        infoNameCN: '婚姻',
                        value: '',
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
                        value: '',
                        placeholder: '未填写'
                    }, {
                        infoID: 'ec-rel-info',
                        infoNameCN: '联系人关系',
                        value: '',
                        options: [
                            '父母',
                            '配偶',
                            '兄弟姐妹',
                            '同事',
                            '同学',
                            '朋友'
                        ],
                        placeholder: '请选择'
                    }, {
                        infoID: 'ec-mobile-info',
                        infoNameCN: '联系人手机',
                        value: '',
                        placeholder: '请输入'
                    }
                ]
            ],
            workInfo: [
                [
                    {
                        infoID: 'salary-info',
                        infoNameCN: '税后月收入',
                        value: '',
                        options: [
                            '3000元以下', '3001-5000元', '5001-10000元', '10001-20000元', '20000元以上'
                        ],
                        placeholder: '请选择'
                    }, {
                        infoID: 'work-years-info',
                        infoNameCN: '工作年限',
                        value: '1年以下',
                        options: [
                            '1年以下', '1-5年', '6-10年', '10年以上'
                        ],
                        placeholder: '请选择'
                    }
                ]
            ]
        }
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(index, v) {
        let selected = this.state.selectedTab;
        let catInfo = JSON.parse(JSON.stringify(this.state[selected]));
        catInfo[index[0]][index[1]].value = v;
        this.setState({[selected]: catInfo});
    }

    render() {
        let selected = this.state.selectedTab;
        return (
            <div>
                <UserInfoTab selectedTab={selected}/>
                <InfoInputGrp selectedTab={selected} infoGrp={this.state[selected]} handleClick={this.handleInput}/>
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

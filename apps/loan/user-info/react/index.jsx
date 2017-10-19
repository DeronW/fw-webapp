class UserInfoTab extends React.Component {
    render() {
        let tab = [
            {
                "tabName": "basicInfo",
                "tabNameCN": "基本信息"
            }, {
                "tabName": "ecInfo",
                "tabNameCN": "紧急联系人"
            }, {
                "tabName": "workInfo",
                "tabNameCN": "工作信息"
            }
        ];
        let selectedTab = this.props.selectedTab;
        let generate_tabs = (t, index) => {
            let border = "3px solid " + (t.tabName === selectedTab ? "#649cfe" : "transparent");
            return (
                <li key={t.tabName} className="info-tab-item">
                    <span style={{borderBottom: border}} id={t.tabName}>{t.tabNameCN}</span>
                </li>
            )}
        return (
            <ul className="info-tab" onClick={(e) => {
                if (tab.findIndex((t) => e.target.id === t.tabName) === -1) return;
                this.props.handleClick(e.target.id);}
            }>
                { tab.map(generate_tabs) }
            </ul>
        )
    }
}

class CityListWrap extends React.Component {
    componentDidMount() {
        let cityListEl = ReactDOM.findDOMNode(this),
            divisionBarEl = cityListEl.childNodes[1],
            selectLabelEl = cityListEl.previousSibling;
        let labelHeight = parseInt(window.getComputedStyle(selectLabelEl, null).getPropertyValue('height').slice(0, -2)),
            cityListDisplayHeight = window.innerHeight - labelHeight,
            divisionBarHeight = divisionBarEl.clientHeight;
        divisionBarEl.style.top = (cityListDisplayHeight - divisionBarHeight) / 2 + labelHeight + 'px';
    }

    scrollList = (divs, divLetter) => {
        // divs is an array saving the number of cities beginning with a specific num,
        // e.g. [{A: 10}, {B: 20}, ...]
        let cityListEl = ReactDOM.findDOMNode(this);
        let hotCitiesWrapEl = cityListEl.childNodes[0].childNodes[0];
        let devisionHeight = 40,
            optionHeight = 80,
            scrollTop = hotCitiesWrapEl.clientHeight;
        for (var i = 0; i < divs.length; i++) {
            if (divLetter === Object.keys(divs[i])[0]) break;
            scrollTop += devisionHeight + optionHeight * divs[i][Object.keys(divs[i])[0]];
        }
        window.scrollTo(0, scrollTop);
    }

    render() {
        let cityList = this.props.cityList;
        let cityEls = [],
            divisionEls = [],
            divisions = [];
        for (var division in cityList) {
            divisions.push({[division.toUpperCase()]: cityList[division].length});
            divisionEls.push(
                <li key={division} id={`city-division-${division}`}>
                    {division.toUpperCase()}
                </li>
            );
            let cityElsInside = cityList[division].map((c, index) => (
                <div
                  key={c}
                  className="city-option"
                  onClick={(e) => {
                      // if e.target.clientX / e.target.clientWidth > 0.9, assume
                      // that user clicked on division elements to scroll
                      if (e.clientX / e.target.clientWidth > 0.9) {
                          return;
                      }
                      this.props.handleClick(this.props.itemIndex, c);
                  }}>
                  {c}
                  {this.props.value === c && <img className="selected-icon" src="images/selected.png"></img>}
                </div>
            ));
            cityEls.push(
                <div key={division}>
                    <div className="city-division">{division.toUpperCase()}</div>
                    {cityElsInside}
                </div>
            );
        }
        let hotCities_el = (
            <div className="hot-cities-wrap">
                <div className="hot-cities-label">热门城市</div>
                <div className="hot-cities">
                    {HOT_CITIES_LIST.map((city) => (
                        <div
                            key={city}
                            className="hot-city"
                            onClick={(e) => {this.props.handleClick(this.props.itemIndex, e.target.innerHTML);}}>
                            {city}
                        </div>
                    ))}
                </div>
            </div>
        )
        return (
            <div className="city-select-wrap">
                <div className="city-options-wrap">
                    {hotCities_el}
                    {cityEls}
                </div>
                <ul className="city-divisions-wrap" onClick={(e) => {
                  let divisionLetter = e.target.id[e.target.id.length - 1];
                  this.scrollList(divisions, divisionLetter);
                }}>
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
        this.isSelectItem = props.options !== null;
        if (this.isSelectItem) this.state.expandOpts = false;
    }

    toggleExpand = () => {
        this.setState({expandOpts: !this.state.expandOpts});
    }

    render() {
        let infoNameCN = this.props.infoNameCN,
            value = this.props.value;
        let itemDisplayField = this.isSelectItem ?
            (<span
                className="select-label"
                style={{color: value !== null ? '#333' : '#999'}}
                onClick={this.toggleExpand}>
                {value !== null ?
                    (infoNameCN === '所在城市' ? value : this.props.options[value])
                    : this.props.placeholder}
            </span>)
            :
            (<input
                className="info-text-input"
                type={infoNameCN === '联系人手机' ? "tel" : "text"}
                placeholder={this.props.placeholder}
                value={infoNameCN === '身份证号' ? id_mask(value) : value} // mask ID
                disabled={(infoNameCN === '姓名' || infoNameCN === '身份证号') ? true : false} // disable name and ID input
                onChange={(e) => {this.props.handleInput(this.props.itemIndex, e.target.value)}}>
            </input>);
        let selectOptions = [];
        if (this.isSelectItem && infoNameCN !== '所在城市') {
            for (let option in this.props.options) {
                selectOptions.push(
                    <div
                        className="select-option"
                        key={this.props.options[option]}
                        onClick={() => {
                            this.toggleExpand();
                            this.props.handleInput(this.props.itemIndex, option);
                    }}>
                        {this.props.options[option]}
                        {value === option && <img className="selected-icon" src="images/selected.png"></img>}
                    </div>
                );
            }
        }
        let selectOptionsWrap = infoNameCN === '所在城市' ?
            (<div className="city-select-mask">
                <div className="city-select-label">
                    选择城市
                    <img src="images/close.png" onClick={this.toggleExpand}></img>
                </div>
                <CityListWrap
                value={value}
                itemIndex={this.props.itemIndex}
                handleClick={(index, v) => {this.toggleExpand(); this.props.handleInput(index, v);}}
                cityList={this.props.options}/>
            </div>)
            :
            (<div className="select-option-wrap">
                {selectOptions}
            </div>);
        let expandBtn = (
            <div className="right-arrow-container" onClick={this.toggleExpand}>
              <div className="fake-arrow"></div>
            </div>
        );
        return (
            <div className="user-info-item-wrap">
                <div className="input-wrap" id={this.props.infoID}>
                    <span className="info-name">{infoNameCN}</span>
                    <div className="item-display right-align-container">
                        { this.isSelectItem && expandBtn }
                        { itemDisplayField }
                    </div>
                </div>
                { this.state.expandOpts && selectOptionsWrap }
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
        return <div>{infoItems}</div>
    }
}

class SubmitBtn extends React.Component {
    render = () => <div className="submit-btn" onClick={this.props.handleClick}>提交</div>
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
                        value: props.userInfo.realName,
                        placeholder: '未实名'
                    }, {
                        infoID: 'indentity-info',
                        infoNameCN: '身份证号',
                        value: props.userInfo.idCard,
                        placeholder: '未实名'
                    }, {
                        infoID: 'credict-card-info',
                        infoNameCN: '信用卡',
                        value: props.userInfo.creditCard,
                        placeholder: '请填写'
                    }, {
                        infoID: 'email-info',
                        infoNameCN: '邮箱',
                        value: props.userInfo.email,
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'city-info',
                        infoNameCN: '所在城市',
                        value: props.userInfo.city == null ? null : String(props.userInfo.city),
                        options: props.cityList,
                        placeholder: '请选择'
                    }, {
                        infoID: 'address-info',
                        infoNameCN: '现居住地',
                        value: props.userInfo.address,
                        placeholder: '请填写'
                    }
                ],
                [
                    {
                        infoID: 'marriage-info',
                        infoNameCN: '婚姻',
                        value: props.userInfo.homeSituation == null ? null : String(props.userInfo.homeSituation),
                        options: {
                            '1': '未婚',
                            '2': '已婚，无子女',
                            '3': '已婚，有子女'
                        },
                        placeholder: '请选择'
                    }
                ]
            ],
            ecInfo: [
                [
                    {
                        infoID: 'ec-name-info',
                        infoNameCN: '紧急联系人',
                        value: props.userInfo.emContact,
                        placeholder: '未填写'
                    }, {
                        infoID: 'ec-rel-info',
                        infoNameCN: '联系人关系',
                        value: props.userInfo.emRelationship == null ? null : String(props.userInfo.emRelationship),
                        options: {
                            '0': '父母',
                            '1': '配偶',
                            '2': '子女',
                            '3': '兄弟姐妹',
                            '4': '同事',
                            '5': '同学',
                            '6': '朋友'
                        },
                        placeholder: '请选择'
                    }, {
                        infoID: 'ec-mobile-info',
                        infoNameCN: '联系人手机',
                        value: props.userInfo.emMobile,
                        placeholder: '请输入'
                    }
                ]
            ],
            workInfo: [
                [
                    {
                        infoID: 'salary-info',
                        infoNameCN: '税后月收入',
                        value: props.userInfo.income == null ? null : String(props.userInfo.income),
                        options: {
                            '0': '3000元以下',
                            '1': '3000-5000元',
                            '2': '5001-10000元',
                            '3': '10001-20000元',
                            '4': '20000元以上'
                        },
                        placeholder: '请选择'
                    }, {
                        infoID: 'work-years-info',
                        infoNameCN: '工作年限',
                        value: props.userInfo.workExperience == null ? null : String(props.userInfo.workExperience),
                        options: {
                            '0': '1年以下',
                            '1': '1-5年',
                            '2': '6-10年',
                            '3': '10年以上'
                        },
                        placeholder: '请选择'
                    }
                ]
            ]
        }
    }

    switchTab = (tabName) => {
        if (this.state.showSubmitBtn) return $FW.Component.Toast('请先提交当前页信息!');
        this.setState({selectedTab: tabName});
    }

    handleInput = (index, v) => {
        let selected = this.state.selectedTab;
        let catInfo = JSON.parse(JSON.stringify(this.state[selected]));
        catInfo[index[0]][index[1]].value = v;
        this.setState({[selected]: catInfo});
        this.setState({showSubmitBtn: true});
    }

    handleSubmit = () => {
        if (this.state.selectedTab === 'ecInfo') {
            let ecName = this.state.ecInfo[0][0].value,
                ecPhone = this.state.ecInfo[0][2].value;
            if (ecName && ecName.match(/\d/)) return $FW.Component.Toast('联系人姓名不可包含数字!');
            if (ecName && ecName.length < 2) return $FW.Component.Toast('联系人姓名字符长度需在2位以上!');
            if (ecPhone && !isPhoneNum(ecPhone)) return $FW.Component.Toast('联系人手机格式不正确!');
        }
        let submitData = {
            creditCard: this.state.basicInfo[0][2].value,
            email: this.state.basicInfo[0][3].value,
            city: this.state.basicInfo[1][0].value,
            address: this.state.basicInfo[1][1].value,
            homeSituation: this.state.basicInfo[2][0].value,
            emContact: this.state.ecInfo[0][0].value,
            emRelationship: this.state.ecInfo[0][1].value,
            emMobile: this.state.ecInfo[0][2].value,
            income: this.state.workInfo[0][0].value,
            workExperience: this.state.workInfo[0][1].value
        };
        $FXH.Post(`${API_PATH}/api/userBase/v1/saveUserInfo.json`, submitData).then(data => {
            $FW.Component.Toast('信息已提交');
            this.setState({showSubmitBtn: false});
        }, e => $FW.Component.Toast(e.message));
    }

    render() {
        let selected = this.state.selectedTab;
        return (
            <div>
                <UserInfoTab selectedTab={selected} handleClick={this.switchTab}/>
                <InfoInputGrp selectedTab={selected} infoGrp={this.state[selected]} handleInput={this.handleInput} />
                {this.state.showSubmitBtn && <SubmitBtn handleClick={this.handleSubmit}/>}
            </div>
        )
    }
}

const CITYLIST = {
  "A": [
    "安康市", "安庆市", "安顺市", "鞍山市", "安阳市"
  ],
  "B": [
    "白城市",
    "保定市",
    "北海市",
    "北京市",
    "宝鸡市",
    "保山市",
    "白山市",
    "百色市",
    "本溪市",
    "白银市",
    "巴中市",
    "滨州市",
    "郴州市"
  ],
  "C": [
    "长春市",
    "常德市",
    "成都市",
    "承德市",
    "巢湖市",
    "重庆市",
    "长沙市",
    "朝阳市",
    "崇左市",
    "常州市",
    "池州市",
    "沧州市",
    "滁州市",
    "潮州市",
    "长治市"
  ],
  "D": [
    "丹东市",
    "大理市",
    "大连市",
    "大庆市",
    "大同市",
    "东莞市",
    "定西市",
    "东营市",
    "德阳市",
    "德州市",
    "达州市"
  ],
  "E": ["鄂州市"],
  "F": [
    "防城港市",
    "佛山市",
    "抚顺市",
    "阜新市",
    "阜阳市",
    "抚州市",
    "福州市"
  ],
  "G": [
    "广安市",
    "蚌埠市",
    "贵港市",
    "桂林市",
    "肇庆市",
    "广元市",
    "贵阳市",
    "广州市",
    "赣州市"
  ],
  "H": [
    "淮安市",
    "淮北市",
    "鹤壁市",
    "河池市",
    "邯郸市",
    "哈尔滨市",
    "合肥市",
    "鹤岗市",
    "黄冈市",
    "怀化市",
    "黑河市",
    "海口市",
    "葫芦岛市",
    "淮南市",
    "衡水市",
    "黄山市",
    "黄石市",
    "河源市",
    "衡阳市",
    "亳州市",
    "惠州市",
    "杭州市",
    "汉中市",
    "湖州市",
    "菏泽市",
    "贺州市"
  ],
  "J": [
    "吉安市",
    "晋城市",
    "金昌市",
    "景德镇市",
    "金华市",
    "九江市",
    "吉林市",
    "佳木斯市",
    "江门市",
    "荆门市",
    "济南市",
    "济宁市",
    "酒泉市",
    "嘉兴市",
    "鸡西市",
    "嘉峪关市",
    "揭阳市",
    "晋中市",
    "焦作市",
    "荆州市",
    "锦州市"
  ],
  "K": [
    "开封市", "昆明市"
  ],
  "L": [
    "六安市",
    "来宾市",
    "临沧市",
    "聊城市",
    "娄底市",
    "临汾市",
    "廊坊市",
    "莱芜市",
    "漯河市",
    "丽江市",
    "吕梁市",
    "陇南市",
    "六盘水市",
    "丽水市",
    "乐山市",
    "临沂市",
    "连云港市",
    "洛阳市",
    "辽源市",
    "辽阳市",
    "龙岩市",
    "兰州市",
    "柳州市",
    "泸州市"
  ],
  "M": [
    "马鞍山市",
    "牡丹江市",
    "茂名市",
    "眉山市",
    "绵阳市",
    "梅州市"
  ],
  "N": [
    "宁波市",
    "南充市",
    "南昌市",
    "宁德市",
    "内江市",
    "南京市",
    "南宁市",
    "南平市",
    "南通市",
    "南阳市"
  ],
  "P": [
    "平顶山市",
    "普洱市",
    "盘锦市",
    "平凉市",
    "莆田市",
    "萍乡市",
    "濮阳市",
    "攀枝花市"
  ],
  "Q": [
    "青岛市",
    "秦皇岛市",
    "曲靖市",
    "齐齐哈尔市",
    "七台河市",
    "庆阳市",
    "清远市",
    "泉州市",
    "衢州市",
    "钦州市"
  ],
  "R": ["日照市"],
  "S": [
    "韶关市",
    "上海市",
    "绥化市",
    "石家庄市",
    "商洛市",
    "三门峡市",
    "三明市",
    "遂宁市",
    "四平市",
    "商丘市",
    "宿迁市",
    "上饶市",
    "汕头市",
    "汕尾市",
    "绍兴市",
    "双鸭山市",
    "十堰市",
    "松原市",
    "沈阳市",
    "邵阳市",
    "宿州市",
    "朔州市",
    "深圳市",
    "苏州市",
    "随州市"
  ],
  "T": [
    "泰安市",
    "铜川市",
    "通化市",
    "天津市",
    "铁岭市",
    "铜陵市",
    "唐山市",
    "天水市",
    "太原市",
    "台州市",
    "泰州市"
  ],
  "W": [
    "潍坊市",
    "威海市",
    "武汉市",
    "芜湖市",
    "渭南市",
    "武威市",
    "无锡市",
    "梧州市",
    "温州市"
  ],
  "X": [
    "西安市",
    "宣城市",
    "许昌市",
    "襄樊市",
    "孝感市",
    "厦门市",
    "咸宁市",
    "湘潭市",
    "邢台市",
    "新乡市",
    "信阳市",
    "咸阳市",
    "新余市",
    "徐州市",
    "忻州市"
  ],
  "Y": [
    "延安市",
    "雅安市",
    "宜宾市",
    "伊春市",
    "宜昌市",
    "宜春市",
    "盐城市",
    "运城市",
    "云浮市",
    "阳江市",
    "营口市",
    "榆林市",
    "玉林市",
    "阳泉市",
    "烟台市",
    "鹰潭市",
    "玉溪市",
    "岳阳市",
    "益阳市",
    "扬州市",
    "永州市"
  ],
  "Z": [
    "淄博市",
    "自贡市",
    "珠海市",
    "张家界市",
    "张家口市",
    "湛江市",
    "镇江市",
    "周口市",
    "驻马店市",
    "舟山市",
    "昭通市",
    "张掖市",
    "资阳市",
    "遵义市",
    "中山市",
    "枣庄市",
    "株洲市",
    "漳州市",
    "郑州市"
  ]
};

const HOT_CITIES_LIST = ["北京市", "上海市", "广州市", "深圳市", "杭州市"];

var id_mask = n => String(n).replace(/(\d{4})\d{10}(\d{4})/, "$1**********$2");
var isPhoneNum = str => /^1[3|4|5|7|8]\d{9}$/.test(String(str));

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(
        <Header title="个人信息"/>, HEADER_NODE);
    $FXH.Post(`${API_PATH}/api/userBase/v1/userInfoItem.json`).then(data => {
        ReactDOM.render(<UserInfoWrap userInfo={data} cityList={CITYLIST}/>, CONTENT_NODE);
    }, e => $FW.Component.Toast(e.message));
})
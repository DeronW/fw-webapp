class AvatarCard extends React.Component {
    render() {
        let avatarSrc = this.props.src || 'images/avatar_default.png';
        return (
            <div className="avator-card">
                <div className="avatar-container">
                    <img src={avatarSrc} alt="user avatar"/>
                </div>
                <div className="masked-phone-num">
                    {this.props.phoneNum}
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
                    <div className="next-icon-container" onClick={() => {
                        window.location.href = '/static/loan/user-weixin/index.html';
                    }}>
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
            <li className="bill-type" onClick={this.props.handleClick}>
                <img src={this.props.src}></img>
                <span>{this.props.billType}</span>
            </li>
        )
    }
}

class BillEntry extends React.Component {
    render() {
        let billTypesObj = [
            {
                typeNameCN: '申请中',
                iconImg: 'images/bill_applying_icon.png',
                jumpLink: '/static/loan/bill/index.html#1'
            }, {
                typeNameCN: '还款中',
                iconImg: 'images/bill_onloan_icon.png',
                jumpLink: '/static/loan/bill/index.html#2'
            }, {
                typeNameCN: '未通过',
                iconImg: 'images/bill_refused_icon.png',
                jumpLink: '/static/loan/bill/index.html#3'
            }, {
                typeNameCN: '已还款',
                iconImg: 'images/bill_finished_icon.png',
                jumpLink: '/static/loan/bill/index.html#4'
            }
        ];
        let billType = billTypesObj.map((type, index) => (<BillType billType={type.typeNameCN} src={type.iconImg} key={type.typeNameCN} handleClick={() => {
            window.location.href = type.jumpLink
        }}/>));
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
    constructor() {
        super();
        this.handleJump = this.handleJump.bind(this);
    }

    handleJump(infoID) {
        const USER = $FW.Store.getUserDict();
        $FW.Post(`${API_PATH}/api/loan/v1/baseinfo.json`, {
            sourceType: SOURCE_TYPE,
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            productId: 1
        }).then(data => {
            switch (data.borrowBtnStatus) {
                case 1: // 未实名
                    window.location.href = '/static/loan/user-card-set/index.html';
                    break;
                case 101: // 实名中
                    $FW.Component.Toast('设置提现卡处理中，请稍等');
                    break;
                default:
                    if (infoID === 'personal-info') {
                        window.location.href = '/static/loan/user-info/index.html';
                    }
                    if (infoID === 'card-info') {
                        window.location.href = '/static/loan/user-card-management/index.html';
                    }
            }
        })
    }

    render() {
        return (
            <div className="user-info-display-wrap" id={this.props.infoID} onClick={() => {
                this.handleJump(this.props.infoID)
            }}>
                {this.props.iconSrc !== null && <div className="info-icon-container">
                    <img src={this.props.iconSrc}></img>
                </div>}
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

        let infoItems = majorInfo.map((item, index) => (<UserInfoEnterWrap iconSrc={item.iconSrc} infoID={item.infoID} infoNameCN={item.infoNameCN} key={index}/>));
        return (
            <div className="info-display-block">
                {infoItems}
            </div>
        )
    }
}

class ExitBtn extends React.Component {
  constructor() {
    super();
    this.state = {showPop: false};
  }

  logoutHandler() {
      $FW.Store.clear();
      location.href = '/static/loan/user-entry/index.html';
  }

  render() {
    return (
      <div>
        <div className="more-btn">
          <div className="ui-btn" onClick={() => {this.setState({showPop: true})}}>退出登录</div>
        </div>
        {this.state.showPop &&
          <div className="mask" style={{ zIndex: 100 }}>
              <div className="pop">
                  <div className="pop-title">退出登录</div>
                  <div className="pop-close" onClick={() => {this.setState({showPop: false})}}></div>
                  <div className="pop-content">确定退出登录当前账号？</div>
                  <div className="pop-btnlist">
                      <span className="pop-cancel" onClick={() => {this.setState({showPop: false})}}>取消</span>
                      <span className="pop-confirm" onClick={this.logoutHandler}>确认</span>
                  </div>
              </div>
          </div>
        }
      </div>
    )
  }
}

class UserInfoWrap extends React.Component {
    constructor() {
        super();
        this.state = {
            phoneNum: null
        };
    }

    componentDidMount = () => {
        $FXH.Post(`${API_PATH}/api/userBase/v1/userCenter.json`).then(data => {
            this.setState({phoneNum: data.mobile});
        }, e => {$FW.Component.Toast(e.message)});
    }

    render() {
        return (
            <div className="user-info-wrap">
                <AvatarCard phoneNum={this.state.phoneNum}/>
                {/* <FollowWXEntry/> */}
                <BillEntry/>
                <MajorUserInfo/>
                <ExitBtn/>
            </div>
        )
    }
}

const USER = $FW.Store.getUserDict();
console.log(`token: ${USER.token}, userGid: ${USER.gid}, userId: ${USER.id}, uid: ${USER.uid}, sourceType: ${SOURCE_TYPE}`);

// render ReactDom
$FW.DOMReady(() => {
    ReactDOM.render(<BottomNavBar/>, BOTTOM_NAV_NODE);
        ReactDOM.render( <UserInfoWrap />, CONTENT_NODE)
})

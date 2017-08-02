class AvatarCard extends React.Component {
    render() {
        let avatarSrc = this.props.src || 'images/avatar_default.png';
        return (
            <div className="avator-card">
                <div className="avatar-container">
                    <img src={avatarSrc} alt="user avatar" />
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
        }} />));
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


class MajorUserInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            link_a: null,
            link_b: null,
            link_c: '/static/loan/bill/index.html#2',
            link_d: null,
            tips: null
        }
    }
    componentDidMount() {
        let link_a, link_b, link_d;
        $FXH.Post(`${API_PATH}/api/loan/v1/baseinfo.json`, {
            productId: 1
        }).then(data => {
            let st = data.borrowBtnStatus,
                link_a = '/static/loan/user-info/index.html'
                link_b = '/static/loan/account/index.html#/bank-card'
                link_d = '/static/loan/account/index.html#/redbag'
            if (st === 1) { // 未实名
                link_a = link_b = link_d = '/static/loan/user-card-set/index.html'
            }
            this.setState({
                link_a: link_a,
                link_b: link_b,
                link_d: link_d,
                tips: st === 101 ? '设置提现卡处理中，请稍等' : false, // 实名中
            })
        })
    }
    clickHandler = () => {
        let { tips } = this.state
        tips && $FW.Component.Toast(tips)
    }
    render() {
        let { link_a, link_b, link_c, link_d } = this.state
        return <div className="info-display-block">
            <a className="user-info-display-wrap" onClick={this.clickHandler}
                href={link_a}>
                <div className="info-icon-container">
                    <img src="images/info_icon.png"></img>
                </div>
                <span className="info-name">个人信息</span>
                <div className="right-align-container">
                    <div className="right-arrow-container">
                        <div className="fake-arrow"></div>
                    </div>
                </div>
            </a>
            <a className="user-info-display-wrap" onClick={this.clickHandler}
               href={link_c}>
                <div className="info-icon-container">
                    <img src="images/more_repayment.png"></img>
                </div>
                <span className="info-name">借款订单</span>
                <div className="right-align-container">
                    <div className="right-arrow-container">
                        <div className="fake-arrow"></div>
                    </div>
                </div>
            </a>
            <a className="user-info-display-wrap" onClick={this.clickHandler}
                href={link_b}>
                <div className="info-icon-container">
                    <img src="images/bank_icon.png"></img>
                </div>
                <span className="info-name">银行卡</span>
                <div className="right-align-container">
                    <div className="right-arrow-container">
                        <div className="fake-arrow"></div>
                    </div>
                </div>
            </a>
            <a className="user-info-display-wrap" onClick={this.clickHandler}
               href={link_d}>
                <div className="info-icon-container">
                    <img src="images/packet_icon.png"></img>
                </div>
                <span className="info-name">红包</span>
                <div className="right-align-container">
                    <div className="right-arrow-container">
                        <div className="fake-arrow"></div>
                    </div>
                </div>
            </a>
            <a className="user-info-display-wrap" href="/static/loan/features/#/more" >
                <div className="info-icon-container">
                    <img src="images/more_icon.png"></img>
                </div>
                <span className="info-name">更多</span>
                <div className="right-align-container">
                    <div className="right-arrow-container">
                        <div className="fake-arrow"></div>
                    </div>
                </div>
            </a>
        </div>

    }
}

class ExitBtn extends React.Component {
    constructor() {
        super();
        this.state = { showPop: false };
    }

    logoutHandler() {
        $FW.Store.clear();
        location.href = '/static/loan/account/index.html#/entry';
    }

    render() {
        return (
            <div>
                <div className="more-btn">
                    <div className="ui-btn" onClick={() => { this.setState({ showPop: true }) }}>退出登录</div>
                </div>
                {this.state.showPop &&
                    <div className="mask" style={{ zIndex: 100 }}>
                        <div className="pop">
                            <div className="pop-title">退出登录</div>
                            <div className="pop-close" onClick={() => { this.setState({ showPop: false }) }}></div>
                            <div className="pop-content">确定退出登录当前账号？</div>
                            <div className="pop-btnlist">
                                <span className="pop-cancel" onClick={() => { this.setState({ showPop: false }) }}>取消</span>
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

    componentDidMount(){
        $FXH.Post(`${API_PATH}/api/userBase/v1/userCenter.json`).then(data => {
            this.setState({ phoneNum: data.mobile });
        });
    }

    render() {
        return (
            <div className="user-info-wrap">
                <AvatarCard phoneNum={this.state.phoneNum} />
                {$FW.Browser.inJRGCApp() && <FollowWXEntry />}
                <MajorUserInfo />
                {/* <ExitBtn /> */}
            </div>
        )
    }
}

$FW.DOMReady(() => {
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
    ReactDOM.render(<UserInfoWrap />, CONTENT_NODE)
})

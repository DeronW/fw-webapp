import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/loan.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { BrowserFactory } from 'fw-javascripts'

import Nav from './components/nav'
import BottomNavBar from './components/bottom-nav-bar'


function AvatarCard (props) {
    return (
        <div className="avator-card">
            <div className="avatar-container">
                <img src={props.src || 'images/avatar_default.png'} alt="user avatar" />
            </div>
            <div className="masked-phone-num">
                {this.props.phoneNum}
            </div>
        </div>
    )
}

function FollowWXEntry () {
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

function BillType (props) {
    return (
        <li className="bill-type" onClick={props.handleClick}>
            <img src={props.src}></img>
            <span>{props.billType}</span>
        </li>
    )
}

function BillEntry () {
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
    let generate_billType = (type, index) => (
        <BillType billType={type.typeNameCN} src={type.iconImg} key={type.typeNameCN} handleClick={() => { window.location.href = type.jumpLink }} />)
    );
    return (
        <div className="bill-entry-wrap">
            <div className="bill-label">账单</div>
            <div className="bill-type-wrap">
                <ul>{billTypesObj.map(generate_billType)}</ul>
            </div>
        </div>
    )
}


class MajorUserInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            link_a: null,
            link_b: null,
            tips: null
        }
    }
    componentDidMount() {
        let link_a, link_b
        $FXH.Post(`${API_PATH}/api/loan/v1/baseinfo.json`, {
            productId: 1
        }).then(data => {
            let st = data.borrowBtnStatus,
                link_a = '/static/loan/user-info/index.html',
                link_b = '/static/loan/user-card-management/index.html';

            if (st === 1) { // 未实名
                link_a = link_b = '/static/loan/user-card-set/index.html'
            }
            this.setState({
                link_a: link_a,
                link_b: link_b,
                tips: st === 101 ? '设置提现卡处理中，请稍等' : false, // 实名中
            })
        })
    }
    clickHandler = () => {
        let { tips } = this.state
        tips && $FW.Component.Toast(tips)
    }
    render() {
        let { link_a, link_b } = this.state
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
            <a className="user-info-display-wrap" href="/static/loan/more/index.html">
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
        location.href = '/static/loan/user-entry/index.html';
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

    componentDidMount = () => {
        $FXH.Post(`${API_PATH}/api/userBase/v1/userCenter.json`).then(data => {
            this.setState({ phoneNum: data.mobile });
        });
    }

    render() {
        return (
            <div className="user-info-wrap">
                <AvatarCard phoneNum={this.state.phoneNum} />
                {$FW.Browser.inApp() && <FollowWXEntry />}
                <BillEntry />
                <MajorUserInfo />
                {/* <ExitBtn /> */}
            </div>
        )
    }
}

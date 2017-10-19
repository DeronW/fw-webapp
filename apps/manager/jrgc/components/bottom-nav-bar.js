import React from 'react'

let isActiveTab = (tab) => {
    let pt = location.pathname, hash = location.hash, cnd = false;

    if (tab == 'user' && hash == '#/')
        cnd = true;

    if (tab == 'investor' && hash == '#/investor')
        cnd = true;

    if (tab == 'stats' && hash == '#/stats')
        cnd = true;

    return cnd
}
let tabColor = (keyword) => {
    let cnd = isActiveTab(keyword);
    return {
        color: cnd ? "#9b5b54" : "#999"
    }
}
function getStyle(tab) {
    let style = {}

    const STYLE_TAB_BASE = {
        width: "33.33%",
        display: "block",
        float: "left",
        textAlign: "center",
        fontSize: "22px"
    }
    const STYLE_ICON_BASE = {
        height: "50px",
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        margin: "14px 0 2px"
    }

    if (tab == 'fixed_panel') {
        style = {
            width: "720px",
            height: "94px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "-1px",
            background: "#fff",
            zIndex: "100",
            paddingBottom: "6px",
            boxShadow: "0 0 25px 5px rgba(0, 0, 0, 0.06)"
        }
    }
    if (tab == 'tab_user')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('user'))

    if (tab == 'tab_investor')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('investor'))

    if (tab == 'tab_stats')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('stats'))

    return style
}

class BottomNavBar extends React.Component {
    render() {
        // let { history } = this.props

        let link_handler = tab => {
            if (isActiveTab(tab)) return;

            if (tab == 'user') {
                location.href = '/static/manager/jrgc/index.html#/'
            }
            if (tab == 'investor') {
                location.href = '/static/manager/jrgc/index.html#/investor'
            }
            if (tab == 'stats') {
                location.href = '/static/manager/jrgc/index.html#/stats'
            }
        }
        const STYLE_ICON_BASE = {
            marginTop: '4px'
        }

        let icon_user = isActiveTab("user") ?
            require("../images/components/bottom-nav-bar/user.gif") :
            require("../images/components/bottom-nav-bar/user.png")

        let icon_investor = isActiveTab("investor") ?
            require("../images/components/bottom-nav-bar/investor.gif") :
            require("../images/components/bottom-nav-bar/investor.png")

        let icon_stats = isActiveTab("stats") ?
            require("../images/components/bottom-nav-bar/stats.gif") :
            require("../images/components/bottom-nav-bar/stats.png")

        return <div style={{ height: "100px" }}>
            <div style={getStyle('fixed_panel')}>
                <a style={getStyle('tab_user')} onClick={() => link_handler('user')}>
                    <img src={icon_user} style={STYLE_ICON_BASE} /><div>我的</div>
                </a>
                <a style={getStyle('tab_investor')} onClick={() => link_handler('investor')}>
                    <img src={icon_investor} style={STYLE_ICON_BASE} /><div>客户</div>
                </a>
                <a style={getStyle('tab_stats')} onClick={() => link_handler('stats')}>
                    <img src={icon_stats} style={STYLE_ICON_BASE} /><div>业绩</div>
                </a>
            </div>
        </div>
    }
}

export default BottomNavBar
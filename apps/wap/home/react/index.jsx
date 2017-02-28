/*
 通过hash来判断当前页面处于哪种状态
 #home 首页
 #invest-new 投资页面 - 新项目
 #invest-transfer 投资页面 - 债权转让
 默认是首页
 */

const Content = React.createClass({

    getInitialState: function () {
        let hash = location.hash, tab;
        if (hash == '' || hash == '#home') {
            tab = 'home'
        } else {
            tab = hash
        }
        return { tab: tab }
    },

    componentDidMount: function () {
    },

    switchHomePanel: function () {
        if (this.state.tab == 'home') return;
        history.pushState({}, '', `${location.pathname}#home`);
        this.setState({ tab: 'home' });
    },

    switchInvestPanel: function (invest_type = 'new') {
        history.pushState({}, '', `${location.pathname}#invest-${invest_type}`);
        this.setState({ tab: `invest-${invest_type}` });
    },

    render: function () {

        let panel = this.state.tab == 'home' ?
            <HomePanel switchInvestPanel={this.switchInvestPanel} /> :
            <InvestPanel />;

        return (
            <div>
                <div className="status-bar">
                    <div className="status-bar-fixed">
                        <div className="top">
                            <img src="./images/ico-logo.png" />
                            <a className="d" href="/mpwap/orderuser/toLogin.shtml">登录</a>
                            <div className="v-line"></div>
                            <a className="z" href={location.protocol + "//m.9888.cn:80/mpwap/orderuser/toRegister.shtml?source=0"}>注册</a>
                            <div className="v-line"></div>
                            <a className="x" href="/static/wap/app-download/index.html">下载APP</a>
                        </div>

                        <div className="nav">
                            <a className={this.state.tab == 'home' && 'active'}
                                onClick={this.switchHomePanel}>首页</a>
                            <a className={this.state.tab != 'home' && 'active'}
                                onClick={() => this.switchInvestPanel('new')}>投资</a>
                            <a href="https://mmall.9888.cn">豆哥商城</a>
                            <a className="user-center has-unread-msg" href="/mpwap/orderuser/getUserInfo.shtml">
                                <div className="red-dot"></div>
                                个人中心
                            </a>
                        </div>
                    </div>
                </div>
                {panel}
            </div>
        )
    }
});


$FW.DOMReady(function () {
    ReactDOM.render(<Content />, CONTENT_NODE);
});

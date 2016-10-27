const StatusBar = React.createClass({
    getInitialState: function () {
        return {tab: 'home'}
    },

    componentDidMount: function () {
        this.checkHash();
        window.addEventListener('hashchange', this.checkHash)
    },

    checkHash: function () {
        console.log(location.hash == '#home');
        this.setState({tab: location.hash == '#home' ? 'home' : 'invest'})
    },

    homeLink: function () {
        history.pushState({}, '', '/#home')
    },
    investLink: function () {
        history.pushState({}, '', '/#invest')
    },

    render: function () {
        return (
            <div className="status-bar">
                <div className="status-bar-fixed">
                    <div className="top">
                        <img src="./images/ico-logo.png"/>
                        <a className="d" href="/mpwap/orderuser/toLogin.shtml">登录</a>
                        <div className="v-line"></div>
                        <a className="z" href="http://m.9888.cn:80/mpwap/orderuser/toRegister.shtml?source=0">注册</a>
                        <div className="v-line"></div>
                        <a className="x" href="/static/wap/app-download/index.html">下载APP</a>
                    </div>

                    <div className="nav">
                        <a className={this.state.tab == 'home' ? 'active' : null} onClick={this.homeLink}>首页</a>
                        <a className={this.state.tab == 'invest' ? 'active' : null} onClick={this.investLink}>投资</a>
                        <a href="http://mmall.9888.cn">豆哥商城</a>
                        <a className="user-center has-unread-msg" href="/mpwap/orderuser/getUserInfo.shtml">
                            <div className="red-dot"></div>
                            个人中心</a>
                    </div>
                </div>
            </div>
        )
    }
});
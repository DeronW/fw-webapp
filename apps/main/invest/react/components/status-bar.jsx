const StatusBar = React.createClass({
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
                        <a href="/">首页</a>
                        <a className="active">投资</a>
                        <a href="http://mmall.9888.cn">豆哥商城</a>
                        <a className="red-dot" href="/mpwap/orderuser/getUserInfo.shtml">个人中心</a>
                    </div>
                </div>
            </div>
        )
    }
});
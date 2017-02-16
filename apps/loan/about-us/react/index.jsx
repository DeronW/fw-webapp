function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) === 'micromessenger'
}

const UserAboutus = React.createClass({
    getInitialState() {
        return {

        }
    },
    render() {
        return (
            <div>
                <div className="user-about-us-cnt">
                    <img src="images/logo.png"/>
                    <div className="app-intro">
                        放心花是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股的金融工场放心花是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股的金融工场放心花是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股的金融工场放心花是由香港上市公司——中国信
                    </div>
                </div>
                <div className="about-us-list">
                    <div className="li">
                        <div className="l">
                            <span className="icon"></span>
                            <span className="text">微信公众号</span>
                        </div>
                        <div className="r">
                            <span className="icon"></span>
                            <span className="text">124124</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"关于我们"} />, HEADER_NODE);
    ReactDOM.render(<UserAboutus />, CONTENT_NODE);
})

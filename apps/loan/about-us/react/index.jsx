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
                        放心花是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股的金融工场全新推出的基于移动端的现金借贷平台，主要为用户提供短期的小额急借的现金借贷服务。用户通过授信认证获得授信额度，在额度内随时可进行借款，借款额度在500元-10000元之间。操作简单、方便快速、实时秒到账，做年轻人专属的手机钱包。
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
                            <span className="text">fxhuaba</span>
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

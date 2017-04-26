
class UserAboutus extends React.Component {
    render() {
        return (
            <div>
                <div className="user-about-us-cnt">
                    <img src="images/logo.png" />
                    <div className="app-intro">
                        放心花是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股的金融工场全新推出的基于移动端的线上贷款信息聚合平台，对接多家主流平台，满足您的各类贷款需求。
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
}

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"关于我们"} />, HEADER_NODE);
    ReactDOM.render(<UserAboutus />, CONTENT_NODE);
})

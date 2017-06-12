
class UserAboutus extends React.Component {
    render() {
        return (
            <div>
                <div className="user-about-us-cnt">
                    <img src="images/logo.png" />
                    <div className="app-intro">
                        放心花是由深圳市众利财富管理有限公司推出的基于移动端线上贷款信息聚合平台，对接多家主流平台，满足您的各类贷款需求。
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

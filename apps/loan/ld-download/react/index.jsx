class Download extends React.Component {
    render() {
        return (
            <div>
                <p className="text-area">审核专员预计在1个工作日内联系您</p>

                <div className="download-area">
                    <p className="text">关注服务号或下载APP借款更方便</p>
                    <div className="btn-area">
                        <div className="btn android-btn">
                            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ucf.jrgc.cfinance">
                                <img src="images/android-icon.png" />    
                                iOS版下载
                            </a>
                            
                        </div>
                        <div className="btn apple-btn">
                            <a href="https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8">
                                <img src="images/apple-icon.png" />
                                Andorid版下载
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

$FW.DOMReady(function () {
    ReactDOM.render(<Download />, CONTENT_NODE)
});
class WeixinCon extends React.Component {
    copyHandler = () => {
        NativeBridge.clipboard("fxhuaba")
    }
    saveHandler = () => {
        NativeBridge.trigger("save_fxh_qrcode")
    }
    clickHandler = () => {
        if($FW.Browser.inIOS()){
            window.location.href = 'https://itunes.apple.com/cn/app/%E6%94%BE%E5%BF%83%E8%8A%B1-%E6%8E%8C%E4%B8%8A%E5%B0%8F%E9%A2%9D%E7%8E%B0%E9%87%91%E5%80%9F%E6%AC%BE/id1208062782?mt=8'
        }
        if($FW.Browser.inAndroid()){
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ucf.jrgc.cfinance'
        }
    }
    render() {
        return (
            <div className="content-wrap">
                <div className="p1"><img src="images/icon1.jpg"/>关注了微信之后有什么好处</div>
                <div className="p2-wrap">
                    <div className="p2">1.获得更高授信额度</div>
                    <div className="p2">2.实时查看还款计划，避免逾期</div>
                    <div className="p2">3.将放心花分享给好友</div>
                </div>
                <div className="p1"><img src="images/icon2.jpg"/>如何关注我们</div>
                <div className="p2-wrap">
                    <div className="p2">1、您可以扫描二维码关注我们</div>
                    <div className="p3">长按下图二维码保存到相册>打开微信>扫一扫> 关注放心花公众号</div>
                    <img src="images/qr.jpg" className="qr" onClick={this.saveHandler} />
                    <div className="p2">2、或您可直接打开微信>添加朋友</div>
                    <div className="p3">搜索“fxhuaba”公众号<span className="copy-qr" onClick={this.copyHandler}>点击复制公众号</span></div>
                    <div className="p2 p4">3、点击此处<a onClick={this.clickHandler}>下载APP</a></div>
                </div>
            </div>
        )
    }
}

$FW.DOMReady(() => {
    NativeBridge.setTitle('关注微信');
    ReactDOM.render(<Header title={"关注微信"} />, HEADER_NODE);
    // var clipboard = new Clipboard('.copy-qr');
    // //alert(Clipboard.isSupported());
    // clipboard.on('success', function (e) {
    //     $FW.Component.Toast('已复制fxhuaba到剪切板');
    //     e.clearSelection();
    // });
    // clipboard.on('error', function (e) {
    //     $FW.Component.Toast('请选择“拷贝”进行复制!');
    // });
    ReactDOM.render(<WeixinCon />, CONTENT_NODE);
})

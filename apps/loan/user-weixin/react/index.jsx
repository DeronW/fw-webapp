const WeixinCon = React.createClass({
    componentDidMount() {
        var clipboard = new Clipboard('.copy-qr');
        clipboard.on('success', function (e) {
            $FW.Component.Toast('复制成功')
            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
    },
    render() {
        return (
            <div className="content-wrap">
                <div className="p1">关注了微信之后有什么好处</div>
                <div className="p2-wrap">
                    <div className="p2">1.获得更高授信额度</div>
                    <div className="p2">2.实时查看还款计划，避免逾期</div>
                    <div className="p2">3.将放心花分享给好友</div>
                </div>
                <div className="p1">如何关注我们</div>
                <div className="p2-wrap">
                    <div className="p2">1、您可以扫描二维码关注我们</div>
                    <div className="p3">长按下图二维码保存到相册>打开微信>扫一扫> 关注放心花公众号</div>
                    <img src="images/qr.jpg" className="qr" />
                    <div className="p2">2、打开微信>添加朋友</div>
                    <div className="p3">搜索“fxhuaba”公众号<span className="copy-qr" data-clipboard-text="fxhuaba">点击复制公众号</span></div>
                    <div className="p2 p4">3、点击此处<a href="/static/loan/weixin-download/index.html">下载APP</a></div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"关注微信"} />, HEADER_NODE);
    ReactDOM.render(<WeixinCon />, CONTENT_NODE);
})

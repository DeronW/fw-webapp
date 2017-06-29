function gotoHandler(link) {
    location.href = encodeURI(link);
}

class LoanResult extends React.Component{
    render() {
    return (
        <div className="loan-result">
            {$FW.Browser.inAndroid() &&
            <div className="header">
                <div className="arrow-left" onClick={() => { $FW.Browser.inJRGCApp() ? NativeBridge.close() : gotoHandler("/static/loan/home/index.html") }}></div>
                <div className="title">借款结果</div>
            </div>
            }
            <div className="waiting-result-box">
                <div className="wrap-box">
                    <div className="success-icon"><img src="images/success-icon.png" /></div>
                    <div className="loan-result1">
                        <div className="icon1"></div>
                        <div className="icon1-info">提现请求成功，等待银行处理</div>
                        <div className="time1">6-24 17:51</div>
                        <div className="line"></div>
                        <div className="waiting-result">
                            <div className="icon2"></div>
                            <div className="icon2-info">预计到账时间</div>
                            <div className="time2">6-24 17:51</div>
                        </div>
                    </div>
                </div>
                <div className="btn-wrap">
                    <div className="credit-btn" onClick={()=>{$FW.Browser.inJRGCApp()? NativeBridge.close():gotoHandler('/static/loan/home/index.html')}}>关闭</div>
                </div>
            </div>
            <div className="fail-result-box dis">
                <div className="wrap-box">
                    <div className="fail-icon"><img src="images/fail-icon.png"/></div>
                    <div className="loan-result4">
                        <div className="waiting-result">
                            <div className="icon5"></div>
                            <div className="icon5-info">提现失败</div>
                            <div className="icon5-info-btm">系统繁忙，请稍候再试</div>
                        </div>
                    </div>
                </div>
                <div className="customer-service">
                    <div className="service-wrap"><img src="images/phone.png" />如有问题请致电：<a
                        href="tel:400-102-0066">400-102-0066</a></div>
                </div>
            </div>


        </div>
    )
}
}

const USER = $FW.Store.getUserDict();
$FW.DOMReady(function () {
    $FW.Browser.inAndroid() && NativeBridge.hideHeader();
    $FW.Browser.inIOS() && NativeBridge.setTitle('提现结果');
    ReactDOM.render(<Header title={'提现结果'} />, HEADER_NODE)
    ReactDOM.render(<LoanResult/>, CONTENT_NODE);

});

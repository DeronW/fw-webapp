function gotoHandler(link) {
    location.href = encodeURI(link);
}

class LoanResult extends React.Component{
    render() {
    return (
        <div className={$FW.Browser.inWeixin()?"loan-result-weixin":"loan-result"}>
            {$FW.Format.urlQuery().applyTimeStr && <div className="waiting-result-box">
                <div className="wrap-box">
                    <div className="success-icon"><img src="images/success-icon.png" /></div>
                    <div className="loan-result1">
                        <div className="icon1"></div>
                        <div className="icon1-info">提现请求成功，等待银行处理</div>
                        <div className="time1">{$FW.Format.urlQuery().applyTimeStr}</div>
                        <div className="line"></div>
                        <div className="waiting-result">
                            <div className="icon2"></div>
                            <div className="icon2-info">预计到账时间</div>
                            <div className="time2">{$FW.Format.urlQuery().preAccountTimeStr}</div>
                        </div>
                    </div>
                </div>
                <div className="btn-wrap">
                    <div className="credit-btn" onClick={()=>{gotoHandler('/static/loan/user-red-packet/index.html')}}>关闭</div>
                </div>
            </div>}
            {$FW.Format.urlQuery().error && <div className="fail-result-box">
                <div className="wrap-box">
                    <div className="fail-icon"><img src="images/fail-icon.png"/></div>
                    <div className="loan-result4">
                        <div className="waiting-result">
                            <div className="icon5"></div>
                            <div className="icon5-info">提现失败</div>
                            <div className="icon5-info-btm">{$FW.Format.urlQuery().error}</div>
                        </div>
                    </div>
                </div>
                <div className="customer-service">
                    <div className="service-wrap"><img src="images/phone.png" />如有问题请致电：<a
                        href="tel:400-102-0066">400-102-0066</a></div>
                </div>
            </div>}
        </div>
    )
}
}

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'提现结果'} />, HEADER_NODE)
    ReactDOM.render(<LoanResult/>, CONTENT_NODE);

});

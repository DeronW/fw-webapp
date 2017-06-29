class Redpacket extends React.Component{
    render(){
        return (
            <div className="red-packet-wrapper">
                 <div className="header">
                     <div className="arrow"></div>红包账户<a className="details-entry">红包明细</a>
                 </div>
                 <div className="red-packet-area">
                     <div className="packet-title">可提现(元)</div>
                     <div className="packet-num">10000</div>
                     <div className="packet-frozen">冻结(元)：15</div>
                 </div>
                 <div className="withdraw-card">
                     <div className="card-title">银行卡</div>
                     <div className="card-branch">农行尾号(2333)</div>
                 </div>
                 <div className="withdraw-btn">提现</div>
                 <div className="packet-tips">
                     <div className="packet-tips-title">温馨提示</div>
                     <div className="packet-rule">单笔提现金额不低于50元，单日提现次数不超过3次；</div>
                     <div className="packet-rule">7*24小时可以提现；</div>
                     <div className="packet-rule">提现后1-3个工作日到账；</div>
                     <div className="packet-rule">若有问题，请咨询400-102-0066。</div>
                 </div>


            </div>
        )
    }

}

function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inFXHApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

$FW.DOMReady(() => {
    ReactDOM.render(<Redpacket />, CONTENT_NODE)
})
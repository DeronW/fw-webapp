const BankList = React.createClass({
    render:function(){
        return (
            <div>
                <div className="banklist">
                    <div className="bank-branch">
                        <div className="bank-icon"></div>
                        <div className="bank-name">交通银行</div>
                    </div>
                    <div className="bank-branch">
                        <div className="bank-icon"></div>
                        <div className="bank-name">交通银行</div>
                    </div>
                    <div className="bank-branch">
                        <div className="bank-icon"></div>
                        <div className="bank-name">交通银行</div>
                    </div>
                    <div className="bank-branch">
                        <div className="bank-icon"></div>
                        <div className="bank-name">交通银行</div>
                    </div>
                </div>
                <div className="know-btn">我知道了</div>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"支持银行卡"}/>, document.getElementById('header'));
    ReactDOM.render(<BankList/>, document.getElementById('cnt'));
});

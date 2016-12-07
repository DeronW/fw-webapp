const Payment = React.createClass({
    getInitialState:function(){
		return {
            index:"quick_pay"
        }
    },
    payCheck:function(arg){
        this.setState({index: arg});
    },
    split:function(str){
       return str.substr(str.length-4,4);
    },
    payHandler: function () {
        if (this.state.index != "quick_pay") {
            var FormData = {
                sevice: "REQ_PAY_QUICK_APPLY",
                merchantNo: '2',
                amount: '2',
                certificateNo: '2',
                accountNo: '2',
                accountName: '2',
                mobileNo: '15010984876',
                bankId: '2',
                bankName: '2',
                productName:'2',
                productInfo:'2',
                noticeUrl: '2',
                expireTime: '2'
            };
            $FW.Ajax({
                url:  API_PATH +'/mall/api/payment/v1/ucf_pay.json',
                enable_loading: true,
                data: FormData,
                success: function (data) {
                    if (1) {
                        $FW.Component.Alert('成功');
                        setTimeout(function(){
                            location.href= location.protocol + '//' + location.hostname +
							"/static/mall/send-msg-pay/index.html?merchantNo="+data.merchantNo+"&mobileNo="+FormData.mobileNo
                        },2500);

                    } else {
                        $FW.Component.Alert('失败');
                    }
                }
            })
        }
        else{
			var query = $FW.Format.urlQuery();
			var bizNo = query.bizNo;
            let link = location.protocol + '//' + location.hostname +
                '/static/mall/add-bank-card/index.html?bizNo=' + bizNo;
            location.href = link;
        }
    },
    render : function(){
       let data = this.props.data;

       var quick_pay = (
            <div className="pay-item" onClick={this.payCheck.bind(this,"quick_pay")}>
                <div className="pay-icon"><img src="images/quickpay.jpg"/></div>
                <div className="pay-name">
                    <div className="pay-title">快捷支付</div>
                    <div className="pay-subtitle">支付服务由先锋金融提供，无需开通网银</div>
                </div>
                <div className={this.state.index=="quick_pay" ? "pay-check active" : "pay-check"}></div>
            </div>
        );

        var payMethods = data.bankCards==null? quick_pay:
            data.bankCards.map((n, index) => {
                let accountNo = this.split(n.accountNo);
                return (
                    <div className="pay-item" onClick={this.payCheck.bind(this,index+1)}>
                        <div className="pay-icon"><img src="images/bankpay.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">{n.bankCardName} 尾号{accountNo}</div>
                            <div className="pay-subtitle">已绑定银行卡（支付服务由先锋金融提供）</div>
                        </div>
                        <div className={this.state.index==index+1 ? "pay-check active" : "pay-check"} ></div>
                    </div>
                )
            });

        return (
             <div className="order-payment">
                <div className="order-status">
                    <div className="pay-tip">请在23小时59分59秒内完成支付</div>
                    <div className="pay-price">金额:<span>￥299元</span></div>
                </div>
                <div className="order-products">
                    <div className="order-item">
                        <span className="order-item-name">爱奇艺VIP周卡兑换码</span>
                        <span className="order-item-amount">×1</span>
                    </div>
                    <div className="order-item">
                        <span className="order-item-name">爱奇艺VIP周卡兑换码</span>
                        <span className="order-item-amount">×1</span>
                    </div>
                </div>
                <div className="pay-way">
                    {payMethods}
                    {/*
                    <div className="pay-item" onClick={this.payCheck.bind(this,2)}>
                        <div className="pay-icon"><img src="images/wechat.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">微信支付</div>
                            <div className="pay-subtitle">推荐安装微信5.0及以上版本的用户使用</div>
                        </div>
                        <div className={this.state.index==2 ? "pay-check active" : "pay-check"}></div>
                    </div>
                    <div className="pay-item" onClick={this.payCheck.bind(this,3)}>
                        <div className="pay-icon"><img src="images/alipay.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">支付宝</div>
                            <div className="pay-subtitle">推荐安装支付宝5.0及以上版本的用户使用</div>
                        </div>
                        <div className={this.state.index==3 ? "pay-check active" : "pay-check"}></div>
                    </div>


                     */}
                </div>
                <div className="pay-bar">
                    <a className="pay-btn" onClick={this.payHandler}>确认支付</a>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('订单结算');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"订单结算"} back_handler={backward}/>, document.getElementById('header'));


        $FW.Ajax({
            url: API_PATH + '/mall/api/payment/v1/bank_card_list.json',//mall/api/payment/v1/bank_card_list.json
            enable_loading: true,
            success: function (data) {
                 ReactDOM.render(<Payment data={data}/>, document.getElementById('cnt'));
                }
         })
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}
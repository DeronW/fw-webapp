const Payment = React.createClass({
    getInitialState: function () {
        let query = $FW.Format.urlQuery();
        let payableRmbAmt = query.payableRmbAmt
        return {
            index: null,
            payableRmbAmt: payableRmbAmt
        }
    },
    payCheck: function (arg) {
        this.setState({index: arg});
    },
    componentDidMount: function () {

        let createdTime = this.props.createdTime;

        let mm = createdTime / 1000;

        var m = parseInt(mm / 60);
        var s = (mm % 60).toFixed(0);

        setInterval(function () {
            document.getElementById("cutdown").innerHTML = m + '分' + s + "秒内完成支付";
            s--;
            if (s < 0) {
                s = 59;
                m--;
                if (m == -1) {
                    location.href = "/static/mall/order-list/index.html"
                }
            }
        }, 1000)
    },
    split: function (str) {
        return str.substr(str.length - 4, 4);
    },
    //申请查询結果
    queryState: function () {
        let query = $FW.Format.urlQuery();
        let FormData = {
            payType: 4,
            orderBizNo: query.orderBizNo,
            orderGroupBizNo: query.orderGroupBizNo,
            orderTime: query.orderTime,
            amount: query.amount,
            UserId:""
        }
        $FW.Ajax({
            url: `${API_PATH}/mall/api/payment/v1/alipay_topay.json`,
            enable_loading: 'mini',
            data: FormData
        }).then(data=> {
                if (data.responseResult.resCode == "00002") {//订单处理中
                    //$FW.Component.Alert(data.responseResult.resMessage);
                } else {
                    if (data.responseResult.status == "F") {
                        window.location.href =
                        "/static/mall/order-complete/index.html?status=F&failTex=" + data.responseResult.resMessage
                    }
                    if (data.responseResult.status == "S") {
                        window.location.href =
                        "/static/mall/order-complete/index.html?status=S"
                    }
                    if (data.responseResult.status == "I") {
                        window.location.href =
                        "/static/mall/order-complete/index.html?status=I&Tex=" + data.responseResult.resMessage
                    }
                }

            })
        },
    payHandler: function () {
        let query = $FW.Format.urlQuery();
        // let orderBizNo = query.orderBizNo;
        // let orderGroupBizNo = query.orderGroupBizNo;
        // let orderTime = query.orderTime;
        // let amount = query.amount;
        let data = this.props.data;
        let index = this.state.index;
        if (index == null) {
            return
        }
        else if (index == 'w') {
            $FW.Ajax({
                url: `${API_PATH}/mall/api/payment/v1/wechatPay.json`,
                enable_loading: true,
                data: {payType: 'WECHAT_PAY'},
            })
            .then((data) => {

            });
        }
        else if (index == "quick_pay") {
            var bizNo = query.bizNo;
            let link = '/static/mall/pay-add-card/index.html?source=pay'
            location.href = link;
        }
        else if (index == 'z') {
            var queryNew = $FW.Format.urlQuery();
            console.log(queryNew);
             //申请支付
            $FW.Ajax({
                url: `${API_PATH}/mall/api/payment/v1/alipay_topay.json`,
                enable_loading: true,
                data: {
                    payType: 3,
                    orderBizNo: queryNew.orderBizNo,
                    orderGroupBizNo: queryNew.orderGroupBizNo,
                    orderTime: queryNew.orderTime,
                    amount: queryNew.amount,
                    UserId:""
                },
            }).then(data=> {
            $FW.Component.showAjaxLoading('mini');
            // if (data.ret== true) {
            //     console.log(111);
            //     if (data.code == "10000") {
            //         console.log(222);
                    // let formStart='<form name="punchout_form" method="post" action="https://openapi.alipaydev.com/gateway.do?sign=I8YO%2BJDkzFntCG7cuOvnOXytyHlbbQmmjqqs6Bepjsx5KLtnl7Un1ckMMl87HcycfEAWsp1qf%2FsFuSJIKVSm4yIB4mFNNFesmSGCHh2NuEk1r4SxGHio%2Fwh55A3OQUAQwp1T4ma0HvTTSKvYfvg5jL%2FVvSxqoElhoZ7bO9gfqE4w9IlzIUi9mZMwOwHe42GVaC18FGJMMb8c6IQ1sOeT5va2kNvtFoHfoPlSQGqwakM8UgRhOnFjoDEyaI%2Bzcdt1fTiBtx2v0CrBXTh3%2BYhYqef9pl68oovFe0a5qjp8z9f2XQCC13QxmPzH6Q7fJNZTM0Pbr4ZQcJGPEeV2gAHCCg%3D%3D&timestamp=2017-04-14+19%3A56%3A33&sign_type=RSA2&notify_url=https%3A%2F%2Fapitest.9888.cn%2Fmall%2Fapi%2Fpayment%2FaiPay_callback.json&charset=UTF-8&app_id=2016080200146584&method=alipay.trade.wap.pay&version=1.0&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json">↵<input type="hidden" name="biz_content" value="{&quot;total_amount&quot;:1999900,&quot;biz_content&quot;:&quot;{\&quot;status\&quot;:\&quot;\&quot;,\&quot;orderBizNo\&quot;:\&quot;11674420001\&quot;,\&quot;orderGroupBizNo\&quot;:\&quot;2OGP1024440000000000000000000G\&quot;,\&quot;orderTime\&quot;:\&quot;1492170987273\&quot;,\&quot;amount\&quot;:\&quot;1999900\&quot;,\&quot;userId\&quot;:\&quot;\&quot;}&quot;,&quot;timestamp&quot;:&quot;2017-04-14 19:56:33&quot;,&quot;product_code&quot;:&quot;QUICK_WAP_PAY&quot;,&quot;subject&quot;:&quot;豆哥商城-支付&quot;,&quot;method&quot;:&quot;alipay.trade.wap.pay&quot;,&quot;out_trade_no&quot;:&quot;2OGP1024440000000000000000000G&quot;}">';
                    // let content='<input type="submit" value="立即支付" style="display:none" >';
                    // let formEnd='</form>';
                    // // let submitJs="<script>document.forms[0].submit();</script>";
                    // let completeForm=formStart+content+formEnd;
                    // document.write(completeForm);
                    // document.forms[0].submit();
                    document.write(data.form);
                    // window.location.href="/static/mall/order-complete/index.html#form=" + (data.form);
                    // setTimeout(() => {
                    //     this.queryState();
                    // }, 3000);
                    // setTimeout(() => {
                    //     this.queryState('final');
                    // }, 6000);
                // } else {
                //     FW.Component.hideAjaxLoading();
                //     $FW.Component.Alert(data.responseResult.resMessage);
                // }
            // }
            // else {
                // window.location.href =
                    // "/static/mall/order-complete/index.html?status=F&failTex=" + (data.message)
            // }
        }, e => {
            $FW.Component.Alert(e.message);
        })
        }
        else {
            var FormData = {
                service: "REQ_PAY_QUICK_APPLY",
                merchantNo: query.merchantNo,
                amount: query.amount,
                certificateNo: data[index].certificateNo,
                accountNo: data[index].accountNo,
                accountName: data[index].accountName,
                mobileNo: data[index].mobileNo,
                bankId: data[index].bankId,
                bankName: data[index].bankName,
                productName: '豆哥商城商品',
                orderTime: query.orderTime || "",
                orderBizNo: query.orderBizNo || "",
                orderGroupBizNo: query.orderGroupBizNo || ""
            };
            $FW.Ajax({
                url: `${API_PATH}/mall/api/payment/v1/ucf_pay.json`,
                //url: './ucf_pay.json',
                enable_loading: true,
                data: FormData,
                success: function (result) {
                    setTimeout(function () {
                        location.href = location.protocol + '//' + location.hostname +
                        "/static/mall/pay-msg-pay/index.html?merchantNo=" + result.merchantNo + "&mobileNo=" + FormData.mobileNo
                    }, 0);
                }
            })
        }
    },
    render: function () {
        let data = this.props.data;
        var quick_pay =
        <div className="pay-item" onClick={this.payCheck.bind(this,"quick_pay")}>
        <div className="pay-icon"><img src="images/quickpay.jpg"/></div>
        <div className="pay-name">
        <div className="pay-title">快捷支付</div>
        <div className="pay-subtitle">支付服务由先锋金融提供，无需开通网银</div>
        </div>
        <div className={this.state.index=="quick_pay" ? "pay-check active" : "pay-check"}></div>
        </div>;
        var payMethods = data ?
        data.map((n, index) => {
            let accountNo = this.split(n.accountNo);

            let r = n.bankName;
            var b;

            switch (r) {
                case "中国银行":
                b = "images/zg.png"
                break;
                case "工商银行":
                b = "images/gs.png"
                break;
                case "农业银行":
                b = "images/ny.png"
                break;
                case "建设银行":
                b = "images/js.png"
                break;
                case "平安银行":
                b = "images/pa.png"
                break;
                case "兴业银行":
                b = "images/xy.png"
                break;
                case "光大银行":
                b = "images/gd.png"
                break;
                case "浦发银行":
                b = "images/pf.png"
                break;
                case "华兴银行":
                b = "images/hx.png"
                break;
                case "北京银行":
                b = "images/bj.png"
                break;
                case "中信银行":
                b = "images/zx.png"
                break;
                case "广发银行":
                b = "images/gf.png";
                break;
                default:
                b = ""
            }

            return (
                <div className="pay-item" onClick={this.payCheck.bind(this,index)}>
                <div className="pay-icon"><img src={b}/></div>
                <div className="pay-name">
                <div className="pay-title">{n.bankName} &#12288;&#12288;尾号{accountNo}</div>
                <div className="pay-subtitle">已绑定银行卡（支付服务由先锋金融提供）</div>
                </div>
                <div className={this.state.index==index ? "pay-check active" : "pay-check"}></div>
                </div>
                )
        }) : null;

return (
    <div className="order-payment">
    <div className="order-status">
    <div className="pay-tip">请在<span id="cutdown"></span></div>
    <div className="pay-price">金额:<span>￥{this.state.payableRmbAmt}元</span></div>
    </div>
                {/*<div className="order-products">
                 <div className="order-item">
                 <span className="order-item-name">爱奇艺VIP周卡兑换码</span>
                 <span className="order-item-amount">×1</span>
                 </div>
                 <div className="order-item">
                 <span className="order-item-name">爱奇艺VIP周卡兑换码</span>
                 <span className="order-item-amount">×1</span>
                 </div>
                 </div>
             */}
             <div className="pay-way">
             {payMethods} {quick_pay}
                    {/*
                    <div className="pay-item" onClick={this.payCheck.bind(this,'w')}>
                        <div className="pay-icon"><img src="images/wechat.jpg"/></div>
                        <div className="pay-name">
                            <div className="pay-title">微信支付</div>
                            <div className="pay-subtitle">推荐安装微信5.0及以上版本的用户使用</div>
                        </div>
                        <div className={this.state.index=='w' ? "pay-check active" : "pay-check"}></div>
                    </div>
                */}
                <div className="pay-item" onClick={this.payCheck.bind(this,'z')}>
                <div className="pay-icon"><img src="images/alipay.jpg"/></div>
                <div className="pay-name">
                <div className="pay-title">支付宝</div>
                <div className="pay-subtitle">推荐安装支付宝5.0及以上版本的用户使用</div>
                </div>
                <div className={this.state.index=='z' ? "pay-check active" : "pay-check"}></div>
                </div>

                </div>
                <div className="pay-bar">
                <a className="pay-btn" onClick={this.payHandler}>去支付</a>
                </div>
                </div>
                );
}
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"订单结算"} back_handler={back_handler}/>, HEADER_NODE);
    let query = $FW.Format.urlQuery();
    let createdTime = query.createdTime;
    $FW.Ajax({
        url: `${API_PATH}/mall/api/payment/v1/bank_card_list.json?createdTime=` + createdTime,
        success: function (data) {
            ReactDOM.render(<Payment data={data.bankCards} createdTime={data.createdTime}/>, CONTENT_NODE);
        }
    })
});

function back_handler() {
    location.href = '/static/mall/order-list/index.html#all';
}

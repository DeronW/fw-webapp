var numberFormat = {
    val: "",
    format: function (val) {
        if (!isNaN(val.replace(/[0-9]/g, ""))) {
            this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
        }

        return this.val;
    }
};


function space(str) {
    return str.replace(/ /g, "");
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

const SendCode = React.createClass({

    getInitialState:function(){
        var query = $FW.Format.urlQuery();
        var mobileNo = query.mobileNo;
        var merchantNo = query.merchantNo;
        return {
            mobileNo:mobileNo,
            merchantNo:merchantNo,
            reSend:false,
            value:60,
            active:false,
            code:""
        }
    },

    tick: function() {
        this.setState({value: this.state.value - 1});
    },

    //重新发送验证码
    reSend: function() {
        var FormData = {
            service: 2,
            merchantNo: this.state.merchantNo
        }

        $FW.Ajax({
            url:  './SendPhoneVerifyPay.json',
            enable_loading: true,
            data: this.FormData,
            success: function (data) {
                if(data.code=10000){
                    if(!this.state.reSend) return;
                    this.setState({value: 60});
                    this.setState({reSend: false});
                    this.interval = setInterval(this.tick, 1000);
                }
             }.bind(this)
        })
    },

    //加载完成之后立刻倒计时
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },

    //倒计时完成终止
    componentDidUpdate:function() {
        if(this.state.value==55){
            clearInterval(this.interval);
            this.setState({value: "获取验证码"});
            this.setState({reSend: true});
        }
    },

    //激活下一步
    changeVal:function(e) {
        var val=e.target.value;
        if(val!=""){
            this.setState({active:true});
        }
        else{
            this.setState({active:false});
        }
        this.setState({"code":val});
    },

    //短信验证码验证完成绑定
    nextStep:function() {
        if(!this.state.active) return;
        var FormData = {
            service: 2,
            merchantNo: this.state.merchantNo,
            checkCode: this.state.code
        }
        $FW.Ajax({
            url:  './validatePaySmsCode.json',
            enable_loading: true,
            data: this.FormData,
            success: function (data) {
                //var data= data.bankCards;
                window.location.href="/static/mall/order-complete/index.html"
            }
        })
    },
    render : function(){
        return (
            <div>
                {!this.state.reSend?<div className="phone-tip">验证码已发送至手机<span>{this.state.mobileNo}</span></div>:null}
                <div className="input-wrap">
                    <input type="text" defaultValue="" placeholder="请输入验证码" onChange={this.changeVal}/>
                    <input type="button" className="msg-tip" value={!this.state.reSend ? "重新发送("+this.state.value+")":this.state.value} onClick={this.reSend} />
                    <span className="vertical-line"></span>
                </div>
                <a className={this.state.active?"next-step active":"next-step"} onClick={this.nextStep}>完成</a>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('手机验证码');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"手机验证码"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<SendCode/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}
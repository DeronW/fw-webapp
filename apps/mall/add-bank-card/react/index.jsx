const AddBankCard = React.createClass({
    getInitialState:function(){
        return {
            info:"",
            val:"",
            active: false
        };
    },
    changeVal:function(e){
        var val = e.target.value;
        var length = val.length;
        if(isNaN(val)){
            this.setState({"info":"只能输入数字!"});
            setTimeout(function(){
                this.setState({"info":""});
            }.bind(this),2000);
            this.setState({active: false});
        }
        else if(length < 19){
            this.setState({"info":"不能输入小于19位数字!"});
            /*setTimeout(function(){
                this.setState({"info":""});
            }.bind(this),2000);*/
            this.setState({active: false});
        }
        else if(length ==19){
            this.setState({"info":""});
            this.setState({active: true});
            return;
        }
        else{}
        this.setState({"val":val});
    },
    nextStep:function() {
         if(!this.state.active) return;
          $FW.Ajax({
            url:  '/mall/api/payment/v1/bank_card_info.json?accountNo='+this.state.val,
            enable_loading: true,
            success: function (data) {
                if(data.code==1)
                {
                    var data= data.bankCards;
                    window.location.href="/static/mall/verify-bank-card/index.html?accountNo="+data.accountNo+"&bankCardName="+data.bankCardName+"&bankName="+data.bankName+"&bankId="+data.bankId
                }
                else{
                    $FW.Component.Alert(data.msg);
                }
            }
          })
    },
    render:function(){
        return (
            <div className="add-bank-card">
                <div className="add-bank-card-tip">请绑定账户本人的银行卡</div>
                <div className="input-box">
                    <span className="card-icon"></span>
                    <input type="text" placeholder="请输入银行卡号" name="title" defaultValue="" value={this.state.val} onChange={this.changeVal}/>
                </div>
                <label htmlFor="title" className="card-info">{this.state.info}</label>
                <a className={this.state.active ? "next-step active":"next-step"} onClick={this.nextStep}>下一步</a>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('添加银行卡');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"添加银行卡"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<AddBankCard/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}
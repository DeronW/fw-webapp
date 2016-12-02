const BankInfo = React.createClass({
    getInitialState:function(){
        var query = $FW.Format.urlQuery();
        var accountNo= query.accountNo;
        var bankName= query.bankName;

        return {
            name: "",
            idNum: "",
            phone: "",
            val1:"",
            val2:"",
            val3:"",
            pass1:0,
            pass2:0,
            pass3:0,
            accountNo:accountNo,
            bankName:bankName,
            active:false
        };
    },
    handleName:function(e){
        var value = e.target.value;
        if(value==""){
            this.setState({"name":"不能为空!"});
            this.setState({pass1:0});
        }
        else{
            this.setState({"name":""});
            this.setState({pass1:1});
        }
        this.setState({"val1":value});
        if(value!="" && this.state.pass2!=0 && this.state.pass3!=0) {this.setState({active:true});}
        else{this.setState({active:false})}
    },
    handleIdNum:function(e){
        var id = e.target.value;
        //var reg1 = /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/;
        //var reg2 = /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/;
        var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        if (!reg.test(id)) {
            this.setState({"idNum":"身份证输入不合法"});
            this.setState({pass2:0});
        }
        else{
            this.setState({"idNum":""});
            this.setState({pass2:1});

        }
        this.setState({"val2":id});
        if(this.state.pass1!=0 && reg.test(id) && this.state.pass3!=0){this.setState({active:true});}
        else{this.setState({active:false})}
    },

    handlePhone:function(e){
        var phone = e.target.value;
        var reg = /^1[34578]\d{9}$/;
        if (reg.test(phone) == false) {
            this.setState({"phone":"请输入合法的手机号"});
            this.setState({pass3:0});
        }else{
            this.setState({"phone":""});
            this.setState({pass3:1});
        }
        this.setState({"val3":phone});
        if(this.state.pass1!=0 && this.state.pass2!=0 && reg.test(phone)){this.setState({active:true});}
        else{this.setState({active:false})}
    },
    nextStep:function() {
        if(!this.state.active) return;
        var query = $FW.Format.urlQuery();
        var bankCardName= query.bankCardName;
        var bankId= query.bankId;
        let FormData = {
            certificateNo: this.state.val2,
            accountNo: this.state.accountNo,
            bankCardName: bankCardName,
            bankCardType: 1,
            certificateType: 0,
            accountName: this.state.val1,
            mobileNo: this.state.val3,
            bankId: bankId,
            bankName: this.state.bankName
        };
           $FW.Ajax({
                url:  '/mall/api/payment/v1/binding_bank_card.json',
                enable_loading: true,
                data: FormData,
                success: function (data) {
                    if (1) {
                        $FW.Component.Alert('成功');
                        setTimeout(function(){
                            window.location.href="/static/mall/send-msg-bind/index.html?mobileNo="+FormData.mobileNo;
                        },1000)
                     } else {
                        $FW.Component.Alert('失败');
                    }
                }
           })
    },
    render : function(){
        return (
            <div className="bank-info">
                <div className="bank-item">
                    <img className="bank-icon" src="images/bank-icon.png"/>
                    <span className="bank-name">{this.state.bankName}</span>
                    <span className="bank-number">{this.state.accountNo}</span>
                </div>
                <div className="verify-wrap">
                    <div className="verify-item">
                        <span className="verify-icon1"></span>
                        <input name="name" type="text" defaultValue="" onChange={this.handleName} placeholder="请输入姓名"/>
                    </div>
                    <label className="card-info" htmlFor="name">{this.state.name}</label>
                    <div className="verify-item">
                        <span className="verify-icon2"></span>
                        <input name="idNum" type="text" defaultValue="" onChange={this.handleIdNum} placeholder="请输入身份证号"/>
                    </div>
                    <label className="card-info" htmlFor="idNum">{this.state.idNum}</label>
                    <div className="verify-item">
                        <span className="verify-icon3"></span>
                        <input name="phone" type="text" defaultValue="" onChange={this.handlePhone}  placeholder="请输入手机号"/>
                    </div>
                    <label className="card-info" htmlFor="phone">{this.state.phone}</label>
                </div>
                <a className={this.state.active ? "next-step active":"next-step"}  onClick={this.nextStep}>下一步</a>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('验证银行卡信息');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"验证银行卡信息"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<BankInfo/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}
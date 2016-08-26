const API_PATH = document.getElementById("api-path").value;

const Verification = React.createClass({
	getDefaultProps: function(){
		return {
			countSeconds: 3
		}
	},
	
	getInitialState: function(){
		return {
			note: false,
			ID: null,
			verify_code: null,
			counting: 0
		}
	},
	
	clickHandler: function(){
		if(this.state.counting !=0) return;
		
		this.setState({counting: this.props.countSeconds});
		
		this.setState({note : true})
		
		this.timer = setInterval(()=> {
            this.setState({counting: this.state.counting - 1});
            if (this.state.counting < 1) {
                clearInterval(this.timer)
            }
        }, 1000)
	},
	
	idHandle: function(e){
		this.setState({ID: e.target.value})
		console.log(this.state.ID)
	},
	
	handlerCode: function(e){
		this.setState({verify_code: e.target.value})
		console.log(e.target.value)
	},
	
	modifyPassword: function(){
		if(!this.state.ID){
			$FW.Component.Alert("请输入身份证号")
		}else if(!this.state.verify_code){
			$FW.Component.Alert("请输入验证码")
		}else{
			$FW.Ajax({
				
			})
		}
	},
	
	render : function(){
		return (
			<div className="inld">
				<div className="eri">
					<div className="dream clearfix">
						<img className="fc" src="images/bf-a.png"/>
						<div className="kgt">{this.props.data.username}</div>
					</div>
					<div className="dream drm clearfix">
						<img className="fc icno" src="images/bf-b.png"/>
						<div className="good"><input type="text" value={this.state.ID} onChange={this.idHandle} className="put" placeholder="请输入身份证号" /></div>
					</div>
					<div className="qing clearfix">
						<div className="shyan">
							<div className="mzysq"><input type="text" value={this.state.verify_code} onChange={this.handlerCode} className="put" placeholder="请输入验证码" /></div>
						</div>
						<div className="miaoh" onClick={this.clickHandler} >
							 {this.state.counting ? this.state.counting + 's' : '获取验证码'}
						</div>
					</div>
					{this.state.note ? <div className="voice" >已向手机{this.props.data.cardNumber}发送短信验证码，若收不到，请<a href="" className="geanc">点击这里</a>获取语音验证码。</div> : null}
					<div className="trade" onClick={this.modifyPassword} >修改交易密码</div>
				</div>
			</div>
		)
	}
})


$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"验证身份"} back_handler={backward}/>, document.getElementById('header'));
	$FW.Ajax({
		url:"http://10.10.100.112/mockjs/12/api/v1/bind/card.json",
		success : function(data){
			ReactDOM.render(<Verification data={data}/>,document.getElementById('cnt'))
		}
	})
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}
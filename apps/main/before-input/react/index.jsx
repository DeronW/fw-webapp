const ReportBox = React.createClass({
	getInitialState: function(){
		return {
			note : false
		}
	},
	noneHandle: function(){
		this.setState({note : true})
	},
	render : function(){
		return (
			<div>
				<Input note={this.noneHandle} username={this.props.data.username} cardNumber={this.props.data.cardNumber} bankLogo={this.props.data.bankLogo} />
				{this.state.note ? <Note cardNumber={this.props.data.cardNumber} handler={this.noneHandle} /> : null}
				<Submit />
			</div>
		)
	}
})


const Input = React.createClass({
	bankChangeHandler: function(e){
		this.setState({value:e.target.value});
	},
	handleClick: function(){
		window.location.href="http://www.baidu.com"; 
	},
	changeHandler: function(e){
		this.setState({value:e.target.value});
	},
	getDefaultProps: function(){
		return {
			countSeconds:3
		}
	},
	getInitialState: function(){
		return {
			seconds:0
		}
	},
	
	handlerTestClick: function(){
		if(this.state.seconds !=0) return;
		
		this.setState({seconds: this.props.countSeconds});
		
		this.props.note();//触发
		
		this.timer = setInterval(()=> {
            this.setState({seconds: this.state.seconds - 1});
            if (this.state.seconds < 1) {
                clearInterval(this.timer)
            }
        }, 1000)
	},
	
	
	render : function(){		
		return (
			<div className="wrap">
				<div className="name clearfix">
					<img src="images/bf-a.png"/>
					<div className="knight">{this.props.username}</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<img src="images/bf-b.png"/>
					<div className="knight">{this.props.cardNumber}</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<img src="images/bf-c.png"/>
					<div className="knight sr"><input type="text" value={this.state.value} onChange={this.bankChangeHandler} className="textbox" placeholder="请输入银行卡号" /></div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix" onClick={this.handleClick} >
					<div className="khy">开户银行</div>
					<div className="yzt">
						<span className="shang">招商银行</span>
						<img className="bf-d" src={this.props.bankLogo}/>
						<img src="images/card-c.png"/>
					</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<div className="khy"><input type="text" className="yzm" placeholder="请输入验证码" value={this.state.value} onCodeChange={this.changeHandler} /></div>
					<div className="yzt">
						<span className="gry">|</span>
						{this.state.seconds ? this.state.seconds + "s后重新获取" : <span className="zmy" onClick={this.handlerTestClick} >获取验证码</span>}
					</div>
				</div>
				
			</div>
		)
	}
})


const Note = React.createClass({
	render : function(){
		return (
			<div className="phone">
				已向手机
				<span className="">{this.props.cardNumber}</span>
				发送短信验证码，若收不到，请
				<a className="dot"  >点击这里</a>
				获取语音验证码。
			</div>
		)
	}
})


const Submit = React.createClass({
	render : function(){
		return (
			<div className="refer">提交</div>
		)
	}
})


$FW.DOMReady(function () {

    ReactDOM.render(<Header title={"绑定银行卡"}/>, document.getElementById('header'));

    $FW.Ajax({
        url: "http://10.10.100.112/mockjs/12/api/v1/bind/card.json",
        success: function (data) {
            ReactDOM.render(<ReportBox data={data}/>, document.getElementById("cnt"))
        	
        }
    })
});
































































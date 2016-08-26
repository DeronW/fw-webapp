const API_PATH = document.getElementById("api-path").value;

const ReportBox = React.createClass({
	getInitialState: function(){
		return {
			note : false,
			jump : false,  //跳转
			find : true,
			entry : false,
			fruit : false,
		}
	},
	
	noneHandle: function(){
		this.setState({note : true})
	},
	
	handleJump: function(){
		this.setState({jump: true})
	},
	
	focusHandler: function(){
		this.setState({find : false})
	},
	
	inputHandler: function(){
		this.setState({entry : true}),
		this.setState({fruit : true})
	},
	
	submitHandle: function(){
		var _this = this;
		if(!_this.props.bankCard ){
			$FW.Component.Alert("请输入银行卡号")
		}else if(!_this.props.verify_code){
			$FW.Component.Alert("请输入验证码")
		}
	},
	
	render : function(){
		return (
			<div>
				{this.state.jump ? <ReportBox.BankAccount 
					find={this.state.find}
					entry={this.state.entry}
					fruit={this.state.fruit} 
					focusHandler={this.focusHandler}
					inputHandler={this.inputHandler}
					handlerClear={this.handlerClear} /> : null}
			
				<Input note={this.noneHandle} 
					username={this.props.data.username} 
					cardNumber={this.props.data.cardNumber} 
					bankLogo={this.props.data.bankLogo}
					jump={this.props.jump}
					handleJump={this.handleJump}
				/>
				
				{this.state.note ? <Note cardNumber={this.props.data.cardNumber} handler={this.noneHandle} /> : null}
			
				<div className="refer" onClick={this.submitHandle} >提交</div>
			</div>
		)
	}
})

ReportBox.BankAccount = React.createClass({
	getInitialState: function() {
	    return {
	    	inputText: "",
	    	list:[]
	    	}
	},
	
	handleChange: function(e) {
	    this.setState({inputText:this.refs.input.inputText.trim()});
	    
	},
	
	handleClear: function(){
		this.delText();
	},
	
	delText: function() {
        this.setState({
            inputText: ''
        });
    },
	
	render : function(){
		return (
			<div className="select-bank">
				<div className="search">
					{this.props.find ? <img src="images/search.png"/> : null}
					
					<input type="text" value={this.empty} name="txtSearch" 
					className="hunt" 
					onClear={this.props.handlerClear}
					onFocus={this.props.focusHandler}
					onInput={this.props.inputHandler}
					onChange={this.handleChange}
					filterText={this.props.inputText}
					ref="input"
					placeholder="请输入开户支行的关键词" />
					 
					{this.props.entry ? <img className="false" onClick={this.handleClear}  src="images/false.jpg"/> : null}
				</div>
				
				{this.props.fruit ? <ul className="list" >
					<li className="trade" list={this.props.list} >北京交通银行</li>
				</ul> : null}	
				
			</div>	
		)
	}
})

const Input = React.createClass({
	getDefaultProps: function(){
		return {
			countSeconds:3,
			bankCard: null,
			verify_code: null
		}
	},
	bankChangeHandler: function(e){
		this.setState({bankCard: e.target.value});
		console.log(bankCard)
	},
	
	changeHandler: function(e){
		this.setState({verify_code:e.target.value});
		console.log(verify_code)
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
					<div className="knight sr"><input type="text" value={this.state.bankCard} onChange={this.bankChangeHandler} className="textbox" placeholder="请输入银行卡号" /></div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix" onClick={this.props.handleJump} >
					<div className="khy">开户银行</div>
					<div className="yzt">
						<span className="shang">招商银行</span>
						<img className="bf-d" src={this.props.bankLogo}/>
						<img src="images/card-c.png"/>
					</div>
				</div>
				
				<div className="wire"></div>
				
				<div className="name clearfix">
					<div className="khy"><input type="text" className="yzm" placeholder="请输入验证码" value={this.state.verify_code} onCodeChange={this.changeHandler} /></div>
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
				<span className="">{this.props.cardNumber}</span>发送短信验证码，若收不到，请<a className="dot">点击这里</a>获取语音验证码。
			</div>
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


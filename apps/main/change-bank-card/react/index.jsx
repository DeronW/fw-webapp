const API_PATH = document.getElementById("api-path").value;

const ReportBox = React.createClass({
	getInitialState: function(){
		return {
			note : false,
			find : true,
			entry : false,
			fruit : false,
			jump : false
		}
	},
	noneHandle: function(){
		this.setState({note : true})
	},

	focusHandler: function(){
		this.setState({find : false})
	},
	
	inputHandler: function(){
		this.setState({entry : true});
		this.setState({fruit : true});
	},

	handleJump: function(){
		this.setState({jump: true})
	},
	
	submitHandle: function(){
		var _this = this;
		if(!_this.props.bankCard ){
			$FW.Component.Alert("请输入银行卡号")
		}else if(!_this.props.verify_code){
			$FW.Component.Alert("请输入验证码")
		}
		$FW.Ajax({
			url:API_PATH + "mpwap/api/v1/changeBankCard.shtml",
			data:{

			},
			success: function(data){

			}
		});
	},
	
	render : function(){
		let acc = this.props.data.hsAccountInfo;
		return (
			<div>
				{this.state.jump ? <ReportBox.SelectBankList
					find={this.state.find}
					entry={this.state.entry}
					fruit={this.state.fruit} 
					focusHandler={this.focusHandler}
					inputHandler={this.inputHandler}
					handlerClear={this.handlerClear} /> : null}

				<Input note={this.noneHandle} 
					username={acc.accountName}
					cardNumber={acc.bankCardNo}
					bankLogo={''}
					handleJump={this.handleJump}
				/>
				{this.state.note ? <Note cardNumber={acc.bankCardNo} handler={this.noneHandle} /> : null}
				<div className="refer" onClick={this.submitHandle} >提交</div>
			</div>
		)
	}
})


const Input = React.createClass({
	getDefaultProps: function(){
		return {
			countSeconds:60,
			bankCard: null,
			verify_code: null
		}
	},
	bankChangeHandler: function(e){
		this.setState({bankCard: e.target.value});
	},
	
	changeHandler: function(e){
		this.setState({verify_code:e.target.value});
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

ReportBox.SelectBankList = React.createClass({
	getInitialState: function() {
		return {
			find : true,
			entry : false,
			fruit : false,
			bankList: [],
			value:''
		}
	},

	refreshBankList: function(value){
		$FW.Ajax({
			url:API_PATH +　"mpwap/api/v1/getBankList.shtml",
			data:{
				index: "10",
				keyword: value,
				size: "10"
			},
			success : (data) => {
				console.log(data)
				this.setState({bankList: data.bankList})
			}
		})
	},

	focusHandler: function(){
		this.setState({find : false})
	},

	inputHandler: function(){
		this.setState({entry : true, fruit : true});
	},

	handleChange: function(e) {
		var val=e.target.value;
		this.setState({value: val});
		this.refreshBankList(val);
	},

	handleClear: function(){
		this.setState({value: '', fruit: false});
	},

	render : function(){
		let list = ()=> {
			console.log(this.state.bankList)
			var li = (d, index) => <li key={index}><a href="">{d.bankName} <img src="images/card-c.png"/></a></li>;

			return <ul className="list">{this.state.bankList.map(li)}</ul>;
		}

		return (
			<div className="select-bank">
				<div className="search">
					{this.state.find ? <img className="suo" src="images/search.png"/> : null}
					<input type="text"
						   className="hunt"
						   onClear={this.state.handleClear}
						   find={this.state.find}
						   onFocus={this.focusHandler}
						   entry={this.state.entry}
						   fruit={this.state.fruit}
						   onInput={this.inputHandler}
						   onChange={this.handleChange}
						   value={this.state.value}
						   placeholder="请输入开户支行的关键词" />
					{this.state.entry ? <img className="false" onClick={this.handleClear}  src="images/false.jpg"/> : null}
				</div>
				{this.state.fruit ? list() : null}
			</div>
		)
	}
})

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"绑定银行卡"}/>, document.getElementById('header'));
    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getHSAccountInfo.shtml",

		//url: API_PATH + "mpwap/api/v1/changeBankCard.shtml",
        data:{
        	//bankCard: "6222022308004509665",
        	//bankId: "1"
        },
        success: function (data) {
			console.log(data)
            ReactDOM.render(<ReportBox data={data}/>, document.getElementById("cnt"))
        }
    });
});


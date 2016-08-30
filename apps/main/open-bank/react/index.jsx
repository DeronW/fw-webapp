const API_PATH = document.getElementById("api-path").value;

const BankAccount = React.createClass({
	getInitialState: function() {
	    return {
	    	find : true,
	    	entry : false,
			fruit : false
	    	}
	},
	
	focusHandler: function(){
		this.setState({find : false})
	},
	
	inputHandler: function(){
		this.setState({entry : true, fruit : true});		
	},
	
	handleChange: function(e) {
	    this.setState({inputText:e.target.value});
	},
	
	handleClear: function(){
		this.setState({inputText: ''});
	},

	render : function(){
		console.log(this.state.inputText)
		
		let list = ()=> {
			console.log(this.props.data.bankList)
			var li = (d, index) => <li key={index}>{d.bankName} <img src="images/card-c.png"/></li>;
			
			return <ul className="list">{this.props.data.bankList.map(li)}</ul>;
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
					filterText={this.state.inputText}
					placeholder="请输入开户支行的关键词" />
					 
					{this.state.entry ? <img className="false" onClick={this.handleClear}  src="images/false.jpg"/> : null}
				</div>
				
				{this.state.fruit ? list() : null}	
				
			</div>	
		)
	}
})



$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"选择开户支行"} back_handler={backward}/>, document.getElementById('header'));
	$FW.Ajax({
		url:API_PATH +　"mpwap/api/v1/getBankList.shtml",
		data:{    
			index: "10",
			keyword: "建设银行",
			size: "10"
		},
		success : function(data){
			ReactDOM.render(<BankAccount data={data}/>,document.getElementById('cnt'))
		}
	})
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}
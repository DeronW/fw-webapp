const API_PATH = document.getElementById("api-path").value;

const BankAccount = React.createClass({
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
			var li = (d, index) => <li key={index}><a href="https://www.baidu.com">{d.bankName} <img src="images/card-c.png"/></a></li>;
			
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



$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"选择开户支行"} back_handler={backward}/>, document.getElementById('header'));

	ReactDOM.render(<BankAccount />,document.getElementById('cnt'))
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}
const API_PATH = document.getElementById("api-path").value;

const BankAccount = React.createClass({
	getInitialState: function() {
	    return {
	    	find : true,
	    	entry : false,
			fruit : false,
	    	inputText: "",
	    	list:[]
	    	}
	},
	
	focusHandler: function(){
		this.setState({find : false})
	},
	
	inputHandler: function(){
		this.setState({entry : true}),
		this.setState({fruit : true})
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
		console.log(this.state.find)
		return (
			<div className="select-bank">
				<div className="search">
					{this.state.find ? <img src="images/search.png"/> : null}
					
					<input type="text" value={this.empty} name="txtSearch" 
					className="hunt" 
					onClear={this.state.handlerClear}
					find={this.state.find}
					onFocus={this.focusHandler}
					entry={this.state.entry}
					fruit={this.state.fruit}
					onInput={this.inputHandler}
					onChange={this.handleChange}
					filterText={this.state.inputText}
					ref="input"
					placeholder="请输入开户支行的关键词" />
					 
					{this.state.entry ? <img className="false" onClick={this.handleClear}  src="images/false.jpg"/> : null}
				</div>
				
				{this.state.fruit ? <ul className="list" >
					<li className="trade" list={this.state.list} >北京交通银行</li>
				</ul> : null}	
				
			</div>	
		)
	}
})



$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"选择开户支行"} back_handler={backward}/>, document.getElementById('header'));
	$FW.Ajax({
		url:"http://10.10.100.112/mockjs/12/api/v1/bind/card.json",
		success : function(data){
			ReactDOM.render(<BankAccount data={data}/>,document.getElementById('cnt'))
		}
	})
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}
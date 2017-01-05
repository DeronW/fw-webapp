const AdviceComplaints = React.createClass({
	getInitialState() {
		return {
			textareaVal: ''	
		}
	},

	textareaChange(e) {
		this.setState({
			textareaVal: e.target.value
		});
	},

	handleSuggest() {
		if(this.state.textareaVal == '') {
			console.log("1");	
		} else {
			console.log(this.state.textareaVal);	
		}

	},

	render() {
		return (
			<div className="advice-complaints-cnt">
				<div className="advice-complaints-textarea">
					<textarea className="text" placeholder="请简要说明您的咨询建议" onChange={this.textareaChange} >
							
					</textarea>

				</div>	
				
				<div className="prompt-text">您的咨询或建议，我们会尽快处理，谢谢！</div>
						
				<div className="submit-suggest-btn">
					<div className="ui-btn" onClick={() => this.handleSuggest()}>提交建议</div>
				</div>
				
			</div>
		)
	}
});

ReactDOM.render(
	<AdviceComplaints />,
	document.getElementById('cnt')
)

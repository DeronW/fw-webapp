
const SetCashCard = React.createClass({
	render() {
		return (
			<div className="set-cash-card-cnt">
				<div className="ui-froms">
					<div className="list">
						<span className="text">姓名</span>
						<div className="input">
							<input type="text" placeholder="请输入姓名" />
						</div>
					</div>
					<div className="list">
						<span className="text">身份证号</span>
						<div className="input">
							<input type="text" placeholder="请输入身份证号码" />
						</div>
					</div>
				</div>

				<div className="ui-froms">
					<div className="list prompt-list">
						<span className="text">姓名</span>
						<div className="input">
							<div className="input-text">3569 8962 7916 4729</div>
						</div>

						<div className="list-bank-li">
							<span className="prompt-text">
								支持银行
								<img src="images/prompt-icon.png" />
							</span>
							<span className="bank">
								<img className="logo-icon" src="" />
								中国银行
							</span>
						</div>	
					</div>
				</div>

				<div className="ui-froms">
					<div className="list">
						<span className="text">手机号</span>
						<div className="input">
							<input type="text" placeholder="银行卡预留手机号" />
						</div>
					</div>
				</div>

				<div className="next-btn">
					<div className="ui-btn">下一步</div>
				</div>
			</div>		
		)
	}
});



ReactDOM.render(<SetCashCard />, document.getElementById('cnt'))

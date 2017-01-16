const BankManagement = React.createClass({
	render() {
		return (
			<div className="bank-management-cnt">
				<div className="bank-management-list">
					<div className="list">
						<div className="list-cnt">
							<div className="t">
								<div className="bank-logo">
									<img src="" />
									<span className="name-text">招商银行</span>
								</div>

								<span className="text">还款卡</span>
							</div>	

							<div className="b">
								<div className="card-info">
									<span className="text">储蓄卡</span>	
									<span className="card-text">14465456456***2134124</span>
								</div>	

								<div className="relieve-bind-btn">
									解除	
								</div>
							</div>
						</div>
					</div>
					<div className="lin"></div>

					<div className="list-back"></div>
					<div className="list-back-1"></div>
				</div>
				<div className="bank-management-list green-list">
					<div className="list">
						<div className="list-cnt">
							<div className="t">
								<div className="bank-logo">
									<img src="" />
									<span className="name-text">招商银行</span>
								</div>

								<span className="text">还款卡</span>
							</div>	

							<div className="b">
								<div className="card-info">
									<span className="text">储蓄卡</span>	
									<span className="card-text">14465456456***2134124</span>
								</div>	

								<div className="relieve-bind-btn">
									解除	
								</div>
							</div>
						</div>
					</div>
					<div className="lin"></div>

					<div className="list-back"></div>
					<div className="list-back-1"></div>
				</div>

				<div className="bank-management-list blue-list">
					<div className="list">
						<div className="list-cnt">
							<div className="t">
								<div className="bank-logo">
									<img src="" />
									<span className="name-text">招商银行</span>
								</div>

								<span className="text">还款卡</span>
							</div>	

							<div className="b">
								<div className="card-info">
									<span className="text">储蓄卡</span>	
									<span className="card-text">14465456456***2134124</span>
								</div>	

								<div className="relieve-bind-btn">
									解除	
								</div>
							</div>
						</div>	
					</div>
					<div className="lin"></div>

					<div className="list-back"></div>
					<div className="list-back-1"></div>
				</div>			

			</div>		
		) 
	}
});


ReactDOM.render(
	<BankManagement />,
	document.getElementById('cnt')
)

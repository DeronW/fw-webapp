const MyCnt = React.createClass({
	render() {
		return (
			<div className="my-cnt">
				<div className="my-nav">
					<span className="text">123415235</span>
				</div>		


				<div className="my-info">
					<div className="my-info-cnt">
						<div className="loan-sum-text">
							<div className="text">累计借款(元)</div>
							<div className="num-text">1100.10</div>
						</div>
						<div className="loan-info">
							<div className="info">
								<span className="text">借款次数</span>
								<span className="num-text">12</span>
							</div>
							<div className="info">
								<span className="text">逾期次数</span>
								<span className="num-text">12</span>
							</div>
						</div>
					</div>
					
					<div className="my-info-num">
						<div className="quota-info">
							<span className="num-text">88.00</span>	
							<span className="text">信用额度（元）</span>
						</div>
						<div className="icon-r">
								
						</div>
					</div>
				</div>


				<div className="my-settings">
					<div className="list">
						<div className="list-cnt">
							<span className="icon back-icon"></span>	
							<span className="text">银行卡</span>
						</div>
						<div className="list-cnt">
							<span className="icon huishang-icon"></span>	
							<span className="text">徽商账户</span>
						</div>
						<div className="list-cnt">
							<span className="icon pws-icon"></span>	
							<span className="text">交易密码</span>
						</div>
						<div className="list-cnt">
							<span className="icon feedback-icon"></span>	
							<span className="text">意见反馈</span>
						</div>
					</div>
				</div>


				<div className="my-btn">
					<div className="ui-btn">退出登录</div>
				</div>
			</div>			


		)		
	}
});



ReactDOM.render(
	<MyCnt />, 
	document.getElementById('cnt')
)

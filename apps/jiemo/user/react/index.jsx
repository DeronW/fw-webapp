function phoneMosaic(val) {
	let frontNum = val.slice(0, 3);
	let lastNum = val.slice(val.length - 4, val.length);

	return `${frontNum}***${lastNum}`


}

const MyCnt = React.createClass({
	getInitialState() {
		return {
			overdueCount: 0,
			loanCount: 0,
			totalLoanAmout: 0
		}
	},
	componentDidMount() {
		$FW.Ajax({
			url: API_PATH + "/api/oriole/v1/indexloadpage.json",
			method: "POST",
			enable_loading: true,
			data: {
				token: localStorage.userToken,
				userGid: localStorage.userGid,
				userId: localStorage.userId,	
				sourceType: 3
			}
		}).then((data) => {
			this.setState({
				overdueCount: data.overdueCount,
				loanCount: data.loanCount,
				totalLoanAmout: data.totalLoanAmout
			});
			console.log(data);	
		},(error) => {
			console.log(error);
		})
	},
	render() {
		return (
			<div className="my-cnt">
				<div className="my-nav">
					<span className="text">{phoneMosaic(localStorage.phone)}</span>
				</div>		


				<div className="my-info">
					<div className="my-info-cnt">
						<div className="loan-sum-text">
							<div className="text">累计借款(元)</div>
							<div className="num-text">
								{
									this.state.totalLoanAmout == 0 ? "--" : this.state.totalLoanAmout
								}
							</div>
						</div>
						<div className="loan-info">
							<div className="info">
								<span className="text">借款次数</span>
								<span className="num-text">{this.state.loanCount}</span>
							</div>
							<div className="info">
								<span className="text">逾期次数</span>
								<span className="num-text">{this.state.overdueCount}</span>
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

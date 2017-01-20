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
			totalLoanAmout: 0,
			indexloadpageData: null,
			baseinfoData: null
		}
	},
	componentDidMount() {
		Promise.all([
			$FW.Ajax({
				url: API_PATH + "api/oriole/v1/indexloadpage.json",
				method: "POST",
				enable_loading: true,
				data: {
					token: localStorage.userToken,
					userGid: localStorage.userGid,
					userId: localStorage.userId,	
					sourceType: 3
				}
			}),
			$FW.Ajax({
				url: API_PATH + "api/loan/v1/baseinfo.json",
				method: "POST",
				enable_loading: true,
				data: {
					token: localStorage.userToken,
					userGid: localStorage.userGid,
					userId: localStorage.userId,
					productId: 1,	
					sourceType: 3
				}
			})	
		]).then((data) => {
			// this.setState({
			// 	overdueCount: data.overdueCount,
			// 	loanCount: data.loanCount,
			// 	totalLoanAmout: data.totalLoanAmout
			// });
			this.setState({
				indexloadpageData: data[0],
				baseinfoData: data[1]
			});
			console.log(data[0].overdueCount)	
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
					
				</div>


				<div className="my-settings">
					<div className="list">
						<div className="list-cnt">
							<span className="icon credit-icon"></span>	
							<span className="text">信用额度</span>
							<span className="arrow-r-icon"></span>
						</div>
						<div className="list-cnt">
							<span className="icon back-icon"></span>	
							<span className="text">银行卡</span>
							<span className="arrow-r-icon"></span>
						</div>
						<div className="list-cnt">
							<span className="icon feedback-icon"></span>	
							<span className="text">意见反馈</span>
							<span className="arrow-r-icon"></span>
						</div>
						<div className="list-cnt">
							<span className="icon more-icon"></span>	
							<span className="text">更多</span>
							<span className="arrow-r-icon"></span>
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

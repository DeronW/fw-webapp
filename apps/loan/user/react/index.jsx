function phoneMosaic(val) {
	let frontNum = val.slice(0, 3);
	let lastNum = val.slice(val.length - 4, val.length);

	if(val == undefined) {
		return '';
	} else {
		return `${frontNum}***${lastNum}`
	}

}

const MyCnt = React.createClass({
	getInitialState() {
		return {
			overdueCount: 0,
			loanCount: 0,
			totalLoanAmout: 0,
			indexloadpageData: '',
			baseinfoData: ''
		}
	},
	componentDidMount() {
		Promise.all([
			$FW.Ajax({
				url: API_PATH + "api/oriole/v1/indexloadpage.json",
				method: "POST",
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
				data: {
					token: localStorage.userToken,
					userGid: localStorage.userGid,
					userId: localStorage.userId,
					productId: 1,
					sourceType: 3
				}
			})
		]).then((data) => {
			this.setState({
				indexloadpageData: data[0],
				baseinfoData: data[1]
			});
		},(error) => {
			console.log(error);
		})
	},
	render() {
		let userStatus = this.state.baseinfoData.borrowBtnStatus;

		let creditUrl = () => {
			if(userStatus == 1) {
				return "/static/loan/user-set-cash-card/index.html";
			} else if (userStatus >= 2) {
				return `https://cashloan.9888.cn/api/credit/v1/creditlist.html?sourceType=2&token=${localStorage.userToken}&userId=${localStorage.userId}`
			}
		}

		let bankUrl = () => {
			if(userStatus == 1) {
				return "/static/loan/user-set-cash-card/index.html";
			} else if (userStatus >= 2) {
				return '/static/loan/user-bank-management/index.html'
			}
		}

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
									this.state.indexloadpageData.totalLoanAmout == 0 ? "--" : this.state.indexloadpageData.totalLoanAmout
								}
							</div>
						</div>
						<div className="loan-info">
							<div className="info">
								<span className="text">借款次数</span>
								<span className="num-text">{this.state.indexloadpageData.loanCount}</span>
							</div>
							<div className="info">
								<span className="text">逾期次数</span>
								<span className="num-text">{this.state.indexloadpageData.overdueCount}</span>
							</div>
						</div>
					</div>

				</div>

				<div className="my-settings">
					<div className="list">
						<div className="list-cnt">
							<a href={creditUrl()}>
								<span className="icon credit-icon"></span>
								<span className="text">信用额度</span>
								<span className="arrow-r-icon"></span>
							</a>
						</div>
						<div className="list-cnt">
							<a href={bankUrl()}>
								<span className="icon back-icon"></span>
								<span className="text">银行卡</span>
								<span className="arrow-r-icon"></span>
							</a>
						</div>
                        {/*<div className="list-cnt">
							<a href="">
								<span className="icon feedback-icon"></span>
								<span className="text">意见反馈</span>
								<span className="arrow-r-icon"></span>
							</a>
						</div>*/}
						<div className="list-cnt">
							<a href="/static/loan/user-more/index.html">
								<span className="icon more-icon"></span>
								<span className="text">更多</span>
								<span className="arrow-r-icon"></span>
							</a>
						</div>
					</div>
				</div>


                {/*<div className="my-btn">
					<div className="ui-btn">退出登录</div>
				</div>*/}
			</div>


		)
	}
});



ReactDOM.render(
	<MyCnt />,
	document.getElementById('cnt')
);
ReactDOM.render(<BottomNavBar index={3}/>, document.getElementById('bottom-nav-bar'));

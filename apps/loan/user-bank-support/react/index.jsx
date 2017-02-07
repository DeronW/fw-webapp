const BankList = React.createClass({
	getInitialState() {
		return {
			bankList: []
		}
	},
	componentDidMount() {
		$FW.Ajax({
			url: `${API_PATH}api/bankcard/v1/supportbank.json`,
            method: "POST",
			data: {
				token: localStorage.userToken,
				userGid: localStorage.userGid,
				userId: localStorage.userId,
				page: 1,
				pageSize: 100,
				sourceType: 3
			}
		}).then((data) => {
			this.setState({
				bankList: data.pageData.result
			});
		}, (error) => {

		})
	},
    render:function(){
		let bankLi = (todo, index) => {
			return 	<div className="bank-branch">
                        <div className="bank-icon">
							<img src={todo.logoUrl} />
						</div>

                        <div className="bank-name">{todo.bankName}</div>
                    </div>
		}

        return (
            <div>
                <div className="banklist">
					{
						this.state.bankList.map((todo, index) => {
							return bankLi(todo, index)
						})
					}
                </div>
                <a className="know-btn" href={'/static/loan/user-set-cash-card/index.html'}>我知道了</a>
            </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"支持银行卡"}/>, document.getElementById('header'));
    ReactDOM.render(<BankList/>, document.getElementById('cnt'));
});

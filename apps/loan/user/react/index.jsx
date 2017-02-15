function phoneMosaic(val) {
    let frontNum = val.slice(0, 3);
    let lastNum = val.slice(val.length - 4, val.length);

    if (val == undefined) {
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
        let user = $FW.Store.getUserDict();
        Promise.all([
            $FW.Ajax({
                url: API_PATH + "api/oriole/v1/indexloadpage.json",
                method: "POST",
                enable_loading: "mini",
                data: {
                    token: user.token,
                    userGid: user.gid,
                    userId: user.id,
                    sourceType: 3
                }
            }),
            $FW.Ajax({
                url: API_PATH + "api/loan/v1/baseinfo.json",
                method: "POST",
                enable_loading: "mini",
                data: {
                    token: user.token,
                    userGid: user.gid,
                    userId: user.id,
                    productId: 1,
                    sourceType: 3
                }
            })
        ]).then(data => {
            this.setState({
                indexloadpageData: data[0],
                baseinfoData: data[1]
            });
        })
    },
    render() {
        let userStatus = this.state.baseinfoData.borrowBtnStatus;

        let creditUrl = () => {
            if (userStatus == 1) {
                return "/static/loan/user-card-set/index.html";
            } else if (userStatus >= 2) {
                return `/api/credit/v1/creditlist.shtml?sourceType=2&token=${localStorage.userToken}&userId=${localStorage.userId}`
            }
        }

        let bankUrl = () => {
            if (userStatus == 1) {
                return "/static/loan/user-card-set/index.html";
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
                            <div className="num-text">
                                {
                                    this.state.indexloadpageData.totalLoanAmout == 0 ? "--" : this.state.indexloadpageData.totalLoanAmout
                                }
                            </div>
                            <div className="text">累计借款(元)</div>
                        </div>
                        <div className="loan-info">
                            <div className="info">
                                <span className="num-text">{this.state.indexloadpageData.loanCount}</span>
                                <span className="text">借款次数</span>
                            </div>
                            <div className="info">
                                <span className="num-text">{this.state.indexloadpageData.overdueCount}</span>
                                <span className="text">逾期次数</span>
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
                            <a href="/static/loan/user-settings/index.html">
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


$FW.DOMReady(() => {
    ReactDOM.render(<MyCnt />, CONTENT_NODE);
    ReactDOM.render(<BottomNavBar index={3} />, BOTTOM_NAV_NODE);
})

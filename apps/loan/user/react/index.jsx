function phoneMosaic(val) {
    let frontNum = val.slice(0, 3);
    let lastNum = val.slice(val.length - 4, val.length);

    if (val == undefined) {
        return '';
    } else {
        return `${frontNum}****${lastNum}`
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
                enable_loading: "mini",
                data: {
                    token: USER.token,
                    userGid: USER.gid,
                    userId: USER.id,
                    sourceType: SOURCE_TYPE
                }
            }),
            $FW.Ajax({
                url: API_PATH + "api/loan/v1/baseinfo.json",
                method: "POST",
                enable_loading: "mini",
                data: {
                    token: USER.token,
                    userGid: USER.gid,
                    userId: USER.id,
                    productId: 1,
                    sourceType: SOURCE_TYPE
                }
            })
        ]).then(data => {
            this.setState({
                indexloadpageData: data[0],
                baseinfoData: data[1]
            });
        })
    },
    clickHandler() {
        let userStatus = this.state.baseinfoData.borrowBtnStatus;
        if (userStatus == 101) $FW.Component.Toast("设置提现卡申请处理中，请稍等");
    },
    render() {
        let userStatus = this.state.baseinfoData.borrowBtnStatus;

        let creditUrl = () => {
            if (userStatus == 1) {
                return "/static/loan/user-card-set/index.html";
            } else if (userStatus >= 2) {
                return `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&userId=${USER.id}`
            }
        }

        let bankUrl = () => {
            if (userStatus == 1) {
                return "/static/loan/user-card-set/index.html";
            } else if (userStatus >= 2) {
                return '/static/loan/user-card-management/index.html'
            }
        }

        return (
            <div className="my-cnt">
                <div className="my-nav">
                    <span className="text">{phoneMosaic($FW.Store.get('phone', ''))}</span>
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
                            <div className="info info1">
                                <span className="num-text">{this.state.indexloadpageData.loanCount}</span>
                                <span className="text">借款次数</span>
                            </div>
                            <div className="info info2">
                                <span className="num-text">{this.state.indexloadpageData.overdueCount}</span>
                                <span className="text">逾期次数</span>
                            </div>
                            <div className="vertical-line"></div>
                        </div>
                    </div>

                </div>

                <div className="my-settings">
                    <div className="list">
                        <div className="list-cnt" onClick={this.clickHandler}>
                            <a href={creditUrl()}>
                                <span className="icon credit-icon"></span>
                                <span className="text">信用额度</span>
                                <span className="arrow-r-icon"></span>
                            </a>
                        </div>
                        <div className="list-cnt" onClick={this.clickHandler}>
                            <a href={bankUrl()}>
                                <span className="icon back-icon"></span>
                                <span className="text">银行卡</span>
                                <span className="arrow-r-icon"></span>
                            </a>
                        </div>
                        <div className="list-cnt hide">
                            <a href="/static/loan/weixin-invite/index.html">
                                <span className="icon invite-icon"></span>
                                <span className="text">邀请好友</span>
                                <span className="arrow-r-icon"></span>
                            </a>
                        </div>
                        <div className="list-cnt">
                            <a href="/static/loan/user-settings/index.html">
                                <span className="icon more-icon"></span>
                                <span className="text">更多</span>
                                <span className="arrow-r-icon"></span>
                            </a>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>


        )
    }
});

const USER = $FW.Store.getUserDict();

$FW.DOMReady(() => {
    ReactDOM.render(<MyCnt />, CONTENT_NODE);
    ReactDOM.render(<BottomNavBar index={3} />, BOTTOM_NAV_NODE);
})

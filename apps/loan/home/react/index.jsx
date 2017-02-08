function gotoHandler(link) {
    location.href = encodeURI(link);
}

const ApplyLoan = React.createClass({
    getInitialState: function () {
        return {
            availableLoan: this.props.data.creditLine,
            present_availableLoan: this.props.data.creditLine,
            orioleOrderGid: this.props.data.orioleOrderGid,
            creditLine: this.props.data.canBorrowAmount,
            present_creditLine:this.props.data.canBorrowAmount
        }
    },
    componentDidMount: function () {
        var sliderBar = document.querySelector('.slider-area');
        if (sliderBar) {
            var al = this.state.creditLine;
            var lineDiv = document.querySelector('.lineDiv');
            var minDiv = document.querySelector('.minDiv');
            var lineDivBar = document.querySelector(".lineDiv-bar");
            var applyLoan = document.querySelector(".apply-loan");
            var flag = false;

            minDiv.addEventListener("touchstart", function (e) {
                e.stopPropagation();
                flag = true;
            });

            applyLoan.addEventListener("touchmove", (e) => {
                if (flag) {
                    var x = e.touches[0].pageX || e.touches[0].clientX;
                    var lineDiv_left = getPosition(lineDiv).left;
                    var minDiv_left = x - lineDiv_left;
                    if (minDiv_left >= lineDiv.offsetWidth - 58) {
                        minDiv_left = lineDiv.offsetWidth - 58;
                    }
                    if (minDiv_left < 0) {
                        minDiv_left = -8;
                    }
                    minDiv.style.left = minDiv_left + "px";
                    lineDivBar.style.width = minDiv_left + 15 + "px";
                    var loanNum = Math.round(parseInt(minDiv_left / (lineDiv.offsetWidth - 58) * al) / 100) * 100;
                    if (loanNum <= 500) { loanNum = 500 }
                    this.setState({ creditLine: loanNum });
                }
            });

            applyLoan.addEventListener("touchend", function (e) {
                flag = false;
            });

            function getPosition(node) {
                var left = node.offsetLeft;
                var top = node.offsetTop;
                var current = node.offsetParent;
                while (current != null) {
                    left += current.offsetLeft;
                    top += current.offsetTop;
                    current = current.offsetParent;
                }
                return {
                    "left": left,
                    "top": top
                };
            }
        }
    },
    getBorrowBtn() {
        let btn = '--', st = this.props.data.borrowBtnStatus;

        let available_loan =
            <div className="available-loan">
                <div className="max-loan-title">最高借款额度（元）</div>
                <div className="max-loan-money">{this.state.creditLine}</div>
            </div>;

        let unavailable_loan =
            <div className="unavailable-loan">
                <div className="max-loan-title">
                    <img src="images/warn.png" />
                    仅支持500元以上借款，快去提额吧！</div>
                <div className="max-loan-money">暂无额度</div>
            </div>;

        btn = st === 2 || st === 3 ?
            unavailable_loan :
            available_loan;

        return btn
    },
    getMoneySlider() {
        let slider = '--', st = this.props.data.borrowBtnStatus;

        let slider_bar =
            <div className="slider-area">
                <div className="slider-area-wrap">
                    <div className="lineDivWrap">
                        <div className="lineDiv-bar"></div>
                        <div className="lineDiv">
                            <div className="minDiv"></div>
                        </div>
                    </div>
                </div>
                <div className="start-point"></div>
                <div className="end-point"></div>
                <div className="start-point-num">500</div>
                <div className="end-point-num">{this.state.present_creditLine}</div>
            </div>;

        let no_slider_bar =
            <div className="no-slider-bar">
                <img src="images/no-slider-bar.jpg" />
            </div>;

        slider = st === 2 || st === 3 ?
            no_slider_bar :
            slider_bar;

        return slider
    },
    getBtnStatus() {
        let btn = '--', st = this.props.data.borrowBtnStatus;

        let user = $FW.Store.getUserDict();
        let link;
        if (st == 1) link = '/static/loan/user-set-cash-card/index.html';
        if (st == 2) link = `/api/credit/v1/creditlist.html?sourceType=2&token=${user.token}&userId=${user.id}`;

        let loanBtnClick = () => {
            st === 101 ?
                $FW.Component.Toast('设置提现卡申请处理中，请稍等') :
                location.href = link
        }
        let loan_btn = <div className="loan-btn" onClick={loanBtnClick}> 申请借款 </div>;

        let credit_btn =
            <a className="loan-btn" href={`/api/credit/v1/creditlist.html?sourceType=2&token=${user.token}&userId=${user.id}`}>
                我要提额
            </a>;

        let btn_list =
            <div className="credit-btn">
                <a className="credit-improvement-btn"
                    href={`/api/credit/v1/creditlist.html?sourceType=2&token=${user.token}&userId=${user.id}`}>
                    我要提额
                </a>
                <a className="credit-apply-btn"
                    href={`/static/loan/apply-want-loan/index.html?creditLine=${this.props.data.canBorrowAmount}&orioleOrderGid=${this.state.orioleOrderGid}&loanNum=${this.state.creditLine}`}>
                    我要借款</a>
            </div>;

        if (st === 1 || st === 101) btn = loan_btn;
        if (st === 2 || st === 3) btn = credit_btn;
        if (st === 5) btn = btn_list;

        return btn
    },
    getCreditLine() {
        let line = '--', st = this.props.data.borrowBtnStatus;
        if (st === 3) $FW.Component.Toast(this.props.data.borrowBtnDesc);
        if (st === 5) line = this.props.data.creditLine;
        return line
    },
    render() {

        return (
            <div className="apply-loan">
                <div className="header">现金贷</div>
                <div className="loan-num">
                    {this.getBorrowBtn()}
                </div>
                <div className="loan-info">
                    {this.getMoneySlider()}
                    <div className="loan-info-items">
                        <div className="credit-lines">
                            <div className="credit-money">
                                <span className="credit-money-title">信用额度（元）</span>
                                <span className="credit-money-num">{this.getCreditLine()}</span>
                            </div>
                            <div className="loan-duration">
                                <span className="loan-duration-title">借款期限（天）</span>
                                <span className="loan-duration-num">{this.props.data.productPeriod}</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                {this.getBtnStatus()}
                <div className="loan-tip">完善授权信息可减免手续费</div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    let user = $FW.Store.getUserDict();

    $FW.Ajax({
        url: `${API_PATH}api/loan/v1/baseinfo.json`,
        method: "post",
        data: {
            token: user.token,
            userGid: user.gid,
            userId: user.id,
            sourceType: 3,
            productId: 1
        }
    }).then((data) => {
        ReactDOM.render(<ApplyLoan data={data} />, CONTENT_NODE)
    }, e => $FW.Event.captureExpection(e));
    ReactDOM.render(<BottomNavBar index={1} />, BOTTOM_NAV_NODE);
});
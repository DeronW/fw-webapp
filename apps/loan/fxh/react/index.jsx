function gotoHandler(link) {
    location.href = encodeURI(link);
}

class ApplyLoan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            availableLoan: this.props.data.creditLine,
            present_availableLoan: this.props.data.creditLine,
            orioleOrderGid: this.props.data.orioleOrderGid,
            creditLine: this.props.data.canBorrowAmount,
            present_creditLine: this.props.data.canBorrowAmount,
            show_tip: "最高",
            redirectProductId: this.props.data.redirectProductId,
            redirectType: this.props.data.redirectType,
            refuseFlag: this.props.data.refuseFlag,
            popShow: false,
            loanShow: false,
            improveShow: false
        }
    }

    componentDidMount() {
        var sliderBar = document.querySelector('.slider-area');
        if (sliderBar) {
            var al = this.state.creditLine;
            var lineDiv = document.querySelector('.lineDiv');
            var minDiv = document.querySelector('.minDiv');
            var lineDivBar = document.querySelector(".lineDiv-bar");
            var applyLoan = document.querySelector(".apply-loan");
            var flag = false;

            minDiv.addEventListener("touchstart", function (e) {
                e.preventDefault();
                e.stopPropagation();
                flag = true;
            });

            let getPosition = function (node) {
                var left = node.offsetLeft;
                var top = node.offsetTop;
                var current = node.offsetParent;
                while (current !== null) {
                    left += current.offsetLeft;
                    top += current.offsetTop;
                    current = current.offsetParent;
                }
                return {
                    "left": left,
                    "top": top
                };
            }

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
                    var lowestLoanNum = this.props.data.lowestLoan;
                    var lineWidth = getPosition(minDiv).left - 48;
                    var everyDragDistance = (al - lowestLoanNum) / 100;
                    var times = parseInt(lineWidth / 558 * 100);
                    var loanNum;
                    loanNum = Math.round((lowestLoanNum + parseInt((al - lowestLoanNum) * lineWidth / 558)) / 100) * 100;
                    if (loanNum != al) {
                        this.setState({ show_tip: '' });
                    } else {
                        this.setState({ show_tip: '最高' });
                    }
                    this.setState({ creditLine: loanNum });
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            applyLoan.addEventListener("touchend", function (e) {
                flag = false;
            });

        }
    }

    getBorrowBtn = () => {
        let btn = '--', st = this.props.data.borrowBtnStatus;

        let credit_btn_handler = () => {
            if (this.props.data.redirectType == 1) {
                this.setState({ improveShow: true });
            } else {
                location.href = `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`;
            }
        }

        let available_loan =
            <div className="available-loan">
                <div className="max-loan-money">{this.state.creditLine}</div>
                <div className="max-loan-title">{this.state.show_tip}借款额度(元)</div>
            </div>;

        let unavailable_loan =
            <div className="unavailable-loan">
                <div className="max-loan-money money-empty">暂无额度</div>
                <div className="max-loan-title">
                    <img src="images/warn.png" />
                    仅支持{this.props.data.lowestLoan}元以上借款，快去<a className="loan-word-tip" onClick={() => credit_btn_handler()}>提额</a>吧！
                </div>
            </div>;

        btn = st === 2 || st === 3 ?
            unavailable_loan :
            available_loan;

        return btn
    }

    getMoneySlider = () => {
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
                <div className="start-point-num">{this.props.data.lowestLoan}</div>
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
    }

    getBtnStatus = () => {
        let btn = '--', st = this.props.data.borrowBtnStatus;

        let link;
        if (st == 1) link = '/static/loan/user-card-set/index.html';
        if (st == 2) link = `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`;

        let loanBtnClick = () => {
            st === 101 ?
                $FW.Component.Toast('设置提现卡申请处理中，请稍等') :
                gotoHandler(link)
        }
        let loan_btn = <div className="loan-btn" onClick={loanBtnClick}>申请借款</div>;

        let credit_btn_handler = () => {
            if (this.props.data.redirectType == 1) {
                this.setState({ improveShow: true });
            } else {
                location.href = `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`;
            }
        }

        // let credit_btn =
        //     <a className="loan-btn" href={$FW.Browser.inJRGCApp() && st == 3 ? `/static/loan/user-weixin-new-download/index.html` : `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>
        //         我要提额
        //     </a>;


        let credit_btn =
            <a className="loan-btn" onClick={() => credit_btn_handler()}>
                我要提额
            </a>;

        let btn_list =
            <div className="credit-btn">
                <a className="credit-improvement-btn"
                    href={$FW.Browser.inJRGCApp() && st == 5 ? `/static/loan/user-weixin-new-download/index.html` : `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>
                    我要提额
                </a>
                <a className="credit-apply-btn"
                    href={`/static/loan/apply-want/index.html?creditLine=${this.props.data.canBorrowAmount}&orioleOrderGid=${this.state.orioleOrderGid}&loanNum=${this.state.creditLine}&lowestLoan=${this.props.data.lowestLoan}`}>
                    申请借款</a>
            </div>;

        if (st === 1 || st === 101) btn = loan_btn;
        if (st === 2 || st === 3) btn = credit_btn;
        if (st === 5) btn = btn_list;

        return btn
    }

    getCreditLine = () => {
        let line = '--', st = this.props.data.borrowBtnStatus;
        if (st === 5) line = this.props.data.creditLine;
        return line
    }

    popShowHandler = () => {
        this.setState({ loanShow: true })
    }

    callbackHandler = () => {
        this.setState({ loanShow: false, improveShow: false })
    }

    render() {

        return (
            <div className="apply-loan">
                {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} popTitle={"提示"} />}
                {this.state.improveShow && <ProductDisplay callbackHandler={this.callbackHandler} improve={true} popTitle={"提示"} />}
                <div className={$FW.Browser.inJRGCApp() ? "app-loan-num" : "loan-num"}>
                    {this.getBorrowBtn()}
                </div>
                <div className="loan-info">
                    {this.getMoneySlider()}
                    <div className="loan-info-items">
                        <div className="credit-lines">
                            <div className="credit-money">
                                <span className="credit-money-num">{this.getCreditLine()}</span>
                                <span className="credit-money-title">信用额度(元)</span>
                            </div>
                            <div className="loan-duration">
                                <span className="loan-duration-num">{this.props.data.productPeriod}</span>
                                <span className="loan-duration-title">借款期限(天)</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                {this.getBtnStatus()}
                {this.props.data.redirectType == 1 ? <div className="loan-tip">额度为0别灰心，试试其他<span className="loan-word-tip loan-word-tip-color" onClick={this.popShowHandler}>借款</span></div> : <div className="loan-tip">完善授权信息可减免手续费</div>}
                {/*{this.state.popShow && <div className="pop-bg">*/}
                {/*<div className="pop-panel">*/}
                {/*<div className="pop-title">提示</div>*/}
                {/*<div className="pop-content">为方便您快速借到钱，推荐您尝试申请其他借款产品</div>*/}
                {/*<a className="pop-cancel" href={`/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>仍去提额</a>*/}
                {/*<a className="pop-confirm" href='/static/loan/products/index.html#/'>尝试其他</a>*/}
                {/*</div>*/}
                {/*</div>}*/}
            </div>
        )
    }
};

const USER = $FW.Store.getUserDict();
const user = USER;

$FW.DOMReady(function () {
    let goHome = () => {
        location.href = "/static/loan/products/index.html#/"
    }
    if ($FW.Browser.inJRGCApp()) {
        NativeBridge.setTitle('短期借款')
    } else {
        NativeBridge.setTitle('放心花')
    }
    ReactDOM.render(<Header title={'放心花'} back_handler={goHome} />, HEADER_NODE)
    $FXH.Post(`${API_PATH}/api/loan/v1/baseinfo.json`, {
        productId: $FW.Format.urlQuery().pid || 1
    }).then(data => {
        ReactDOM.render(<ApplyLoan data={data} />, CONTENT_NODE)
    }, e => {
        $FW.Capture(e)
    });
});

function gotoHandler(link) {
        location.href = encodeURI(link);
}

const ApplyLoan = React.createClass({
    getInitialState:function(){
        return {
           availableLoan:this.props.data.creditLine,
           present_availableLoan:this.props.data.creditLine,
           orioleOrderGid:this.props.data.orioleOrderGid,
           creditLine:this.props.data.canBorrowAmount
       }
    },
    componentDidMount:function(){
        var sliderBar = document.querySelector('.slider-area');
        if(sliderBar){
            var al = this.state.creditLine;
            var lineDiv = document.querySelector('.lineDiv');
            var minDiv = document.querySelector('.minDiv');
            var lineDivBar = document.querySelector(".lineDiv-bar");
            var applyLoan = document.querySelector(".apply-loan");
            var flag = false;

            minDiv.addEventListener("touchstart", function(e) {
                e.stopPropagation();
                flag = true;
            });

            applyLoan.addEventListener("touchmove", (e) => {
                if(flag) {
                    var x = e.touches[0].pageX || e.touches[0].clientX;
                    var lineDiv_left = getPosition(lineDiv).left;
                    var minDiv_left = x - lineDiv_left;
                    if(minDiv_left >= lineDiv.offsetWidth - 58) {
                        minDiv_left = lineDiv.offsetWidth - 58;
                    }
                    if(minDiv_left < 0) {
                        minDiv_left = -8;
                    }
                    minDiv.style.left = minDiv_left + "px";
                    lineDivBar.style.width = minDiv_left + 15 + "px";
                    var loanNum = Math.round(parseInt(minDiv_left / (lineDiv.offsetWidth - 58) * al)/100)*100;
                    if(loanNum <= 500){ loanNum = 500}
                    this.setState({creditLine:loanNum});
                }
            });

            applyLoan.addEventListener("touchend", function(e) {
                flag = false;
            });

            function getPosition(node) {
                var left = node.offsetLeft;
                var top = node.offsetTop;
                var current = node.offsetParent;
                while(current != null) {
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
    render : function(){
        let available_loan = <div className="available-loan">
            <div className="max-loan-title">最高借款额度（元）</div>
            <div className="max-loan-money">{this.state.creditLine}</div>
        </div>;

        let unavailable_loan = <div className="unavailable-loan">
            <div className="max-loan-title"><img src="images/warn.png"/>仅支持500元以上借款，快去提额吧！</div>
            <div className="max-loan-money">暂无额度</div>
        </div>;

        let slider_bar =  <div className="slider-area">
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
            <div className="end-point-num">{this.state.creditLine}</div>
        </div>;

        let no_slider_bar = <div className="no-slider-bar">
            <img src="images/no-slider-bar.jpg"/>
        </div>;

        let borrowBtnStatus = this.props.data.borrowBtnStatus;
        let borrowBtnDesc =  this.props.data.borrowBtnDesc;
        let creditNum = this.props.data.creditLine;

        let location;
        if(borrowBtnStatus == 1) location= '/static/loan/user-set-cash-card/index.html';
        if(borrowBtnStatus == 2) location= `https://cashloan.9888.cn/api/credit/v1/creditlist.html?sourceType=2&token=${localStorage.userToken}&userId=${localStorage.userId}`;
        let loan_btn = <div className="loan-btn" onClick={()=>{borrowBtnStatus = 101 ? $FW.Component.Toast('设置提现卡申请处理中，请稍等') :location.href = location}}>申请借款</div>;

        let credit_btn = <div className="loan-btn" onClick={()=>gotoHandler(`https://cashloan.9888.cn/api/credit/v1/creditlist.html?sourceType=2&token=${localStorage.userToken}&userId=${localStorage.userId}`)}>我要提额</div>;

        let btn_list = <div className="credit-btn">
            <div className="credit-improvement-btn" onClick={()=>gotoHandler(`https://cashloan.9888.cn/api/credit/v1/creditlist.html?sourceType=2&token=${localStorage.userToken}&userId=${localStorage.userId}
`)}>我要提额</div>
            <div className="credit-apply-btn" onClick={()=>gotoHandler(`/static/loan/apply-want-loan/index.html?creditLine=${this.props.data.canBorrowAmount}&orioleOrderGid=${this.state.orioleOrderGid}&loanNum=${this.state.creditLine}`)}>我要借款</div>
        </div>;


        let btnStatus;
        let moneySlider;
        let loanStatus;
        let creditLine;
        if(borrowBtnStatus==1 || borrowBtnStatus==101){
            btnStatus = loan_btn, moneySlider = slider_bar, loanStatus = available_loan, creditLine = "--";
        }
        if(borrowBtnStatus==2) {
            btnStatus = credit_btn, moneySlider = no_slider_bar, loanStatus = unavailable_loan, creditLine = "--";
        }
        if(borrowBtnStatus==3){
            btnStatus = credit_btn;
            moneySlider = no_slider_bar;
            loanStatus = unavailable_loan;
            $FW.Component.Toast(borrowBtnDesc);
            creditLine = "--";
        }
        if(borrowBtnStatus==5){
            btnStatus = btn_list, moneySlider = slider_bar, loanStatus = available_loan, creditLine = creditNum;
        }

        return (
           <div className="apply-loan">
               <div className="header">现金贷</div>
                <div className="loan-num">
                    {loanStatus}
                </div>
                <div className="loan-info">
                    {moneySlider}
                    <div className="loan-info-items">
                        <div className="credit-lines">
                            <div className="credit-money">
                                <span className="credit-money-title">信用额度（元）</span>
                                <span className="credit-money-num">{creditLine}</span>
                            </div>
                            <div className="loan-duration">
                                <span className="loan-duration-title">借款期限（天）</span>
                                <span className="loan-duration-num">{this.props.data.productPeriod}</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                {btnStatus}
                <div className="loan-tip">完善授权信息可减免手续费</div>
           </div>
        )
    }
});

$FW.DOMReady(function() {
    console.log(localStorage.userId)
        $FW.Ajax({
            url: `${API_PATH}api/loan/v1/baseinfo.json`,
            method: "post",
            data: {token:$FW.Store.getUserToken(), userGid:$FW.Store.getUserGid(),userId:$FW.Store.getUserId(), sourceType:3, productId:1}
        }).then((data) => {
            console.log(data)
            ReactDOM.render(<ApplyLoan data={data}/>, document.getElementById('cnt'))
        }, (error) => console.log(error));
    ReactDOM.render(<BottomNavBar index={1}/>, document.getElementById('bottom-nav-bar'));
});


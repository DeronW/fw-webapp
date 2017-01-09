const ApplyLoan = React.createClass({
    getInitialState:function(){
        return {
           availableLoan:10000,
           present_availableLoan:10000
        }
    },
    componentDidMount:function(){
        var al = this.state.availableLoan;
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
                lineDivBar.style.width = minDiv_left + 10 + "px";
                var loanNum = Math.round(parseInt(minDiv_left / (lineDiv.offsetWidth - 58) * al)/100)*100;
                if(loanNum <= 500){ loanNum = 500}
                this.setState({availableLoan:loanNum});
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
    },
    render : function(){
        return (
           <div className="apply-loan">
               <div className="header">现金贷</div>
                <div className="loan-num">
                     <div className="max-loan-title">最高借款额度（元）</div>
                     <div className="max-loan-money">{this.state.availableLoan}</div>
                </div>
                <div className="loan-info">
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
                        <div className="end-point-num">{this.state.present_availableLoan}</div>
                    </div>
                    <div className="loan-info-items">
                        <div className="credit-lines">
                            <div className="credit-money">
                                <span className="credit-money-title">信用额度（元）</span>
                                <span className="credit-money-num">100000.00</span>
                            </div>
                            <div className="loan-duration">
                                <span className="loan-duration-title">借款期限（天）</span>
                                <span className="loan-duration-num">210</span>
                            </div>
                        </div>
                        <span className="vertical-line"></span>
                    </div>
                </div>
                <div className="loan-btn">申请借款</div>
                <div className="credit-btn">
                    <div className="credit-improvement-btn">我要提额</div>
                    <div className="credit-apply-btn">我要借款</div>
                </div>
                <div className="loan-tip">完善授权信息可减免手续费</div>
           </div>
        )
    }
});

$FW.DOMReady(function() {
    ReactDOM.render(<ApplyLoan/>, document.getElementById('cnt'));
    ReactDOM.render(<BottomNavBar index={1}/>, document.getElementById('bottom-nav-bar'));
});


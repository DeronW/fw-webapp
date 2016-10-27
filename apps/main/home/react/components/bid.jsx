const Bid = React.createClass({
    getStatusText: function (n) {
        if (n == 0) return '未审核';
        if (n == 1) return "等待确认";
        if (n == 2) return "投资";
        if (n == 3) return "流标";
        if (n == 4) return "满标";
        if (n == 5) return "还款中";
        if (n == 6) return "已还清";
        return 'UNKNOWN';
    },
    render: function () {
        let {bid} = this.props;

        let remain = parseInt(bid.borrowAmount - bid.completeLoan);

        let state_text = this.getStatusText(bid.status);

        let percent = 0;
        if (state_text == '投资') {
            percent = 100 * parseInt(bid.completeLoan) / parseInt(bid.borrowAmount);
        } else if (state_text == '满标') {
            percent = 100
        }

        if (remain > 0) {
            remain = `剩${remain / 10000}万`
        } else {
            remain = `共${bid.borrowAmount / 10000}万`
        }

        return (
            <a className="bid" onClick={()=>this.linkHandler(bid.id)}>
                <div className="title">
                    {bid.prdName}
                    <i className="icon icon-protect"> </i>
                </div>
                <div className="detail">
                    <div className="interest">{bid.annualRate}<span>%</span></div>
                    <div className="day">{bid.repayPeriodtext}</div>
                    <div className="remain">{remain}</div   >
                    <div className="start">100元起</div>
                    <div className="way">按月等额</div>
                    <div className="progress">
                        <div className={state_text == '投资' ? null : "full"}>{state_text}</div>
                        <SVGCircleProgress percent={percent} radius={70} animate={false}/>
                    </div>
                </div>
            </a>
        )
    }
});
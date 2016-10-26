const Bid = React.createClass({
    render: function () {
        let {bid} = this.props;
        
        let remain = parseInt(bid.borrowAmount - bid.completeLoan);

        let btn = remain > 0 ?
            <div>投资</div> :
            <div className="full">满标</div>;

        let percent = 100 * parseInt(bid.completeLoan) / parseInt(bid.borrowAmount);

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
                        {btn}
                        <SVGCircleProgress percent={percent} radius={70} animate={false}/>
                    </div>
                </div>
            </a>
        )
    }
});
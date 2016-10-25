const Project = React.createClass({
    getInitialState: function () {
        return {
            tab: 'new',
            page: 0,
            total_page: 1,
            bids: []
        }
    },
    componentDidMount: function () {
        this.loadBids()
    },
    loadBids: function () {
        let url = this.state.tab == 'new' ?
            `${API_PATH}mpwap/newPrdClaims/dataList.shtml` :
            `${API_PATH}mpwap/newPrdTransfer/dataList.shtml`;

        $FW.Ajax({
            url: url,
            // method: 'post',
            data: {},
            complete: (data) => {
                let page = data.pageData.pagination;
                let bids = this.state.bids;
                bids = bids.concat(data.pageData.result);
                this.setState({page: page.pageNo, total_page: page.totalPage, bids: bids});
            },
            fail: () => true
        })
    },
    clickHandler: function () {
        this.setState({tab: this.state.tab == 'new' ? 'transfer' : 'new'})
    },
    render: function () {

        let bid = (data) => {
            return (
                <div className="bid" key={data.prdNum}>
                    <div className="title">
                        {data.prdName}
                        <i className="icon "> </i>
                    </div>
                    <div className="detail">
                        <div className="interest">13</div>
                        <div className="">20~90 day</div>
                        <div className="">按月等额</div>
                        <div className="">100元起</div>
                        <div className="">可够301,123,234元</div>
                        <div className="progress">
                            <SVGCircleProgress percent={78}/>
                        </div>
                    </div>
                </div>
            )
        };

        console.log(this.state.bids[0]);

        return (
            <div className="project">
                <div className="tabs" onClick={this.clickHandler}>
                    <a className={this.state.tab == "new" ? "active" : ""}>最新项目</a>
                    <a className={this.state.tab == "new" ? "" : "active"}>债券转让</a>
                </div>
                <div> {this.state.bids.map(bid)} </div>
            </div>
        )
    }
});
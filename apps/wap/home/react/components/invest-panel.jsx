const InvestPanel = React.createClass({
    getInitialState: function () {

        return {
            tab: location.hash == '#invest-transfer' ? 'transfer' : 'new',
            page: 0,
            total_page: 1,
            bids: []
        }
    },
    componentDidMount: function () {
        this.loadBids();
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
                this.setState({
                    page: page.pageNo,
                    total_page: page.totalPage,
                    bids: bids
                });
            },
            fail: () => true
        })
    },
    toggleHandler: function () {
        this.setState({
            tab: this.state.tab == 'new' ? 'transfer' : 'new',
            page: 0,
            total_page: 1,
            bids: []
        }, ()=> {
            this.loadBids();
            location.hash = `#invest-${this.state.tab}`;
        });

    },
    linkHandler: function (value) {
        let g = (id) => document.getElementById(id);
        g('prdID').value = value;
        g('form').submit();
    },
    render: function () {
        return (
            <div className="projects">
                <div className="tabs" onClick={this.toggleHandler}>
                    <a className={this.state.tab == "new" ? "active" : ""}>最新项目</a>
                    <a className={this.state.tab == "new" ? "" : "active"}>债券转让</a>
                </div>
                <div> {this.state.bids.map((b)=> <Bid bid={b} key={b.prdNum}/>)} </div>
                <a onClick={this.loadBids} className="btn-load-more">点击加载更多</a>
            </div>
        )
    }
});
const MyPrizeRecord = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            products: [],
            hasNextPage: true
        }
    },
    componentDidMount: function () {
        this.loadMoreProductHandler();
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },
    appendProducts: function (data) {
        var list = this.state.products.slice();
        var newList = list.concat(data.myPrizeList || []);
        this.setState({products: newList})
    },
    loadMoreProductHandler: function (done) {
        this.state.hasNextPage ? $FW.Ajax({
            url: `${API_PATH}mall/api/v1/MyPrizeRecordList.json`, //获得中奖记录
            //url:"http://10.10.100.112/mockjs/4/mall/api/v1/MyPrizeRecordList.json",
            data: {
                num: 20,
                pages: this.state.page
            },
            enable_loading: 'mini',
            success: data => {
                this.appendProducts(data);
                this.setState({
                    page: this.state.page + 1,
                    hasNextPage: data.hasNextPage
                });
                done && done();
            }
        }) : null;

    },
    render: function () {
        let productsList = (name, index)=> {
            return (
                <div className="prize-record-li" key={index}>
                    <div className="title">{name.title}</div>
                    <div className="score">0123456789-{name.score}工分</div>
                    <div className="activity">{name.activity}</div>
                    <div className="time">{name.time}</div>
                </div>
            )
        };
        let noData = ()=><div className="prize-record-no">暂无中奖记录</div>;
        return (
            <div className={this.state.products.length>0?"prize-record-list":"prize-record-list no"}>
                {this.state.products.length > 0 ? this.state.products.map(productsList) : noData()}
            </div>
        )
    }
})

$FW.DOMReady(function () {
    var title = '中奖记录';
    ReactDOM.render(<Header title={title}/>, HEADER_NODE);
    ReactDOM.render(<MyPrizeRecord />, CONTENT_NODE)
});

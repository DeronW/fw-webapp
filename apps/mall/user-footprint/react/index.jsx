const FootPrint = React.createClass({
    getInitialState: function () {
        return {
            list: [],
            hasNextPage: true,
            page: 0
        }
    },
    componentDidMount: function () {
        this.loadMoreHandler();
        $FW.Event.touchBottom(this.loadMoreHandler);
    },
    loadMoreHandler: function (done) {
        let {page, hasNextPage} = this.state;
        if (!hasNextPage) return;
        $FW.Ajax(`${API_PATH}mall/api/v1/footPrintList.json?num=10&pageNo=${page}`)
            .then(data => {
                this.setState({
                    list: list.concat(data.list || []),
                    page: page + 1,
                    hasNextPage: data.hasNextPage
                });
                done && done()
            });
    },
    clearAllHandler: function () {
        $FW.Ajax({
            url: `${API_PATH}mall/api/v1/footPrintDel.json`,//足迹删除
            data: {
                type: 'all',
                id: ''
            },
            method: 'post',
            success: function () {
                this.setState({ list: [] });
            }
        });
    },
    delHandler: function (id, key) {
        $FW.Ajax({
            url: `${API_PATH}mall/api/v1/footPrintDel.json`,//足迹删除
            data: {
                type: 'one',
                id: id
            },
            method: 'post',
            success: function () {
                let list = this.state.list
                list.splice(key, 1)
                this.setState({ list: list });
            }
        });
    },
    render: function () {
        let myList = (list, key) => {
            let date = key > 0 && (this.state.list[key - 1].date == list.date) ? null : <div className="footPrint-data">{this.state.list[key].date}</div>;
            let price = list.price ? <span className="footPrint-price"><span>¥</span>{$FW.Format.currency(list.price)}</span> : null;
            let score = list.score ? <span className="footPrint-score">{list.score}工分</span> : null;
            let priceBox = () => {
                return (
                    <div className="footPrint-pay" >
                        {price}
                        {list.price && list.score ? <span className="footPrint-plus">+</span> : null}
                        {score}
                    </div>
                )
            };
            return (
                <div key={key}>
                    {date}
                    <div className="footPrint-li">
                        <a href="#" className="footPrint-a">
                            <img src={list.img} className="footPrint-img" />
                            <div className="footPrint-detail">
                                <div className="footPrint-title">{list.title}</div>
                                {priceBox()}
                            </div>
                        </a>
                        <div className="footPrint-del" onClick={() => { this.delHandler(list.id, key) } }></div>
                    </div>
                </div>
            )
        };
        return (
            <div className="foot-print">
                <div className="footPrint-clear" style={{ "zIndex": 10 }} onClick={this.clearAllHandler}>清空</div>
                <div className="footPrint-ul">
                    {this.state.list.map(myList)}
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"足迹"} />, HEADER_NODE);
    ReactDOM.render(<FootPrint />, CONTENT_NODE);
});

const CashRecords = React.createClass({
    getInitialState: function () {
        return {
            page: 0,
            totalPage: null,
            month: [],
            listFalse: false
        }
    },
    componentDidMount: function () {
        this.loadRecordHandler();
        $FW.Event.touchBottom(this.loadRecordHandler)
    },
    loadRecordHandler: function (done) {
        // var records = this.state.records.concat();
        if (this.state.totalPage && this.state.page >= this.state.totalPage) return;

        // 首山的接口不能添加 API_PATH 参数, 它的域名是独立的: assets-api.9888.cn
        $FW.Ajax({
            url: "/api/sspay/withdraw/v1/getWithDrawRecord.shtml",
            data: { pageSize: 20, page: this.state.page + 1 },
            enable_loading: true,
            success: (data) => {
                let month = this.state.month;

                if (data.pageData.result.length == 0) {
                    this.setState({
                        listFalse: true
                    });
                }

                data.pageData.result.forEach((i) => insertRecord(month, format_record(i)));

                this.setState({
                    month: month,
                    page: this.state.page + 1,
                    totalPage: parseInt(data.pageData.pagination.totalPage)
                }, done)
            }
        });

        function format_record(record) {
            // "2016-09-23 11:03:25"
            // TODO: should use timestamp directly
            var r = record.happenTime.split(' ')[0].split('-');
            var d = new Date(r[0], r[1] - 1, r[2]);
            return {
                money: record.reflectAmount,
                timestamp: d.getTime(),
                datetime: record.happenTime,
                state: parseInt(record.handleState),
                order_id: record.indentNo,
                withdrawMode: parseInt(record.withdrawMode)
            }
        }

        function get_date(time) {
            var d = new Date(time);
            return d.getFullYear() + '年' + (d.getMonth() + 1) + '月'
        }

        function insertRecord(month, record) {
            var i, date, new_flag = true;
            date = get_date(record.timestamp);

            for (i = 0; i < month.length; i++) {
                if (date == month[i].title) {
                    new_flag = false;
                    month[i].records.push(record);
                    break;
                }
            }
            if (new_flag) {
                month.push({
                    title: date,
                    records: [record]
                })
            }
        }
    },
    stateText: function (n) {
        // 0：未处理；1：出纳通过；2：出纳拒绝；3：会计通过；4：会计拒绝；5：预审拒绝；6：退款会计审核中；7：退款会计批准；8：退款会计拒绝；9：提现成功；10：提现失败；11：处理中
        if (n == 0) return '未处理';
        if (n == 1) return '出纳通过';
        if (n == 2) return '出纳拒绝';
        if (n == 3) return '会计通过';
        if (n == 4) return '会计拒绝';
        if (n == 5) return '预审拒绝';
        if (n == 6) return '退款会计审核中';
        if (n == 7) return '退款会计批准';
        if (n == 8) return '退款会计拒绝';
        if (n == 9) return '提现成功';
        if (n == 10) return '提现失败';
        if (n == 11) return '处理中';
    },
    render: function () {
        let record = (data, index) => {
            return (
                <div className="record" key={index}>
                    <div className="first-line">
                        <div> 订单号</div>
                        <div className="order-id"> {data.order_id} </div>
                        <div className={"state state-" + data.state}>
                            {this.stateText(data.state)}</div>
                    </div>
                    <div className="second-line">
                        金额
                        <div className="money">&yen;{data.money}</div>
                    </div>
                    {
                        data.withdrawMode != undefined || data.withdrawMode != "" ?
                            <div className="second-line">提现方式
                                <div className="money">{data.withdrawMode == 1 ? "实时到帐" : "大额提现"}</div>
                            </div> : ""
                    }


                    <div className="third-line">
                        发生时间
                        <div className="time">{data.datetime}</div>
                    </div>
                </div>
            )
        };

        let month = (data, index) => {
            return (
                <div className="month" key={index}>
                    <div className="month-title">{data.title}</div>
                    {data.records.map(record)}
                </div>
            )
        };

        let empty = this.state.listFalse ? <div className="empty-records">暂无记录</div> : null;
        let noMore = this.state.page == this.state.totalPage ?
            <div className="all-shown">已全部展示</div> : null;

        return (
            <div>
                {this.state.month.map(month)}
                {noMore}
                {empty}
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'提现记录'} />, HEADER_NODE);
    ReactDOM.render(<CashRecords />, CONTENT_NODE);
});

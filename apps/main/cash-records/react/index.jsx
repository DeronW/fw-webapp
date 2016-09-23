'use strict';

const API_PATH = document.getElementById("api-path").value;

const CashRecords = React.createClass({
    getInitialState: function () {
        return {
            page: 0,
            totalPage: null,
            month: []
        }
    },
    componentDidMount: function () {
        this.loadRecordHandler();
        $FW.Event.touchBottom(this.loadRecordHandler)
    },
    loadRecordHandler: function (done) {
        // var records = this.state.records.concat();
        if (this.state.totalPage && this.state.page >= this.state.totalPage) return;

        $FW.Ajax({
            url: API_PATH + "/mpwap/api/v1/getWithDrawRecord.shtml",
            data: {pageSize: 20, page: this.state.page + 1},
            enable_loading: true,
            success: (data) => {
                let month = this.state.month;

                data.pageData.result.forEach((i)=>insertRecord(month, format_record(i)));

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
            var d = new Date(r[0], r[1] + 1, r[2]);
            return {
                money: record.reflectAmount,
                timestamp: d.getTime(),
                state: parseInt(record.handleState),
                order_id: record.indentNo
            }
        }

        function get_date(time) {
            var d = new Date(time);
            return d.getFullYear() + '年' + d.getMonth() + '月'
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

        // this.setState({
        //     month: [{
        //         title: '2016年8月',
        //         records: [{
        //             money: '425',
        //             time: (+new Date()) / 1000,
        //             state: 0,
        //             order_id: 'ETEN201608120000'
        //         }]
        //     }]
        // })
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
                    <div className="sep-line"></div>
                    <div className="third-line">
                        发生时间
                        <div className="time">{'sdfsdf'}</div>
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

        return (
            <div> {this.state.month.map(month)} </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'提现记录'}/>, document.getElementById('header'));
    ReactDOM.render(<CashRecords />, document.getElementById("cnt"));

    document.body.onscroll = function () {
        // var titles = document.querySelectorAll('.month-title');

        // for (var i = 0; i < titles.length; i++) {
        //     var e = titles[i];
        //     if (e.offsetTop - document.body.scrollTop < 120) {
        //         e.className = 'month-title title-fixed';
        //     } else {
        //         e.className = 'month-title';
        //         break;
        //     }
        // }
    }
});
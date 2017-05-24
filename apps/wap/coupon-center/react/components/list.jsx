class List extends React.Component {
    constructor(props) {
        super(props)
        this.timer;
        this.state = {
            buyingList: this.props.list,
            current_time: ""
        }
        this.timestampHandler = this.timestampHandler.bind(this)
        // this.countDown = this.countDown.bind(this)
        this.getHandler = this.getHandler.bind(this)
        this.jump = this.jump.bind(this)
    }

    componentDidMount() {
        $FW.Ajax({
            url: API_PATH + '/activity/v1/timestamp.json',
            type: 'get',
            data: {},
            dataType: 'json',
            fail: () => true,
            complete: data => {
                // console.log(data);
                // console.log(data.data.timestamp)
                this.setState({currentTime: data.data.timestamp})
            }
        });


    }

    componentWillReceiveProps(nextProps) {
        // this.countDown(nextProps.list);
    }

    timestampHandler(timestamp) {
        let timeTrans = new Date(parseInt(timestamp) * 1000);
        // console.log(timeTrans.toLocaleString('chinese', {hour12: false}).toString().substr(-8, 8))
        return (timeTrans.toLocaleString('chinese', {hour12: false}).toString().substr(-8, 8));
    }

    countDown(time, index) {
        clearInterval(this.timer);
        let createdTime = time;
        // console.log(createdTime + "11111111111111")
        let mm = createdTime / 1000;
        let m = Math.floor(mm / 60 % 60);
        let s = (mm % 60).toFixed(0);
        this.timer = setInterval(() => {
            if (s < 10) {
                s = "0" + s;
            }
            document.getElementById(index + "limit_time").innerHTML = m + ':' + s;
            s--;
            if (s < 0) {
                s = 59;
                m--;
                if (m == -1) {
                    clearInterval(this.timer);
                    this.props.request();
                }
                if (m < 10) {
                    m = "0" + m;
                }
            }
        }, 1000)
    }

    getHandler() {
        clearInterval(this.timer);
        this.props.request();//重新请求数据
    }

    jump() {
        location.href = "/static/wap/faq/index.html"//跳转到投资的列表页
    }

    render() {
        let {buyingList} = this.state;
        let buy_func = (item, index) => {
            let content;
            if (item.receiveStatus == "00") {
                content = <div>
                    <div className="content_title">开抢时间</div>
                    <div className="content_time">{this.timestampHandler(item.startTime)}</div>
                    <div className="content_state_gray">领取</div>
                </div>
            } else if (item.receiveStatus == "01") {
                content = <div>
                    <div className="content_title">倒计时</div>
                    <div className="content_time"
                         id={index + "limit_time"}>{this.countDown(item.intervalMilli, index)}</div>
                    <div className="content_state_gray">领取</div>
                </div>
            } else if (item.receiveStatus == "02") {
                content = <div onClick={item.isGet == "0" ? this.getHandler : this.jump}>
                    <div className="content_title">剩余</div>
                    <div className="content_time">{item.restPercent}</div>
                    {item.isGet == "0" ? <a className="content_state_red">领取</a> :
                        <a className="content_state_red">去投资</a>
                    }

                </div>
            }
            return <div className="list_item" key={index}>
                <div className="item_left">
                    <div className="detail_left">
                    <div className="list_amount"><span className="list_rmb">￥</span>{item.limitAmount}</div>
                    <div className="list_name">{item.sourceTitle}</div>
                </div>
                    <div className="detail_right">
                        <div>满￥{}可用</div>
                        <div>任意期限可用</div>
                        <div>有效期至</div>
                        <div>适用：</div>
                    </div>
                </div>
                <div className="item_right">
                    {content}
                </div>
            </div>


        }
        return <div className="list_box">
            <div className="list_box_title">
                <img className="icon_limit" src="images/icon-limit.png"/>
                <span className="limit_title">限时抢购</span>
            </div>
            {buyingList.length > 0 && buyingList.map(buy_func)}
        </div>
    }
}

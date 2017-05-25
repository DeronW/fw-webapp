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
        this.drawCircle = this.drawCircle.bind(this)
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
        })
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

    getHandler(item) {
        // clearInterval(this.timer);
        item.isGet ="1";
        this.props.request();//重新请求数据
    }

    jump() {
        location.href = "/static/wap/faq/index.html"//跳转到投资的列表页
    }

    drawCircle(id, progress) {
        let canvas = document.getElementById(id),
            ctx = canvas.getContext("2d"),
            percent = progress, //最终百分比
            circleX = canvas.width / 2, //中心x坐标
            circleY = canvas.height / 2, //中心y坐标
            radius = 50, //圆环半径
            lineWidth = 5, //圆形线条的宽度
            fontSize = 20;
        //字体大小
        //画圆
        let circle = (cx, cy, r) => {
            ctx.beginPath();
            //ctx.moveTo(cx + r, cy);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = '#e3e3e3';
            ctx.arc(cx, cy, r, Math.PI * 2, false);
            ctx.stroke();
        }
        //画弧线
        let sector = (cx, cy, r, startAngle, endAngle, anti) => {
            ctx.beginPath();
            ctx.lineWidth = lineWidth;

            // 渐变色 - 可自定义
            let linGrad = ctx.createLinearGradient(
                circleX - radius - lineWidth, circleY, circleX + radius + lineWidth, circleY
            );
            linGrad.addColorStop(0.0, '#fa5052');
            linGrad.addColorStop(1.0, '#fa5052');
            ctx.strokeStyle = linGrad;

            //圆弧两端的样式
            ctx.lineCap = 'round';

            //圆弧
            ctx.arc(
                cx, cy, r,
                (Math.PI * 1.5),
                (Math.PI * 1.5) + endAngle / 100 * (Math.PI * 2),
                false
            );
            ctx.stroke();
        }
        //刷新
        let loading = () => {
            if (process >= percent) {
                clearInterval(circleLoading);
            }
            //清除canvas内容
            ctx.clearRect(0, 0, circleX * 2, circleY * 2);

            //中间的字
            ctx.font = fontSize + 'px April';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#333';
            ctx.fillText('剩余', circleX * 1, circleY * 0.9);
            ctx.fillStyle = '#555';
            ctx.fontSize = 26
            ctx.fillText(parseFloat(process).toFixed(0) + '%', circleX, circleY * 1.2);
            //圆形
            circle(circleX, circleY, radius);
            //圆弧
            sector(circleX, circleY, radius, Math.PI * 2, process);
            //控制结束时动画的速度
            if (process / percent > 0.90) {
                process += 0.30;
            } else if (process / percent > 0.80) {
                process += 0.55;
            } else if (process / percent > 0.70) {
                process += 0.75;
            } else {
                process += 1.0;
            }
        }
        let process = 0.0;
        //进度
        let circleLoading = window.setInterval(() => {
            loading();
        }, 10);

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
                content = <div onClick={()=>{item.isGet == "0" ? this.getHandler(item) : this.jump()}}>
                    <canvas id={index+"canvas"} width="120" height="120"></canvas>
                    {console.log(document.getElementById(index+'canvas'))}
                    {React.isValidElement(document.getElementById(index+'canvas')?this.drawCircle((index+"canvas"), parseInt(item.restPercent)):null)}
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


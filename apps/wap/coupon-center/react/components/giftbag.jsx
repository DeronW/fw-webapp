class GiftBag extends React.Component {
    constructor(props) {
        super(props)
        this.limit_time;
        this.state = {
            gift_list: this.props.list,
            pop_show: false,
            pop_info: null,
        }
        this.desHandler = this.desHandler.bind(this)
        this.getHandler = this.getHandler.bind(this)
        // this.countDown = this.countDown(this)
        this.timestampHandler = this.timestampHandler.bind(this)
        this.close_pop = this.close_pop.bind(this)
        // this.drawCircleGift = this.drawCircleGift.bind(this)
    }

    componentDidMount() {
        //获取当前时间
        $FW.Ajax({
            url: API_PATH + '/activity/v1/timestamp.json',
            type: 'get',
            data: {},
            dataType: 'json',
            fail: () => true,
            complete: data => {
                // console.log(data);
                // console.log(data.data.timestamp)
            }
        });
        this.props.request();
    }

    desHandler(code) {
        console.log(code);
        $FW.Ajax({
            url: API_PATH + '/api/couponCenter/v2/grabCoupon.json',
            type: 'post',
            data: {
                code: code
            },
            dataType: 'json',
            fail: () => true,
            complete: data => {
                // console.log(data);
                this.setState({ pop_show: true, pop_info: data.data })
                console.log(this.state.pop_info)
                // console.log(this.state.pop_show,this.state.pop_info)

            }
        });


    }

    close_pop() {
        this.setState({ pop_show: false })
    }

    timestampHandler(timestamp) {
        var timeTrans = new Date(parseInt(timestamp) * 1000);
        // console.log(timeTrans.toLocaleString('chinese',{hour12:false}).toString().substr(-8,8))
        return (timeTrans.toLocaleString('chinese', { hour12: false }).toString().substr(-8, 8));
    }

    countDown(time, number) {
        let created = time;
        // console.log(created + "11111111111111")
        let mma = created / 1000;
        let ma = Math.floor(mma / 60 % 60);
        let sa = (mma % 60).toFixed(0);
        clearInterval(this.limit_time);
        this.limit_time = setInterval(() => {
            if (sa < 10) {
                sa = "0" + sa;
            }
            document.getElementById(number + "gift_time").innerHTML = ma + ':' + sa;
            sa--;
            if (sa < 0) {
                sa = 59;
                ma--;
                if (ma == -1) {
                    clearInterval(this.limit_time);
                    this.props.request();//重新请求数据
                }
                if (ma < 10) {
                    ma = "0" + ma;
                }
            }
        }, 1000)
    }

    getHandler(item) {
        item.isGet = "1";
        this.props.request() //用户点击后重新请求，改变数据
    }
    jump() {
        location.href = "/static/wap/faq/index.html"//跳转到投资的列表页
    }
    drawCircleGift(id, progress) {
        console.log(11111111111111)
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
        let { pop_show, gift_list, pop_info } = this.state;
        let pop_show_dis = pop_show ? "block" : "none";
        let gift_left_section = (item) => {
            return <div className="gift_item_left" onClick={() => this.desHandler(item.code)}>
                <div className="gift_one_title">
                    <div className="gift_amount">
                        <span className="amount_rmb">￥</span>{item.amount}
                    </div>
                    <div className="gift_type">
                        {item.sourceTitle}
                    </div>
                </div>
                <div className="gift_one_des">
                    <div className="cash_line">返现券:共￥{item.backCashTotal}({item.backCashCount})张</div>
                    <div className="rate_line">返息券:{}{}</div>
                    <div className="bean_line">工<span className="space"></span>豆:共￥{item.beanTotal}</div>
                </div>
            </div>
        }
        let gift_func = (item, index) => {
            let gift_item_right_content;
            if (item.receiveStatus == "00") {
                gift_item_right_content = <div>
                    {gift_left_section(item)}
                    <div className="gift_item_right">
                        <div className="gift_right_title">
                            开抢时间
                        </div>
                        <div className="gift_right_starttime">
                            {this.timestampHandler(item.startTime)}
                        </div>
                        <div className="get_state_gray">
                            领取
                        </div>
                    </div>
                </div>
            } else if (item.receiveStatus == "01") {
                gift_item_right_content = <div >
                    {gift_left_section(item)}
                    <div className="gift_item_right">
                        <div className="gift_right_title">
                            倒计时
                        </div>
                        <div className="gift_right_starttime"
                            id={index + "gift_time"}>
                            {this.countDown(item.intervalMilli, index)}
                        </div>
                        <div className="get_state_gray">
                            领取
                        </div>
                    </div>
                </div>
            } else if (item.receiveStatus == "02") {
                gift_item_right_content = <div key={index}>
                    {gift_left_section(item)}
                    <div className="gift_item_right" onClick={() => { item.isGet == "0" ? this.getHandler(item) : this.jump() }}>
                        <canvas id={index + "canvas_gift"} width="120" height="120"></canvas>
                        {console.log(document.getElementById(index + 'canvas_gift'))}
                        {React.isValidElement(document.getElementById(index + 'canvas_gift') ? this.drawCircleGift((index + "canvas_gift"), parseInt(item.restPercent)) : null)}
                        {item.isGet == "0" ? <a className="content_state_red">领取</a> :
                            <a className="content_state_red">去投资</a>
                        }
                        {/*<div className="gift_right_title">*/}
                        {/*剩余*/}
                        {/*</div>*/}
                        {/*<div className="gift_right_starttime">*/}
                        {/*{item.restPercent}*/}
                        {/*</div>*/}
                        {/*<div className="get_state_red">*/}
                        {/*领取*/}
                        {/*</div>*/}
                    </div>
                </div>
            } else if (item.receiveStatus == "03") {
                gift_item_right_content = <div>
                    {gift_left_section(item)}
                    <div className="gift_item_right">
                        <img src="images/icon-get.png" />
                        <div className="get_state_red">
                            领取
                        </div>
                    </div>
                </div>
            }
            return <div className="gift_item" key={index}>
                {gift_item_right_content}
            </div>
        }
        let pop_content_title_func = () => {
            let pop_content_title;
            if (pop_info && pop_info.type == "1") {
                pop_content_title = "返现券"
                return pop_content_title;
            } else if (pop_info && pop_info.type == "2") {
                pop_content_title = "返息券"
                return pop_content_title;
            } else if (pop_info && pop_info.type == "3") {
                pop_content_title = "大礼包"
                return pop_content_title;
            } else if (pop_info && pop_info.type == "4") {
                pop_content_title = "工豆"
                return pop_content_title;
            }
        }
        return <div className="giftbag_box">
            <div className="gift_box_title">
                <img src="images/icon-gift.png" className="icon_gift" />
                <span className="gift_title">优惠券礼包</span>
            </div>
            {gift_list.length > 0 && gift_list.map(gift_func)}
            <div id="pop" style={{ display: pop_show_dis }}>
                <div className="pop_content">
                    <div className="pop_title">{pop_info && pop_info.sourceTitle}</div>
                    <div className="pop_content_title">1、{pop_content_title_func()}</div>
                    <div className="close-btn" onClick={this.close_pop}>确定</div>
                </div>
            </div>
        </div>
    }
}
//
// class PopGiftDes extends React.Component {
//     constructor(props){
//         super(props)
//     }
//     componentDidMount(){
//
//     }
//     render(){
//
//     }
//     // render(){
//     //     let {isshow,control} = this.props;
//     //     let closestyle = isshow ? "block" : "none"
//     //     return <div className="pop_gift_des" style={{display: closestyle}}>
//     //         这是礼包优惠券的信息展示盒子
//     //         <div>
//     //         </div>
//     //         <div className="des_close" onClick={() => {
//     //             control()
//     //         }}>+
//     //         </div>
//     //     </div>
//     // }
//
// }

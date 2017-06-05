class GiftBag extends React.Component {
    constructor(props) {
        super(props)
        this.limit_time;
        this.state = {
            gift_list: this.props.list,
            pop_show: false,
            pop_info: [],
            gift_name: "",
        }
        this.desHandler = this.desHandler.bind(this)
        this.getHandler = this.getHandler.bind(this)
        // this.countDown = this.countDown(this)
        this.timestampHandler = this.timestampHandler.bind(this)
        this.close_pop = this.close_pop.bind(this)
        // this.drawCircleGift = this.drawCircleGift.bind(this)
    }

    componentDidMount() {
        this.props.request();
    }

    desHandler(item) {
        console.log(item.code);
        console.log(item.name);
        $FW.Ajax({
            url: API_PATH + '/mpwap/api/v2/getCouponInfo.shtml',
            method: 'post',
            data: {
                code: item.code
            },
            success: data => {
                console.log(data.giftBagDetail)
                this.setState({pop_show: true, pop_info: data.giftBagDetail, gift_name: item.name})
                console.log(this.state.pop_info)
                // this.props.request()
            },
        });

    }

    close_pop() {
        this.setState({pop_show: false})
    }

    timestampHandler(timestamp) {
        // var timeTrans = new Date(parseInt(timestamp) * 1000);
        // console.log(timeTrans.toLocaleString('chinese',{hour12:false}).toString().substr(-8,8))
        return (timestamp.toString().substr(-8, 8));
    }

    countDown(time, number,item) {
        let hh = parseInt(time/3600);
        let ma =parseInt((time-hh*3600)/60);
        let sa = parseInt((time-hh*3600)%60);
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
                    item.receiveStatus ="02";
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
        $FW.Ajax({
            url: API_PATH + '/mpwap/api/v2/grabCoupon.shtml',
            method: 'post',
            data: {
                code: item.code,
                couponType: item.type
            },
            success: data => {
                $FW.Component.Alert("领取成功")
            },
        });
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
        let {pop_show, gift_list, pop_info, gift_name} = this.state;
        let pop_show_dis = pop_show ? "block" : "none";
        let gift_left_section = (item) => {
            let gift_name;
            if (item.backCashCount == "0") {
                if (item.couponDetailList) {
                    gift_name = "+" + item.backRateTotal
                }
            } else {
                gift_name = "￥" + item.backCashTotal
            }
            let detail_func = (item, index) => {
                return <span key={index}>
                    {item}
                </span>
            }
            return <div className="gift_item_left" onClick={() => this.desHandler(item)}>
                <div className="gift_one_title">
                    <div className="gift_amount">
                        {gift_name}
                    </div>
                    <div className="gift_type">
                        {item.name}
                    </div>
                </div>
                <div className="gift_one_des">
                    {item.backCashCount == "0" ? null :
                        <div className="cash_line">返现券:共￥{item.backCashTotal}({item.backCashCount})张</div>}
                    {item.couponDetailList.length == 0 ? null :
                        <div className="rate_line">返息券:{item.couponDetailList.map(detail_func)}</div>}
                    {item.beanTotal == "0" ? null :
                        <div className="bean_line">工<span className="space"></span>豆:共￥{item.beanTotal}</div>}
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
                            {this.countDown(item.intervalMilli, index,item)}
                        </div>
                        <div className="get_state_gray">
                            领取
                        </div>
                    </div>
                </div>
            } else if (item.receiveStatus == "02") {
                gift_item_right_content = <div key={index}>
                    {gift_left_section(item)}
                    <div className="gift_item_right" onClick={() => {
                        item.isGet == "0" ? this.getHandler(item) : this.jump()
                    }}>
                        <SVGCircleProgress percent={parseInt(item.restPercent)} weight={4} radius={50}/>
                        {item.isGet == "0" ? <a className="content_state_red">领取</a> :
                            <a className="content_state_red">去投资</a>
                        }
                        <div className="gift_right_title_surplus">
                            剩余
                        </div>
                        <div className="gift_right_starttime_percent">
                            {item.restPercent}
                        </div>
                    </div>
                </div>
            } else if (item.receiveStatus == "03" || item.receiveStatus == "04") {
                gift_item_right_content = <div>
                    {gift_left_section(item)}
                    <div className="gift_item_right">
                        <img src="images/icon-get.png"/>
                        {item.isGet == "1" ? <a className="get_state_red">去投资</a> :
                            null
                        }
                    </div>
                </div>
            }
            return <div className="gift_item" key={index}>
                {gift_item_right_content}
            </div>
        }
        let pop_content_title_func = (item, index) => {
            let typejump = (type) => {
                if (type == "1") {
                    return "返现券"
                } else if (type == "2") {
                    return "返息券"
                } else if (type == "3") {
                    return "礼包"
                } else if (type == "4") {
                    return "工豆"
                }
            }
            let gift_des=<div className="detail_content">
                <div>消费金额满￥{item.limitAmount}可用</div>
                <div>投资期限{item.limitTerm}</div>
                <div>有效期{item.validPeriod}</div>
            </div>
            return <div key={index}>
                <div className="detail_title">{index + 1}、{typejump(item.type)}<span
                    className="amount_red">￥{item.amount}</span>
                </div>
                {item.type=="4"?<div>请以【我的工豆】页面，相应流水为准</div>:gift_des}
            </div>
        }
        return <div className="giftbag_box">
            <div className="gift_box_title">
                <img src="images/icon-gift.png" className="icon_gift"/>
                <span className="gift_title">优惠券礼包</span>
            </div>
            {gift_list.length > 0 && gift_list.map(gift_func)}
            <div id="pop" style={{display: pop_show_dis}}>
                <div className="pop_content">
                    <div className="pop_title">{gift_name}</div>
                    <div className="pop_content_title">
                        {pop_info.map(pop_content_title_func)}
                    </div>
                    <div className="close-btn" onClick={this.close_pop}>确定</div>
                </div>
            </div>
        </div>
    }
}


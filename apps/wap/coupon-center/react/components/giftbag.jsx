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
                this.setState({pop_show: true, pop_info: data.data})
                console.log(this.state.pop_info)
                // console.log(this.state.pop_show,this.state.pop_info)
            }
        });
        this.props.request();

    }

    close_pop() {
        this.setState({pop_show: false})
    }

    timestampHandler(timestamp) {
        var timeTrans = new Date(parseInt(timestamp) * 1000);
        // console.log(timeTrans.toLocaleString('chinese',{hour12:false}).toString().substr(-8,8))
        return (timeTrans.toLocaleString('chinese', {hour12: false}).toString().substr(-8, 8));
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

    getHandler() {
        this.props.request() //用户点击后重新请求，改变数据
    }

    render() {
        let {pop_show, gift_list, pop_info} = this.state;
        let pop_show_dis = pop_show ? "block" : "none";
        let gift_left_section = (item)=>{
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
                gift_item_right_content = <div >
                    {gift_left_section(item)}
                    <div className="gift_item_right" onClick={this.getHandler}>
                        <div className="gift_right_title">
                            剩余
                        </div>
                        <div className="gift_right_starttime">
                            {item.restPercent}
                        </div>
                        <div className="get_state_red">
                            领取
                        </div>
                    </div>
                </div>
            } else if (item.receiveStatus == "03") {
                gift_item_right_content = <div>
                    {gift_left_section(item)}
                    <div className="gift_item_right">
                        <img src="images/icon-get.png"/>
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
                <img src="images/icon-gift.png" className="icon_gift"/>
                <span className="gift_title">优惠券礼包</span>
            </div>
            {gift_list.length > 0 && gift_list.map(gift_func)}
            <div id="pop" style={{display: pop_show_dis}}>
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

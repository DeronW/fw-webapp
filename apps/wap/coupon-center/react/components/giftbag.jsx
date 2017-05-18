class GiftBag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            infoShow: false,
            startTime: 1495101600,//活动开始时间 18:00
            intervalMilli: 1495098000,//距离开始时间 17:00
            currentTime: 1495098973,  //17:14
            endTime:1495105200, //19:00
            surplus:"100%",
            isGet:false
        }
        this.desHandler = this.desHandler.bind(this)
        this.getHandler = this.getHandler.bind(this)
    }

    componentDidMount() {
        $FW.Ajax({
            url: API_PATH+'/activity/v1/timestamp.json',
            type: 'get',
            data: {
            },
            dataType: 'json',
            fail: ()=>true,
            complete: data => {
                // console.log(data);
                console.log(data.data.timestamp)
                this.setState({currentTime:data.data.timestamp})
            }
        });

    }

    desHandler() {
        console.log("infoshow:" + this.state.infoShow)
        this.setState({infoShow: !this.state.infoShow})
    }
    timestampHandler(timestamp){
        var timeTrans = new Date(parseInt(timestamp) * 1000);
        console.log(timeTrans.toLocaleString('chinese',{hour12:false}))
        return (timeTrans.toLocaleString('chinese',{hour12:false}));
    }
    limitHandler(){
        let {intervalMilli,startTime} = this.state;
        let _this = this;
        let timer = setInterval(function () {
            intervalMilli--;
            _this.setState({intervalMilli:intervalMilli})
            if(intervalMilli == startTime){
                clearInterval(timer)
            }
        },1000)
    }
    getHandler(){
        if(!this.state.isGet){
            this.setState({isGet:true})
        }
    }
    render() {
        let {infoShow, startTime, intervalMilli, currentTime,endTime,surplus,isGet} = this.state;
        let start_title = "开抢时间";
        let countdown_title = "倒计时";
        let surplus_title = "剩余";
        let end_title ="已抢光";
        let gift_title,gift_state,gift_time;
        let gray_state = <div className="gray_state">
            领取
        </div>;
        let red_state = <div className="red_state">
            领取
        </div>;
        let red_invest =<a className="red_state">
            去投资
        </a>
        let start_time = this.timestampHandler(startTime)
        let countdown_time = this.timestampHandler(intervalMilli)
        let surplus_count  = surplus
        if (currentTime >= intervalMilli && currentTime<startTime) {
            gift_title = countdown_title
            gift_time = countdown_time
            // this.limitHandler()
            gift_state = gray_state
        } else if (currentTime < startTime) {
            gift_title = start_title
            gift_time = start_time
            gift_state = gray_state

        } else if (currentTime < endTime) {
            gift_title = surplus_title
            gift_time = surplus_count
            gift_state = red_state
            if(isGet){
                gift_state = red_invest
            }
        } else{
            gift_title = end_title
        }
        return <div className="giftbag_box">
            <div className="gift_item gift_one" onClick={this.desHandler}>
                <div className="gift_one_title">
                    优惠券礼包
                </div>
                <div className="gift_one_des">
                    优惠券礼包的描述
                </div>
            </div>
            <div className="gift_item gift_two" onClick={this.getHandler}>
                <div className="gift_two_title">
                    <div>{gift_title}</div>
                    <div>{gift_time}</div>
                    <div>{gift_state}</div>
                </div>
            </div>
            {infoShow && <PopGiftDes control={this.desHandler} states={this.state.infoShow}/>}
        </div>
    }
}

class PopGiftDes extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {control, close} = this.props
        let closestyle = close ? "none" : "block"
        return <div className="pop_gift_des" style={{display: closestyle}}>
            这是礼包优惠券的信息展示盒子
            <div className="des_close" onClick={() => {
                control()
            }}>+
            </div>
        </div>
    }
}

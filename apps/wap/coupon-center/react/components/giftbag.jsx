class GiftBagList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected_name: null,
            selected_code: null
        }
    }

    showGiftInfoHandler = (code, gift_name) => {
        this.setState({
            selected_code: code,
            selected_name: gift_name
        })
    }
    closePanelHandler = () => {
        this.setState({selected_code: null})
    }

    render() {
        let {selected_code, selected_name} = this.state
        let {giftList} = this.props

        if (!giftList || giftList.length == 0) return null;

        return <div className="giftbag_box">
            <div className="gift_box_title">
                <img src="images/icon-gift.png" className="icon_gift"/>
                <span className="gift_title">优惠券礼包</span>
            </div>
            {giftList.map((gift, index) => <GiftBag item={gift} key={index}
                                                    showGiftInfoHandler={this.showGiftInfoHandler}
                                                    refreshHandler={this.props.refreshHandler}
            />)}
            {selected_code &&
            <GiftPopPanel code={selected_code}
                          gift_name={selected_name} closeHandler={this.closePanelHandler}/>}
        </div>
    }
}

class GiftPopPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detail_list: []
        }
    }

    componentDidMount() {
        $FW.Ajax({
            url: `${API_PATH}/mpwap/api/v2/getCouponInfo.shtml`,
            method: 'POST',
            data: {
                code: this.props.code
            }
        }).then(data => {
            this.setState({detail_list: data.giftBagDetail})
        })
    }

    render() {

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
            let day_show = ">="+item.limitTerm+"天"
            let day = item.limitTerm =="0"?"任意期限可用":day_show
            let gift_des = <div className="detail_content">
                <div>消费金额满￥{item.limitAmount}可用</div>
                <div>投资期限：{day}</div>
                <div>有效期{item.validPeriod}</div>
            </div>
            return <div key={index}>
                <div className="detail_title">{index + 1}、{typejump(item.type)}
                <span className="amount_red">
                    {item.type=="1"&&"￥"}
                    {item.type=="2"&&"+"}
                    {item.amount}
                    </span>
                </div>
                {item.type == "4" ? <div>请以【我的工豆】页面，相应流水为准</div> : gift_des}
            </div>
        }

        return <div className="gift-pop">
            <div className="pop_content">
                <div className="pop_title">{this.props.gift_name}</div>
                <div className="pop_content_title">
                    {this.state.detail_list.map(pop_content_title_func)}
                </div>
                <div className="close-btn" onClick={this.props.closeHandler}>确定</div>
            </div>
        </div>
    }
}

class GiftBag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            receiveStatus: this.props.item.receiveStatus,
            remain_seconds: null
        }
    }

    componentDidMount() {
        // start counting down
        if (this.props.item.receiveStatus == "01") {
            this.setState({remain_seconds: this.props.item.intervalMilli})
            this.timer = setInterval(() => {
                if (this.state.remain_seconds < 1) {
                    clearInterval(this.timer)
                    this.setState({receiveStatus: '02'})
                    this.props.refreshHandler()
                } else {
                    this.setState({remain_seconds: this.state.remain_seconds - 1})
                }
            }, 1000)
        }
    }

    getHandler = (item) => {
        item.isGet="1"
        $FW.Ajax({
            url: API_PATH + '/mpwap/api/v2/grabCoupon.shtml',
            method: 'post',
            data: {
                code: item.code,
                couponType: item.type
            },
            success: data => {
                console.log(data);
                $FW.Component.Alert(data.remainNumber)
                this.props.refreshHandler() //用户点击后重新请求，改变数据
            },
            fail:()=>{
                this.props.refreshHandler() //用户点击后重新请求，改变数据
            }
        });

    }

    jump() {
        NativeBridge.toNative('app_coupon')
    }

    render() {

        let {receiveStatus} = this.state;
        let {item} = this.props;

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
                    {item};
                </span>
            }
            return <div className="gift_item_left" onClick={() =>
                this.props.showGiftInfoHandler(item.code, item.name)}>
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
                        <div className="cash_line">返现券:共￥{item.backCashTotal}({item.backCashCount}张)</div>}
                    {item.couponDetailList.length == 0 ? null :
                        <div className="rate_line">返息券:{item.couponDetailList.map(detail_func)}</div>}
                    {item.beanTotal == "0" ? null :
                        <div className="bean_line">工<span className="space"></span>豆:共￥{item.beanTotal}</div>}
                </div>
            </div>
        }

        let status_not_start = () => {
            return <div className="gift_item_right">
                <div className="gift_right_title"> 开抢时间</div>
                <div className="gift_right_starttime">
                    {item.startTime.substr(-8)}
                </div>
                <div className="get_state_gray"> 领取</div>
            </div>
        }

        let status_counting_down = () => {
            let t = this.state.remain_seconds, m = parseInt(t / 60), s = t % 60;
            s = `0${s}`.substr(-2)

            return <div className="gift_item_right">
                <div className="gift_right_title"> 倒计时</div>
                <div className="gift_right_starttime">
                    {`${m}:${s}`}
                </div>
                <div className="get_state_gray"> 领取</div>
            </div>
        }

        let status_start = () => {
            return <div className="gift_item_right gift_item_get" onClick={() => {
                (item.grapLimit=="0") ? this.getHandler(item) : this.jump()
            }}>
                <SVGCircleProgress percent={parseInt(item.restPercent)} weight={4} radius={50}/>
                {(item.grapLimit=="0")?
                    <a className="content_state_red">领取</a> :
                    <a className="content_state_red">去投资</a>
                }
                <div className="gift_right_title_surplus"> 剩余</div>
                <div className="gift_right_starttime_percent">
                    {parseInt(item.restPercent)==0 ? receiveStatus == "03":item.restPercent}
                </div>
            </div>
        }

        let status_finished = () => {
            return <div className={item.isGet=="0"?"gift_no_get":"gift_item_right"} onClick={() => {item.isGet=="1"?this.jump():null}}>
                <img src="images/icon-get-gray.png"/>
                {item.isGet == "1" && <a className="get_state_red">去投资</a>}
            </div>
        }

        let gift_none = (receiveStatus == "03" || receiveStatus == "04")?"gift_item gift_none":"gift_item"
        return <div className={gift_none}>
            {gift_left_section(item)}
            {receiveStatus == "00" && status_not_start()}
            {receiveStatus == "01" && status_counting_down()}
            {receiveStatus == "02" && status_start()}
            {(receiveStatus == "03" || receiveStatus == "04") && status_finished()}
        </div>
    }
}


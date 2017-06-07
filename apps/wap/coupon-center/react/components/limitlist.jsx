class LimitBagList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {limitList} = this.props

        if (!limitList || limitList.length == 0) return null;

        return <div className="list_box">
            <div className="list_box_title">
                <img className="icon_limit" src="images/icon-limit.png"/>
                <span className="limit_title">限时抢购</span>
            </div>
            {limitList.map((limit, index) => <ListBag item={limit} key={index}
                                                      refreshHandler={this.props.refreshHandler}
            />)}
        </div>
    }
}
class ListBag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            receiveStatus: this.props.item.receiveStatus,
            surplus_seconds: null
        }
    }

    componentDidMount() {
        // start counting down
        if (this.props.item.receiveStatus == "01") {
            this.setState({surplus_seconds: this.props.item.intervalMilli})
            this.timer = setInterval(() => {
                if (this.state.surplus_seconds < 1) {
                    clearInterval(this.timer)
                    this.setState({receiveStatus: '02'})
                    this.props.refreshHandler()
                } else {
                    this.setState({surplus_seconds: this.state.surplus_seconds - 1})
                }
            }, 1000)
        }
    }

    getHandler = (item) => {
        item.isGet = "1";
        this.props.refreshHandler() //用户点击后重新请求，改变数据
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

    jump(){
        location.href = "/static/wap/faq/index.html"//跳转到投资的列表页
    }

    render() {
        let {receiveStatus, surplus_seconds} = this.state;
        let {item} = this.props;
        let content;
        let buy_func = (item) => {
            if (receiveStatus == "00") {
                content = <div>
                    <div className="content_title">开抢时间</div>
                    <div className="content_time"> {item.startTime.substr(-8)}</div>
                    <div className="content_state_gray">领取</div>
                </div>
            } else if (receiveStatus == "01") {
                let time = surplus_seconds, min = parseInt(time / 60), sec = time % 60;
                sec = `0${sec}`.substr(-2)
                content = <div>
                    <div className="content_title">倒计时</div>
                    <div className="content_time">
                        {`${min}'${sec}''`}
                    </div>
                    <div className="content_state_gray">领取</div>
                </div>
            } else if (receiveStatus == "02") {
                content = <div onClick={() => {
                    item.grapLimit  == "0" ? this.getHandler(item) : this.jump()
                }}>
                    <SVGCircleProgress percent={parseInt(item.restPercent)} weight={4} radius={50}/>
                    {item.grapLimit  == "0" ? <a className="content_state_red">领取</a> :
                        <a className="content_state_red">去投资</a>
                    }
                    <div className="list_right_title">
                        剩余
                    </div>
                    <div className="list_right_starttime">
                        {item.restPercent}
                    </div>
                </div>
            }
            return content;

        }
        return <div className="list_item">
            <div className="item_left">
                <div className="detail_left">
                    <div className="list_amount"><span className="list_rmb">￥</span>{item.amount}</div>
                    <div className="list_name">{item.sourceTitle}</div>
                </div>
                <div className="detail_right">
                    <div>满￥{item.limitAmount}可用</div>
                    <div>任意期限可用</div>
                    <div>有效期至{item.validPeriod}</div>
                    {/*<div>适用：</div>*/}
                </div>
            </div>
            <div className="item_right">
                {buy_func(item)}
            </div>
        </div>
    }
}


import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/fa-xian/coupon-center.css'
import {NativeBridge} from '../../helpers'
import {Browser} from '../../helpers'
import {Components} from 'fw-javascripts'

@inject('faxian')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Coupon extends React.Component {
    state = {
        isShowEmpty: false,
        selected_name: null,
        selected_code: null
    }

    componentDidMount() {
        NativeBridge.setTitle('领券中心')
        this.props.faxian.requestGiftList().then(data => {
            let {faxian} = this.props
            if (faxian.data.giftList.length == 0 && faxian.data.limitList.length == 0 && faxian.data.endList.length == 0) {
                this.setState({isShowEmpty: true})
            }
        })
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
        let empty_holder = this.state.isShowEmpty && <div styleName="empty-box">
                <img src={require('../../images/fa-xian/coupon-center/icon-empty.png')} styleName="emptyImg"/>
                <div styleName="empty_text">一大波“优惠券”即将来袭</div>
            </div>
        let gift_panel = () => {
            let {selected_code, selected_name} = this.state
            let {giftList}= this.props.faxian.data
            if (!giftList || giftList.length == 0) return null;
            return <div styleName="giftbag_box">
                <div styleName="gift_box_title">
                    <img src={require("../../images/fa-xian/coupon-center/icon-gift.png")} styleName="icon_gift"/>
                    <span styleName="gift_title">优惠券礼包</span>
                </div>
                {giftList.map((gift, index) => <GiftBag item={gift} key={index}
                                                        showGiftInfoHandler={this.showGiftInfoHandler}/>)}
                {selected_code &&
                <GiftPopPanel code={selected_code}
                              gift_name={selected_name} closeHandler={this.closePanelHandler}/>}
            </div>
        }

        let limit_panel = () => {
            let limitList = this.props.faxian.data.limitList
            if (!limitList || limitList.length == 0) return null;
            return <div styleName="list_box">
                <div styleName="list_box_title">
                    <img styleName="icon_limit" src={require("../../images/fa-xian/coupon-center/icon-limit.png")}/>
                    <span styleName="limit_title">限时抢购</span>
                </div>
                {/*{limitList.map((limit, index) => <ListBag item={limit} key={index}*/}
                {/*refreshHandler={this.props.refreshHandler} token={token}*/}
                {/*/>)}*/}
                {limitList.map((limit, index) => <ListBag item={limit} key={index}/>)}
            </div>
        }

        let end_panel = () => {
            let none_list = this.props.faxian.data.endList
            if (!none_list || none_list.length == 0) return null
            let none_list_func = (item, index) => {
                let day_number = "期限：>=" + item.limitTerm + "天"
                let day = item.limitTerm == "0" ? "任意期限可用" : day_number
                let none_no = <div styleName="none_item_right">
                    <div styleName="gray_state"></div>
                    <div styleName="state_button gray_lq">领取</div>
                </div>;

                let none_yes = <a styleName="none_item_right" onClick={
                    () => NativeBridge.toNative('app_coupon')}>
                    <div styleName="gray_state"></div>
                    <div styleName="state_button red_invest">去投资</div>
                </a>

                let none_get = item.isGet == "0" ? none_no : none_yes;

                return <div styleName="none_item_box none_noget" key={index}>
                    <div styleName="none_item_left">
                        <div styleName="detail_left">
                            <div styleName="list_amount">
                            <span styleName="list_rmb">
                                {item.type == "1" ? "￥" : "+"}
                            </span>
                                {item.amount}
                            </div>
                            <div styleName="list_name">
                                {item.type == "1" && "返现券"}
                                {item.type == "2" && "返息券"}
                            </div>
                        </div>
                        <div styleName="detail_right">
                            <div>满￥{item.limitAmount}可用</div>
                            <div>{day}</div>
                            <div>有效期至{item.validPeriod}</div>
                        </div>
                    </div>
                    {none_get}
                </div>
            }

            let end_section = <div>
                <div styleName="none_box_title">
                    <img src={require("../../images/fa-xian/coupon-center/icon-end.png")} styleName="icon_end"/>
                    <span styleName="end_title">已结束</span>
                </div>
                {none_list.map(none_list_func)}
            </div>

            return <div styleName="none_box">
                {none_list.length > 0 && end_section}
            </div>
        }

        return <div styleName="totalBox">
            {empty_holder}
            {gift_panel()}
            {limit_panel()}
            {end_panel()}
        </div>
    }
}

@inject('faxian')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ListBag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            receiveStatus: this.props.item.receiveStatus,
            surplus_seconds: null,
            pending: false
        }
    }

    componentDidMount() {
        // start counting down
        console.log(this.props.item)
        if (this.props.item.receiveStatus == "01") {
            this.setState({surplus_seconds: this.props.item.intervalMilli})
            this.timer = setInterval(() => {
                if (this.state.surplus_seconds < 1) {
                    clearInterval(this.timer)
                    this.setState({receiveStatus: '02'})
                    this.props.faxian.requestGiftList()
                } else {
                    this.setState({surplus_seconds: this.state.surplus_seconds - 1})
                }
            }, 1000)
        }
    }

    getHandler = (item) => {
        // 请求处理中, 不能重复点击
        if (this.state.pending) return;
        this.setState({pending: true})
        item.isGet = "1";
        this.props.faxian.limitGetHandler(item).then(data => {
            Components.showAlert(data.remainNumber)
            this.setState({pending: false})
            this.props.faxian.requestGiftList()//用户点击后重新请求，改变数据
        }, () => {
            this.props.faxian.requestGiftList()//用户点击后重新请求，改变数据
        })
    }

    jump() {
        NativeBridge.toNative('app_coupon')
    }

    render() {
        let {receiveStatus, surplus_seconds} = this.state;
        let {item} = this.props;
        let day_number = "期限：>=" + item.limitTerm + "天"
        let day = item.limitTerm == "0" ? "任意期限可用" : day_number
        let content;
        let buy_func = (item) => {
            if (receiveStatus == "00") {
                content = <div>
                    <div styleName="content_title">开抢时间</div>
                    <div styleName="content_time"> {item.startTime.substr(-8)}</div>
                    <div styleName="content_state_gray">未开始</div>
                </div>
            } else if (receiveStatus == "01") {
                let time = surplus_seconds, min = parseInt(time / 60), sec = time % 60;
                sec = `0${sec}`.substr(-2)
                content = <div>
                    <div styleName="content_title">倒计时</div>
                    <div styleName="content_time">
                        {`${min}:${sec}`}
                    </div>
                    <div styleName="content_state_gray">领取</div>
                </div>
            } else if (receiveStatus == "02") {
                let remain_name = item.grapLimit == "0" ? "list_remain" : "list_remain list_remain_limit"
                content = <div styleName={remain_name} onClick={() => {
                    item.grapLimit == "0" ? this.getHandler(item) : this.jump()
                }}>
                    <SVGCircleProgress percent={100 - parseInt(item.restPercent)} weight={4} radius={50}
                                       bgColor={'#FC655A'} progressColor={'#eee'}/>
                    {item.grapLimit == "0" ? <a styleName="content_state_red">领取</a> :
                        <a styleName="content_state_red">去投资</a>
                    }
                    <div styleName="list_right_title">
                        剩余
                    </div>
                    <div styleName="list_right_starttime">
                        {item.restPercent}
                    </div>
                </div>
            }
            return content;

        }
        let list_type_style = item.type == 2 ? styles['list-item-red-bg'] : styles['list_item']
        return <div className={list_type_style}>
            <div styleName="item_left">
                <div styleName="detail_left">
                    <div styleName="list_amount">
                        <span styleName="list_rmb">
                            {item.type == "1" ? "￥" : null}
                            {item.type == "2" ? "+" : null}
                        </span>
                        {item.amount}
                    </div>
                    <div styleName="list_name">
                        {item.type == "1" && "返现券"}
                        {item.type == "2" && "返息券"}
                    </div>
                </div>
                <div styleName="detail_right">
                    <div>满￥{item.limitAmount}可用</div>
                    <div>{day}</div>
                    <div>有效期至{item.validPeriod}</div>
                    {/*<div>适用：</div>*/}
                </div>
            </div>
            <div styleName="item_right">
                {buy_func(item)}
            </div>
        </div>
    }
}

@inject('faxian')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class GiftPopPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detail_list: []
        }
    }

    componentDidMount() {
        console.log(this.props.code)
        this.props.faxian.giftPopHandler(this.props.code)
            .then(data => {
                this.setState({detail_list: data.giftBagDetail})
            })
        // $FW.Ajax({
        //     url: `${API_PATH}/mpwap/api/v2/getCouponInfo.shtml`,
        //     method: 'POST',
        //     data: {
        //         code: this.props.code
        //     }
        // }).then(data => {
        //     this.setState({detail_list: data.giftBagDetail})
        // })
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
            let day_show = ">=" + item.limitTerm + "天"
            let day = item.limitTerm == "0" ? "任意期限可用" : day_show
            let gift_des = <div styleName="detail_content">
                <div>消费金额满￥{item.limitAmount}可用</div>
                <div>投资期限：{day}</div>
                <div>有效期{item.validPeriod}</div>
            </div>
            return <div key={index}>
                <div styleName="detail_title">{index + 1}、{typejump(item.type)}
                    <span styleName="amount_red">
                        {item.type == "1" && "￥"}
                        {item.type == "2" && "+"}
                        {item.amount}
                    </span>
                </div>
                {item.type == "4" ? <div>请以【我的工豆】页面，相应流水为准</div> : gift_des}
            </div>
        }

        return <div styleName="gift-pop">
            <div styleName="pop_content">
                <div styleName="pop_title">{this.props.gift_name}</div>
                <div styleName="pop_content_title">
                    {this.state.detail_list.map(pop_content_title_func)}
                </div>
                <div styleName="close-btn" onClick={this.props.closeHandler}>确定</div>
                <div styleName="turnoff-btn" onClick={this.props.closeHandler}>&times;</div>
            </div>
        </div>
    }
}

@inject('faxian')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class GiftBag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            receiveStatus: this.props.item.receiveStatus,
            remain_seconds: null,
            token: this.props.token,
            pending: false
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
                    // this.props.refreshHandler()
                    this.props.faxian.requestGiftList()
                } else {
                    this.setState({remain_seconds: this.state.remain_seconds - 1})
                }
            }, 1000)
        }
    }


    getHandler = (item) => {
        // 请求处理中, 不能重复点击
        if (this.state.pending) return;

        this.setState({pending: true})
        item.isGet = "1"

        this.props.faixian.giftGitHandler(item).then(data => {
            $FW.Component.Alert(data.remainNumber)
            this.setState({pending: false})
            this.props.faxian.requestGiftList() //用户点击后重新请求，改变数据
        }, () => {
            this.props.faxian.requestGiftList() //用户点击后重新请求，改变数据
        })
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
            return <div styleName="gift_item_left" onClick={() =>
                this.props.showGiftInfoHandler(item.code, item.name)}>
                <div styleName="gift_one_title">
                    <div styleName="gift_amount">
                        {gift_name}
                    </div>
                    <div styleName="gift_type">
                        {item.name}
                    </div>
                </div>
                <div styleName="gift_one_des">
                    {item.backCashCount == "0" ? null :
                        <div styleName="cash_line">返现券:共￥{item.backCashTotal}({item.backCashCount}张)</div>}
                    {item.couponDetailList.length == 0 ? null :
                        <div styleName="rate_line">返息券:{item.couponDetailList.map(detail_func)}</div>}
                    {item.beanTotal == "0" ? null :
                        <div styleName="bean_line">工<span className="space"></span>豆:共￥{item.beanTotal}</div>}
                </div>
            </div>
        }

        let status_not_start = () => {
            return <div styleName="gift_item_right">
                <div styleName="gift_right_title"> 开抢时间</div>
                <div styleName="gift_right_starttime">
                    {item.startTime.substr(-8)}
                </div>
                <div styleName="get_state_gray"> 领取</div>
            </div>
        }

        let status_counting_down = () => {
            let t = this.state.remain_seconds, m = parseInt(t / 60), s = t % 60;
            s = `0${s}`.substr(-2)

            return <div styleName="gift_item_right">
                <div styleName="gift_right_title"> 倒计时</div>
                <div styleName="gift_right_starttime">
                    {`${m}:${s}`}
                </div>
                <div styleName="get_state_gray"> 领取</div>
            </div>
        }

        let status_start = () => {
            let cName = item.grapLimit == "0" ? styles["gift_item_right"] : styles["gift_item_limit"]
            return <div className={cName} onClick={() => {
                (item.grapLimit == "0") ? this.getHandler(item) : this.jump()
            }}>
                <SVGCircleProgress percent={100 - parseInt(item.restPercent)} weight={4}
                                   radius={50} bgColor={'#FC655A'} progressColor={'#eee'}/>
                {(item.grapLimit == "0") ?
                    <a styleName="content_state_red">领取</a> :
                    <a styleName="content_state_red">去投资</a>
                }
                <div styleName="gift_right_title_surplus"> 剩余</div>
                <div styleName="gift_right_starttime_percent">
                    {parseInt(item.restPercent) == 0 ? this.setState({receiveStatus: "03"}) : item.restPercent}
                </div>
            </div>
        }

        let status_finished = () => {
            let finished_style = item.isGet == "0" ? styles["gift_no_get"] : styles["gift_item_right"]
            return <div className={finished_style} onClick={() => {
                item.isGet == "1" ? this.jump() : null
            }}>
                <img src={require("images/icon-get-gray.png")}/>
                {item.isGet == "1" && <a styleName="get_state_red">去投资</a>}
            </div>
        }

        let gift_none = (receiveStatus == "03" || receiveStatus == "04") ? styles["gift_none"] : styles["gift_item"]
        return <div className={gift_none}>
            {gift_left_section(item)}
            {receiveStatus == "00" && status_not_start()}
            {receiveStatus == "01" && status_counting_down()}
            {receiveStatus == "02" && status_start()}
            {(receiveStatus == "03" || receiveStatus == "04") && status_finished()}
        </div>
    }
}

export default Coupon
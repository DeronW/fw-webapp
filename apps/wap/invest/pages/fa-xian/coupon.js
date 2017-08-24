import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/fa-xian/coupon-center.css'
import {NativeBridge} from '../../helpers'
import BagsList from './components/coupon-bags'
import ListBag from './components/coupon-single'


@inject('faxian')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Coupon extends React.Component {
    state = {
        isShowEmpty: false,
    }

    componentDidMount() {
        console.log(111)
        NativeBridge.setTitle('领券中心')
        this.props.faxian.requestGiftList().then(data => {
            let {faxian} = this.props
            if (faxian.data.giftList.length == 0 && faxian.data.limitList.length == 0 && faxian.data.endList.length == 0) {
                this.setState({isShowEmpty: true})
            }
        })
    }

    render() {
        let empty_holder = this.state.isShowEmpty && <div styleName="empty-box">
                <img src={require('../../images/fa-xian/coupon-center/icon-empty.png')} styleName="emptyImg"/>
                <div styleName="empty_text">一大波“优惠券”即将来袭</div>
            </div>

        let limit_panel = () => {
            let limitList = this.props.faxian.data.limitList
            if (!limitList || limitList.length == 0) return null;
            return <div styleName="list_box">
                <div styleName="list_box_title">
                    <img styleName="icon_limit" src={require("../../images/fa-xian/coupon-center/icon-limit.png")}/>
                    <span styleName="limit_title">限时抢购</span>
                </div>
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
                                    {item.type == "1" && "￥"}
                                    {item.type == "2" && "+"}
                                </span>
                                {item.amount}{item.type == "5" && "g"}
                            </div>
                            <div styleName="list_name">
                                {item.type == "1" && "返现券"}
                                {item.type == "2" && "返息券"}
                                {item.type == "5" && "返金券"}
                            </div>
                        </div>
                        <div styleName="detail_right">
                            <div>
                                {item.type == 5 ? `满${item.limitAmount}g可用` : ` 满￥${item.limitAmount}可用`}
                            </div>
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
            <BagsList/>
            {limit_panel()}
            {end_panel()}
        </div>
    }
}


export default Coupon
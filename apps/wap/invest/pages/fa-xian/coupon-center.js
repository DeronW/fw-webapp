import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/fa-xian/coupon-center.css'
import {NativeBridge} from '../../helpers'
import {Browser} from '../../helpers'

@inject('faxian')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class CouponCenter extends React.Component {
    // state = {
    //     isShowEmpty: false
    // }

    // componentDidMount() {
    //     NativeBridge.setTitle('领券中心')
    //     this.props.faxian.requestGiftList().then(data => {
    //         let {faxian} = this.props
    //         if (faxian.giftList.length == 0 && faxian.limitList.length == 0 && faxian.endList.length == 0) {
    //             this.setState({isShowEmpty: true})
    //         }
    //     })
    // }

    render() {
        // let empty_holder = this.state.isShowEmpty && <div styleName="empty-box">
        //         <img src={require('../../images/fa-xian/coupon-center/icon-empty.png')} styleName="emptyImg"/>
        //         <div styleName="empty_text">一大波“优惠券”即将来袭</div>
        //     </div>
        // let gift_panel = () => {
        //     let {giftList}= this.props.faxian
        //     if (!giftList || giftList.length == 0) return null;
        //     return <div styleName="giftbag_box">
        //         this is gift box
        //     </div>
        // }

        // let list_panel = () => {
        //     let limitList = this.props.faxian.limitList
        //     if (!limitList || limitList.length == 0) return null;
        //     return <div styleName="list_box">
        //         <div styleName="list_box_title">
        //             <img styleName="icon_limit" src={require("../../images/fa-xian/coupon-center/icon-limit.png")}/>
        //             <span styleName="limit_title">限时抢购</span>
        //         </div>
        //         {/*{limitList.map((limit, index) => <ListBag item={limit} key={index}/>)}*/}
        //     </div>
        // }
        return <div styleName="totalBox">
            {/*empty_holder*/}
            {/*gift_panel()*/}
            {/*list_panel()*/}
        </div>
    }
}


export default CouponCenter
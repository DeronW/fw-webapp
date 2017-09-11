import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/pc.css'
import PCHeader from '../../lib/components/pc-header.js'
import PopGetPricePC from './popPC.js'


@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class PC extends React.Component {

    state = {
        userName: null,
        userPhone: null,
        userAdress: null,
        userMoney: 8000
    }

    componentDidMount() {
        // if(this.state.userMoney <1000){
        //
        // }
    }

    popPriceHandler = () => {
        console.log(111)
        let {closePopHandler, isLogin} = this.props;
        ReactDOM.render(<PopGetPricePC isLogin={isLogin}
                                       closePopHandler={closePopHandler}/>, document.getElementById("pop"))
    }

    render() {
        let {userMoney} = this.state
        let gift1_on = <div styleName="wrapper-on">
            <div styleName="des">150元话费券</div>
            <div styleName="gift1_on"></div>
            <div styleName="price_tips price1_tips">
                您当前累投年化<span styleName="color-red">¥200</span>，暂无宝箱可开启，<br/>
                再投¥49,800努力去开启木头宝箱吧！
            </div>
        </div>
        let gift1_close = <div styleName="wrapper-close">
            <div styleName="des">150元话费券</div>
            <div styleName="gift1_close"></div>
            <div styleName="price_tips price1-close-tips">
                您当前没有资格开启，当您的投资额到达1000时，便可获取150元话费券
            </div>
        </div>

        let gift2_on = <div styleName="wrapper-on">
            <div styleName="des">300元京东卡</div>
            <div styleName="gift2_on"></div>
            <div styleName="price_tips price2_tips">
                您当前累投年化<span styleName="color-red">¥200</span>，暂无宝箱可开启，<br/>
                再投¥49,800努力去开启木头宝箱吧！
            </div>
        </div>

        let gift2_close = <div styleName="wrapper-close">
            <div styleName="des">300元京东卡</div>
            <div styleName="gift2_close"></div>
            <div styleName="price_tips price2-close-tips">
                您当前没有资格开启，当您的投资额到达2000时，便可获取300元
            </div>
        </div>

        let gift3_on = <div styleName="wrapper-on">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift3_on"></div>
            <div styleName="price_tips price3_tips">
                您当前累投年化<span styleName="color-red">¥200</span>，暂无宝箱可开启，<br/>
                再投¥49,800努力去开启木头宝箱吧！
            </div>
        </div>

        let gift3_close = <div styleName="wrapper-close">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift3_close"></div>
            <div styleName="price_tips price3-close-tips">
                您当前没有资格开启，当您的投资额到达2000时，便可获取300元
            </div>
        </div>


        let gift4_on = <div styleName="wrapper-on">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift4_on"></div>
            <div styleName="price_tips price4_tips">
                您当前累投年化<span styleName="color-red">¥200</span>，暂无宝箱可开启，<br/>
                再投¥49,800努力去开启木头宝箱吧！
            </div>
        </div>

        let gift4_close = <div styleName="wrapper-close">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift4_close"></div>
            <div styleName="price_tips price4-close-tips">
                您当前没有资格开启，当您的投资额到达2000时，便可获取300元
            </div>
        </div>

        let gift5_on = <div styleName="wrapper-on">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift5_on"></div>
            <div styleName="price_tips price5_tips">
                您当前累投年化<span styleName="color-red">¥200</span>，暂无宝箱可开启，<br/>
                再投¥49,800努力去开启木头宝箱吧！
            </div>
        </div>

        let gift5_close = <div styleName="wrapper-close">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift5_close"></div>
            <div styleName="price_tips price5-close-tips">
                您当前没有资格开启，当您的投资额到达2000时，便可获取300元
            </div>
        </div>

        let gift6_on = <div styleName="wrapper-on">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift6_on"></div>
            <div styleName="price_tips price6_tips">
                您当前累投年化<span styleName="color-red">¥200</span>，暂无宝箱可开启，<br/>
                再投¥49,800努力去开启木头宝箱吧！
            </div>
        </div>

        let gift6_close = <div styleName="wrapper-close">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift6_close"></div>
            <div styleName="price_tips price6-close-tips">
                您当前没有资格开启，当您的投资额到达2000时，便可获取300元
            </div>
        </div>

        let gift7_on = <div styleName="wrapper-on">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift7_on"></div>
            <div styleName="price_tips price7_tips">
                您当前累投年化<span styleName="color-red">¥200</span>，暂无宝箱可开启，<br/>
                再投¥49,800努力去开启木头宝箱吧！
            </div>
        </div>

        let gift7_close = <div styleName="wrapper-close">
            {/*<div styleName="des">300元京东卡</div>*/}
            <div styleName="gift7_close"></div>
            <div styleName="price_tips price7-close-tips">
                您当前没有资格开启，当您的投资额到达2000时，便可获取300元
            </div>
        </div>
        return <div>
            <PCHeader bgColor="rgba(8,11,22,0.6)"/>
            <div styleName="bg">
                <div styleName="goInvest">
                    <div styleName="btn_invest"></div>
                </div>
                <div styleName="roadbg">
                    <div styleName="gift1">
                        {userMoney > 1000 && gift1_on}
                        {userMoney <= 1000 && gift1_close}
                        <div styleName="term">5万&gt;=累投年化投资额&lt;10万</div>
                    </div>
                    <div styleName="gift2">
                        {userMoney > 2000 && gift2_on}
                        {userMoney <= 2000 && gift2_close}
                        <div styleName="term">10万&gt;=累投年化投资额&lt;25万</div>
                    </div>
                    <div styleName="gift34">
                        <div styleName="gift3">
                            {userMoney > 3000 && gift3_on}
                            {userMoney <= 3000 && gift3_close}
                            <div styleName="term">25万&gt;=累投年化投资额&lt;50万</div>
                        </div>
                        <div styleName="gift4">
                            {userMoney > 4000 && gift4_on}
                            {userMoney <= 4000 && gift4_close}
                            <div styleName="term">50万&gt;=累投年化投资额&lt;80万</div>
                        </div>
                    </div>
                    <div styleName="gift5">
                        {userMoney > 5000 && gift5_on}
                        {userMoney <= 5000 && gift5_close}
                        <div styleName="term">80万&gt;=累投年化投资额&lt;100万</div>
                    </div>
                    <div styleName="gift6">
                        {userMoney > 6000 && gift6_on}
                        {userMoney <= 6000 && gift6_close}
                        <div styleName="term">100万&gt;=累投年化投资额&lt;150万</div>
                    </div>
                    <div styleName="gift7">
                        {userMoney > 7000 && gift7_on}
                        {userMoney <= 7000 && gift7_close}
                        <div styleName="term">累投年化投资额&gt;150万</div>
                    </div>
                </div>
            </div>
            <div styleName="pop-price" onClick={this.popPriceHandler}>领取奖品</div>
        </div>
    }
}

export default PC
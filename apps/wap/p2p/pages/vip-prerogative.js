import React from 'react'
import CSSModules from 'react-css-modules'
import {Header} from '../components'
import {Get, Browser} from '../helpers'
import {getJSONP} from 'fw-javascripts'
import styles from '../css/vip-prerogative.css'

@CSSModules(styles, {allowMultiple: true, errorWhenNotFound: false})
class VipPrerogative extends React.Component {
    state = {
        level_list: [],
        levelConfig: {},
        limitCount: '',
        limitDays: '',
        sendStore: '',
        firstInvestAmount: ''
    }

    componentDidMount() {
        Get('/api/v1/upgrade-formula.shtml')
            .then(data => {
                console.log(data)
                this.setState({
                    levelConfig: data.levelConfig,
                    limitCount: data.limitCount,
                    limitDays: data.limitDays,
                    sendStore: data.sendStore,
                    firstInvestAmount: data.firstInvestAmount
                })
            })
        getJSONP('https://www.gongchangzx.com/api/userLevel/v1/giftVO.json')
            .then(data => {
                console.log(data)
                if (data.code != 10000) throw new Error('接口异常, 无法获取用户等级信息');
                this.setState({level_list: data.data.levelGiftRule})
                console.log(this.state.level_list)
            })
    }

    render() {
        let header_section = Browser.inApp ? NativeBridge.setTitle('升级攻略') :
            <Header title="升级攻略" history={this.props.history}/>
        let vip_section1 = () => {
            let {level_list} = this.state
            let level_list_func = (item, index) => {
                let bgcolor = index % 2 == 0 ? styles['table-gift-even'] : styles['table-gift-odd']
                return <div className={bgcolor} key={index}>
                    <div styleName="titlerow">{item.levelName}</div>
                    <div styleName="titlerow">{item.addInterest ? item.addInterest.describe.slice(0, -4) : '-'}</div>
                    <div styleName="titlerow">{item.birthdayBag ? item.birthdayBag.describe.slice(0, -4) : '-'}</div>
                    <div styleName="titlerow">{item.levelUpBag ? item.levelUpBag.describe.slice(0, -4) : '-'}</div>
                    {index == 2 && <div styleName="titlerow">敬请期待</div>}
                </div>
            }
            return <div styleName="section section-1">
                <img styleName="title-img" src={require("../images/vip-prerogative/update-title4.png")}/>

                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../images/vip-prerogative/update-level.png")}/>
                    会员出借送加息
                </div>
                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../images/vip-prerogative/update-birthday.png")}/>
                    生日当天有惊喜
                </div>
                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../images/vip-prerogative/update-bag.png")}/>
                    等级UP拿好礼
                </div>
                <div styleName="level-gift">
                    <img styleName='level-gift-pic' src={require("../images/vip-prerogative/update-waiting.png")}/>
                    更多特权
                </div>
                <img styleName="gift-title" src={require("../images/vip-prerogative/gift-title.jpg")}/>
                <div styleName="table-gift">
                    <div styleName="table-gift-tr">
                        <div styleName="titlerow">等级</div>
                        <div styleName="titlerow">年化加息</div>
                        <div styleName="titlerow">生日大礼包</div>
                        <div styleName="titlerow">升级大礼包</div>
                        <div styleName="titlerow">更多特权</div>
                    </div>
                    {(level_list.length != 0) && level_list.map(level_list_func)}
                </div>

                <div styleName="comments" style={{"display": "none"}}> 备注: 因活动而增加的等级福利, 不在上述描述范围内</div>

                <div styleName="comments">
                    温馨提示：奖励工豆起息后发放至您的工豆账户；灵活期限标起息后先发锁定期内的奖励，回款时发放剩余奖励；仅出借按月/季等额还款项目，最终年化加息率为您的等级年化加息率乘以0.56，0.56为借款方占用出借方的资金使用率。​
                </div>
            </div>
        }

        let vip_section2 = () => {
            let {firstInvestAmount, limitDays, sendStore} = this.state
            return <div styleName="section section-2">

                <img styleName="title-img" src={require("../images/vip-prerogative/update-title1.png")}/>

                <div styleName="paragraph">
                    贡献值是衡量用户等级的标准，用户可以通过出借（购买债权转让除外）或邀请好友出借来获取贡献值。
                </div>

                <div styleName="paragraph value-formula">贡献值 = 出借贡献值 + 邀友贡献值</div>

                <div styleName="value-describe">
                    <div styleName="oweData">
                        出借贡献值：用户<span styleName="owespan">实时待收</span>年化出借额度。
                    </div>
                    <div styleName="oweData">
                        邀友贡献值：
                        <span id="limitDays2" styleName="owespan">{limitDays}</span><span>天内</span>
                        ，每成功邀请一位好友首投
                        <span id="firstInvestAmount2" styleName="owespan">{firstInvestAmount}</span><span>元</span>
                        ，邀请人获得
                        <span id="sendStore2" styleName="owespan">{sendStore}</span>
                        贡献值
                    </div>
                </div>
            </div>
        }

        let vip_section3 = () => {
            return <div styleName="section section-3">
                <img styleName="title-img" src={require("../images/vip-prerogative/update-title2.png")}/>
                <img styleName="example-img" src={require("../images/vip-prerogative/c.jpg")}/>
                <img styleName="example-img" src={require("../images/vip-prerogative/d.jpg")}/>
            </div>
        }
        return <div styleName="vipBox">
            {header_section}
            <div styleName="vipContent">
                {vip_section1()}
                {vip_section2()}
                {vip_section3()}
            </div>
        </div>

    }
}

export default VipPrerogative
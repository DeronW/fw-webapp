import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'

import MobileHeader from '../../lib/components/mobile-header.js'
import { NativeBridge, Get } from '../../lib/helpers'

const BOX_PROPS = [
    { name: '木宝箱', require: 50000 },
    { name: '铁宝箱', require: 100000 },
    { name: '铜宝箱', require: 250000 },
    { name: '银宝箱', require: 500000 },
    { name: '金宝箱', require: 800000 },
    { name: '铂金宝箱', require: 1000000 },
    { name: '钻石宝箱', require: 1500000 }
]

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Mobile extends React.Component {

    state = {
        showIntro: false,
        openedBox: [], // e.g. [1, 4, 7]
        investValue: 300000,
        biggestBox: 0,
        isCompanyUser: false,
        showAddressPop: false,
        name: '',
        phone: '',
        address: ''
    }

    componentDidMount() {
        // let {investValue} = this.state;

        let investValue;
        Get('/api/octoberActivity/v1/getSelfInvestInfo.json')
            .then(({ data }) => {
                investValue = Number(data.yearAmtSum);
                this.setState({
                    investValue: investValue,
                    isCompanyUser: !data.isPerson,
                    name: data.realName || '',
                    phone: data.mobile || '',
                    address: data.address || ''
                })
            })
        for (let i = 0; i < BOX_PROPS.length; i++) {
            let biggestBoxNo;
            const openedBox = [...this.state.openedBox];
            if (investValue < BOX_PROPS[i].require) {
                biggestBoxNo = i;
                openedBox.push(biggestBoxNo);
                return this.setState({ openedBox: openedBox, biggestBox: biggestBoxNo});
            } else if (investValue > BOX_PROPS[i].require && i === BOX_PROPS.length - 1) {
                biggestBoxNo = BOX_PROPS.length;
                openedBox.push(biggestBoxNo);
                return this.setState({ openedBox: openedBox, biggestBox: biggestBoxNo});
            }
        }
    }

    toggleIntro = () => {
        this.setState({ showIntro: !this.state.showIntro })
    }

    genBoxStyleName = no => {
        const { openedBox } = this.state;
        if (openedBox.indexOf(no) >= 0) {
            return `treasure-box-${no}-open`
        } else {
            return `treasure-box-${no}-close`
        }
    }

    genInvestInfoText = () => {
        const { biggestBox, investValue } = this.state;
        let text;
        if (biggestBox === 0) {
            text = `暂无宝箱可开启，
            再投年化￥${BOX_PROPS[biggestBox].require - investValue}努力去开启${BOX_PROPS[biggestBox].name}吧！`
        } else if (biggestBox === 7) {
            text = '太棒了，可开启终极钻石宝箱啦！';
        } else {
            text = `暂可开启${BOX_PROPS[biggestBox-1].name}，
            再投年化￥${BOX_PROPS[biggestBox].require - investValue}努力去开启${BOX_PROPS[biggestBox].name}吧！`
        }
        return text
    }

    boxHandler = no => () => {
        const openedBox = [...this.state.openedBox],
            { biggestBox, isCompanyUser } = this.state;
        if (openedBox.indexOf(no) < 0) {
            openedBox.push(no);
            this.setState({ openedBox: openedBox });
        }
        if (no !== biggestBox) {
            setTimeout(() => {
                const openedBox = [...this.state.openedBox];
                const closeBoxIndex = openedBox.indexOf(no);
                openedBox.splice(closeBoxIndex, 1);
                this.setState({ openedBox: openedBox })
            }, 3000)
        }
    }

    toggleAddressPop = () => this.setState({ showAddressPop: !this.state.showAddressPop })

    handleInput = type => e => {
        let value = e.target.value;
        if (type === 'name' && value.length > 10) {
            value = value.slice(0, 10);
        } else if (type === 'address' && value.length > 100) {
            value = value.slice(0, 100);
        }
        this.setState({ [type]: value })
    }

    render() {
        const { showIntro, investValue, biggestBox, showCannotGetPop,
            isCompanyUser, showAddressPop, name, phone, address } = this.state;

        const intro = <div styleName="intro">
            <div styleName="hide-intro" onClick={this.toggleIntro}>
                <span>返回</span>
            </div>
            <div styleName="intro-title">活动说明</div>
            <ol styleName="intro-list">
                <li>活动期间投资债权转让产品，不能参与本次活动。企业用户不参与本次活动。</li>
                <li>活动结束后根据活动内累投年化发放宝箱对应实物奖品，每人仅可开启一个最高宝箱奖励。</li>
                <li>本次活动累投年化包含工场微金、工场尊享和工场黄金的尊享金产品的购买年化金额。</li>
                <li>投资等额标时，＞18个月的项目按18个月计算年化投资额。</li>
                <li>实物奖品于活动结束后15个工作日内联系确认安排发放方式，实物奖品图片仅供参考，最终采购奖品按产品本身颜色、型号随机发放。</li>
                <li>中奖用户在活动页面点击“领取奖品”填写最终实物奖品快递领取地址，所有实物奖品平台免费保留15个工作日，逾期不填地址视为奖品自动放弃。</li>
                <li>活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。</li>
            </ol>
        </div>

        const companyPop = <div styleName="pop-mask">
            <div styleName="company-pop">
                很遗憾，<br />企业用户不参与本次活动！
            </div>
        </div>

        const addressPop = <div styleName="pop-mask">
            <div styleName="address-pop">
                <div styleName="address-pop-close-btn" onClick={this.toggleAddressPop}></div>
                <div styleName="address-pop-title">收货地址</div>
                <div styleName="input-item">
                    <div styleName="item-name">收货人姓名：</div>
                    <input styleName="item-value"
                        placeholder="仅可输入汉字，不能输入数字，限10字以内"
                        value={name}
                        onChange={this.handleInput('name')} />
                </div>
                <div styleName="input-item">
                    <div styleName="item-name">收货人联系电话：</div>
                    <input styleName="item-value"
                        type="number"
                        maxLength="15"
                        placeholder="仅可输入数字，且限制15个数字以内"
                        value={phone}
                        onChange={this.handleInput('phone')} />
                </div>
                <div styleName="input-item">
                    <div styleName="item-name">详细地址：</div>
                    <textarea styleName="address-item-value"
                        placeholder="100个字以内"
                        value={address}
                        onChange={this.handleInput('address')} />
                </div>
                <div styleName="submit-btn">{name || phone || address ? '修  改' : '保  存'}</div>
                <div styleName="tip">
                    提示：请准确填写收货地址，以便您能收到奖品。<br />
                    如有疑问，请联系客服：400-0322-988</div>
            </div>
        </div>

        const investInfo = <div styleName="invest-info-placeholder">
            <div styleName="invest-info">
                您当前累投年化<span>{`￥${investValue}`}</span>，{ this.genInvestInfoText() }
            </div>
        </div>

        return <div styleName="bg">
            <MobileHeader bgColor="rgba(8,11,22,0.6)"/>

            <div styleName="get-treasure-btn" onClick={this.toggleAddressPop}></div>

            { showIntro && intro }

            { isCompanyUser && companyPop }

            { showAddressPop && addressPop}

            <div styleName="banner">
                <div styleName="show-intro" onClick={this.toggleIntro}>
                    <span>活动说明</span>
                </div>
            </div>

            <div styleName="invest-entry">
                <div styleName="invest-tip">累投年化达标，可开启宝箱奖励</div>
                <div styleName="invest-entry-btn" onClick={NativeBridge.close}>投资寻宝</div>
            </div>

            <div styleName={this.genBoxStyleName(1)}>
                <div styleName="treasure-info">150元话费</div>
                <div styleName="treasure-box" onClick={this.boxHandler(1)}></div>
                <div styleName="treasure-requirement">5万≤累投年化投资额&lt;10万</div>
            </div>

            <div styleName={this.genBoxStyleName(2)}>
                <div styleName="treasure-info">300元京东卡</div>
                <div styleName="treasure-box" onClick={this.boxHandler(2)}></div>
                <div styleName="treasure-requirement">10万≤累投年化投资额&lt;25万</div>
            </div>

            <div styleName={this.genBoxStyleName(3)}>
                <div styleName="treasure-info">JBL蓝牙耳机</div>
                <div styleName="treasure-box" onClick={this.boxHandler(3)}></div>
                <div styleName="treasure-requirement">25万≤累投年化投资额&lt;50万</div>
            </div>

            <div styleName={this.genBoxStyleName(4)}>
                <div styleName="treasure-info">飞利浦充电式<br />声波电动牙刷</div>
                <div styleName="treasure-box" onClick={this.boxHandler(4)}></div>
                <div styleName="treasure-requirement">50万≤累投年化投资额&lt;80万</div>
            </div>

            <div styleName={this.genBoxStyleName(5)}>
                <div styleName="treasure-info">10g金条</div>
                <div styleName="treasure-box" onClick={this.boxHandler(5)}></div>
                <div styleName="treasure-requirement">80万≤累投年化投资额&lt;100万</div>
            </div>

            <div styleName={this.genBoxStyleName(6)}>
                <div styleName="treasure-info">戴森吹风机</div>
                <div styleName="treasure-box" onClick={this.boxHandler(6)}></div>
                <div styleName="skeleton-bg"></div>
                <div styleName="treasure-requirement">80万≤累投年化投资额&lt;100万</div>
            </div>

            <div styleName={this.genBoxStyleName(7)}>
                <div styleName="treasure-info">小米Air13.3英寸<br />超薄笔记本8G 256G</div>
                <div styleName="treasure-box" onClick={this.boxHandler(7)}></div>
                <div styleName="treasure-requirement">累投年化投资额≥150万</div>
            </div>

            <div styleName="foot">*以上活动由金融工场主办 与Apple Inc. 无关</div>

            { investInfo }
        </div>
    }

}

export default Mobile
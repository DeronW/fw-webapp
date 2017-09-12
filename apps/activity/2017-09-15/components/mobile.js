import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'

import gotoPage from '../../lib/helpers/goto-page.js'
import MobileHeader from '../../lib/components/mobile-header.js'
import { Browser, NativeBridge } from '../../lib/helpers'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Mobile extends React.Component {

    state = {
        showIntro: false,
        openedBox: [], // e.g. [1, 4, 7]
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

    boxHandler = no => () => {
        const openedBox = [...this.state.openedBox];
        if (openedBox.indexOf(no) < 0) {
            openedBox.push(no);
            this.setState({ openedBox: openedBox });
        }
    }

    render() {
        const { showIntro } = this.state;

        return <div styleName="bg">
            <MobileHeader bgColor="rgba(8,11,22,0.6)"/>

            { showIntro &&
                <div styleName="intro">
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
            }

            <div styleName="banner">
                <div styleName="show-intro" onClick={this.toggleIntro}>
                    <span>活动说明</span>
                </div>
            </div>

            <div styleName="invest-entry">
                <div styleName="invest-tip">累投年化达标，可开启宝箱奖励</div>
                <div styleName="invest-entry-btn">投资寻宝</div>
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
        </div>
    }

}

export default Mobile
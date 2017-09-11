import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/mobile.css'

import gotoPage from '../../lib/helpers/goto-page.js'
import MobileHeader from '../../lib/components/mobile-header.js'
import { Browser, NativeBridge } from '../../lib/helpers'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Mobile extends React.Component {

    render() {
        return <div styleName="bg">
            <MobileHeader bgColor="rgba(8,11,22,0.6)"/>

            <div styleName="banner">
                <div styleName="show-intro" onClick={this.showIntro}>
                    <span>活动说明</span>
                </div>
            </div>

            <div styleName="invest-entry">
                <div styleName="invest-tip">累投年化达标，可开启宝箱奖励</div>
                <div styleName="invest-entry-btn">投资寻宝</div>
            </div>

            <div styleName="treasure-box-1-open">
                <div styleName="treasure-info">150元话费</div>
                <div styleName="treasure-box"></div>
                <div styleName="treasure-requirement">5万≤累投年化投资额&lt;10万</div>
            </div>

            <div styleName="treasure-box-2-open">
                <div styleName="treasure-info">300元京东卡</div>
                <div styleName="treasure-box"></div>
                <div styleName="treasure-requirement">10万≤累投年化投资额&lt;25万</div>
            </div>

            <div styleName="treasure-box-3-open">
                <div styleName="treasure-info">JBL蓝牙耳机</div>
                <div styleName="treasure-box"></div>
                <div styleName="treasure-requirement">25万≤累投年化投资额&lt;50万</div>
            </div>

            <div styleName="treasure-box-4-open">
                <div styleName="treasure-info">飞利浦充电式<br />声波电动牙刷</div>
                <div styleName="treasure-box"></div>
                <div styleName="treasure-requirement">50万≤累投年化投资额&lt;80万</div>
            </div>

            <div styleName="treasure-box-5-open">
                <div styleName="treasure-info">10g金条</div>
                <div styleName="treasure-box"></div>
                <div styleName="treasure-requirement">80万≤累投年化投资额&lt;100万</div>
            </div>

            <div styleName="treasure-box-6-open">
                <div styleName="treasure-info">戴森吹风机</div>
                <div styleName="treasure-box"></div>
                <div styleName="skeleton-bg"></div>
                <div styleName="treasure-requirement">80万≤累投年化投资额&lt;100万</div>
            </div>

            <div styleName="treasure-box-7-open">
                <div styleName="treasure-info">小米Air13.3英寸<br />超薄笔记本8G 256G</div>
                <div styleName="treasure-box"></div>
                <div styleName="treasure-requirement">累投年化投资额≥150万</div>
            </div>

            <div styleName="foot">*以上活动由金融工场主办 与Apple Inc. 无关</div>
        </div>
    }

}

export default Mobile
import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import { Header } from '../../lib/components'
import { Browser, Post } from '../../lib/helpers'

import * as $FW from 'fw-javascripts'

import styles from '../css/market-app.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class MarketApp extends React.Component {

    state = {
        app: {},
        weixin_cover: false
    }

    hideWeixinCover = () => {
        this.setState({ weixin_cover: false })
    }

    componentDidMount() {
        let q = $FW.Utils.hashQuery
        Post('/api/product/v1/productDetail.json', {
            productId: q.productId
        }).then(data => {
            this.setState({ app: data })
        })
    }

    downloadHandler = () => {

        let { app } = this.state

        if (Browser.inAndroid && Browser.inWeixin) {
            this.setState({ weixin_cover: true })
        } else if (Browser.inIOS) {
            window.location.href = app.iosSoftwareUrl;
        } else if (Browser.inAndroid && !Browser.inWeixin) {
            window.location.href = app.androidSoftwareUrl;
        }
    }

    render() {
        let { history } = this.props
        let { app, weixin_cover } = this.state

        let tag = t => <i key={t.labelType}> {t.labelValue} </i>;

        let cnt_list = app.descInfo ? JSON.parse(app.descInfo) : [];

        let cnt_item = (data, index) => {
            return <div styleName="cnt-item" key={index}>
                <div styleName="cnt-list-title">
                    <i styleName={`cnt-icon cnt-icon-${data.type}`}></i>
                    {data.name}
                </div>
                <div styleName="cnt-item-detail">{data.content} </div>
            </div>
        }

        return <div styleName="market-app">
            <Header title={app.productName} history={history} />

            <div styleName="banner">
                <img styleName="banner-logo" src={app.productLogo} />
                <div styleName="banner-name">{app.productName}</div>
                <div styleName="banner-range"> 借款范围（{app.amountStr}） </div>
                <div styleName="banner-tag-list">
                    {app.productLabelList && app.productLabelList.map(tag)}
                </div>
            </div>


            <div styleName="describe">
                <div styleName="des-item">
                    <div styleName="des-v">{app.loanRateStr}</div>
                    <div styleName="des-t"> 每月费用 </div>
                </div>
                <div styleName="des-item">
                    <div styleName="des-v">
                        {app.termRangeStr}{app.termRangeType == 1 ? "天" : "个月"}</div>
                    <div styleName="des-t"> 期限范围 </div>
                </div>
                <div styleName="des-item">
                    <div styleName="des-v">{app.fastLoanValue}</div>
                    <div styleName="des-t"> 最快放款 </div>
                </div>
            </div>

            {cnt_list.map(cnt_item)}

            <div styleName="btn-download-panel">
                <a onClick={this.downloadHandler}>马上下载</a>
            </div>

            {weixin_cover && <div styleName="weixin-cover" onClick={this.hideWeixinCover}>
                <img src={require("../images/market-app/tip.png")} />
            </div>}
        </div >
    }
}

export default MarketApp
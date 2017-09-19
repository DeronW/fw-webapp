import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Post, Browser, Storage, NativeBridge } from '../../lib/helpers'

import { BottomNavBar, showBulletin } from '../../lib/components'

import styles from '../css/home.css'

function gotoHandler(link, toNative, need_login = false) {
    if (Browser.inFXHApp && toNative)
        return NativeBridge.toNative(toNative)

    if (link.indexOf('://') < 0)
        link = location.protocol + '//' + location.hostname + link;

    Browser.inFXHApp ?
        NativeBridge.goto(link, need_login) :
        location.href = link
}

@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Home extends React.Component {

    state = {
        products: [],
        sub_products: [],
        enable_youyi: false
    }

    componentDidMount() {

        Post(`/api/product/v1/productList.json`)
            .then(data => this.setState({ products: data.resultList }))
            .then(() => Post(`/api/product/v1/recommendedList.json`))
            .then(data => this.setState({ sub_products: data.resultList }))
            .then(() => Post(`/api/product/v1/noticeList.json`, null, true))
            .then(data => {
                // 强类型公告, 只要返回, 一定弹出提示
                if (data.gradeType == 1) return showBulletin(data.noticeContent)
                // 弱类型公告
                if (data.gradeType == 2) {
                    if (Storage.isContentNotRead('BULLETIN', data.noticeContent))
                        return txt && showBulletin(data.noticeContent)
                }
            }, e => new Promise((resolve, _) => resolve()))
            .then(data => {
                // 用户是否为白名单用户, 看产品列表有没有优易借的产品
                let has_youyi = this.state.products.filter(p => p.productId == 11).length
                if (has_youyi && Storage.isContentNotRead('YOUYI_WELCOME'))
                    this.setState({ enable_youyi: true })
            })
    }

    handleBannerJump = () => {
        Browser.inFXHApp ?
            NativeBridge.toNative('invite') :
            location.href = '/static/loan/weixin-invite/index.html';
    }

    render() {
        let { products, sub_products, enable_youyi } = this.state
        let { history } = this.props

        let product = (props, index) => {

            let clichHandler = () => {
                if (props.productId == 11) gotoHandler('/static/loan/products/index.html#/loan-youyi-index');
                if (props.productId == 1) gotoHandler('/static/loan/products/index.html#/loan-fxh-index', 'fxh_detail')
                // if (props.productId == 1) gotoHandler('/static/loan/fxh/index.html', 'fxh_detail')
                if (props.productId == 21) gotoHandler('/static/loan/dumiao/index.html?pid=21')
            }

            return <a styleName="product" key={index} onClick={clichHandler}>
                <img styleName="product-logo" src={props.productLogo} />
                <div styleName="product-title">{props.productName}</div>
                <div styleName="product-limit">{props.amountStr}</div>
                <div styleName="product-expire">{props.termRangeStr}</div>
                <div styleName="product-interest">{props.loanRate}</div>
                <div styleName="product-timing">{props.fastLoanValue}</div>

                {index < 2 && <div styleName="bottom-line"></div>}
            </a>
        }

        let sub_product = (props, index) => {
            let clickHandler = () => {
                gotoHandler(props.redirectUrl)
            }
            return <div styleName="sp-item" key={index}
                onClick={() => { gotoHandler(props.redirectUrl) }}>
                <img styleName="sp-logo" src={decodeURIComponent(props.logoUrl)} />
                <div styleName="sp-t-a">{props.productTitle}</div>
                <div styleName="sp-t-b">{props.productDec}</div>
            </div>
        }

        return <div styleName="bg">
            <img styleName="banner" onClick={this.handleBannerJump}
                src={require("../images/home/banner.jpg")} />
            <div styleName="panel-title">
                <img styleName="icon-money" src={require("../images/home/loan-category-icon.png")} />
                我要借款</div>

            {products.map(product)}

            <div styleName="sep-line"></div>

            <div styleName="panel-title">
                <img styleName="icon-recommended" src={require("../images/home/sub-category-icon.png")} />精选推荐</div>

            {sub_products.map(sub_product)}

            {!Browser.inFXHApp && <div>
                <div styleName="ft-links">
                    <a onClick={() => { gotoHandler('/static/loan/user-weixin-new-download/index.html') }}>下载APP</a>
                    <span></span>
                    <a onClick={() => { gotoHandler('/static/loan/features/index.html#/about-us') }}>关于我们</a>
                    <span></span>
                    <a onClick={() => { gotoHandler('/static/loan/features/index.html#/contact-us') }}>联系我们</a>
                </div>
                <div styleName="company-info">©2017 深圳市众利财富管理有限公司</div>
                <div styleName="company-info">粤ICP备17034889号-1</div>
            </div>}

            {enable_youyi && <div styleName="enable-youyi">
                <div styleName="text-a">恭喜您被选中</div>
                <div styleName="text-b">
                    我们邀请您使用放心花新推出的借款产<br />
                品优易借。借款期限21天，综合费率8.5%，<br />
                    还款方式灵活，快去试试吧~<br />
                </div>
                <a styleName="btn-close" onClick={
                    () => this.setState({ enable_youyi: false })}></a>
            </div>}

            <BottomNavBar history={history} />
        </div>
    }
}

export default Home

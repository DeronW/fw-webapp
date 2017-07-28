import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Post, Browser } from '../../lib/helpers'

import { BottomNavBar } from '../../lib/components'

import styles from '../css/home.css'

function gotoHandler(link, toNative) {
    if (Browser.inFXHApp) return NativeBridge.toNative(toNative);

    if (link.indexOf('://') < 0)
        link = location.protocol + '//' + location.hostname + link;
}


@inject('home')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Home extends React.Component {

    state = {
        products: [],
        sub_products: [],
        showBulletin: true,
        bulletinCnt: 'xx',
    }

    componentDidMount() {
        Post(`/api/product/v1/productList.json`)
            .then(data => this.setState({ products: data.resultList }))

        Post(`/api/product/v1/recommendedList.json`)
            .then(data => this.setState({ sub_products: data.resultList }))

        Post(`/api/product/v1/noticeList.json`, null, true)
            .then(data => {
                let newBulletinCnt = data.noticeContent;
                let token = $FW.Store.getUserDict().token;

                // if bulettin is secondary and it's read within the valid token, we just ignore that bulletin
                if (data.gradeType == '2' && $FW.Store.isBulletinRead(token, newBulletinCnt)) return

                this.setState({ showBulletin: true, bulletinCnt: newBulletinCnt })

            }, e => {
                if (e.code == 22003) return; // no bulletin now
            });
    }

    handleBannerJump = () => {
        $FW.Browser.inFXHApp() ?
            NativeBridge.toNative('invite') :
            location.href = '/static/loan/weixin-invite/index.html';
    }

    render() {
        let { products, sub_products } = this.state
        let { history } = this.props

        let product = (props, index) => {
            let clichHandler = () => {

                if (props.productId == 11) history.push('/loop-loan')
                if (props.productId == 1) gotoHandler('/static/loan/fxh/index.html')
                if (props.productId == 21) gotoHandler('/static/loan/dumiao/index.html')
            }

            return <a styleName="product" key={index} onClick={clichHandler}>
                <img styleName="product-logo" src={props.productLogo} />
                <div styleName="product-title">{props.productName}</div>
                <div styleName="product-limit">{props.amountStr}</div>
                <div styleName="product-expire">{props.termRangeStr}</div>
                <div styleName="product-interest">???</div>
                <div styleName="product-timing">{props.fastLoanValue}</div>

                {index < 2 && <div styleName="bottom-line"></div>}
            </a>
        }

        let sub_product = (props, index) => {
            let clickHandler = () => {
                gotoHandler(props.redirectUrl)
            }
            return <div styleName="sp-item" key={index} onClick={clickHandler}
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

            <div styleName="ft-links">
                <a onClick={() => { gotoHandler('/static/loan/user-weixin-new-download/index.html') }}>下载APP</a>
                <span></span>
                <a onClick={() => { gotoHandler('/static/loan/features/index.html#/about-us') }}>关于我们</a>
                <span></span>
                <a onClick={() => { gotoHandler('/static/loan/features/index.html#/contact-us') }}>联系我们</a>
            </div>
            <div styleName="company-info">©2017 深圳市众利财富管理有限公司</div>
            <div styleName="company-info">粤ICP备17034889号-1</div>

            <BottomNavBar />
        </div>
    }
}

export default Home
import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/loan.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

import { Browser } from 'fw-javascripts'

import Nav from './components/nav'
import BottomNavBar from './components/bottom-nav-bar'


function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if (Browser.inApp) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}


@inject('products') @observer @CSSModules(styles)
class MainPanel extends React.Component {

    static onEnter(){
        document.title = ''
    }

    componentDidMount() {
        this.props.products.fetchProductList();
    }

    render() {
        let loanProducts = this.props.products.loanProducts.slice(),
            otherProducts = this.props.products.otherProducts.slice();

        if (loanProducts.length === 0) return;

        let product = (p, index) => {

            let link_a = `/static/loan/fxh/index.html`,
                link_b = `/static/loan/dumiao/index.html`,
                link = p.productName == '放心花' ? link_a : link_b;

            return (
                <Nav styleName="borrow-money-list" key={index} onClick={()=>gotoHandler(`${link}?pid=${p.productId}`)}>
                    <div styleName="icon-block">
                        <img src={require('../images/loan/icon.png')} />
                    </div>
                    <div styleName="info">
                        <div styleName="t">
                            <span styleName="title-text">{p.productName}</span>
                            <div styleName="tag">
                                {p.productLabelList.map(i => <img key={i.labelType} src={require(`../images/loan/tag-${i.labelType}a.png`)} />)}
                            </div>
                        </div>
                        <div styleName="b">
                            <div styleName="text"> 借款范围（{p.amountStr}） </div>
                        </div>
                    </div>
                    <div styleName="next"></div>
                </Nav>
            )
        }

        let main_product = loanProducts[0],
            sub_products = loanProducts.slice(1);

        let jump_link = Browser.inApp ? `/static/loan/user-weixin-jrgcapp/index.html` : `/static/loan/weixin-download/index.html`;

        let generate_other_products = (product) => (
            <div
                styleName="other-products-item"
                key={product.firstTitle}
                onClick={() => { gotoHandler(product.forwardUrl)}}>
                <div styleName="product-icon">
                    <img src={decodeURIComponent(product.iconUrl)}/>
                </div>
                <div styleName="product-title">
                    <div styleName="product-1st-title">{product.firstTitle}</div>
                    <div styleName="product-2nd-title">{product.secondTitle}</div>
                </div>
            </div>
        )

        return (
            <div styleName="fake-body">
                <div>
                    <a onClick={()=>gotoHandler(jump_link)} styleName="banner">
                        <img src={require('../images/loan/banner.jpg')} />
                    </a>
                    <a onClick={()=>gotoHandler(`/static/loan/fxh/index.html?pid=${main_product.productId}`)} styleName="top-info">
                        <div styleName="logo"> <img src={require('../images/loan/logo.png')} /> </div>
                        <div styleName="title"> {main_product.productName} </div>
                        <div styleName="tag">
                            {main_product.productLabelList.map(i => <img key={i.labelType} src={require(`../images/loan/tag-${i.labelType}.png`)} />)}
                        </div>
                        <div styleName="subtitle"> 借款范围（{main_product.amountStr}） </div>
                        <div styleName="next"> </div>
                    </a>
                    {sub_products.map(product)}
                </div>
                <div styleName="other-products-list">
                    {otherProducts.map(generate_other_products)}
                </div>
                <BottomNavBar />
            </div>
        )
    }
}

export default MainPanel

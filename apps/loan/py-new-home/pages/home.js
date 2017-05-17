import React from 'react'
import {render} from 'react-dom'
import BottomNav from './components/bottom-nav'
import CSSModules from 'react-css-modules'
import styles from '../css/home.css'
import { observer, inject } from 'mobx-react'
import * as $FW from 'fw-components'
import { BrowserFactory } from 'fw-javascripts'
import { NativeBridgeFactory } from 'fw-javascripts'

@inject('home') @observer @CSSModules(styles)
export default class Home extends React.Component {
    componentDidMount(){
        this.props.home.getProductList()
    }
    render(){
        // let product = (p, index) => {
        //
        //     let link_a = `/static/loan/fxh/index.html`,
        //         link_b = `/static/loan/dumiao/index.html`,
        //         link = p.productName == '放心花' ? link_a : link_b;
        //
        //     return (
        //         <div styleName="borrow-money-list" key={index} onClick={()=>gotoHandler(`${link}?pid=${p.productId}`)}>
        //             <div styleName="icon-block">
        //                 <img src="images/icon.png" />
        //             </div>
        //             <div styleName="info">
        //                 <div styleName="t">
        //                     <span styleName="title-text">{p.productName}</span>
        //                     <div styleName="tag">
        //                         {p.productLabelList.map(i => <img src={`/static/loan/home/images/tag-${i.labelType}a.png`} />)}
        //                     </div>
        //                 </div>
        //                 <div styleName="b">
        //                     <div styleName="text"> 借款范围（{p.amountStr}） </div>
        //                 </div>
        //             </div>
        //             <div styleName="next"></div>
        //         </div>
        //     )
        // }
        //
        // let main_product = this.props.home.resultList[0],
        //     sub_products = this.props.home.resultList.slice(1)
        //
        //
        // let Browser = new BrowserFactory(navigator.userAgent, 'FinancialWorkspace');
        // let receive_handler = function(receive_data){
        //     console.log(receive_data)
        // }
        // const NativeBridge = new NativeBridgeFactory('FinancialWorkspace', receive_handler)
        //
        // let jump_link = Browser.inApp ? `/static/loan/user-weixin-jrgcapp/index.html` : `/static/loan/weixin-download/index.html`;
        //
        // let generate_other_products = (product) => (
        //     <div
        //         styleName="other-products-item"
        //         key={product.firstTitle}
        //         onClick={() => { NativeBridge.goto(product.forwardUrl)}}>
        //         <div styleName="product-icon">
        //             <img src={decodeURIComponent(product.iconUrl)}/>
        //         </div>
        //         <div styleName="product-title">
        //             <div styleName="product-1st-title">{product.firstTitle}</div>
        //             <div styleName="product-2nd-title">{product.secondTitle}</div>
        //         </div>
        //     </div>
        // )
        console.log(this.props.home.resultList)
        return (
            <div>
                {/*<div styleName="main-panel">
                    <a onClick={()=>NativeBridge.goto(jump_link)} styleName="banner">
                        <img src="images/banner.jpg" />
                    </a>
                    <a onClick={()=>NativeBridge.goto(`/static/loan/fxh/index.html?pid=${main_product.productId}`)} styleName="top-info">
                        <div styleName="logo"> <img src="images/logo.png" /> </div>
                        <div styleName="title"> {main_product.productName} </div>
                        <div styleName="tag">
                            {main_product.productLabelList.map(i => <img src={`/static/loan/home/images/tag-${i.labelType}.png`} />)}
                        </div>
                        <div styleName="subtitle"> 借款范围（{main_product.amountStr}） </div>
                        <div styleName="next"> </div>
                    </a>
                    {sub_products.map(product)}
                </div>
                <div styleName="other-products-list">
                    {this.props.home.extList.map(generate_other_products)}
                </div>*/}
                <BottomNav />
            </div>
        )
    }
}

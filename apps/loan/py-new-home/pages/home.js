import React from 'react'
import {render} from 'react-dom'
import BottomNav from './components/bottom-nav'
import CSSModules from 'react-css-modules'
import styles from '../css/home.css'
import mobx from 'mobx'
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
        let extList = mobx.toJS(this.props.home.extList);
        let generate_other_products = (product) => (
            <a
                styleName="other-products-item"
                key={product.firstTitle}
                href={product.forwardUrl}>
                <div styleName="product-icon">
                    <img src={decodeURIComponent(product.iconUrl)}/>
                </div>
                <div styleName="product-title">
                    <div styleName="product-1st-title">{product.firstTitle}</div>
                    <div styleName="product-2nd-title">{product.secondTitle}</div>
                </div>
            </a>
        )
        return (
            <div>
                {extList.length>0 && extList.map(generate_other_products)}
                <BottomNav />
            </div>
        )
    }
}

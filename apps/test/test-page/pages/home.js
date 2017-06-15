import React from 'react'
import {render} from 'react-dom'
import { observer, inject } from 'mobx-react'
import CSSModules from 'react-css-modules'
import styles from '../css/home.css'
import BottomNav from '../components/bottom-nav'
import { Redirect } from 'react-router-dom'
import { BrowserFactory } from 'fw-javascripts'
import { NativeBridgeFactory } from 'fw-javascripts'

const LoanProduct = inject('home')(observer(CSSModules((props) => {
    let productLink = props.productName === '放心花' ? `/static/loan/fxh/index.html` : `/static/loan/dumiao/index.html`,
        productToNative = props.productName === '放心花' ? 'fxh_detail' : '';
    let labelImgURI = {
        1: require('../images/home/tag-1.jpg'),
        2: require('../images/home/tag-2.jpg'),
        3: require('../images/home/tag-3.jpg')
    }
    let generate_labels = (label) => (
        <img styleName="loan-product-label-icon" key={label.labelType} src={labelImgURI[label.labelType]} />
    );
    return (
        <div styleName="loan-product-card" key={props.productId} onClick={() => {gotoHandler(`${productLink}?pid=${props.productId}`, productToNative) }}>
            <img styleName="loan-product-logo" src={ props.productLogo } />
            <div styleName="loan-product-name">{ props.productName }</div>
            <div styleName="loan-product-amount">借款范围({ props.amountStr })</div>
            <div>
                {props.productLabelList.map(generate_labels) }
            </div>
        </div>
    )
},styles,{ "allowMultiple": true, "errorWhenNotFound": false })));


const SubProduct = inject('home')(observer(CSSModules((props) => {
    let toNative = props.toNative ? props.toNative : '';
    return (
        <div styleName="sub-product-item" key={props.firstTitle} onClick={() => { gotoHandler(props.redirectUrl, toNative) }}>
            <div styleName="sub-product-logo-container">
                <img styleName="sub-product-logo" src={decodeURIComponent(props.logoUrl)}/>
            </div>
            <div styleName="sub-product-title">
                <div styleName="sub-product-1st-title">{props.productTitle}</div>
                <div styleName="sub-product-2nd-title">{props.productDec}</div>
            </div>
            <div styleName="next-icon-container"></div>
        </div>
    )
},styles,{ "allowMultiple": true, "errorWhenNotFound": false })));

@inject('home') @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            resultList:[],
            recommendList:[]
        }
    }
    // gotoHandler(link, toNative, need_login){
    //     if ($FW.Browser.inFXHApp() && toNative) return NativeBridge.toNative(toNative);
    //     if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
    //     $FW.Browser.inApp() ? NativeBridge.goto(link, need_login) : location.href = encodeURI(link);
    // }
    componentDidMount(){
        let {home} = this.props;
        home.getProductList().then(()=>{
            this.setState({resultList:home.resultList})
        })
        home.getRecommendList().then(()=>{
            this.setState({recommendList:home.recommendList})
        })
    }

    render(){
        return (
            <div>
                <img src={require("../images/home/banner.jpg")}/>
                <div styleName="loan-product-container">
                    <div styleName="product-title">
                        <img styleName="product-title-icon" src={require("../images/home/loan-category-icon.png")} />我要借款
                    </div>
                    <div styleName="loan-product-card-container">
                        { this.state.resultList.map(product => <LoanProduct {...product} key={ product.productId } />) }
                    </div>
                </div>
                <div styleName="sub-product-container">
                    <div styleName="product-title">
                        <img styleName="product-title-icon" src={require("../images/home/sub-category-icon.png")} />精选推荐
                    </div>
                    <div styleName="sub-product-item-container">
                        { this.state.recommendList.map(product => <SubProduct {...product} key={product.productTitle} />) }
                    </div>
                </div>
                <BottomNav />
            </div>
        )
    }
}


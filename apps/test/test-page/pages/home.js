import React from 'react'
import {render} from 'react-dom'
import { observer, inject } from 'mobx-react'
import CSSModules from 'react-css-modules'
import styles from '../css/home.css'
import BottomNav from '../components/bottom-nav'
import { Redirect, Link } from 'react-router-dom'

function gotoHandler(link, history, need_login) {

    let full_link = `${location.protocol}//${location.hostname}/static/insurance/weiyun-car/#${link}`;

    Browser.inApp ?
        NativeBridge.goto(full_link, need_login) :
        history.push(link)
}

const LoanProduct = inject('home')(observer(CSSModules((props) => {
    let productLink = props.productName === '放心花' ? `/bill?productId=${props.productId}` : `/invite?productId=${props.productId}`;
    let labelImgURI = {
        1: require('../images/home/tag-1.jpg'),
        2: require('../images/home/tag-2.jpg'),
        3: require('../images/home/tag-3.jpg')
    }
    let generate_labels = (label) => (
        <img styleName="loan-product-label-icon" key={label.labelType} src={labelImgURI[label.labelType]} />
    );
    return (
        <div styleName="loan-product-card" key={props.productId}>
            <Link to={productLink}>
                {/*onClick={() => {gotoHandler(`${productLink}?pid=${props.productId}`) }}*/}
                <img styleName="loan-product-logo" src={ props.productLogo } />
                <div styleName="loan-product-name">{ props.productName }</div>
                <div styleName="loan-product-amount">借款范围({ props.amountStr })</div>
                <div>
                    {props.productLabelList.map(generate_labels) }
                </div>
            </Link>
        </div>
    )
},styles,{ "allowMultiple": true, "errorWhenNotFound": false })));


const SubProduct = inject('home')(observer(CSSModules((props) => {
    return (
        <div styleName="sub-product-item" key={props.firstTitle} to="/bill">
            {/*onClick={() => { gotoHandler(props.redirectUrl) }}*/}
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


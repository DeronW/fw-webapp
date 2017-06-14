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
    constructor(props){
        super(props)
        this.state={
            resultList:[]
        }
    }
    componentDidMount(){
        let {home} = this.props;
        home.getProductList().then(()=>{
            this.setState({resultList:home.resultList})
        })
    }
    render(){
        function LoanProduct(props) {
            let productLink = props.productName === '放心花' ? `/static/loan/fxh/index.html` : `/static/loan/dumiao/index.html`,
                productToNative = props.productName === '放心花' ? 'fxh_detail' : '';
            let labelImgURI = {
                1: require('../images/home/tag-1.jpg'),
                2: require('../images/home/tag-2.jpg'),
                3: require('../images/home/tag-3.jpg')
            }
            let generate_labels = (label) => (
            <img className="loan-product-label-icon" src={labelImgURI[label.labelType]} />
            );
            return (
                <div className="loan-product-card" key={props.productId} onClick={() => { gotoHandler(`${productLink}?pid=${props.productId}`, productToNative) }}>
                    <img className="loan-product-logo" src={ props.productLogo } />
                    <div className="loan-product-name">{ props.productName }</div>
                    <div className="loan-product-amount">借款范围({ props.amountStr })</div>
                    <div className="loan-product-label-container">
                        { props.productLabelList.map(generate_labels) }
                    </div>
                </div>
            )
        }
        return (
            <div>
                <img src={require("../images/home/banner.jpg")}/>
                <div className="loan-product-card-container">
                    { this.state.resultList.map(product => <LoanProduct {...product} key={product.productId } />) }
                </div>
                <BottomNav />
            </div>
        )
    }
}


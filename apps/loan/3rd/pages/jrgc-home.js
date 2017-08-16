import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'

import { Header, BottomNavBar } from '../../lib/components'
import { Browser, NativeBridge } from '../../lib/helpers'
import styles from '../css/jrgc-home.css'

const LoanProduct = inject('jrgc_home')(observer(CSSModules((props) => {
    let productLink = props.productName === '放心花' ? `/static/loan/fxh/index.html` : `/static/loan/dumiao/index.html`,
        productToNative = props.productName === '放心花' ? 'fxh_detail' : '';
    let labelBorderColor = { '1': '#fd6f79', '2': '#46abef', '3': '#fd9c34' };
    let labelImgURI = {
        '1': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAMAAADjjeWOAAAAZlBMVEUAAAD9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3mH1Y5gAAAAIXRSTlMABrRnJhkUkG9B99qGdFk98ujSzbipX0w3MAzr3cbDwX7jaRF+AAAAkklEQVQY03XOWRKDIBAE0BnABRXc45K173/JlDgEf9J/ryh6mv4lZ8sXZrp4qTbZdqhQm8idFIBKC1lrsk+gib8HqI11HwsaAChyIxfWHkcGkswIKYTLyTGTZe/TXp7LKlAJ20fg3YqdlLFMCcfTdFeymYGSYxvGhfyUk8Qf1fwj3dBh0pRcq89ukje3xqp48JovuGAMU+gf+lAAAAAASUVORK5CYII=',
        '2': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAAVFBMVEUAAABGq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+/ImwzSAAAAG3RSTlMAS9372F49COnGtoR/d3ArDsinMSAa4MpFNhumO2NdAAAAiklEQVQY013OSxKEIAxF0YeACMhHW/uX/e+zA10W4K1iwBkkwVV+4JZRtN/oQ0RxpJnpOZIm7hzIFkq9rFQ6UDush1iqyBBC5FsEOX4tOfPX8rouz6SQetJMC749rUwSpqfIRAayiTKFTiyNXiiUoLpRlWZsjXIlAddGoZLGfol8M2U3afjp3yZYfvDgE6+F6t9KAAAAAElFTkSuQmCC',
        '3': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAMAAAD9GTxlAAAAWlBMVEUAAAD9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDTbHmyOAAAAHXRSTlMAIsBE9G0S0Af6kIJnTjwu6t7Ysqyfl2phUkcmG9mZrYIAAABxSURBVBjTdc9LDoMwDEVRh9IEaIH+v9z9bxOMlGAPOLMnXVmyFI1YH7fC3c3qZNeR3qY10abcXMrTpZxtCqNNaX8H9V/T7BI0zdpB00LPTWHx1vWSrAOq7cME11hWhHqUooevbDrct+lhV0yNnUOQHTPHugiOpaJQowAAAABJRU5ErkJggg=='
    }
    let generate_labels = (label) => (
        <div key={label.labelValue} styleName="loan-product-label" style={{ border: `1px solid ${labelBorderColor[label.labelType]}` }}>
            <img src={labelImgURI[label.labelType]} />
            <span style={{ color: labelBorderColor[label.labelType] }}>{label.labelValue}</span>
        </div>
    )

    let logo = props.productLogo, name = props.productName
    if (props.productId == '1') {
        // 金融工场App内放心花要换其它logo
        logo = require('../images/jrgc/fxh-jrgc-icon.png')
        name = '短期借款'
    }

    return <div styleName="loan-product-card" onClick={() => {
        props.jrgc_home.gotoHandler(`${productLink}?pid=${props.productId}`, productToNative)
    }}>
        <img styleName="loan-product-logo" src={logo} />
        <div styleName="loan-product-name">{name}</div>
        <div styleName="loan-product-amount">借款范围({props.amountStr})</div>
        <div>{props.productLabelList.map(generate_labels)}</div>
    </div>

}, styles)))

const SubProduct = inject('jrgc_home')(observer(CSSModules((props) => {
    let toNative = props.toNative ? props.toNative : '';
    return (
        <div styleName="sub-product-item" onClick={() => { props.jrgc_home.gotoHandler(props.redirectUrl, toNative) }}>
            <div styleName="sub-product-logo-container">
                <img styleName="sub-product-logo" src={decodeURIComponent(props.logoUrl)} />
            </div>
            <div styleName="sub-product-title">
                <div styleName="sub-product-1st-title">{props.productTitle}</div>
                <div styleName="sub-product-2nd-title">{props.productDec}</div>
            </div>
            <div styleName="next-icon-container"></div>
        </div>
    )
}, styles)))

@inject("jrgc_home")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class JRGCHome extends React.Component {

    componentDidMount() {
        this.props.jrgc_home.getDataHandler()
        NativeBridge.setTitle('借款')
    }

    render() {
        let { jrgc_home } = this.props;
        return <div>
            <div styleName="loan-product-container">
                <div styleName="product-title">
                    <img styleName="product-title-icon" src={require("../images/jrgc/loan-category-icon.png")} />我要借款
                    <div>
                        {jrgc_home.loanProductList.map(product => <LoanProduct {...product} key={product.productId} />)}
                    </div>
                </div>
            </div>
            <div styleName="sub-product-container">
                <div styleName="product-title">
                    <img styleName="product-title-icon" src={require("../images/jrgc/sub-category-icon.png")} />
                    精选推荐
                    </div>
                <div styleName="sub-product-item-container">
                    {jrgc_home.subProductList.map(product => <SubProduct {...product} key={product.productTitle} />)}
                </div>
            </div>
        </div>
    }
}
export default JRGCHome


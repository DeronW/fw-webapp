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
        '1': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAMAAADjjeWOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA81BMVEUAAAD9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3kAAAB/QythAAAAT3RSTlMAARUIQgYZaJDDtT9D8fbaJw2y9QNmZEHGhBvRMOk+AoUUKjbn0qb+jk7MwVtx+jzd60B1kQeJ/dkkc20oq2/NS1e5WrNg8rZqX34MJTE45eArQQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAC1SURBVBjTVdDVFoJgDADgXxRQbAQDE7uwMLC7Y+//NiIMgd19ZzsrQqzwEFdQXh/tIMP6A1zQdigMEYjGLMYJDwAJFpsIYpKk0gAZTEtZ4HKCmC+YLJb0YvDLZZxQqf4MNatb3WCjiWwZhDaDm3VMdzGt9AxyyP7A4HCEVs3q8QQPIdOZTm2O6cWSXq0BFAG9ge2O7A+UtctRLz7R8v/wM1zgerMfcdf4x/Nl+61+BOIMyfXZLwDJIFdI7v/vAAAAAElFTkSuQmCC',
        '2': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAwFBMVEUAAABGq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+8AAABzfUMUAAAAPnRSTlMADy8G2acDNnM/4AFgGsYtAn8eI8WETer7d3IzS7VO/Dw+hdcsXecb+AtrCfnV6coq2H47yLdKRQ223V6CTEPSkQQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAn0lEQVQY013PxxaCQBBE0ULBjIoBxZwTZjGh9v9/lj3gYWZ8u76rauCXkcJfaZOsjE5ZIsrplGcqFDUqMZGtUVlQRYGqI4Rq8VVvNOG2Iml7ntfpAj3qY0Cy4YipjLFCNGGaYqbSnGmBpUoO0wprlTZM5GMrZecLsrGXdBAj6IiTpHNEFwSSjIhcXBMx+aGbWGIl2+9Mj2f4wjuMCz4sX16qMVuB8WhKAAAAAElFTkSuQmCC',
        '3': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAMAAAD9GTxlAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAkFBMVEUAAAD9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDQAAABlJT//AAAALnRSTlMAAQZhAyOywIVtTfT+EtifZy9u+0dEJuog+T8bImqXkL/Q3hUR/S1PUn+szwo6ExFmygAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAACDSURBVBjTVZBZEoIwEAUTBFQWdwFFDbhvvPsfj6SSCo/+60rX1EyEcMhAMJOQLYrZ5HTGOkfCaZrlnGIxSrHkFFhxCqy9brRtd3tDYVNHWdnUcjja1GHG1SfN2djFT1PamuHCFrjevN0fSJ/DWi9kb9pZ4cPXtl9Jlv/+/NhVo0+ksgdnkw71Jq2zFAAAAABJRU5ErkJggg=='
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
        logo = require('../images/jrgc/house-icon.png')
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


import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

import { Header } from '../../lib/components'
import { Browser, Post, NativeBridge, Storage } from '../../lib/helpers'

import { Utils, Components } from 'fw-javascripts'

import styles from '../css/loan-fxh-want.css'
@inject("fxh")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})

export default class ProductDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            show: true,
            improve: this.props.improve
        };
    }

    closeHandler = () => {
        this.props.callbackHandler(false);
    }

    componentDidMount() {
        Post(`/api/product/v1/productDisplayList.json`, {
            pageIndex: 1,
            pageSize: 50,
            productDisplayType: 3
        }).then(data => {
            this.setState({ productList: data.resultList })
        }, e => { Components.showToast(e.message) });
    }

    render() {

        let _product_mask = {
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            background: "rgba(0,0,0,.7)",
            zIndex: "100000"
        };

        let _product_popup = {
            position: "fixed",
            top: "50%",
            left: "50%",
            WebkitTransform: "translate(-50%,-50%)",
            transform: "translate(-50%,-50%)",
            background: "#fff",
            borderRadius: "10px",
            width: "600px",
            padding: "27px 27px 0"
        }

        let _product_title = {
            textAlign: "center",
            fontSize: "32px",
            color: "#6aa4f0",
            marginBottom: "20px"
        }

        let _product_fail_reason = {
            textAlign: "center",
            fontSize: "24px",
            color: "#999",
            lineHeight: "38px",
            marginTop: "-18px"
        }

        let _product_tip = {
            textAlign: "center",
            fontSize: "24px",
            color: "#333",
            lineHeight: "38px"
        }

        let _single_product_link = {
            display: "block",
            width: "200px",
            textAlign: "center",
            float: "left",
            marginBottom: "50px"
        }

        let _product_logo = {
            width: "90px",
            height: "90px"
        }

        let _product_name = {
            display: "block",
            fontSize: "32px",
            lineHeight: "44px",
            color: "#333"
        }

        let _product_label = {
            display: "block",
            width: "165px",
            lineHeight: "36px",
            background: "#edf5ff",
            borderRadius: "18px",
            fontSize: "24px",
            color: "#6aa4f0",
            margin: "0 auto"
        }

        let _product_list_wrap = {
            overflow: "hidden",
            marginTop: "40px"
        }

        let _close_btn = {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA6CAMAAAA5p9EkAAAAe1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NgkbwAAAAKHRSTlMA++vyty0KB5UV0Z6uVGVMEMDdbDIb5FE92HhbI8aDNo6JRCd9cl+lf4R2NQAAArxJREFUSMeNlevCgiAMhsGzeOhgavqlnc37v8JvgwoUSN8fGm6PG9skYlY5XNPGoSN1WNpnMVkt/9KMU7H+tIr8Y6NJu80iOezfvnsvaou8aCOv+gT/Tfsd96LpUBKpU+5R/twr7WjuokdVbDVL/HDQ5NYWMkjR7OSh2dryF1+Mxu0ObcmW2FTyd6eGV8dM5mRTgaE9DQ46rO1SF88ORp4/xXzY8vzcsYXR9NkDo64ZvRNGHia5UCjwurE7u1AW1RXqRG9knXKsl1w+YXkla/UC7/rbWRc2G65mY3T/LFp40UY1mgC1zeD/924tlK5TvPZjpHXfGzuZWFhBP98fLOY/rUUyQ3Fcj9PAYulh+lJ3irCGOjDoaoEi/gN8e9V1I2EF9WeldvBeg+VAdNiOCgafXMQ7dNiKilwLuIMtJUZYQ6WYMDu4XRsceEYUN9xBeNloHRboQTc/+EZPsnU67OionAlCfFEyXTXANpRswLIlR7iW5j8IRKkRFRS/nnQjLxMqMrI3zh5wNCyoHa55ziVcDUdGiKjbUgucw27ghiNiQQ8ks8AX8f3swWhDiQ1O4cwSN2ZDrbAjDrgCUt8a0DMhVtjnp5S4Z0bUDj8/8arZhyRRFb6oLp044XjNaKx4SnQCH6YpP7+/HsqoSlSF6V0uExltNz3JisTXZzCp5eJE5ZF0W/pL0Zsrs+hg4a9GMdTruzpAEixcicYVFKSU60h2cFEeL7JU0MCDfBV6Bc/ddMhcfuQtq8VjKNYPGLocuUc37Wh8jqD+NxkmiGbmbMZd/AO9M0SNO8spTnJhI4OHi/aN2XqsMDTLjOnmezQ2vrXt6cgdHuU822vFLUlA7KqFD2WX+h6KgH4WNSMXO5KfCp5AC9GqYY1DP8smX57acNjRcS7qZWSdyiJ1FLB65bJ1q/hb3vbXvh2OVu4flv1tOJRmxIsAAAAASUVORK5CYII=')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            width: "58px",
            height: "58px",
            position: "absolute",
            bottom: "-106px",
            left: "300px"
        }

        let _improve_amount = {
            display: "block",
            fontSize: "28px",
            color: "#6aa4f0",
            lineHeight: "92px",
            textAlign: "center",
            borderTop: "1px solid #f0f0f0"
        }

        let gotoHandler = (link, need_login, next_title) => {
            if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
            next_title = Browser.inAndroidApp ? encodeURI(next_title) : next_title;
            Browser.inApp ? NativeBridge.goto(link, need_login, next_title) : location.href = encodeURI(link);
        }

        let singleProduct = (item, index) => {
            return (
                <div key={index} onClick={() => gotoHandler(item.productDetailUrl, false, item.productName)} style={_single_product_link}>
                    <img src={item.productLogo} style={_product_logo} />
                    <span style={_product_name}>{item.productName}</span>
                    <span style={_product_label}>{item.productLabelList[0].labelValue}</span>
                </div>
            )
        }

        const USER = Storage.getUserDict();
        let ua = window.navigator.userAgent;
        let inWX = ua.indexOf('MicroMessenger') > -1;
        let inApp = ua.indexOf('FinancialWorkshop') > -1;
        let SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;

        return (
            <div>
                {this.state.show && <div style={_product_mask} onClick={this.closeHandler}>
                    <div style={_product_popup}>
                        <div style={_product_title}>{this.props.popTitle}</div>
                        <div style={_product_fail_reason}>{this.props.errorMessage}</div>
                        <div style={_product_tip}>为方便您快速借到钱，推荐您申请以下借款产品</div>
                        <div style={_product_list_wrap}>
                            {this.state.productList.length > 0 && this.state.productList.map(singleProduct)}
                        </div>
                        {this.state.improve && <a style={_improve_amount} href={`/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>仍去提额</a>}
                        <div style={_close_btn} onClick={this.closeHandler}></div>
                    </div>
                </div>}
            </div>
        )
    }
}

import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'

import {Header} from '../../lib/components'
import {Browser, Post, NativeBridge, Storage} from '../../lib/helpers'

import {Utils, Components} from 'fw-javascripts'

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
            productList:[],
            show:true,
            improve:this.props.improve
        };
    }

    closeHandler = () => {
        this.props.callbackHandler(false);
    }

    componentDidMount() {
        Post(`/api/product/v1/productDisplayList.json`,{
            pageIndex:1,
            pageSize:50,
            productDisplayType:3
        }).then(data => {
            this.setState({productList: data.resultList })
        }, e => { Components.showToast(e.message) });
    }

    render() {

        let _product_mask = {
            position:"fixed",
            width:"100%",
            height:"100%",
            top:"0",
            left:"0",
            background:"rgba(0,0,0,.7)",
            zIndex:"100000"
        };

        let _product_popup = {
            position:"fixed",
            top:"50%",
            left:"50%",
            WebkitTransform:"translate(-50%,-50%)",
            transform:"translate(-50%,-50%)",
            background:"#fff",
            borderRadius:"10px",
            width:"600px",
            padding:"27px 27px 0"
        }

        let _product_title = {
            textAlign:"center",
            fontSize:"32px",
            color:"#6aa4f0",
            marginBottom:"20px"
        }

        let _product_fail_reason = {
            textAlign:"center",
            fontSize:"24px",
            color:"#999",
            lineHeight:"38px",
            marginTop:"-18px"
        }

        let _product_tip = {
            textAlign:"center",
            fontSize:"24px",
            color:"#333",
            lineHeight:"38px"
        }

        let _single_product_link = {
            display:"block",
            width:"200px",
            textAlign:"center",
            float:"left",
            marginBottom:"50px"
        }

        let _product_logo = {
            width:"90px",
            height:"90px"
        }

        let _product_name = {
            display:"block",
            fontSize:"32px",
            lineHeight:"44px",
            color:"#333"
        }

        let _product_label = {
            display:"block",
            width:"165px",
            lineHeight:"36px",
            background:"#edf5ff",
            borderRadius:"18px",
            fontSize:"24px",
            color:"#6aa4f0",
            margin:"0 auto"
        }

        let _product_list_wrap = {
            overflow:"hidden",
            marginTop:"40px"
        }

        let _close_btn = {
            backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA6CAMAAAA5p9EkAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMA+gIKB/zstvBMwOndbDId5JZRFfTPVCzYeFsuI8awn5yDNg+6q46JZ2NEJ9OTfXJfGBKlVj88MpynjgAAAwJJREFUSMeVldmCqjAMhgOCjiKKCwouKOM+7tvw/m92kmpPC7TC/BciJB8JSQigVvuyiYKqkRjOYRU/elBa43WQpHWIJ2VAc+QnKjXqheil+fZt1o6hu3XDztJ7X/E/08Mp8zJWlzYITbY1m12vtfXotk8ennvLWa6nKpm+uhqysiJzdWeprSG78dpUGW8Nss1voFM7IoeV4tY9n+ekl0uhlzm4MqXaFnXx20GvKJO2Sfn4VyjSnlp4TF87UdQyozehyJdULtg/pyBh7orP3JdczUOS2D9QTjsaEnF6xtMNlNUdvf/3Y/GFD2uVZnvkzmsd4o2kOTdVNZNb4KL/6N1aLN1U8momHTPb/WUyFYlZHr7Rr78jnr+oxcxMozSuz3TgX/avJtIn7Q0BS6gjDfoC+9Rhf9A3lqPUBSyh40ypHTp20dICJSzQqkA5M8TjGi0m5OG5HoUbzqGLR7RFACpYg5J8TAwPVXpcHVxZKlG4s7YuWKM18Att5c0nvIwvFeuVBnbyqJgJE8asZAp1EdahUEfLAn7xV712R4QaShSeRDFW9dZTmUgdJfvD2BaNhgbVwzQcN2jjr2JlWDVauaGhgbe4aABMNLsatAUDNUzD2MRDE406FHRw9NpZK1zMOpTDxyzrvBaci6kvFOg3gBYe0pZ6HwdKVA+feTwPP27y54WjArbp4ymzU3wVeM0MaTU+OJqBW+mUz/SHTfRJGlWBivvZib0XpzMRrYETL1XLnY/zMziXNukECzDjhj99UqirUhZTzGFYGqVQd+BqYS18qyTaw770pbf2KAavUDVWZKFKgBe2pdANejbM1JD12corVkhb7JpfMHZx5JjW0DN79ZygYvMjac0owkCdTdK4fkD3PkVVPtnOoEl2daErJ6pJv662/noU+vBQ0da2ScZgqG17lDCHUzub7cZjlnkF9Oq+fGx/3d1br4DDRydImA5P+KjKmWgmwwv8wLH5abArnlrr0uD+QkZtYEIptd2oKoHefcf3Skn+ZxfGmzi8PLXcP64OmihPShFQAAAAAElFTkSuQmCC')",
            backgroundRepeat:"no-repeat",
            backgroundSize:"100% 100%",
            width:"58px",
            height:"58px",
            position:"absolute",
            bottom:"-106px",
            left:"300px"
        }

        let _improve_amount = {
            display:"block",
            fontSize:"28px",
            color:"#6aa4f0",
            lineHeight:"92px",
            textAlign:"center",
            borderTop:"1px solid #f0f0f0"
        }

        let gotoHandler = (link, need_login, next_title) => {
            if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
            next_title = Browser.inAndroidApp ? encodeURI(next_title) : next_title;
            Browser.inApp ? NativeBridge.goto(link, need_login, next_title) : location.href = encodeURI(link);
        }

        let singleProduct = (item, index) => {
            return (
                <div key={index} onClick={()=>gotoHandler(item.productDetailUrl,false,item.productName)} style={_single_product_link}>
                     <img src={item.productLogo} style={_product_logo}/>
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

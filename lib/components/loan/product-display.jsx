class ProductDisplay extends React.Component {

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
        $FXH.Post(`${API_PATH}/api/product/v1/productDisplayList.json`,{
            pageIndex:1,
            pageSize:8,
            productDisplayType:3
        }).then(data => {
            this.setState({productList: data.resultList })
            }, e => { $FW.Component.Toast(e.message) });
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
            backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA6CAYAAAAOeSEWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlBRDYzQzg4NUJBODExRTc4MDhCRDgwQUFDQkRCN0Q1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlBRDYzQzg5NUJBODExRTc4MDhCRDgwQUFDQkRCN0Q1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUFENjNDODY1QkE4MTFFNzgwOEJEODBBQUNCREI3RDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUFENjNDODc1QkE4MTFFNzgwOEJEODBBQUNCREI3RDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7gstgrAAAF8UlEQVR42tSb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')",
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

        function gotoHandler(link, need_login, next_title){
            if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
            next_title = $FW.Browser.inAndroidApp() ? encodeURI(next_title) : next_title;
            $FW.Browser.inApp() ? NativeBridge.goto(link, need_login, next_title) : location.href = encodeURI(link);
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

        const USER = $FW.Store.getUserDict();

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



class ProductDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productList:[]
        };
    }

    closeHandler = () => {

    }

    componentDidMount() {
        $FXH.Post(`${API_PATH}/api/product/v1/productDisplayList.json`,{
            pageIndex:1,
            pageSize:100,
            productDisplayType:3
        }).then(data => {
            this.setState({productList: data.resultList })
            }, e => { $FW.Component.Toast(e.message) });
    }

    render() {

        let _product_mask = {
            position:"absolute",
            width:"100%",
            height:"100%",
            top:"0",
            left:"0",
            background:"rgba(0,0,0,.7)",
            zIndex:"10"
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
            padding:"27px"
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
            lineHeight:"38px"
        }

        let _product_tip = {
            textAlign:"center",
            fontSize:"24px",
            color:"#333",
            lineHeight:"38px"
        }


        return <div style={_product_mask}>
            <div style={_product_popup}>
                <div style={_product_title}>审核未通过</div>
                <div style={_product_fail_reason}>您的用户信息与读秒不匹配无法授权登录读秒</div>
                <div style={_product_tip}>为方便您快速借到钱，推荐您申请以下借款产品</div>
                <div>

                </div>
            </div>
        </div>
    }
}


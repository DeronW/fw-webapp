function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

const ShoppingCart = React.createClass({
    getInitialState: function () {
        var ps = this.props.products;
        //ps.map(i=>i.checked=true);
        return {
            products: ps,
            //changeAll:true
        }
    },
    componentDidMount:function(){
        //var ps = this.state.products;
        //for(var i=0;i<ps.length;i++){
        //    if(!ps[i].isChecked){
        //        this.setState({changeAll:false});
        //    }
        //}
    },
    checkHandler: function (index) {
        let ps = this.state.products;
        var _this = this;
        $FW.Ajax({
            url:`${API_PATH}mall/api/cart/v1/isChecked.json`,
            data:{
                flag:ps[index].isChecked = !ps[index].isChecked,
                productBizNo:ps[index].bizNo
            },
            success:function(data){
                 _this.setState({products: ps});
                //for(var i=0;i<ps.length;i++){
                //    if(!ps[i].checked){
                //        _this.setState({changeAll:false});
                //    }else if(ps[i].checked){
                //        _this.setState({changeAll:true});
                //    }
                //}
            }
       });

    },
    deleteHandler: function (index) {
        let ps = this.state.products;
        var _this = this;
        $FW.Ajax({
                url:`${API_PATH}mall/api/cart/v1/deleteCartProduct.json`,
            data:{
                productId:ps[index].productId
            },
            enable_loading: true,
            success:function(data){
                _this.setState({products: ps});
            }
        });
        ps.splice(index,1);
    },
    allChoseHandler:function(){
        //let products=this.state.products;
        //let newChangeAll=!this.state.changeAll;
        //for(var i= 0;i<this.state.products.length;i++){
        //    products[i].isChecked=this.state.changeAll?false:true;
        //}
        //this.setState({
        //    products: products,
        //    changeAll:newChangeAll
        //});
        $FW.Ajax({
            url:`${API_PATH}mall/api/cart/v1/isChecked.json`,
            data:{
                flag:ps[index].isChecked = !ps[index].isChecked,
                productBizNo:ps[index].bizNo
            },
            success:()=>{
                this.setState({products: ps});
            }
        });
    },
    updateCount: function (index,newAmount) {
        var ps = this.state.products;
        var _this = this;
        var c = newAmount;
        c = parseInt(c) || 1;
        if (c < 1) c = 1;
        if (c > ps[index].productStock) c = ps[index].productStock;
        ps[index].productNumber=c;
        $FW.Ajax({
            url:`${API_PATH}mall/api/cart/v1/updateCartNumber.json`,
            data:{
                buyNum:ps[index].productNumber,
                productBizNo:ps[index].bizNo
            },
            success:function(data){
                _this.setState({products: ps});
            }
        });
    },
    changeMinus:function(index){
        let ps = this.state.products;
        this.updateCount(index,ps[index].productNumber - 1);
    },
    changePlus:function(index){
        let ps = this.state.products;
        this.updateCount(index,ps[index].productNumber + 1);
    },
    render: function () {
        let {products} = this.state;

        let product_item =  (product, index) => {
            return (
                <div className="shopping-item" key={index}>
                    <div className="checked-icon" onClick={()=>this.checkHandler(index)}>
                        <span className={product.isChecked ? "checked-circle" : "unchecked-circle"}></span>
                    </div>
                    <div className="product-img"><img src={product.img}/></div>
                    <div className="product-item">
                        <div className="product-info">
                            <div className="product-name">{product.productName}</div>
                            <div className="product-price">¥{product.productPrice*product.productNumber}+{product.beanPrice*product.productNumber}工分</div>
                            <div className="detail-num-change">
                                <div className="minus" onClick={()=>this.changeMinus(index)}></div>
                                <div className="input-num">{product.productNumber}</div>
                                <div className="plus" onClick={()=>this.changePlus(index)}></div>
                            </div>
                        </div>
                    </div>
                    <div className="product-delete" onClick={()=>this.deleteHandler(index)}></div>
                </div>
            )
        };
        let total_price=0;
        let total_score=0;
        let total=(product, index)=>{
            product.isChecked ? total_price+=product.productPrice*product.productNumber:total_price;
            product.isChecked ? total_score+=product.beanPrice*product.productNumber:total_score;
        };
        this.state.products.map((product, index) => total(product, index));

        //for(var i=0;i<ps.length;i++){
        //    if(!ps[i].checked){
        //        _this.setState({changeAll:false});
        //    }else if(ps[i].checked){
        //        _this.setState({changeAll:true});
        //    }
        //}


        //let checkAllCN = "total-checked-circle";
        //
        //for(let i = 0; i < products.length;i++) {
        //    if(!i.isChecked) {
        //        checkAllCN = 'total-unchecked-circle';
        //        break;
        //    }
        //}

        let checkAllCN =  products.reduce((a, b) => a && b.isChecked, true) ?
            "total-checked-circle" :
            'total-unchecked-circle';

        return (
            <div className="shopping-cart">
                <div className="cart-header">
                    {this.props.products.length !=0 ? <div className="all-chosen" onClick={this.allChoseHandler}>
                        <span className={checkAllCN}></span>
                        <span className="chosenTip">全选</span></div> : null}
                    <div className="cart-title">购物车</div>
                </div>
                {this.props.products.length !=0  ? this.state.products.map((product, index) => product_item(product, index)) : <div className="empty-cart-icon"></div>}
                {this.props.products.length !=0  ?  <div className="pay-bar">
                    <div className="all-price">合计：<span className="total-price">¥{total_price}+{total_score}工分</span></div>
                    <a className="pay-btn" onClick={() => gotoHandler("/static/mall/new-order-confirm/index.html?cartFlag=true")}>结算</a>
                </div> : null}
                <div className="fixed-nav">
                    <a className="fixed-nav-link fixed-nav-link1" onClick={ () => gotoHandler("/static/mall/new-home/index.html") }></a>
                    <a className="fixed-nav-link fixed-nav-link2" onClick={ () => gotoHandler("/static/mall/product-category/index.html") }></a>
                    <a className="backToIndex" onClick={ () => $FW.Browser.inApp() ? NativeBridge.close() : location.href = 'http://m.9888.cn'}></a>
                    <a className="fixed-nav-link fixed-nav-link3 active" onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
                    <a className="fixed-nav-link fixed-nav-link4" onClick={ () => gotoHandler("/static/mall/new-user/index.html", true) }></a>
                </div>
            </div>
        )
    }
});
$FW.DOMReady(function () {
    NativeBridge.setTitle('购物车');
    $FW.Ajax({
        //url: "http://localhost/nginx-1.9.12/html/shoppingcart.json",
        url:`${API_PATH}mall/api/cart/v1/shoppingCart.json`,
        enable_loading: true
    }).then(data => ReactDOM.render(<ShoppingCart products={data.cartList}/>, CONTENT_NODE));
});


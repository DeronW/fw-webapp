'use strict';
const API_PATH = document.getElementById('api-path').value;

const ShoppingCart = React.createClass({
    getInitialState: function () {
        var ps = this.props.products;
        ps.map(i=>i.checked=true);
        return {
            products: ps,
            changeAll:true
        }
    },
    checkHandler: function (index) {
        let ps = this.state.products;
        ps[index].checked = !ps[index].checked;
        this.setState({changeAll:true});
        for(var i=0;i<ps.length;i++){
            if(!ps[i].checked){
                this.setState({changeAll:false});
            }
        }
        this.setState({products: ps});
    },
    deleteHandler: function (index) {
        let ps = this.state.products;
        ps.splice(index,1);
        $FW.Ajax({
            url:API_PATH + 'mall/api/cart/v1/deleteCartProduct.json',
            data:{
                productId:ps[index].bizNo
            },
            enable_loading: true,
            success:function(data){

            }
        });
        this.setState({products: ps});
    },
    allChoseHandler:function(){
        let products=this.state.products;
        let newChangeAll=!this.state.changeAll;
            for(var i= 0;i<this.state.products.length;i++){
                products[i].checked=this.state.changeAll?false:true;
            }
            this.setState({
                products: products,
                changeAll:newChangeAll
            });
    },
    updateCount: function (index,newAmount) {
        var ps = this.state.products;
        var c = newAmount;
        c = parseInt(c) || 1;
        if (c < 1) c = 1;
        if (c > ps[index].stock) c = ps[index].stock;
        ps[index].amount=c;
        this.setState({products:ps});
    },
    changeMinus:function(index){
        let ps = this.state.products;
        this.updateCount(index,ps[index].amount - 1)
    },
    changePlus:function(index){
        let ps = this.state.products;
        this.updateCount(index,ps[index].amount + 1)
    },
    render: function () {
        var _this = this;
        let product_item =  (product, index) => {
            return (
                <div className="shopping-item" key={index}>
                    <div className="checked-icon" onClick={()=>this.checkHandler(index)}>
                        <span className={product.checked ? "checked-circle" : "unchecked-circle"}></span>
                    </div>
                    <div className="product-img"><img src={product.reserved}/></div>
                    <div className="product-item">
                        <div className="product-info">
                            <div className="product-name">{product.ProductName}</div>
                            <div className="product-price">¥{product.price*product.amount}+{product.score*product.amount}工分</div>
                            <div className="detail-num-change">
                                <div className="minus" onClick={()=>this.changeMinus(index)}></div>
                                <div className="input-num">{product.amount}</div>
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
            product.checked ? total_price+=product.price*product.amount:total_price;
            product.checked ? total_score+=product.score*product.amount:total_score;
        };
        this.state.products.map((product, index) => total(product, index));
        return (
            <div className="shopping-cart">
                <div className="cart-header">
                    <div className="all-chosen" onClick={this.allChoseHandler}><span className={this.state.changeAll?"total-checked-circle":"total-unchecked-circle"}></span><span
                        className="chosenTip">全选</span></div>
                    <div className="cart-title">购物车</div>
                </div>
                {this.state.products.map((product, index) => product_item(product, index)) }
                <div className="pay-bar">
                    <div className="all-price">合计：<span className="total-price">¥{total_price}+{total_score}工分</span></div>
                    <a className="pay-btn">结算</a>
                </div>
                <div className="fixed-nav">
                    <a className="fixed-nav-link fixed-nav-link1"></a>
                    <a className="fixed-nav-link fixed-nav-link2"></a>
                    <a className="backToIndex"></a>
                    <a className="fixed-nav-link fixed-nav-link3 active"></a>
                    <a className="fixed-nav-link fixed-nav-link4"></a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('购物车');
    $FW.Ajax({
        //url: "http://localhost/nginx-1.9.12/html/shoppingcart.json",
        url:API_PATH + 'mall/api/cart/v1/shoppingCart.json',
        enable_loading: true,
        success: function (data) {
            console.log(data);
            ReactDOM.render(<ShoppingCart products={data.cartList}/>, document.getElementById('cnt'));
        }
    });
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}

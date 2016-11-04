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
        //$FW.Ajax({
        //    url:"",
        //    data:{
        //        delete_bizNo:ps[index].bizNo
        //    },
        //    enable_loading: true,
        //    success:function(data){
        //
        //    }
        //});
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
                    <div className="product-img"><img src={product.img}/></div>
                    <div className="product-item">
                        <div className="product-info">
                            <div className="product-name">{product.title}</div>
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
        this.state.products.map((p, index) => total(p, index));
        return (
            <div className="shopping-cart">
                {this.state.products.map((p, index) => product_item(p, index)) }
                <div className="calculation-bar">
                    <div className="all-chosen" onClick={this.allChoseHandler}><span className={this.state.changeAll?"total-checked-circle":"total-unchecked-circle"}></span><span
                        className="chosenTip">全选</span></div>
                    <div className="all-price">合计：<span className="total-price">¥{total_price}+{total_score}工分</span></div>
                </div>
                <div className="pay-bar">
                    <a className="pay-btn">结算</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('购物车');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"购物车"} back_handler={backward}/>, document.getElementById('header'));
    $FW.Ajax({
        url: "http://localhost/nginx-1.9.12/html/shoppingcart.json",
        enable_loading: true,
        success: function (data) {
            console.log(data);
            ReactDOM.render(<ShoppingCart products={data.product}/>, document.getElementById('cnt'));
        }
    });
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}

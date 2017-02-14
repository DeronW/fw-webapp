function getNextElement(node) {
    if (node.nextSibling.nodeType == 1) {    //判断下一个节点类型为1则是“元素”节点
        return node.nextSibling;
    }
    if (node.nextSibling.nodeType == 3) {      //判断下一个节点类型为3则是“文本”节点  ，回调自身函数
        return getNextElement(node.nextSibling);
    }
    return null;
}

function gotoHandler(link) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    location.href = encodeURI(link);
}

const ShoppingCart = React.createClass({
    getInitialState: function () {
        let inIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        let inApp = navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
        var appCartHeader = (inIOS && inApp) ? "app-cart-header" : "cart-header";
        var shoppingCart = (inIOS && inApp) ? "app-shopping-cart" : "shopping-cart";
        var ps = this.props.products;
        ps.map(i => i.checked = true);

        return {
            products: ps,
            changeAll: true,
            appCartHeader: appCartHeader,
            shoppingCart: shoppingCart
        }
    },
    componentDidMount: function () {
        var ps = this.state.products;
        for (var i = 0; i < ps.length; i++) {
            if (!ps[i].cartStatus == 0) {
                this.setState({changeAll: false});
            }
        }
        document.querySelector("._style_header_fixed").removeChild(document.querySelector('._style_header_arrow'));
    },
    checkHandler: function (index) {
        var ps = this.state.products;
        $FW.Ajax({
            url: `${API_PATH}mall/api/cart/v1/isChecked.json`,
            data: {
                flag: ps[index].cartStatus === 0,
                productBizNo: ps[index].productBizNo
            }
        }).then(data => {
            ps[index].cartStatus = ps[index].cartStatus == 0 ? 5 : 0;
            this.setState({products: ps});

            for (var i = 0; i < ps.length; i++) {
                if (ps[i].cartStatus == 5) {
                    this.setState({changeAll: false});
                } else if (ps[i].cartStatus == 0) {
                    this.setState({changeAll: true});
                }
            }
        });

    },
    deleteHandler: function (index) {
        let ps = this.state.products;
        $FW.Ajax({
            url: `${API_PATH}mall/api/cart/v1/deleteCartProduct.json`,
            data: {
                productBizNo: ps[index].productBizNo
            },
            enable_loading: 'mini'
        }).then(data => {
            this.setState({products: ps});
        });
        ps.splice(index, 1);
    },
    allChoseHandler: function () {
        let products = this.state.products;
        let newChangeAll = !this.state.changeAll;
        for (var i = 0; i < this.state.products.length; i++) {
            products[i].cartStatus = this.state.changeAll ? 5 : 0;
        }
        this.setState({
            products: products,
            changeAll: newChangeAll
        });
        $FW.Ajax({
            url: `${API_PATH}mall/api/cart/v1/isChecked.json`,
            data: {
                allFlag: newChangeAll,
                productBizNo: ''
            }
        }).then(() => this.setState({products: products}));
    },
    updateCount: function (index, newAmount) {
        var ps = this.state.products;
        var _this = this;
        var c = newAmount;
        c = parseInt(c) || 1;
        if (c < 1) c = 1;
        if (c > ps[index].prdInventory) c = ps[index].prdInventory;
        ps[index].productNumber = c;

        $FW.Ajax({
            url: `${API_PATH}mall/api/cart/v1/updateCartNumber.json`,
            data: {
                buyNum: ps[index].productNumber,
                productBizNo: ps[index].productBizNo
            }
        }).then(() => this.setState({products: ps}));
    },
    changeMinus: function (index) {
        let ps = this.state.products;
        this.updateCount(index, ps[index].productNumber - 1);
    },
    changePlus: function (index) {
        let ps = this.state.products;
        this.updateCount(index, ps[index].productNumber + 1);
    },
    payHandler: function () {
        let prd = [];
        let _checkDom = document.querySelectorAll('.checked-circle');
        _checkDom = Array.prototype.slice.call(_checkDom);
        _checkDom.map((checkDom, index) => {
            prd.push(getNextElement(checkDom).value);
        });
        gotoHandler("/static/mall/order-confirm/index.html?cartFlag=true&prd=" + prd)

    },
    render: function () {
        let {products} = this.state;

        let product_item = (product, index) => {
            return (
                product.prdStatus == 1 ?
                    <div className="shopping-item" key={index}>
                        <div className="checked-icon" onClick={() => this.checkHandler(index)}>
                            <span className={product.cartStatus == 0 ? "checked-circle" : "unchecked-circle"}></span>
                            <input type="hidden" className="checked-bizNo"
                                   value={product.cartStatus == 0 ? product.productBizNo : null}/>
                        </div>
                        <a className="product-img"
                           href={"/static/mall/product-detail/index.html?bizNo=" + product.productBizNo}><img
                            src={product.img}/></a>
                        <div className="product-item">
                            <div className="product-info">
                                <div className="product-name">{product.productName}</div>
                                <div className="product-price">
                                    {product.subTotalPrice == 0 ? "" : '¥' + product.subTotalPrice}
                                    {product.subTotalPrice == 0 || product.subTotalCredit == 0 ? '' : '+'}
                                    {product.subTotalCredit == 0 ? "" : product.subTotalCredit + '工分'}
                                </div>
                                <div className="detail-num-change">
                                    <div className="minus" onClick={() => this.changeMinus(index)}></div>
                                    <div className="input-num">{product.productNumber}</div>
                                    <div className="plus" onClick={() => this.changePlus(index)}></div>
                                </div>
                            </div>
                        </div>
                        <div className="product-delete" onClick={() => this.deleteHandler(index)}></div>
                    </div> : null
            )
        };
        let total_price = 0;
        let total_score = 0;
        let total = (product, index) => {
            product.cartStatus == 0 ? total_price += product.subTotalPrice * product.productNumber : total_price;
            product.cartStatus == 0 ? total_score += product.subTotalCredit * product.productNumber : total_score;
        };
        this.state.products.map((product, index) => total(product, index));

        let checkAllCN = "total-checked-circle";
        for (let i = 0; i < products.length; i++) {
            if (products[i].cartStatus == 5) {
                checkAllCN = 'total-unchecked-circle';
                break;
            }
        }

        return (
            <div className={this.state.shoppingCart}>
                {this.props.products.length != 0 ? this.state.products.map((product, index) => product_item(product, index)) :
                    <div className="empty-cart-icon"></div>}
                {this.props.products.length != 0 ? <div className="pay-bar">
                    <div className="all-price">合计：<span className="total-price">
                        {total_price == 0 ? "" : '¥' + total_price.toFixed(2)}
                        {total_price == 0 || total_score == 0 ? '' : '+'}
                        {total_price == 0 && total_score == 0 ? '0' : ''}
                        {total_score == 0 ? "" : total_score + '工分'}
                    </span>
                    </div>
                    <a className="pay-btn" onClick={this.payHandler}>结算</a>
                </div> : null}
            </div>
        )
    }
});

$FW.DOMReady(function () {
    $FW.Ajax(`${API_PATH}mall/api/cart/v1/shoppingCart.json`)
        .then(data => ReactDOM.render(<ShoppingCart products={data.cartList}/>, CONTENT_NODE));
    ReactDOM.render(<Header title={"购物车"} show_back_btn={true}/>, HEADER_NODE);
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
});

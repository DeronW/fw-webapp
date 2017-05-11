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

class MainPanel extends React.Component {
    render() {
        let product = (p, index) => {

            let link_a = `/static/loan/fxh/index.html`,
                link_b = `/static/loan/dumiao/index.html`,
                link = p.productName == '放心花' ? link_a : link_b;

            return (
                <Nav className="borrow-money-list" key={index} onClick={()=>gotoHandler(`${link}?pid=${p.productId}`)}>
                    <div className="icon-block">
                        <img src="images/icon.png" />
                    </div>
                    <div className="info">
                        <div className="t">
                            <span className="title-text">{p.productName}</span>
                            <div className="tag">
                                {p.productLabelList.map(i => <img src={`/static/loan/home/images/tag-${i.labelType}a.png`} />)}
                            </div>
                        </div>
                        <div className="b">
                            <div className="text"> 借款范围（{p.amountStr}） </div>
                        </div>
                    </div>
                    <div className="next"></div>
                </Nav>
            )
        }

        let main_product = this.props.products[0],
            sub_products = this.props.products.slice(1)

        let jump_link = $FW.Browser.inApp() ? `/static/loan/user-weixin-jrgcapp/index.html` : `/static/loan/weixin-download/index.html`;

        let generate_other_products = (product) => (
            <div className="other-products-item">
                <div className="product-icon">
                    <img src={product.iconUrl}/>
                </div>
                <div className="product-title">
                    <span className="product-1st-title">{product.firstTitle}</span>
                    <span className="product-2nd-title">{product.secondTitle}</span>
                </div>
            </div>
        )

        return (
            <div>
                <div className="main-panel">
                    <a onClick={()=>gotoHandler({jump_link})} className="banner">
                        <img src="images/banner.png" />
                    </a>
                    <a onClick={()=>gotoHandler(`/static/loan/fxh/index.html?pid=${main_product.productId}`)} className="top-info">
                        <div className="logo"> <img src="images/logo.png" /> </div>
                        <div className="title"> {main_product.productName} </div>
                        <div className="tag">
                            {main_product.productLabelList.map(i => <img src={`/static/loan/home/images/tag-${i.labelType}.png`} />)}
                        </div>
                        <div className="subtitle"> 借款范围（{main_product.amountStr}） </div>
                        <div className="next"> </div>
                    </a>
                    {sub_products.map(product)}
                </div>
                <div className="other-products-list">
                    {this.props.otherProducts.map(generate_other_products)}
                </div>
            </div>
        )
    }
}

$FW.DOMReady(() => {
    $FXH.Post(`${API_PATH}/api/product/v1/productList.json`)
        .then(data => ReactDOM.render(<MainPanel products={data.resultList} otherProducts={data.extList}/>, CONTENT_NODE))
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
})

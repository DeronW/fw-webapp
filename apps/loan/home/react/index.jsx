

class MainPanel extends React.Component {
    render() {
        let product = (p, index) => {

            let link_a = `/static/loan/apply-zhang-zhong/index.html`,
                link_b = `/static/loan/apply-du-miao/index.html`,
                link = p.productName == '放心花' ? link_a : link_b;

            return (
                <Nav className="borrow-money-list" key={index} href={link}>
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

        return (
            <div className="main-panel">
                <a href="/static/loan/weixin-download/index.html" className="banner">
                    <img src="images/banner.png" />
                </a>
                <a href="/static/loan/apply-zhang-zhong/index.html" className="top-info">
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
        )
    }
}

$FW.DOMReady(() => {
    $FXH.Post(`${API_PATH}/api/product/v1/productList.json`)
        .then(data => ReactDOM.render(<MainPanel products={data.resultList} />, CONTENT_NODE))
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
})

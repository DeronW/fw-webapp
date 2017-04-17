

class MainPanel extends React.Component {
    render() {
        let product = (p, index) => {
            let page_name = p.productName == '放心花' ? 'zhang-zhong' : 'du-miao',
                link = `/static/loan/apply-${page_name}/index.html?id=${p.productId}`;

            return (
                <Nav className="borrow-money-list" key={index} href={link}>
                    <div className="icon-block">
                        <img src={p.productLogo} />
                    </div>
                    <div className="info">
                        <div className="t">
                            <span className="title-text">{p.productName}</span>
                            <div className="tag">
                                <img src="images/tag-1a.png" />
                                <img src="images/tag-2a.png" />
                                <img src="images/tag-3a.png" />
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

        return (
            <div className="main-panel">
                <div className="banner">
                    <img src="images/banner.png" />
                </div>
                <div className="top-info">
                    <div className="logo"> <img src="images/logo.png" /> </div>
                    <div className="title"> 放心花 </div>
                    <div className="tag">
                        <img src="images/tag-1.png" />
                        <img src="images/tag-2.png" />
                        <img src="images/tag-3.png" />
                    </div>
                    <div className="subtitle"> 借款范围（500 - 10万） </div>
                    <div className="next"> </div>
                </div>
                {this.props.products.map(product)}
            </div>
        )
    }
}

$FW.DOMReady(() => {
    $FXH.Post(`${API_PATH}/api/product/v1/productList.json`)
        .then(data => ReactDOM.render(<MainPanel products={data.resultList} />, CONTENT_NODE))
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE)
})

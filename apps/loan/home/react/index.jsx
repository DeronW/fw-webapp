

class MainPanel extends React.Component {
    render() {
        let product = (p, index) => {

            let link_a = `/static/loan/apply-zhang-zhong/index.html`,
                link_b = `/static/loan/apply-du-miao/index.html`,
                link = p.productName == '放心花' ? link_a : link_b;


            return (
                <Nav className="borrow-money-list" key={index} href={link}>
                    <div className="icon-block">
                        <img src={p.productLogo} />
                    </div>
                    <div className="info">
                        <div className="t">
                            <span className="title-text">{p.productName}</span>
                            <div className="tag">
                                {p.productLabelList.map(i => <img src={`/static/loan/images/tag-${i.labelType}a.png`} />)}
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
                <a href="/static/loan/apply-zhang-zhong/index.html" className="top-info">
                    <div className="logo"> <img src="images/logo.png" /> </div>
                    <div className="title"> 放心花 </div>
                    <div className="tag">
                        <img src="images/tag-1.png" />
                        <img src="images/tag-2.png" />
                        <img src="images/tag-3.png" />
                    </div>
                    <div className="subtitle"> 借款范围（500 - 10万） </div>
                    <div className="next"> </div>
                </a>
                {this.props.products.map(product)}
            </div>
        )
    }
}

$FW.DOMReady(() => {
    $FXH.Post(`${API_PATH}/api/product/v1/productList.json`)
        .then(data => ReactDOM.render(<MainPanel products={data.resultList} />, CONTENT_NODE))
    ReactDOM.render(<BottomNavBar/>, BOTTOM_NAV_NODE);
})

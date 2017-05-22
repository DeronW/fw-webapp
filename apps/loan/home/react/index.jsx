function LoanProduct(props) {
    let productLink = `/static/loan/${props.productName === '放心花' ? 'fxh' : 'dumiao'}/index.html`
    let labelBorderColor = { '1': '#fd6f79', '2': '#46abef', '3': '#fd9c34' };
    let generate_labels = (label) => (
        <span key={label.labelValue} className="loan-product-label"
            style={{border: `1px solid ${labelBorderColor[label.labelType]}`, color: `${labelBorderColor[label.labelType]}`}}>
            <img className="loan-product-label-icon" src={`images/label-${label.labelType}.png`} />
            { label.labelValue }
        </span>
    );
    return (
        <div className="loan-product-card" onClick={() => { gotoHandler(`${productLink}?pid=${props.productId}`) }}>
            <img className="loan-product-logo" src={ props.productLogo } />
            <div className="loan-product-name">{ props.productName }</div>
            <div className="loan-product-amount">借款范围({ props.amountStr })</div>
            <div className="loan-product-label-container">
                { props.productLabelList.map(generate_labels) }
            </div>
        </div>
    )
}

function SubProduct(props) {
    return (
        <div className="sub-product-item" onClick={() => { gotoHandler(props.forwardUrl) }}>
            <div className="sub-product-logo-container">
                <img className="sub-product-logo" src={decodeURIComponent(props.iconUrl)}/>
            </div>
            <div className="sub-product-title">
                <div className="sub-product-1st-title">{props.firstTitle}</div>
                <div className="sub-product-2nd-title">{props.secondTitle}</div>
            </div>
            <div className="next-icon-container"></div>
        </div>
    )
}

class Home extends React.Component {

    state = { loanProductList: [], subProductList: [] };

    componentDidMount() {
        $FXH.Post(`${API_PATH}/api/product/v1/productList.json`)
            .then(data => {
                this.setState({loanProductList: data.resultList, subProductList: data.extList})
            });
    }

    render() {
        return (
            <div>
                <div><img src="images/banner.png" /></div>
                <div className="loan-product-container">
                    <div className="product-title">
                        <img className="product-title-icon" src="images/loan-category-icon.png" />我要借款
                    </div>
                    <div className="loan-product-card-container">
                        { this.state.loanProductList.map(product => <LoanProduct {...product} key={ product.productId } />) }
                    </div>
                </div>
                <div className="sub-product-container">
                    <div className="product-title">
                        <img className="product-title-icon" src="images/sub-category-icon.png" />精选推荐
                    </div>
                    <div className="sub-product-item-container">
                        { this.state.subProductList.map(product => <SubProduct {...product} key={product.firstTitle} />) }
                    </div>
                </div>
            </div>
        )
    }
}

function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
    $FW.Browser.inApp() ? NativeBridge.goto(link, need_login) : location.href = encodeURI(link);
}

$FW.DOMReady(() => {
    ReactDOM.render(<Home />, CONTENT_NODE)
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
})

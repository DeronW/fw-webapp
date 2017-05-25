function LoanProduct(props) {
    let productLink = props.productName === '放心花' ? `/static/loan/fxh/index.html` : `/static/loan/dumiao/index.html`,
        productToNative = props.productName === '放心花' ? 'fxh_detail' : '';
    let labelBorderColor = { '1': '#fd6f79', '2': '#46abef', '3': '#fd9c34' };
    let generate_labels = (label) => (
        <span key={label.labelValue} className="loan-product-label"
            style={{border: `1px solid ${labelBorderColor[label.labelType]}`, color: `${labelBorderColor[label.labelType]}`}}>
            <img className="loan-product-label-icon" src={`images/label-${label.labelType}.png`} />
            { label.labelValue }
        </span>
    );
    return (
        <div className="loan-product-card" onClick={() => { gotoHandler(`${productLink}?pid=${props.productId}`, productToNative) }}>
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
    let toNative = props.toNative ? props.toNative : '';
    return (
        <div className="sub-product-item" onClick={() => { gotoHandler(props.redirectUrl, toNative) }}>
            <div className="sub-product-logo-container">
                <img className="sub-product-logo" src={decodeURIComponent(props.logoUrl)}/>
            </div>
            <div className="sub-product-title">
                <div className="sub-product-1st-title">{props.productTitle}</div>
                <div className="sub-product-2nd-title">{props.productDec}</div>
            </div>
            <div className="next-icon-container"></div>
        </div>
    )
}

function Bulletin(props) {
    return (
        <div className="bulletin-mask">
            <div className="bulletin">
                <div className="bulletin-head">
                    {/* <img src="images/bulletin-head.png" /> */}
                </div>
                <div className="bulletin-content">{props.bulletinCnt}</div>
                <div className="close-icon-container" onClick={props.handleBulletinExit}></div>
                <div className="bulletin-exit" onClick={props.handleBulletinExit}>知道了</div>
            </div>
        </div>
    )
}

class Home extends React.Component {

    state = { loanProductList: [], subProductList: [], showBulletin: false, bulletinCnt: '' };

    componentDidMount() {
        $FXH.Post(`${API_PATH}/api/product/v1/productList.json`)
            .then(data => {
                this.setState({ loanProductList: data.resultList })
            }, e => { $FW.Component.Toast(e.message) });

        $FXH.Post(`${API_PATH}/api/product/v1/recommendedList.json`)
            .then(data => {
                this.setState({ subProductList: data })
            }, e => { $FW.Component.Toast(e.message) });

        $FXH.Post(`${API_PATH}/api/product/v1/noticeList.json`)
            .then(data => {
                let newBulletinCnt = data.noticeContent;
                let uid = $FW.Browser.inApp() ? getCookie().uid : $FW.Store.getUserDict().uid;

                // if bulettin is secondary and it's read within the valid uid, we just ignore that bulletin
                if (data.gradeType == '2' && $FW.Store.isBulletinRead(uid, newBulletinCnt)) return

                this.setState({ showBulletin: true, bulletinCnt: newBulletinCnt })
                $FW.Store.setBulletin(uid, newBulletinCnt);
            }, e => { $FW.Component.Toast(e.message) });
    }

    handleBannerJump = () => {
      if ($FW.Browser.inFXHApp()) return gotoHandler('/static/loan/user-weixin-fxhapp/index.html')
      if ($FW.Browser.inApp()) return gotoHandler('/static/loan/user-weixin-jrgcapp/index.html')
      return gotoHandler('/static/loan/weixin-download/index.html');
    }

    render() {
        return (
            <div>
                <div onClick={this.handleBannerJump}><img src="images/banner.png" /></div>
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
                { this.state.showBulletin &&
                    <Bulletin bulletinCnt={this.state.bulletinCnt} handleBulletinExit={() => { this.setState({showBulletin: false}) }} /> }
            </div>
        )
    }
}

function gotoHandler(link, toNative, need_login) {
    if ($FW.Browser.inFXHApp() && toNative) return NativeBridge.toNative(toNative);

    if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
    ($FW.Browser.inApp() || $FW.Browser.inFXHApp()) ? NativeBridge.goto(link, need_login) : location.href = encodeURI(link);
}

function getCookie() {
    let c = document.cookie;
    if (c === '') return {}
    c.split('; ').forEach(function(kv) {
        let t = kv.split('=');
        r[t[0]] = t[1];
    });
    return r;
}

$FW.DOMReady(() => {
    ReactDOM.render(<Home />, CONTENT_NODE)
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
})

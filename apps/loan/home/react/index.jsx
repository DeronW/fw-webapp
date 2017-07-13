function LoanProduct(props) {
    let productLink = props.productName === '放心花' ? `/static/loan/fxh/index.html` : `/static/loan/dumiao/index.html`,
        productToNative = props.productName === '放心花' ? 'fxh_detail' : '';
    let labelBorderColor = { '1': '#fd6f79', '2': '#46abef', '3': '#fd9c34' };
    let labelImgURI = {
        '1': 'images/tag-1.jpg',
        '2': 'images/tag-2.jpg',
        '3': 'images/tag-3.jpg'
    }
    let generate_labels = (label) => (
        <span key={label.labelValue} className="loan-product-label">
            <img className="loan-product-label-icon" src={labelImgURI[label.labelType]} />
        </span>
    );
    return (
        <div className="loan-product-card" onClick={() => { gotoHandler(`${productLink}?pid=${props.productId}`, productToNative) }}>
            <img className="loan-product-logo" src={props.productLogo} />
            <div className="loan-product-name">{props.productName}</div>
            <div className="loan-product-amount">借款范围({props.amountStr})</div>
            <div className="loan-product-label-container">
                {props.productLabelList.map(generate_labels)}
            </div>
        </div>
    )
}

function SubProduct(props) {
    let toNative = props.toNative ? props.toNative : '';
    return (
        <div className="sub-product-item" onClick={() => { gotoHandler(props.redirectUrl, toNative) }}>
            <div className="sub-product-logo-container">
                <img className="sub-product-logo" src={decodeURIComponent(props.logoUrl)} />
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
                this.setState({ subProductList: data.resultList })
            }, e => { $FW.Component.Toast(e.message) });

        $FXH.Post(`${API_PATH}/api/product/v1/noticeList.json`)
            .then(data => {
                let newBulletinCnt = data.noticeContent;
                let token = $FW.Store.getUserDict().token;

                // if bulettin is secondary and it's read within the valid token, we just ignore that bulletin
                if (data.gradeType == '2' && $FW.Store.isBulletinRead(token, newBulletinCnt)) return

                this.setState({ showBulletin: true, bulletinCnt: newBulletinCnt })
                $FW.Store.setBulletin(token, newBulletinCnt);

            }, e => {
                if (e.code == 22003) return; // no bulletin now
                $FW.Component.Toast(e.message)
            });
    }

    // handleBannerJump = () => {
    //     let ua = navigator.userAgent;
    //     let r = ua.match(/EasyLoan888\/(\d+.\d+.\d+)/);
    //     let appVersion = r ? r[1] : '0';
    //     if ($FW.Browser.inIOS() && appVersion == '1.2.20') return;
    //
    //     gotoHandler($FW.Theme.get('weixin_download_page'))
    // }

    render() {
        return (
            <div className="content-wrap">
                <ProductDisplay/>
                {$FW.Browser.inJRGCApp() ? null : <div><img src="images/banner.jpg"/></div>}
                <div className="loan-product-container">
                    <div className="product-title">
                        <img className="product-title-icon" src="images/loan-category-icon.png" />我要借款
                    </div>
                    <div className="loan-product-card-container">
                        {this.state.loanProductList.map(product => <LoanProduct {...product} key={product.productId} />)}
                    </div>
                </div>
                <div className="sub-product-container">
                    <div className="product-title">
                        <img className="product-title-icon" src="images/sub-category-icon.png" />精选推荐
                    </div>
                    <div className="sub-product-item-container">
                        {this.state.subProductList.map(product => <SubProduct {...product} key={product.firstTitle} />)}
                    </div>
                </div>
                {this.state.showBulletin &&
                    <Bulletin bulletinCnt={this.state.bulletinCnt} handleBulletinExit={() => { this.setState({ showBulletin: false }) }} />}

                <div className="official-info">
                    <div className="official-links">
                        <a onClick={()=>{gotoHandler('/static/loan/user-weixin-new-download/index.html')}}>下载APP</a>
                        <span></span>
                        <a onClick={()=>{gotoHandler('/static/loan/features/index.html#/about-us')}}>关于我们</a>
                        <span></span>
                        <a onClick={()=>{gotoHandler('/static/loan/features/index.html#/contact-us')}}>联系我们</a>
                    </div>
                    <div className="company-info">©2017 深圳市众利财富管理有限公司</div>
                    <div className="company-info">粤ICP备17034889号-1</div>
                </div>

            </div>
        )
    }
}

function gotoHandler(link, toNative, need_login) {
    if ($FW.Browser.inFXHApp() && toNative) return NativeBridge.toNative(toNative);

    if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;

    $FW.Browser.inApp() ? NativeBridge.goto(link, need_login) : location.href = encodeURI(link);
}

$FW.DOMReady(() => {
    ReactDOM.render(<Home />, CONTENT_NODE)
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
})

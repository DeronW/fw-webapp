function LoanProduct(props) {
    let productLink = props.productName === '放心花' ? `/static/loan/fxh/index.html` : `/static/loan/dumiao/index.html`,
        productToNative = props.productName === '放心花' ? 'fxh_detail' : '';
    let labelBorderColor = { '1': '#fd6f79', '2': '#46abef', '3': '#fd9c34' };
    let labelImgURI = {
        '1': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAMAAADjjeWOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA81BMVEUAAAD9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3n9b3kAAAB/QythAAAAT3RSTlMAARUIQgYZaJDDtT9D8fbaJw2y9QNmZEHGhBvRMOk+AoUUKjbn0qb+jk7MwVtx+jzd60B1kQeJ/dkkc20oq2/NS1e5WrNg8rZqX34MJTE45eArQQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAC1SURBVBjTVdDVFoJgDADgXxRQbAQDE7uwMLC7Y+//NiIMgd19ZzsrQqzwEFdQXh/tIMP6A1zQdigMEYjGLMYJDwAJFpsIYpKk0gAZTEtZ4HKCmC+YLJb0YvDLZZxQqf4MNatb3WCjiWwZhDaDm3VMdzGt9AxyyP7A4HCEVs3q8QQPIdOZTm2O6cWSXq0BFAG9ge2O7A+UtctRLz7R8v/wM1zgerMfcdf4x/Nl+61+BOIMyfXZLwDJIFdI7v/vAAAAAElFTkSuQmCC',
        '2': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAwFBMVEUAAABGq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+9Gq+8AAABzfUMUAAAAPnRSTlMADy8G2acDNnM/4AFgGsYtAn8eI8WETer7d3IzS7VO/Dw+hdcsXecb+AtrCfnV6coq2H47yLdKRQ223V6CTEPSkQQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAn0lEQVQY013PxxaCQBBE0ULBjIoBxZwTZjGh9v9/lj3gYWZ8u76rauCXkcJfaZOsjE5ZIsrplGcqFDUqMZGtUVlQRYGqI4Rq8VVvNOG2Iml7ntfpAj3qY0Cy4YipjLFCNGGaYqbSnGmBpUoO0wprlTZM5GMrZecLsrGXdBAj6IiTpHNEFwSSjIhcXBMx+aGbWGIl2+9Mj2f4wjuMCz4sX16qMVuB8WhKAAAAAElFTkSuQmCC',
        '3': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAMAAAD9GTxlAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAkFBMVEUAAAD9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDT9nDQAAABlJT//AAAALnRSTlMAAQZhAyOywIVtTfT+EtifZy9u+0dEJuog+T8bImqXkL/Q3hUR/S1PUn+szwo6ExFmygAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAACDSURBVBjTVZBZEoIwEAUTBFQWdwFFDbhvvPsfj6SSCo/+60rX1EyEcMhAMJOQLYrZ5HTGOkfCaZrlnGIxSrHkFFhxCqy9brRtd3tDYVNHWdnUcjja1GHG1SfN2djFT1PamuHCFrjevN0fSJ/DWi9kb9pZ4cPXtl9Jlv/+/NhVo0+ksgdnkw71Jq2zFAAAAABJRU5ErkJggg=='
    }
    let generate_labels = (label) => (
        <span key={label.labelValue} className="loan-product-label"
            style={{border: `1px solid ${labelBorderColor[label.labelType]}`, color: `${labelBorderColor[label.labelType]}`}}>
            <img className="loan-product-label-icon" src={labelImgURI[label.labelType]} />
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

    handleBannerJump = () => {
      gotoHandler($FW.Theme.get('weixin_download_page'))
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

    $FW.Browser.inJRGCApp() ? NativeBridge.goto(link, need_login) : location.href = encodeURI(link);
}

$FW.DOMReady(() => {
    ReactDOM.render(<Home />, CONTENT_NODE)
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
})

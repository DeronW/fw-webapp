function gotoHandler(link) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    location.href = encodeURI(link);
}
const Product = React.createClass({
    getInitialState: function () {
        return {
            show: true,
            showOverlayDef: false,
            showOverlay: false,
            value: 1,
            background: "transparent"
        }
    },

    toggleHandler: function () {
        this.setState({show: !this.state.show});
    },

    childEventHandler: function (params, value) {
        this.setState({showOverlayDef: true, showOverlay: params, value: value});
    },

    shopHandler: function (e) {
        location.href = '/static/mall/cart/index.html'
    },

    componentDidMount: function () {
        document.title = this.props.data.title;
    },
    render: function () {
        let topBuyCart = `_style_buy_cart ${$FW.Browser.inIOSApp() && '_top_buy_cart'}`;
        // let topHandlerArrow = `_style_handler_arrow ${$FW.Browser.inIOSApp() && '_top_handler_arrow'}`;
        // let topHeaderFixed = `_style_header_fixed ${$FW.Browser.inIOSApp() && '_top_header_fixed'}`;

        if (!$FW.Browser.inWeixin()) document.querySelector('._style_header_fixed').style.borderBottom = "1px solid rgb(216, 216, 216)!important";

        if ($FW.Browser.inIOSApp()) {
            document.querySelector('._style_header_arrow').style.top = "22px";
            // document.getElementsByClassName('._style_header_arrow')[0].className="_style_header_arrow_ios";
            document.querySelector('._style_header_fixed').style.lineHeight = "130px";
            // document.getElementsByClassName('._style_header_fixed')[0].className="_style_header_fixed_ios";
        }


        let data = this.props.data;
        let score = data.score ? <span className="score">{data.score}工分</span> : "";
        let markList = (list, index) => <div key={index}>{list}</div>;
        let activity_desc = null;

        if (data.activity_desc && data.activity_desc.length) {
            let text = (i, index) => <div key={index}>{trim(i)}</div>;

            let detail_explain_cont = null;
            if (this.state.show)
                detail_explain_cont = <div className="detail-explain-cont">{data.activity_desc.map(text)}</div>;

            activity_desc =
                <div className="detail-explain">
                    <div className="act-explain-head" onClick={this.toggleHandler}>
                        <div className="detail-explain-h">活动说明</div>
                        <div className={this.state.show ? "act-explain-btn on" : "act-explain-btn"}
                             style={{}}></div>
                    </div>
                    {detail_explain_cont}
                </div>

        }

        let rich_detail = null;
        if (data.desc || data.rich_detail && data.rich_detail.length) {
            rich_detail = <div className="detail-des">
                <div className="title">商品详情</div>
                <div className="remin">【温馨提示】
                    <p>1、工分兑换礼品不支持开具发票；</p>
                    <p>2、工分兑换礼品非质量问题不支持退换货；</p>
                    <p>3、礼品图片仅供参考请以收到实物为准；</p>
                    <p>4、部分商品需要提供身份证号码，客服会在5个工作日内给您致电；</p>
                    <p>5、苹果系列产品不支持退换，如有问题请到苹果指定的维修服务网店咨询，维修时如需发票，烦请致电客服(只提供电子发票)；</p>
                    <p>6、兑换即视为认同此规则。</p>
                    <hr />
                </div>
                <div className="product-content">
                    {data.desc ? <div className="desc">{data.desc}</div> : null}
                    {data.rich_detail.map((i, index) => <img src={i} key={index}/>)}
                </div>
            </div>
        }

        let operators = null;
        if (data.operators) {
            operators = <div className="expl-info">
                <div className="operators">供应商：</div>
                <div className="operators-name">{data.operators}</div>
            </div>
        }

        let market_price = null;
        if (data.market_price) {
            market_price = null;
            {/*<div className="market-price">
             <span>市价：</span>
             <span className="market-price-num">&yen;{data.market_price}</span>
             </div>*/
            }
        }

        let user_level_manifest;
        if (data.vipLevel == 1) user_level_manifest = "普通用户";
        if (data.vipLevel == 2) user_level_manifest = "VIP1";
        if (data.vipLevel == 3) user_level_manifest = "VIP2";
        if (data.vipLevel == 4) user_level_manifest = "VIP3";
        if (data.vipLevel == 5) user_level_manifest = "VIP4";

        var vip_tag = null;

        if (data.vipConfigUuid) {
            if (data.vipLevel) vip_tag = <span className="vip-tag">{user_level_manifest}</span>
        }

        let shop_card_prompt = null;
        if (this.state.showOverlayDef)
            shop_card_prompt = <div
                className={this.state.showOverlay ? "ui-ios-overlay ios-overlay-show" : "ui-ios-overlay ios-overlay-hide"}>
                添加成功，在购物车等亲~</div>;

        return (
            <div className="detail-box">
                {shop_card_prompt}
                <a onClick={this.shopHandler} className={topBuyCart} style={{zIndex: '10'}}>
                    <span className="_style_buy_cart_span"></span>
                </a>
                {data.head_images && data.head_images.length ?
                    <BannerGroup className="head-images" images={data.head_images}/> :
                    <div className="no-head-images"></div>}

                <div className="detail-inf">
                    <div className="detail-inf-name">{data.title}</div>
                    <div className="detail-inf-des">{data.sub_title} </div>
                    <div className="detail-inf-price">
                        {data.price > 0 || data.score == 0 ? <span className="money">&yen;</span> : null}
                        {data.price > 0 || data.score == 0 ?
                            <span className="price">{$FW.Format.currency(data.price)}</span> : null}
                        {data.price > 0 && data.score ? '+' : null}
                        {score}
                        {vip_tag}
                    </div>
                    <div className="detail-inf1">
                        {market_price}
                        <div className="stock-div">
                            <span>库存：</span>
                            <span className="stock">{data.stock}</span>
                        </div>
                        <div className="total">
                            <span>累计销量</span>
                            <span className="total-num">{data.sales}</span>
                        </div>
                    </div>
                    <div className="detail-inf1">

                    </div>
                </div>
                {data.tags.length > 0 ?
                    <div className="detail-mark">{(data.tags ? data.tags : []).map(markList)}</div> : null}
                <div className="expl">
                    <div className="total">
                        <span>配送范围：</span>
                        <span>全国</span>
                    </div>
                    {operators}
                </div>
                {activity_desc}
                {rich_detail}
                <div className="auth-info only-in-ios-app">以上活动由金融工场主办 与Apple Inc.无关</div>
                <PlusMinus is_login={data.is_login} stock={data.stock} ticket_count={data.ticketList}
                           parentCallback={this.childEventHandler}
                           check_messages={data.checkMessages}
                           voucher_only={data.supportTicket} isCanBuy={data.isCanBuy}/>
            </div>
        )
    }
});

const PlusMinus = React.createClass({
    getInitialState: function () {
        let {stock} = this.props;

        return {
            value: stock > 0 ? 1 : 0,
            minus: stock > 0,
            plus: stock > 0
        }
    },

    toggleOverlay: function () {
        if (this.state.value < 1) return;

        // 检查当前用户(或未登录用户)是否可以点这个按钮
        if (this.props.ticket_count == 0 && this.props.check_messages.length) {
            $FW.Component.Alert(this.props.check_messages, {header: '不满足购买条件'});
            return
        }
        if (this.props.ticket_count < 1 && this.props.voucher_only) {
            $FW.Component.Alert('该商品仅限兑换券购买');
            return
        }

        if (this.props.ticket_count < this.state.value && this.props.voucher_only) {
            $FW.Component.Alert('您有' + this.props.ticket_count + '张兑换券, 限购' + this.props.ticket_count + '件商品');
            return
        }

        let _this = this;
        let bizNo = $FW.Format.urlQuery().bizNo;

        if (this.props.is_login == 0) {
            // 首先检查是否已经登录
            $FW.Ajax({
                url: `${API_PATH}/mall/api/cart/v1/shoppingCart.json`,
                enable_loading: 'mini'
            });
        } else {
            $FW.Ajax({
                url: `${API_PATH}/mall/api/cart/v2/insertCart.json?bizNo=${bizNo}`,
                enable_loading: 'mini',
                data: {
                    buyNum: this.state.value,
                    productBizNo: bizNo
                }
            }).then(data => {
                _this.props.parentCallback(true, _this.state.value);
                setTimeout(function () {
                    _this.props.parentCallback(false, _this.state.value);
                }.bind(_this), 1500);
            });
        }

    },

    changeValue: function (e) {
        this.updateCount(e.target.value);
    },

    updateCount: function (c) {
        c = parseInt(c) || 1;
        if (c < 1) c = 1;
        if (c > this.props.stock) c = this.props.stock;

        this.setState({
            value: c,
            minus: c > 1,
            plus: c < this.props.stock
        });
    },

    changePlus: function () {
        this.updateCount(this.state.value + 1)
    },
    changeMinus: function () {
        this.updateCount(this.state.value - 1)
    },
    buyHandler: function () {
        if (this.state.value < 1) return;

        // 检查当前用户(或未登录用户)是否可以点这个按钮
        if (this.props.ticket_count == 0 && this.props.check_messages.length) {
            $FW.Component.Alert(this.props.check_messages, {header: '不满足购买条件'});
            return
        }
        if (this.props.ticket_count < 1 && this.props.voucher_only) {
            $FW.Component.Alert('该商品仅限兑换券购买');
            return
        }

        if (this.props.ticket_count < this.state.value && this.props.voucher_only) {
            $FW.Component.Alert('您有' + this.props.ticket_count + '张兑换券, 限购' + this.props.ticket_count + '件商品');
            return
        }

        let bizNo = $FW.Format.urlQuery().bizNo;
        let link = '/static/mall/order-confirm/index.html?cartFlag=false&prd=' + bizNo + '&buyNum=' + this.state.value;

        let isCanBuy = this.props.isCanBuy;

        if (this.props.is_login == 1) {
            // gotoHandler(link);
            window.location.href = link;
        } else {
            if (!isCanBuy) {
                $FW.Ajax({
                    url: `${API_PATH}/mall/api/cart/v1/shoppingCart.json`,
                    enable_loading: 'mini'
                });
            }
        }
    },

    blur: function (e) {
        this.updateCount(e.target.value)
    },
    render: function () {

        return (
            <div className="detail-foot">
                <div className="detail-num-change">
                    <div className={this.state.value > 1 ? "minus" : "minus gray"} onClick={this.changeMinus}></div>
                    <div className="input-num">
                        {this.state.value}
                    </div>
                    <div className={this.state.value < this.props.stock ? "plus" : "plus gray"}
                         onClick={this.changePlus}></div>
                </div>
                <a className="btn-buy btn-buy-card" onClick={this.toggleOverlay}>加入购物车</a>
                <a onClick={this.buyHandler} className={this.props.stock < 1 ? "btn-buy btn-buy-dis" : "btn-buy"}>
                    {this.props.stock < 1 ? '售罄' : '立即兑换'}
                </a>
            </div>
        )
    }
});

const EmptyProduct = React.createClass({
    componentDidMount: function () {
        var arrUrl = location.href.split('?');

        if (arrUrl[2]) {
            location.href = (arrUrl[0].concat("?", arrUrl[1]))
        }
    },
    render: function () {
        return (
            <div style={{position: "absolute", top: "0px", bottom: "0px", width: "100%", zIndex: "-1"}}>
                <img style={{display: "block", maxWidth: "80%", margin: "20% auto 50px"}} src='images/outdate.jpg'/>
                <div style={{fontSize: "30px", color: "#8591b3", textAlign: "center"}}>
                    抱歉, 没有找到相关商品!
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    let bizNo = $FW.Format.urlQuery().bizNo;

    if (!bizNo) return $FW.Component.Alert('bizNo is missing');

    $FW.Ajax({
        url: `${API_PATH}/mall/api/detail/v1/item_detail.json?bizNo=${bizNo}`,
        enable_loading: 'mini'
    }).then(data => {
        document.title = data.title;
        let i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9)
        }
        document.body.appendChild(i);

        data.title ?
            ReactDOM.render(<Product data={data}/>, CONTENT_NODE) :
            ReactDOM.render(<EmptyProduct />, CONTENT_NODE);
    })
    if (!$FW.Browser.inWeixin()) ReactDOM.render(<Header title={"商品详情"}/>, HEADER_NODE);
    // ReactDOM.render(<Header title={"商品详情"}/>, HEADER_NODE);
});

function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '')
}

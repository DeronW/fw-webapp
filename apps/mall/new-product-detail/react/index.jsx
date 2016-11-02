'use strict';

const API_PATH = document.getElementById('api-path').value;

const Product = React.createClass({

    getInitialState: function () {
        return {
			show: true,
			showOverlayDef:false,
			showOverlay:false
			}
    },

    toggleHandler: function () {
        this.setState({show: !this.state.show});
    },
	
	childEventHandler: function(params){
		this.setState({showOverlayDef:true,showOverlay: params})
	},
	
	shopHandler: function (e) {
		location.href = location.protocol + '//' + location.hostname + '/static/mall/shopping-cart/index.html'
	},
	
	render: function () {
        let data = this.props.data;
        let score = data.score ? <span className="score">{data.score}工分</span> : "";
        let markList = (list, index)=><div key={index}>{list}</div>;
        let activity_desc = null;

        if (data.activity_desc && data.activity_desc.length) {
            let text = (i, index) => <div key={index}>{trim(i)}</div>;

            let detail_explain_cont = null;
            if (this.state.show)
                detail_explain_cont = (<div className="detail-explain-cont">{data.activity_desc.map(text)}</div>);

            activity_desc = (
                <div className="detail-explain">
                    <div className="act-explain-head" onClick={this.toggleHandler}>
                        <div className="detail-explain-h">活动说明</div>
                        <div className={this.state.show ? "act-explain-btn on" : "act-explain-btn"}
                             style={{}}></div>
                    </div>
                    {detail_explain_cont}
                </div>
            )
        }

        let rich_detail = null;
        if (data.desc || (data.rich_detail && data.rich_detail.length)) {
            rich_detail = <div className="detail-des">
                <div className="title">商品详情</div>
                <div className="remin">【温馨提示】
                    <p>1、工分兑换礼品不支持开具发票；</p>
                    <p>2、工分兑换礼品非质量问题不支持退换货；</p>
                    <p>3、礼品图片仅供参考请以收到实物为准；</p>
                    <p>4、兑换即视为认同此规则。</p>
                    <hr/>
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
            market_price = (
                <div className="market-price">
                    <span>市价：</span>
                    <span className="market-price-num">&yen;{data.market_price}</span>
                </div>
            )
        }

        let user_level_manifest;
        if (data.vipLevel == 1) user_level_manifest = "普通用户";
        if (data.vipLevel == 2) user_level_manifest = "VIP1";
        if (data.vipLevel == 3) user_level_manifest = "VIP2";
        if (data.vipLevel == 4) user_level_manifest = "VIP3";
        if (data.vipLevel == 5) user_level_manifest = "VIP4";

        let vip_tag = data.vipConfigUuid ? (data.vipLevel ? (
            <span className="vip-tag">{user_level_manifest}</span>) : null) : null;
		
		let shop_card_prompt = null;	
		if (this.state.showOverlayDef)
                shop_card_prompt = (<div className={this.state.showOverlay ? "ui-ios-overlay ios-overlay-show" : "ui-ios-overlay ios-overlay-hide"}>加入购物车成功</div>);
			   
		return (
           <div className="detail-box">
			  {shop_card_prompt}
			   <div onClick={this.shopHandler} className="_style_buy_cart" style={{zIndex:'10'}}>
                   <span className="_style_buy_cart_span"></span>
               </div>
                {data.head_images && data.head_images.length ?
                    <BannerGroup className="head-images" images={data.head_images}/> :
                    <div className="no-head-images"></div> }

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
                <PlusMinus stock={data.stock} ticket_count={data.ticketList} parentCallback={this.childEventHandler}
                           check_messages={data.checkMessages} 
                           voucher_only={data.supportTicket} isCanBuy={data.isCanBuy}/>
            </div>
        )
    }
});

const PlusMinus = React.createClass({
    getInitialState: function () {
        let stock = this.props.stock;

        return {
            value: stock > 0 ? 1 : 0,
            minus: stock > 0,
            plus: stock > 0
        }
    },
	
	toggleOverlay: function () {
		let _this=this;
		$FW.Ajax({
			url: './shoppingcart.json?bizNo=A0000000370',
			enable_loading: true,
			success: function (data) {
			if(data.product.length==1){
			 _this.props.parentCallback(true);
			 setTimeout(function() {
			   _this.props.parentCallback(false);
			 }.bind(_this), 1500);
			}
		}
		});
		
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
        let link = location.protocol + '//' + location.hostname +
            '/static/mall/order-confirm/index.html?productBizNo=' + bizNo + '&count=' + this.state.value;

        let isCanBuy = this.props.isCanBuy;
        if (!this.props.is_login) {
            if ($FW.Browser.inApp()) {
                // 注意: 这里有个hole
                // 非种cookie 用这种
                //NativeBridge.login(link)
                // 需要测试, 在APP内需要根据APP的登录状态来判断是否用这种登录方式, 种cookie用这种
                //NativeBridge.goto(link, true)

                $FW.Browser.appVersion() >= $FW.AppVersion.show_header ?
                    NativeBridge.goto(link, true) :
                    NativeBridge.login(link);

            } else {
                location.href = link
            }
        } else {
            if (!isCanBuy) {
                $FW.Component.Alert("所在等级不符合购买此商品特权");
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
                    {this.props.stock < 1 ? '售罄' : '立即购买'}
                </a>
            </div>
        )
    }
});

const EmptyProduct = React.createClass({
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
    /*if (!bizNo) {
      //  $FW.Component.Alert('bizNo is missing');
       // return;
    }*/

    NativeBridge.setTitle('商品详情');

    $FW.Ajax({
        url: './item_detail.json?bizNo=A0000000370',
        enable_loading: true,
        success: function (data) {
            if (data.title) {
                ReactDOM.render(<Product data={data}/>, document.getElementById('cnt'));
            } else {
                ReactDOM.render(<EmptyProduct />, document.getElementById('cnt'))
            }
        }
    });

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"商品详情"}/>, document.getElementById('header'));
    }
});

function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '')
}
'use strict';

const API_PATH = document.getElementById('api-path').value;

const ExchangeZone = React.createClass({
    getInitialState: function() {
        this.tabs = ['proceeds', 'salestime', 'pricerank', 'filter'];
        this.count = 20;
        return {
            tab: 'proceeds',
            page: {
                proceeds: 1,
                salestime: 1,
                pricerank: 1,
                filter:0
            },
            products: []
        }
    },

    tabClickHandler: function (tab) {
        this.setState({tab: tab, products: window.Products[tab]});
        if (window.Products[tab].length == 0) {
            setTimeout(function () {
                this.loadMoreProductHandler(null);
            }.bind(this), 500)
        }
    },

    loadMoreProductHandler: function (done) {
        let page = this.state.page[this.state.tab];
        if (page == 0) return;
        let tab_tag;
        if (this.state.tab == 'proceeds') {
            tab_tag = -1
        } else if(this.state.tab == 'salestime'){
            tab_tag = 1
        }else if (this.state.tab == 'pricerank') {
            tab_tag = 2
        }

        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/vip_list.json?count=' + this.count + '&page=' + page + '&vipLevel=' + tab_tag,
            enable_loading: true,
            success: function (data) {
                let tab;
                if (data.vipLevel == -1) {
                    tab = 'proceeds'
                } else if (data.vipLevel == 1) {
                    tab = 'salestime'
                } else if (data.vipLevel == 2) {
                    tab = 'pricerank'
                } else {
                    done && done();
                    return;
                }

                window.Products[tab] = window.Products[tab].concat(data.products);
                let products = window.Products[this.state.tab];

                let new_page = this.state.page;
                new_page[this.state.tab] = new_page[this.state.tab] + 1;
                if (data.totalCount < 20) new_page[this.state.tab] = 0;
                this.setState({products: products, page: new_page});
                done && done();
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.loadMoreProductHandler(null);
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },

    render: function() {
        var _this = this;

        let tab = function (i) {
            let name = {
                proceeds: '销量',
                salestime: '上架时间',
                pricerank: '价格',
                filter: '筛选'
            };
            return (
                <div key={i} className={i==_this.state.tab ? "ui-tab-li ui-select-li" : "ui-tab-li"}
                     onClick={function(){_this.tabClickHandler(i)}}>
                    <span className="text">{name[i]}</span>
                </div>
            )
        };

        let gongfeng_array = ['不限','我可兑换','1~100','101~1000','1000~5000','5000以上'];
        let gongfeng_item = gongfeng_array.map((name,index) => <span className="gongfeng-item-wrap" key={index}><span className="gongfeng-item">{name}</span></span>);

        let viplevel_array = ['不限','普通会员','Vip1专享','Vip2专享','Vip3专享','Vip4专享'];
        let viplevel_item = viplevel_array.map((name,index) => <span className="viplevel-item-wrap" key={index}><span className="viplevel-item">{name}</span></span>);

        return (
            <div>
                <div className="ui-tab">
                    <div className="ui-tab-block">
                        {this.tabs.map(tab)}
                        <span className="pricerank-icon"></span>
                        <span className="line-icon line-icon1"></span>
                        <span className="line-icon line-icon2"></span>
                        <span className="line-icon line-icon3"></span>
                    </div>
                </div>
                <div className="filter-box">
                    <div className="filter-box-wrap">
                        <div className="gongfeng-filter-box">
                            <div className="filter-title">按工分值</div>
                            <div className="gongfeng-items">
                                {gongfeng_item}
                                <div className="gonfeng-input-wrap">
                                    <input className="gongfeng-input" type="text" value="" placeholder="最低工分"/><span className="horizon-line"></span><input className="gongfeng-input" type="text" value="" placeholder="最高工分"/>
                                </div>
                            </div>
                        </div>
                        <div className="viplevel-filter-box">
                            <div className="filter-title">按会员等级</div>
                            <div className="viplevel-items">
                                {viplevel_item}
                            </div>
                        </div>
                        <div className="filter-action">
                            <span className="clear-items">清空筛选</span>
                            <span className="complete-btn">完成</span>
                        </div>
                    </div>
                </div>
                <div className="products-list">
                    {this.state.products.map((p, index) => <ProductItem {...p} key={index}/>) }
                    {this.state.products.length == 0 && this.state.page[this.state.tab] == 0 ? <div className="empty-list">暂无商品</div> : null}
                </div>
            </div>
        );
    }
});

const ProductItem = React.createClass({
    render: function () {
        var show_price = this.props.price != 0 || this.props.score == 0;
        var score = (parseFloat(this.props.score) > 0) ? (
            <span className="list-price-score">{show_price ? <span>&#43;</span> : null}{this.props.score}工分</span>) : null;
        var Angle = (this.props.angle_text) ? (<div className="list-label">{this.props.angle_text}</div>) : null;
        var cover_bg = 'url(' + (this.props.img || 'images/default-product.jpg') + ')';

        return (
            <a href={'/productDetail?bizNo=' + this.props.bizNo} className="index-actList-a">
                <div className="list-img" style={{backgroundImage: cover_bg}}></div>
                {Angle}
                <div className="list-name">{this.props.title}</div>
                <div className="list-mark">
                    { (this.props.tags || []).map((d, index) => <div key={index}>{d}</div>) }
                </div>
                <div className="list-price-box">
                    <div className="list-price">
                        {show_price ? <span className="list-price-mark">&yen;</span> : null}
                        {show_price ? <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span> : null}
                        { score }
                    </div>
                    <div className="list-sold">
                        <span>累计销量 </span>
                        <span>{this.props.sales}</span>
                    </div>
                </div>
            </a>
        )
    }
});

window.Products = {
    proceeds: [],
    salestime: [],
    pricerank: [],
    filter:[]
};

$FW.DOMReady(function(){
    NativeBridge.setTitle('我可兑换');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"我可兑换"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<ExchangeZone/>, document.getElementById('cnt'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}

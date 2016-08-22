'use strict';

const API_PATH = document.getElementById('api-path').value;

const ResultPage = React.createClass({
    render: function(){
        let category_img = <a><img src="images/category-ad.jpg"/></a>;
        return (
            <div>
                <SearchBar/>
                {category_img}
                <ExchangeBar/>
                {/*<div className="products-list">
                    {this.state.products.map((p, index) => <ProductItem {...p} key={index}/>) }
                    {this.state.products.length == 0 && this.state.page[this.state.tab] == 0 ? <div className="empty-list">暂无商品</div> : null}
                </div>*/}
            </div>
        )
    }
});

const SearchBar = React.createClass({
    render: function(){
            return (
            <div>
                <div className="search-page-box">
                    <a className="back-arrow"></a>
                    <input type="text" value="" placeholder="请输入想找的商品"/>
                    <span className="search-page-icon"></span>
                    <span className="search-cancel">取消</span>
                </div>
                <div className="search-history">
                    <input className="search-history-input" type="text" value="" placeholder="历史搜索"/>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="clear-history">清空历史搜索</div>
                </div>
            </div>
      )
    }
});

const ExchangeBar = React.createClass({
    getInitialState: function() {
        this.tabs = ['proceeds', 'salestime', 'pricerank', 'filter'];
        this.count = 20;
        return {
            tab: 'proceeds'
        }
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

$FW.DOMReady(function(){
    NativeBridge.setTitle('我可兑换');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"我可兑换"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<ResultPage/>, document.getElementById('cnt'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}



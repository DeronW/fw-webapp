'use strict';

const API_PATH = document.getElementById('api-path').value;

const ResultPage = React.createClass({
    getInitialState: function () {
        let query = $FW.Format.urlQuery();
        return {
            page: 0,
            products: [],
            showSearch: query.searchSourceType == 2,
            hasData: true,
            showExchangeBar: query.searchSourceType != 2,
            showFilterBar: query.searchSourceType != 2,
            searchFilterProductShow: true
        }
    },
    componentDidMount: function () {
        if ($FW.Format.urlQuery().searchSourceType == 1) {
            $FW.Ajax({
                url: `${API_PATH}/api/v1/user-state-convertible.json`,//登录状态及工分
                success: (data) => {
                    Filter.options.maxPoints = data.score;
                    Filter.myConvertibleScore = data.score;
                    this.loadMoreProductHandler();
                }
            });
        } else if ($FW.Format.urlQuery().searchSourceType == 2) {
            this.setState({showExchangeBar: false});
        } else {
            this.loadMoreProductHandler();
        }
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },
    setMyConvertibleScore: function (num) {
        this.setState({myConvertibleScore: num});
    },
    searchFilterProductShow: function () {
        this.setState({searchFilterProductShow: true});
    },
    searchFilterProductHide: function () {
        this.setState({searchFilterProductShow: false});
    },
    loadMoreProductHandler: function (done) {
        this.state.hasData ?
            Filter.search({page: this.state.page + 1}, (data)=> {
                this.appendProducts(data);
                this.setState({
                    page: this.state.page + 1,
                    hasData: data.hasData
                });
                done && done()
            }) : null;
    },
    filterProducts: function (options) {
        options.page = 1;
        Filter.search(options, (data)=> {
            this.setState({products: []}, () => this.appendProducts(data))
            this.setState({
                page: 1,
                hasData: data.hasData
            });
        });
    },
    setShowExchangeBar: function () {
        this.setState({showExchangeBar: true});
    },
    appendProducts: function (data) {
        var list = this.state.products.slice();
        var newList = list.concat(data.products || []);
        this.setState({products: newList})
    },
    searchFocus: function () {
        this.setState({showExchangeBar: false});
    },
    render: function () {
        let productsList = ()=> {
            return (
                <div className="products-list">
                    {this.state.products.length ? this.state.products.map((p, index) => <ProductItem
                        filterProducts={this.filterProducts} {...p} key={index}/>) :
                        <div className="empty-list"><img src="images/no-products.png"/></div>}
                </div>
            )
        };

        return (
            <div>
                {this.state.showSearch ? <SearchBar filterProducts={this.filterProducts}
                                                    searchFocus={this.searchFocus}
                                                    setShowExchangeBar={this.setShowExchangeBar}/> : null}
                <ResultPage.CategoryBanner filterProducts={this.filterProducts}/>

                {this.state.showExchangeBar || this.state.showFilterBar ?
                    <ExchangeBar setMyConvertibleScore={this.setMyConvertibleScore}
                                 filterProducts={this.filterProducts}
                                 searchFilterProductShow={this.searchFilterProductShow}
                                 searchFilterProductHide={this.searchFilterProductHide}/> : null}
                {this.state.showExchangeBar && this.state.searchFilterProductShow ? productsList() : null}
            </div>
        )
    }
});

ResultPage.CategoryBanner = React.createClass({
    render: function () {
        let c = $FW.Format.urlQuery().category;
        if (!c) return null;
        return <a className="category-img"><img src={"images/" + c + ".jpg"}/></a>;
    }
});

let Filter = {
    options: {
        page: 1,
        vipLevel: '',
        productName: '', // keyword
        categoryName: '',
        actIds: '',
        searchSourceType:'',
        prefectureType: 0,
        order: -1,
        minPoints: '',
        maxPoints: ''
    },
    myConvertibleScore: 0,
    mix: function (opts) {
        for (var i in opts) {
        	if(typeof(Filter.options[i]) != 'undefined') {
            	Filter.options[i] = opts[i];
        	}
        }
    },
    search: function (options, callback) {
        Filter.mix(options);
        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/search.json',
            data: Filter.options,
            enable_loading: true,
            success: data => callback(data)
        })
    },
    readParamsFromQuery: function () {
    	Filter.mix($FW.Format.urlQuery());
    },
    setParamsToQuery: function () {
    	var newOptionsUrl="";
    	for (var j in Filter.options){
    		if(j!="maxPoints"){
    			newOptionsUrl+=j+"="+Filter.options[j]+"&";
    		}else{
    			newOptionsUrl+=j+"="+Filter.options[j];
    		}
    		
    	}
    	var newHref=window.location.href.split("?")[0]+"?"+newOptionsUrl;
    	console.log(newHref);
    	history.pushState({}, null, newHref);
    }
};
Filter.readParamsFromQuery();
$FW.DOMReady(function () {
    var title = $FW.Format.urlQuery().title || '商品列表';

    if ($FW.Format.urlQuery().searchSourceType== 1) {
        title = '我可兑换';
        NativeBridge.setTitle(title);
        if ($FW.Utils.shouldShowHeader())
            ReactDOM.render(<Header title={title}/>, document.getElementById('header'));
    }

    Filter.options.searchSourceType = $FW.Format.urlQuery().searchSourceType || '';

    if ($FW.Format.urlQuery().category) {
        Filter.options.categoryName = $FW.Format.urlQuery().category;
    }
    if ($FW.Format.urlQuery().searchSourceType == 2) {

    } else {
        NativeBridge.setTitle(title);
        if ($FW.Utils.shouldShowHeader())
            ReactDOM.render(<Header title={title}/>, document.getElementById('header'));
    }

    window._ResultPage = ReactDOM.render(<ResultPage/>, document.getElementById('cnt'));
});
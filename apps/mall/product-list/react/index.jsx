'use strict';

const API_PATH = document.getElementById('api-path').value;

const ResultPage = React.createClass({
    getInitialState: function () {
        return {
            products: []
        }
    },
     componentDidMount: function () {
     	search({}, true);       
    },   
    updateProducts: function (data) {    	
        this.setState({products: []}, () => this.appendProducts(data))
    },
    appendProducts: function (data) {
    	
        var list = this.state.products.slice();
        var newList=list.concat(data.products);
        console.log(newList);
        this.setState({products: newList})
        
    },
    render: function () {
        return (
            <div onClick={this.searchFocus}>
                {$FW.Format.urlQuery().searchSourceType? <SearchBar/>:null}
                <ResultPage.CategoryBanner />
                <ExchangeBar/>
                <div className="products-list">
                    {this.state.products.map((p, index) => <ProductItem {...p} key={index}/>) }
                    {this.state.products.length ?
                        null :
                        <div className="empty-list">暂无商品</div>}
                </div>
            </div>
        )
    }
});

ResultPage.CategoryBanner = React.createClass({
    render: function () {
        let c = $FW.Format.urlQuery().category;
        if (!c) return null;
        return <a className="category-img"><img src={"images/category-"+c+".jpg"}/></a>;
    }
});

const SearchBar = React.createClass({
    getInitialState: function () {
        return {
            value: '',
            history: [],

        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: API_PATH + '',
            success: (data) => {
                this.setState({history: data.history})
            }
        })
    },
    changeHandler: function (e) {
        this.setState({value: e.target.value})
    },
    searchHandler: function () {
        search(this.state.value, true)
    },
    clearHistoryHandler: function () {
        this.setState({history: []});
        $FW.Ajax({
            url: API_PATH + '',
            method: 'post'
        })
    },
    backHandler: function () {
       history.back();
    },

    render: function () {
        let item = (d) => {
            let click = () => this.setState({value: d}, this.searchHandler);
            return <div className="history-item" key={d} onClick={click}>{d}</div>;
        };
		let searchHistory = () => {
           let showSearchHistory=false;
           if(this.state.value){
           		showSearchHistory=true;
           }else{
           		showSearchHistory=false;
           }
            return (
            	showSearchHistory?
            	<div className="search-history">
                    <div className="search-history-input">历史搜索</div>
                    {this.state.history.map(item)}
                    <div className="clear-history" onClick={this.clearHistoryHandler}>清空历史搜索</div>
                </div>:null
            )
        };
        return (
            <div className="search-bar">
                <div className="search-page-box">
                    <a className="back-arrow" onClick={this.backHandler}></a>
                    <input type="text" value={this.state.value}
                           placeholder="请输入想找的商品"
                           onChange={this.changeHandler}
                           id='searchInput'
                    />
                    <span className="search-page-icon" onClick={this.searchHandler}></span>
                    <span className="search-confirm" onClick={this.searchHandler}>取消</span>
                </div>
                {searchHistory()}
            </div>
        )
    }
});

const ExchangeBar = React.createClass({
    getInitialState: function () {
        this.tabs = ['defaultSort','proceeds', 'salestime', 'scorerank', 'filter'];
        this.count = 20;
        return {
            tab: 'defaultSort',
            sort: -1,
            vipLevel: -1,
            showFilterPop:false,
            filterScore:'不限',
            filterLevel:'不限',
            maxPoints:'',
            minPoints:'',
            maxValue:'',
            minValue:'',
            myScore:0,
        }
    },
    searchHandler: function(){
        var options = {
            order: this.state.sort,
            vipLevel: this.state.vipLevel
        };
        search(options, true);
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${API_PATH}/api/v1/user-state.json`,//登录状态及工分
            success: (data) =>{
            	if(data.is_login){
            		this.setState({myScore:data.score})
            	}
            	
            } 
        });
    },
    tabClickHandler: function(tabName){        
        if(tabName=='defaultSort'){
        	this.setState({
	        	sort: -1,
	        	tab: tabName,
	        });
        	var options = {
	            order: this.state.sort,
	        };
        	search(options, true);
        }else if(tabName=='proceeds'){
        	this.state.sort==3 ? this.setState({sort:4}) : this.setState({sort:3});      	
        	var options = {
	            order: this.state.sort,
	        };
        	search(options, true);
        }else if(tabName=='salestime'){
        	this.state.sort==5 ? this.setState({sort:0}) : this.setState({sort:5});      	
        	var options = {
	            order: this.state.sort,
	        };
        	search(options, true);
        }else if(tabName=='scorerank'){
        	this.state.sort==1 ? this.setState({sort:2}) : this.setState({sort:1});      	
        	var options = {
	            order: this.state.sort,
	        };
        	search(options, true);
        }else if(tabName=='filter'){
        	this.state.showFilterPop=true;
        }
        this.setState({tab: tabName});
    },
    filterScoreHandler: function(name){
    	this.setState({minValue:''});
    	this.setState({maxValue:''});
        this.setState({filterScore:name});
        if(name=='不限'){
        	this.setState({
        		maxPoints:'',
        		minPoints:'',
        	});
        }else if(name=='我可兑换'){
        	this.setState({        		
        		minPoints:'',
        		maxPoints:this.state.myScore,
        	});
        }else if(name=='1-100'){
        	this.setState({        		
        		minPoints:100,
        		maxPoints:1,
        	});
        }else if(name=='101-1000'){
        	this.setState({
        		minPoints:101,
        		maxPoints:1000,
        	});
        }else if(name=='1000-5000'){
        	this.setState({
        		minPoints:1000,
        		maxPoints:5000,
        	});
        }else if(name=='5000以上'){
        	this.setState({
        		minPoints:5000,
        		maxPoints:'',
        	});
        }
    },
    filterLevelHandler: function(name){
        this.setState({filterLevel:name});
        if(name=='不限'){
        	this.setState({vipLevel:-1});
        }else if(name=='普通会员'){
        	this.setState({vipLevel:1});
        }else if(name=='Vip1专享'){
        	this.setState({vipLevel:2});
        }else if(name=='Vip2专享'){
        	this.setState({vipLevel:3});
        }else if(name=='Vip3专享'){
        	this.setState({vipLevel:4});
        }else if(name=='Vip4专享'){
        	this.setState({vipLevel:5});
        }
    },
    maxValueHandler: function (e) {
       this.setState({maxValue: e.target.value});
       if(e.target.value||this.state.minValue){
       	this.setState({filterScore:''});
       }
       if(e.target.value==''&&this.state.minValue==''){
       		this.setState({filterScore:'不限'});
       }
    },
    minValueHandler: function (e) {    	
       this.setState({minValue: e.target.value});
       if(this.state.maxValue||e.target.value){
       	this.setState({filterScore:''});
       }
       if(e.target.value==''&&this.state.maxValue==''){
       		this.setState({filterScore:'不限'});
       }
    },
    clearFilterHandler: function () {    	
       this.setState({
       		vipLevel: -1,
            showFilterPop:true,
            filterScore:'不限',
            filterLevel:'不限',
            maxPoints:'',
            minPoints:'',
            maxValue:'',
            minValue:''      		
       });              
    },
    filterFinishHandler: function () {   
    	var options = {
            vipLevel: this.state.vipLevel,
            minPoints:this.state.minPoints,
			maxPoints:this.state.maxPoints
        };
    	if(this.state.maxValue&&this.state.minValue){
    		options = {
	            vipLevel: this.state.vipLevel,
	            minPoints:this.state.minValue,
				maxPoints:this.state.maxValue
	        };
    	}         	
        this.setState({showFilterPop:false});
        search(options, true);
    },
    render: function () {
        var _this = this;
        let tab = function (i) {
            let name = {
            	defaultSort:'默认',
                proceeds: '销量',
                salestime: '上架时间',
                scorerank: '工分',
                filter: '筛选'
            };
            let rank_icon=(j)=>{
            	if(j=='proceeds'){
            		if(_this.state.sort==3){
            			return 'rank-icon-up'
            		}else if(_this.state.sort==4){
            			return 'rank-icon-down'
            		}else{
            			return 'rank-icon'
            		}
            	}else if(j=='salestime'){
            		if(_this.state.sort==5){
            			return 'rank-icon-up'
            		}else if(_this.state.sort==0){
            			return 'rank-icon-down'
            		}else{
            			return 'rank-icon'
            		}
            	}else if(j=='scorerank'){
            		if(_this.state.sort==1){
            			return 'rank-icon-up'
            		}else if(_this.state.sort==2){
            			return 'rank-icon-down'
            		}else{
            			return 'rank-icon'
            		}
            	}else{
            		return 'rank-icon-no'
            	}
            };
            return (
                <div key={i} className={i==_this.state.tab ? "ui-tab-li ui-select-li" : "ui-tab-li"}
                     onClick={function(){_this.tabClickHandler(i)}}>
                    {name[i]}<span className={rank_icon(i)}></span>
                </div>
            )
        };

        let gongfeng_array = ['不限', '我可兑换', '1-100', '101-1000', '1000-5000', '5000以上'];
        let gongfeng_item = gongfeng_array.map((name, index) =>{        	
	        	return (
	        		<span className={this.state.filterScore==name?"gongfeng-item-wrap on":"gongfeng-item-wrap"} key={index}><span className="gongfeng-item" onClick={function(){_this.filterScoreHandler(name)}}>{name}</span></span>	           
	        	)        	
        	} 
		);
        let viplevel_array = ['不限', '普通会员', 'Vip1专享', 'Vip2专享', 'Vip3专享', 'Vip4专享'];
        let viplevel_item = viplevel_array.map((name, index) =>{        	
	        	return (
	        		<span className={this.state.filterLevel==name?"viplevel-item-wrap on":"viplevel-item-wrap"} key={index}><span className="viplevel-item" onClick={function(){_this.filterLevelHandler(name)}}>{name}</span></span>	           
	        	)        	
        	} 
		); 
		let filterPop=()=>{
			return (
				<div className="filter-box" style={{zIndex:"10"}}>
                    <div className="filter-box-wrap">
                        <div className="gongfeng-filter-box">
                            <div className="filter-title">按工分值</div>
                            <div className="gongfeng-items">
                                {gongfeng_item}
                                <div className="gonfeng-input-wrap">
                                    <input className="gongfeng-input" type="text" value={this.state.minValue} placeholder="最低工分" onChange={this.minValueHandler} /><span
                                    className="horizon-line"></span><input className="gongfeng-input" type="text"
                                                                           value={this.state.maxValue} placeholder="最高工分" onChange={this.maxValueHandler}/>
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
                            <span className="clear-items" onClick={this.clearFilterHandler}>清空筛选</span>
                            <span className="complete-btn" onClick={this.filterFinishHandler}>完成</span>
                        </div>
                    </div>
                </div>
			)
		}
        return (
            <div className="filter-tab">
                <div className="ui-tab">
                    <div className="ui-tab-block">
                        {this.tabs.map(tab)}
                    </div>
                </div>
                {this.state.showFilterPop ? filterPop():null}

            </div>
        );
    }
});

const ProductItem = React.createClass({
    render: function () {
        var show_price = this.props.price != 0 || this.props.score == 0;
        var score = (parseFloat(this.props.score) > 0) ? (
            <span className="list-price-score">{show_price ?
                <span>&#43;</span> : null}{this.props.score}工分</span>) : null;
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
                        {show_price ?
                            <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span> : null}
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

$FW.DOMReady(function () {	
    var title = $FW.Format.urlQuery().title || '商品列表';
    window._searchOptions.searchSourceType=$FW.Format.urlQuery().searchSourceType||1
    if($FW.Format.urlQuery().searchSourceType==1||$FW.Format.urlQuery().searchSourceType==0){
    	
    }else{
    	NativeBridge.setTitle(title);
    	if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={title} back_handler={backward}/>, document.getElementById('header'));
    }
	
    window._ResultPage = ReactDOM.render(<ResultPage/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}

window._searchOptions = {
    page: 1,
    vipLevel: '',
    productName: '', // keyword
    categoryName: '',
    actIds: '',
    searchSourceType: '',
    prefectureType: 0,
    order: -1,
    minPoints: '',
    maxPoints: ''
};

function search(options, refresh) {
    for (var i in options) {
        _searchOptions[i] = options[i]
    }

    if(refresh) {
        _searchOptions.page = 1;
    } else {
        _searchOptions.page++;
    }

    $FW.Ajax({
        url: API_PATH + 'mall/api/index/v1/search.json',
        data: _searchOptions,
        enable_loading: true,
        success: (data) => {
            refresh ?
                window._ResultPage.updateProducts(data) :
                window._ResultPage.appendProducts(data)
        }
    })
}

'use strict';

const API_PATH = document.getElementById('api-path').value;

const ResultPage = React.createClass({
    getInitialState: function () {
        return {
        	page:0,
            products: [],
            showSearch:$FW.Format.urlQuery().searchSourceTypeUrl==2?true:false,
            hasData:true,
            showExchangeBar:$FW.Format.urlQuery().searchSourceTypeUrl==2?false:true            
        }
    },
    componentDidMount: function () {
     	if($FW.Format.urlQuery().searchSourceTypeUrl==2){
     		this.setState({showExchangeBar:false});
     	} else{
     		this.loadMoreProductHandler()
     	}
        $FW.Event.touchBottom(this.loadMoreProductHandler);
        
    },
    loadMoreProductHandler: function (done) {      
    	this.state.hasData?
    	Filter.search({page: this.state.page +1}, (data)=>{
    		this.appendProducts(data);
    		this.setState({
    			page: this.state.page + 1,
    			hasData:data.hasData
    		});
    		done && done()
    	}):null;     
    },
    setInitialPage: function () {    	
        this.setState({page:1});
    },
    filterProducts: function (options) {    	
    	options.page = 1;
    	Filter.search(options, (data)=>{
        	this.setState({products: []}, () => this.appendProducts(data))
    		this.setState({
    			page: 1,
    			hasData:data.hasData
    		});
    	});     
    },
    appendProducts: function (data) {    	
        var list = this.state.products.slice();
        var newList=list.concat(data.products||[]);
        this.setState({products: newList})        
    },
    searchFocus: function () {
     	this.setState({showExchangeBar:false});
    },
    searchBlur: function () {    	 
    	this.setState({showExchangeBar:true});   
    },
    render: function () {
    	let productsList=()=>{
    		return (
    			 <div className="products-list">
                    {this.state.products.length ?this.state.products.map((p, index) => <ProductItem filterProducts={this.filterProducts} {...p} key={index}/>):
                        <div className="empty-list">暂无商品</div>}
                </div>
    		)
    	}
        return (
            <div>
                {$FW.Format.urlQuery().searchSourceTypeUrl==2||this.state.showSearch? <SearchBar filterProducts={this.filterProducts} searchBlur={this.searchBlur} searchFocus={this.searchFocus}/>:null}
                <ResultPage.CategoryBanner filterProducts={this.filterProducts} />
                {this.state.showExchangeBar?<ExchangeBar filterProducts={this.filterProducts} />:null}
                {this.state.showExchangeBar?productsList():null}
               
            </div>
        )
    }
});

ResultPage.CategoryBanner = React.createClass({
    render: function () {
        let c = $FW.Format.urlQuery().category;
        if (!c) return null;
        return <a className="category-img"><img src={"images/"+c+".jpg"}/></a>;
    }
});

const SearchBar = React.createClass({
    getInitialState: function () {
        return {
            value: '',
            history: [],
            showSearchHistory:true
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/searchRecordListOrClearAllRecords.json',
            data:{searchOpType:0,page:1},
            success: (data) => {
                this.setState({history: data.searchRecords||[]});
    
            }
        })
    },
    changeHandler: function (e) {
        this.setState({value: e.target.value})
    },
    searchHandler: function () {       
        this.props.filterProducts({productName: this.state.value});
        this.setState({showSearchHistory:false})
    },
    clearHistoryHandler: function () {    	
        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/searchRecordListOrClearAllRecords.json',
            data:{searchOpType:1,page:1},
           	success: (data) => {
           		console.log(data+'asd');
                this.setState({history: data.searchRecords||[]})
            }
        })
    },
    backHandler: function () {
       history.back();
       //App里面后退不起作用 判断在App环境当中关掉当前webview
        //NativeBridge.isReady && NativeBridge.close();
    },
    onBlurHandler: function () {
       this.setState({showSearchHistory:false});
       this.props.searchBlur();
    },
    onFocusHandler: function () {
    	this.setState({showSearchHistory:true});       
    	this.props.searchFocus();
    },
    onKeyDownHandler: function (e) {
    	if(e.keyCode==13){
    		if($FW.Format.urlQuery().searchSourceTypeUrl==2){
    			this.props.filterProducts({});
    			
    		}    		    		
    	}
    },

    render: function () {
        let item = (d) => {
            let click = () => this.setState({value: d.keyWord}, this.searchHandler);
            return <div className="history-item" key={d.keyWord} onClick={click}>{d.keyWord}</div>;
        };
		let searchHistory = () => {
            return (
            	this.state.showSearchHistory?
            	<div className="search-history">
                    <div className="search-history-input">历史搜索</div>
                    {this.state.history.length>0?this.state.history.map(item):null}
                    <div className="clear-history" onClick={this.clearHistoryHandler}>清空历史搜索</div>
                </div>:null
            )
        };
        let appIosTopWhite=()=>{
			
			let appIos=false;			
			if($FW.Browser.inApp()&&$FW.Browser.inIOS()){
				appIos=true;
			}else{
				appIos=false;
			}
			return (
				appIos?"search-bar search-bar-ios":"search-bar"
			)
		};
        return (
            <div className={appIosTopWhite()}>
                <div className="search-page-box">
                    <a className="back-arrow" onClick={this.backHandler}></a>
                    <form autocomplete="off"><input autofocus="autofocus" type="search" value={this.state.value}
                           placeholder="请输入想找的商品"
                           onChange={this.changeHandler}
                           onBlur={this.onBlurHandler} 
                           onFocus={this.onFocusHandler}
                           onKeyDown={this.onKeyDownHandler}                          
                    /></form>
                    <span className="search-page-icon" onClick={this.searchHandler}></span>
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
            maxValue:$FW.Format.urlQuery().searchSourceTypeUrl==1?-1:'',
            minValue:'',
            myScore:0,
        }
    },
    searchHandler: function(){
        var options = {
            order: this.state.sort,
            vipLevel: this.state.vipLevel,
            page:1
        };
        this.props.filterProducts(options);
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
	            order: -1,
	            page:1
	        };
			this.props.filterProducts(options);
        	this.setState({showFilterPop:false});
        }else if(tabName=='proceeds'){
        	var options = {
	            order: this.state.sort,
	            page:1
	        };
        	if(this.state.sort==3){
        		this.setState({sort:4});
        		options = {
		            order: 4,
		            page:1
		        };
        	}else{
        		this.setState({sort:3});
        		options = {
		            order: 3,
		            page:1
		        };
        	}       	        	
        	this.props.filterProducts(options);
        	this.setState({showFilterPop:false});
        }else if(tabName=='salestime'){   	
        	var options = {
	            order: this.state.sort,
	            page:1
	        };
        	if(this.state.sort==5){
        		this.setState({sort:0});
        		options = {
		            order: 0,
		            page:1
		        };
        	}else{
        		this.setState({sort:5});
        		options = {
		            order: 5,
		            page:1
		        };
        	} 
        	this.props.filterProducts(options);
        	this.setState({showFilterPop:false});
        }else if(tabName=='scorerank'){
        	var options = {
	            order: this.state.sort,
	            page:1
	        };
        	if(this.state.sort==1){
        		this.setState({sort:2});
        		options = {
		            order: 2,
		            page:1
		        };
        	}else{
        		this.setState({sort:1});
        		options = {
		            order: 1,
		            page:1
		        };
        	} 
        	this.props.filterProducts(options);
        	this.setState({showFilterPop:false});
        }else if(tabName=='filter'){
        	this.setState({showFilterPop:!this.state.showFilterPop});
        }
        this.setState({tab: tabName});
    },
    filterScoreHandler: function(name){
    	this.setState({minValue:''});
    	this.setState({maxValue:''});
        this.setState({filterScore:name});
        if(name=='不限'){
        	if($FW.Format.urlQuery().searchSourceTypeUrl==1){
        		this.setState({
	        		maxPoints:-1,
	        		minPoints:'',
	        	});
        	}else{
        		this.setState({
	        		maxPoints:'',
	        		minPoints:'',
	        	});
        	}        	
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
        }else{
        	if($FW.Format.urlQuery().searchSourceTypeUrl==1){
        		this.setState({
	        		minPoints:'',
	        		maxPoints:-1,
	        	});
        	}else{
        		this.setState({
	        		minPoints:'',
	        		maxPoints:'',
	        	});
        	}
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
    	    if($FW.Format.urlQuery().searchSourceTypeUrl==1){
				this.setState({
		       		vipLevel: -1,
		            showFilterPop:true,
		            filterScore:'不限',
		            filterLevel:'不限',
		            maxPoints:-1,
		            minPoints:'',
		            maxValue:'',
		            minValue:''      		
		       });
        	}else{
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
        	}   
                     
    },
    filterFinishHandler: function () {   
    	var options = {
            vipLevel: this.state.vipLevel,
            minPoints:this.state.minPoints,
			maxPoints:this.state.maxPoints,
			page:1
        };
    	if(this.state.maxValue&&this.state.minValue){
    		options = {
	            vipLevel: this.state.vipLevel,
	            minPoints:this.state.minValue,
				maxPoints:this.state.maxValue,
				page:1
	        };
    	}         	
        this.setState({showFilterPop:false});
        this.props.filterProducts(options);
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
    if($FW.Format.urlQuery().searchSourceTypeUrl==1){    	
    	title='我可兑换'
    }
    Filter.options.searchSourceType=$FW.Format.urlQuery().searchSourceTypeUrl||'';
    if($FW.Format.urlQuery().category){
    	Filter.options.categoryName=$FW.Format.urlQuery().category;
    };
    if($FW.Format.urlQuery().searchSourceTypeUrl==1){    	
    	 $FW.Ajax({
            url: `${API_PATH}/api/v1/user-state.json`,//登录状态及工分
            success: (data) =>{
	            if(data.is_login){
					Filter.options.maxPoints=data.score;
	        	}else{
	        		Filter.options.maxPoints=-1;
	        	};
            } 
        });
    	

    	
    }else if($FW.Format.urlQuery().searchSourceTypeUrl==2){
    	
    }else{
    	NativeBridge.setTitle(title);
    	if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={title}/>, document.getElementById('header'));
    }	
    window._ResultPage = ReactDOM.render(<ResultPage/>, document.getElementById('cnt'));
});

let Filter = {
	options: {
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
	},

	mix: function(opts) {
		for(var i in opts) {
			Filter.options[i] = opts[i]
		}
	},

	search: function(options, callback){
		Filter.mix(options);		
		$FW.Ajax({
	        url: API_PATH + 'mall/api/index/v1/search.json',
	        data: Filter.options,
	        enable_loading: true,
	        success: data => callback(data)
	    })
	}
}
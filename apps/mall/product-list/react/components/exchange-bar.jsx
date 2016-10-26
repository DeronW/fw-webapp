const ExchangeBar = React.createClass({
    getInitialState: function () {
        this.tabs = ['defaultSort', 'proceeds', 'salestime', 'scorerank', 'filter'];
        this.count = 20;
        return {
            tab: 'defaultSort',
            sort: -1,
            vipLevel: '',
            showFilterPop: false,
            filterScore: '不限',
            filterLevel: '不限',
            maxPoints:Filter.options.searchSourceType == 1?Filter.myConvertibleScore : '',
            minPoints:'',
            maxValue:'',
            minValue:'',
        }
    },
    searchHandler: function () {
        var options = {
            order: this.state.sort,
            vipLevel: this.state.vipLevel,
            page: 1
        };
        this.props.filterProducts(options);
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${API_PATH}/api/v1/user-state.json`,//登录状态及工分
            success: (data) => {
                if (data.is_login) {                   	
                    Filter.myConvertibleScore = data.score;
                    if(Filter.options.searchSourceType == 1){
                    	Filter.options.maxPoints=data.score;
                    }
                }
            }
        });
    },
    tabClickHandler: function (tabName) {
        if (tabName == 'defaultSort') {
            this.setState({
                sort: -1,
                tab: tabName,
            });
            var options = {
                order: -1,
                page: 1
            };
            this.props.searchFilterProductShow();
            this.props.filterProducts(options);
            this.setState({showFilterPop: false});
        } else if (tabName == 'proceeds') {
            var options = {
                order: this.state.sort,
                page: 1
            };
            if (this.state.sort == 3) {
                this.setState({sort: 4});
                options = {
                    order: 4,
                    page: 1
                };
            } else {
                this.setState({sort: 3});
                options = {
                    order: 3,
                    page: 1
                };
            }
            this.props.searchFilterProductShow();
            this.props.filterProducts(options);
            this.setState({showFilterPop: false});
        } else if (tabName == 'salestime') {
            var options = {
                order: this.state.sort,
                page: 1
            };
            if (this.state.sort == 5) {
                this.setState({sort: 0});
                options = {
                    order: 0,
                    page: 1
                };
            } else {
                this.setState({sort: 5});
                options = {
                    order: 5,
                    page: 1
                };
            }
            this.props.searchFilterProductShow();
            this.props.filterProducts(options);
            this.setState({showFilterPop: false});
        } else if (tabName == 'scorerank') {
            var options = {
                order: this.state.sort,
                page: 1
            };
            if (this.state.sort == 1) {
                this.setState({sort: 2});
                options = {
                    order: 2,
                    page: 1
                };
            } else {
                this.setState({sort: 1});
                options = {
                    order: 1,
                    page: 1
                };
            }
            this.props.searchFilterProductShow();
            this.props.filterProducts(options);
            this.setState({showFilterPop: false});
        } else if (tabName == 'filter') {
            this.state.showFilterPop ?
                this.props.searchFilterProductShow() :
                this.props.searchFilterProductHide();
            this.setState({showFilterPop: !this.state.showFilterPop});
        }
        this.setState({tab: tabName});
    },
    filterScoreHandler: function (name) {
        this.setState({minValue:''});
        this.setState({maxValue:''});
        this.setState({filterScore: name});
        if (name == '不限') {
            this.setState({
                maxPoints: Filter.options.searchSourceType == 1 ? Filter.myConvertibleScore :'',
                minPoints: ''
            });
        } else if (name == '我可兑换') {
            this.setState({
                minPoints: '',
                maxPoints:Filter.options.searchSourceType == 1 ? Filter.myConvertibleScore :''
            });
        } else if (name == '1-100') {
            this.setState({
                minPoints: Filter.options.searchSourceType == 1&&Filter.myConvertibleScore >= 1 ? 1 : 0,
                maxPoints: Filter.options.searchSourceType == 1&&Filter.myConvertibleScore <= 100 ? Filter.myConvertibleScore : 100
            });
                
        } else if (name == '101-1000') {
            if (Filter.options.searchSourceType == 1) {
                this.setState({
                    minPoints: Filter.myConvertibleScore >= 101 ? 101 : 0,
                    maxPoints: Filter.myConvertibleScore <= 1000 ? Filter.myConvertibleScore : 1000
                });
            } else {
                this.setState({
                    minPoints: 101,
                    maxPoints: 1000
                });
            }
        } else if (name == '1000-5000') {
            if (Filter.options.searchSourceType == 1) {
                this.setState({
                    minPoints: Filter.myConvertibleScore >= 1000 ? 1000 : 0,
                    maxPoints: Filter.myConvertibleScore <= 5000 ? Filter.myConvertibleScore : 5000,
                });
            } else {
                this.setState({
                    minPoints: 1000,
                    maxPoints: 5000
                });
            }
        } else if (name == '5000以上') {
            if (Filter.options.searchSourceType == 1) {
                this.setState({
                    minPoints: Filter.myConvertibleScore >= 5000 ? 5000 : 0,
                    maxPoints: Filter.myConvertibleScore
                });
            } else {
                this.setState({
                    minPoints: 5000,
                    maxPoints: 99999999
                });
            }
        }
    },
    filterLevelHandler: function (name) {
        this.setState({filterLevel: name});
        if (name == '不限') {
            this.setState({vipLevel: ''});
        } else if (name == '普通会员') {
            this.setState({vipLevel: 1});
        } else if (name == 'Vip1专享') {
            this.setState({vipLevel: 2});
        } else if (name == 'Vip2专享') {
            this.setState({vipLevel: 3});
        } else if (name == 'Vip3专享') {
            this.setState({vipLevel: 4});
        } else if (name == 'Vip4专享') {
            this.setState({vipLevel: 5});
        }
    },
    maxValueHandler: function (e) {    	
    	if(e.target.value!=''&&isNaN(e.target.value)) return false 
    	if(this.state.minValue==''){
    		this.setState({
                minPoints:0,
            });
    	}
        if (Filter.options.searchSourceType == 1) {
            this.setState({
                maxValue: e.target.value > Filter.myConvertibleScore ? Filter.myConvertibleScore : e.target.value
            });
            this.setState({maxPoints:e.target.value > Filter.myConvertibleScore ? Filter.myConvertibleScore : e.target.value});
        } else {
            this.setState({maxValue:e.target.value});
            this.setState({maxPoints:e.target.value});
        }        
        if (e.target.value == '' && this.state.minValue == '') {
            this.setState({filterScore: '不限'});
        }else{
        	this.setState({filterScore:''});
        }
    },
    minValueHandler: function (e) {
      if(e.target.value!=''&&isNaN(e.target.value)) return false 
    	if(this.state.maxValue==''){
    		this.setState({
                maxPoints:Filter.options.searchSourceType == 1?Filter.myConvertibleScore:99999999,
            });
    	}
        if (Filter.options.searchSourceType == 1) {
            this.setState({
                minValue: e.target.value > Filter.myConvertibleScore ? Filter.myConvertibleScore : e.target.value
            });
            this.setState({minPoints: e.target.value > Filter.myConvertibleScore ? Filter.myConvertibleScore : e.target.value});
        } else {
            this.setState({minPoints:e.target.value});
        }        
        if (e.target.value == '' && this.state.maxValue == '') {
            this.setState({filterScore: '不限'});
        }else{
        	this.setState({filterScore:''});
        }
    },
    clearFilterHandler: function () {
        if (Filter.options.searchSourceType == 1) {
            this.setState({
                vipLevel: '',
                showFilterPop: true,
                filterScore: '不限',
                filterLevel: '不限',
                maxPoints: Filter.myConvertibleScore,
                minPoints: '',
                maxValue: '',
                minValue: ''
            });
        } else {
            this.setState({
                vipLevel: '',
                showFilterPop: true,
                filterScore: '不限',
                filterLevel: '不限',
                maxPoints: '',
                minPoints: '',
                maxValue: '',
                minValue: ''
            });
        }

    },
    filterFinishHandler: function () {
        this.props.searchFilterProductShow();        
        var options = {
            vipLevel: this.state.vipLevel,
            minPoints: this.state.minPoints,
            maxPoints: this.state.maxPoints,
            page: 1
        };
        console.log(this.state);
        this.setState({showFilterPop: false});
        this.props.filterProducts(options);
    },
    render: function () {
        var _this = this;
        let tab = function (i) {
            let name = {
                defaultSort: '默认',
                proceeds: '销量',
                salestime: '上架时间',
                scorerank: '工分',
                filter: '筛选'
            };
            let rank_icon = (j)=> {
                if (j == 'proceeds') {
                    if (_this.state.sort == 4) {
                        return 'rank-icon-up'
                    } else if (_this.state.sort == 3) {
                        return 'rank-icon-down'
                    } else {
                        return ''
                    }
                } else if (j == 'salestime') {
                    if (_this.state.sort == 0) {
                        return 'rank-icon-up'
                    } else if (_this.state.sort == 5) {
                        return 'rank-icon-down'
                    } else {
                        return ''
                    }
                } else if (j == 'scorerank') {
                    if (_this.state.sort == 2) {
                        return 'rank-icon-up'
                    } else if (_this.state.sort == 1) {
                        return 'rank-icon-down'
                    } else {
                        return ''
                    }
                } else {
                    return 'rank-icon-no'
                }
            };
            return (
                <div key={i} className={i == _this.state.tab ? "ui-tab-li ui-select-li" : "ui-tab-li"}
                     onClick={function () {
                         _this.tabClickHandler(i)
                     }}>
                    {name[i]}<span className={"rank-icon " + rank_icon(i)}></span>
                </div>
            )
        };

        let gongfeng_array = ['不限', '我可兑换', '1-100', '101-1000', '1000-5000', '5000以上'];
        let gongfeng_item = gongfeng_array.map((name, index) => {
                return (
                    <span className={this.state.filterScore == name ? "gongfeng-item-wrap on" : "gongfeng-item-wrap"}
                          key={index}><span className="gongfeng-item" onClick={function () {
                        _this.filterScoreHandler(name)
                    }}>{name}</span></span>
                )
            }
        );
        let viplevel_array = ['不限', '普通会员', 'Vip1专享', 'Vip2专享', 'Vip3专享', 'Vip4专享'];

        let viplevel_item = viplevel_array.map((name, index) => {
                return (
                    <span className={this.state.filterLevel == name ? "viplevel-item-wrap on" : "viplevel-item-wrap"}
                          key={index}><span className="viplevel-item" onClick={function () {
                        _this.filterLevelHandler(name)
                    }}>{name}</span></span>
                )
            }
        );

        let filterPop = ()=> {
            return (
                <div className="filter-box" style={{zIndex: "10"}}>
                    <div className="filter-box-wrap">
                        <div className="gongfeng-filter-box">
                            <div className="filter-title">按工分值</div>
                            <div className="gongfeng-items">
                                {gongfeng_item}
                                <div className="gonfeng-input-wrap">

                                    <div className="gongfeng-input-box gongfeng-input-box1"><input
                                        className="gongfeng-input" type="text" value={this.state.minValue}
                                        placeholder="最低工分" onChange={this.minValueHandler}/></div>
                                    <span
                                        className="horizon-line"></span>
                                    <div className="gongfeng-input-box gongfeng-input-box2"><input
                                        className="gongfeng-input gongfeng-input1" type="text"
                                        value={this.state.maxValue} placeholder="最高工分" onChange={this.maxValueHandler}
                                        ref="maxScore"/>
                                    </div>
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
        };

        return (
            <div className="filter-tab">
                <div className="ui-tab">
                    <div className="ui-tab-block">
                        {this.tabs.map(tab)}
                    </div>
                </div>
                {this.state.showFilterPop ? filterPop() : null}
            </div>
        );
    }
});
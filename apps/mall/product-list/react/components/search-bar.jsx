const SearchBar = React.createClass({
    getInitialState: function () {
        return {
            value: $FW.Format.urlQuery().productName?:'',
            history: [],
            showSearchHistory: true
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/searchRecordListOrClearAllRecords.json',
            data: {searchOpType: 0, page: 1},
            success: (data) => {
                this.setState({history: data.searchRecords || []});
            }
        });
        this.refs.searchInput.focus();
    },
    changeHandler: function (e) {
        this.setState({value: e.target.value})
    },
    searchHandler: function () {
        if (this.state.value) {
            this.props.filterProducts({productName: this.state.value});
            this.props.setShowExchangeBar();
            this.setState({showSearchHistory: false});
			Filter.setParamsToQuery();
        }
    },
    clearHistoryHandler: function () {
        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/searchRecordListOrClearAllRecords.json',
            data: {searchOpType: 1, page: 1},
            success: (data) => {
                this.setState({history: data.searchRecords || []})
            }
        })
    },
    backHandler: function () {
        history.back();
        //App里面后退不起作用 判断在App环境当中关掉当前webview
        setTimeout(()=> NativeBridge.isReady && NativeBridge.close(), 500);
    },
    onFocusHandler: function () {
        this.setState({showSearchHistory: true});
        this.props.searchFocus();
    },
    clickHistoryHandler: function () {
        this.setState({showSearchHistory: true});
        this.props.searchFocus();

        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/searchRecordListOrClearAllRecords.json',
            data: {searchOpType: 0, page: 1},
            success: (data) => {
                this.setState({history: data.searchRecords || []});
            }
        });
    },
    onKeyDownHandler: function (e) {
        if (e.keyCode == 13) {
            if (this.state.value) {
                this.props.filterProducts({productName: this.state.value});
                this.props.setShowExchangeBar();
                this.setState({showSearchHistory: false});
                Filter.setParamsToQuery();
            }
            this.refs.searchInput.blur();
        }
    },

    render: function () {
        let item = (d) => {
            let click = () => this.setState({value: d.keyWord}, this.searchHandler);
            return (
                <div className="history-item" key={d.keyWord} onClick={click}>
                    {d.keyWord}
                </div>
            )
        };

        let searchHistory = () => {
            if (!this.state.showSearchHistory) return null;
            let history = this.state.history.length > 0 ? this.state.history.map(item) : null;

            return (
                <div className="search-history">
                    <div className="search-history-input">历史搜索</div>
                    {history}
                    <div className="clear-history" onClick={this.clearHistoryHandler}>
                        清空历史搜索
                    </div>
                </div>
            )
        };

        var class_name = $FW.Browser.inApp() && $FW.Browser.inIOS() ? "search-bar search-bar-ios" : "search-bar";

        return (
            <div className={class_name}>
                <div className="search-page-box">
                    <a className="back-arrow" onClick={this.backHandler}> </a>
                    <input autofocus="autofocus" type="search" value={this.state.value}
                           placeholder="请输入想找的商品"
                           onChange={this.changeHandler}
                           onClick={this.clickHistoryHandler}
                           onFocus={this.onFocusHandler}
                           onKeyDown={this.onKeyDownHandler}
                           ref="searchInput"
                    />
                    <span className="search-page-icon" onClick={this.searchHandler}> </span>
                    <span className="search-confirm" onClick={this.searchHandler}>搜索</span>
                </div>
                {searchHistory()}
            </div>
        )
    }
});
